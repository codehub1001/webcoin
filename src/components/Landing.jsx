import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Premium Landing Page — fully expanded
// Single-file React component (Tailwind CSS required)

export default function Landing() {
  // Animated counters (updated)
  const [walletsSecured, setWalletsSecured] = useState(0);
  const [threatsBlocked, setThreatsBlocked] = useState(0);
  const [recoveries, setRecoveries] = useState(0);

  useEffect(() => {
    const targets = { w: 300000, t: 142, r: 57 }; // Wallets Secured updated
    let w = 0, t = 0, r = 0;
    const duration = 1400;
    const step = 30;
    const iterations = Math.ceil(duration / step);
    const incW = Math.ceil(targets.w / iterations);
    const incT = Math.ceil(targets.t / iterations);
    const incR = Math.ceil(targets.r / iterations);

    const iv = setInterval(() => {
      w = Math.min(targets.w, w + incW);
      t = Math.min(targets.t, t + incT);
      r = Math.min(targets.r, r + incR);
      setWalletsSecured(w);
      setThreatsBlocked(t);
      setRecoveries(r);
      if (w === targets.w && t === targets.t && r === targets.r) clearInterval(iv);
    }, step);

    return () => clearInterval(iv);
  }, []);

  const marquee = [
    "Wallet Scan Completed — 3 minutes ago",
    "Threat Detected: Suspicious Contract — ETH",
    "New User Secured Wallet — Lagos",
    "Phishing Link Blocked — 1 minute ago",
    "Recovery Successful — 0.12 ETH restored",
    "Smart Contract Risk Alert — Polygon"
  ];

  const faqs = [
    {
      q: "Is my wallet safe when I connect it?",
      a: "Yes — we use read-only connections and never request private keys or seed phrases. All scans use encrypted RPC providers."
    },
    {
      q: "Can you recover a hacked wallet?",
      a: "Depending on the attack vector, our forensic tools can trace outgoing funds and suggest recovery and mitigation steps. Recovery is not always guaranteed, but we provide the best-possible assistance."
    },
    {
      q: "What blockchains are supported?",
      a: "Ethereum, BSC, Polygon, Solana (read-only metadata), Avalanche, Tron, Arbitrum, Base. More chains added frequently."
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black via-slate-900 to-black text-white overflow-x-hidden">

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee {
          display: inline-block;
          white-space: nowrap;
          will-change: transform;
          animation: marquee 18s linear infinite;
        }
      `}</style>

      {/* HERO */}
      <section className="px-4 sm:px-8 lg:px-20 pt-12 pb-20 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div>
            <motion.h1 initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Secure your crypto wallets with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">enterprise-grade protection</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-gray-300 mt-6 max-w-xl text-lg">
              Detect malicious approvals, prevent phishing drains, and recover compromised wallets — powered by blockchain analytics and AI threat detection.
            </motion.p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a href="/scan" className="inline-flex items-center gap-3 px-7 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-lg font-semibold shadow-lg transition">
                Start Free Scan
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>

              <a href="#how" className="inline-flex items-center gap-2 px-5 py-3 border border-white/20 rounded-xl text-sm text-gray-200 hover:bg-white/10 transition">
                How it works
              </a>
            </div>

            {/* Stats */}
            <div className="mt-10 flex gap-6 flex-wrap">
              <div className="bg-white/5 rounded-2xl px-6 py-4">
                <div className="text-xs text-gray-300 uppercase tracking-wide">Wallets Secured</div>
                <div className="text-2xl md:text-3xl font-bold text-blue-400">{walletsSecured.toLocaleString()}+</div>
              </div>
              <div className="bg-white/5 rounded-2xl px-6 py-4">
                <div className="text-xs text-gray-300 uppercase tracking-wide">Threats Blocked</div>
                <div className="text-2xl md:text-3xl font-bold text-blue-400">{threatsBlocked}+</div>
              </div>
              <div className="bg-white/5 rounded-2xl px-6 py-4">
                <div className="text-xs text-gray-300 uppercase tracking-wide">Recoveries</div>
                <div className="text-2xl md:text-3xl font-bold text-blue-400">{recoveries}+</div>
              </div>
            </div>

          </div>

          {/* Right card */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-3xl p-8 backdrop-blur-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-300">Live Protection</div>
                <div className="text-xl font-bold mt-1">Wallet Health: <span className="text-green-400">Good</span></div>
              </div>
              <div className="text-xs text-gray-400">Updated now</div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-300">Approvals scanned</div>
                <div className="font-medium">47</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-300">High-risk contracts</div>
                <div className="font-medium text-red-400">2</div>
              </div>

              <div className="mt-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                <div className="text-sm text-gray-300 font-medium">Latest Alert</div>
                <div className="text-sm mt-1">Suspicious token approval on 0xF...aB2</div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-4 sm:px-8 lg:px-20 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Real-time Threat Detection", desc: "Continuously scan transactions and approvals to detect suspicious activity before funds leave your wallet." },
            { title: "AI-powered Risk Scoring", desc: "Our risk engine assigns priority scores so you know which issues to fix first." },
            { title: "Recovery & Mitigation", desc: "Actionable recovery steps and optional expert assistance for compromised wallets." }
          ].map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} className="p-6 bg-gray-900 rounded-xl border border-gray-800 shadow-md">
              <div className="text-lg font-semibold">{f.title}</div>
              <div className="text-sm text-gray-400 mt-2">{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Extended Trust / Features Grid */}
      <section className="px-6 md:px-16 py-10 bg-black/60 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold">Trusted by users around the world</h2>
          <p className="text-gray-400 mt-2">Over <span className="text-blue-400 font-semibold">300k+</span> wallets secured with real-time monitoring and recovery.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {["Metamask Wallet Secured","Trust Wallet Protection Enabled","Phantom Wallet Recovery","Cross-Chain Wallet Audit","AI-Powered Risk Scan","24/7 Security Monitoring"].map((item,i)=> (
              <motion.div key={i} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:i*0.1}} className="p-4 bg-gray-900 rounded-xl border border-gray-800 text-center shadow-md">
                <div className="text-gray-300 font-medium">{item}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 md:px-16 py-16 bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold">What our users say</h2>
          <p className="text-gray-400 mt-3">Real stories from users who avoided loss or recovered funds.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {[{name: 'Samuel O.', avatar: '', text: 'My wallet was compromised — CryptoGuard helped me detect the malicious approval and recover funds.'},
              {name: 'Ada C.', avatar: '', text: 'The AI scan detected a phishing approval. I revoked the approval immediately — saved my funds.'},
              {name: 'John M.', avatar: '', text: 'Easy to use, fast results. I secured my wallets and feel safer.'}
            ].map((t,i)=> (
              <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.12}} className="p-6 bg-gradient-to-br from-white/3 to-white/5 border border-white/6 rounded-2xl text-left shadow-md">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-semibold">{t.name.split(' ')[0][0]}</div>
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-xs text-gray-400">Verified user</div>
                  </div>
                </div>
                <p className="mt-4 text-gray-300">“{t.text}”</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Real-time protection stats */}
      <section className="px-6 md:px-16 py-16 text-center bg-black/60 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold">Real-time protection stats</h2>
          <p className="text-gray-400 mt-2">Continuously updated from our monitoring network.</p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-900 rounded-xl border border-gray-800 shadow-md">
              <div className="text-sm text-gray-400">Wallets Secured</div>
              <div className="text-4xl font-bold text-blue-400 mt-2">{walletsSecured.toLocaleString()}+</div>
            </div>
            <div className="p-6 bg-gray-900 rounded-xl border border-gray-800 shadow-md">
              <div className="text-sm text-gray-400">Threats Blocked</div>
              <div className="text-4xl font-bold text-blue-400 mt-2">{threatsBlocked}+</div>
            </div>
            <div className="p-6 bg-gray-900 rounded-xl border border-gray-800 shadow-md">
              <div className="text-sm text-gray-400">Recoveries Completed</div>
              <div className="text-4xl font-bold text-blue-400 mt-2">{recoveries}+</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="px-6 md:px-16 py-20 bg-gray-900 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold">How it works</h2>
          <p className="text-gray-400 mt-2">A secure 3-step process to analyze, protect and recover wallets.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="p-6 bg-gray-800 rounded-xl border border-gray-700 text-left shadow-md">
              <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center font-bold">1</div>
              <h3 className="text-xl font-semibold mt-4">Connect Wallet</h3>
              <p className="text-gray-400 mt-2">Read-only connection via WalletConnect or MetaMask — we never ask for private keys.</p>
            </motion.div>

            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="p-6 bg-gray-800 rounded-xl border border-gray-700 text-left shadow-md">
              <div className="w-12 h-12 rounded-lg bg-purple-600 flex items-center justify-center font-bold">2</div>
              <h3 className="text-xl font-semibold mt-4">AI Security Scan</h3>
              <p className="text-gray-400 mt-2">We analyze approvals, contracts and transaction history to calculate a risk score.</p>
            </motion.div>

            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="p-6 bg-gray-800 rounded-xl border border-gray-700 text-left shadow-md">
              <div className="w-12 h-12 rounded-lg bg-green-600 flex items-center justify-center font-bold">3</div>
              <h3 className="text-xl font-semibold mt-4">Fix & Protect</h3>
              <p className="text-gray-400 mt-2">Actionable recommendations, revoke risky approvals, and optional expert recovery assistance.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Supported Chains grid */}
      <section id="chains" className="px-6 md:px-16 py-16 bg-black/60 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold">Supported Blockchains</h2>
          <p className="text-gray-400 mt-2">Comprehensive scanning across major L1s and L2s.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            {[{ name: 'Ethereum', abbr: 'ETH' },
              { name: 'Binance Smart Chain', abbr: 'BSC' },
              { name: 'Solana (read-only)', abbr: 'SOL' },
              { name: 'Polygon', abbr: 'MATIC' },
              { name: 'Avalanche', abbr: 'AVAX' },
              { name: 'Tron', abbr: 'TRX' },
              { name: 'Arbitrum', abbr: 'ARB' },
              { name: 'Base', abbr: 'BASE' }
            ].map((c, i) => (
              <motion.div key={i} initial={{opacity:0}} whileInView={{opacity:1}} transition={{delay:i*0.08}} viewport={{once:true}} className="p-4 bg-gray-900 rounded-xl border border-gray-800 flex flex-col items-center gap-2 shadow-md">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center font-semibold">{c.abbr}</div>
                <div className="text-sm text-gray-300">{c.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 md:px-16 py-16 bg-gray-950 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>

          <div className="mt-10 space-y-4">
            {faqs.map((f, i) => (
              <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}} className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-md">
                <div className="font-semibold">{f.q}</div>
                <div className="text-gray-400 mt-2">{f.a}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="px-6 md:px-16 py-6 bg-gray-900 border-t border-gray-800 overflow-hidden">
        <div className="w-full whitespace-nowrap overflow-hidden">
          <div className="marquee flex gap-12">
            {marquee.map((m, i) => (
              <div key={i} className="inline-block text-gray-400 font-medium">{m}</div>
            ))}
            {marquee.map((m, i) => (
              <div key={i + marquee.length} className="inline-block text-gray-400 font-medium">{m}</div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-16 py-10 bg-black border-t border-gray-800 text-gray-400 text-sm text-center">
        &copy; {new Date().getFullYear()} CryptoGuard. All rights reserved.
      </footer>

    </div>
  );
}
