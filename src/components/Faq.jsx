// Faq.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is Secure Wallet Connection?",
    answer:
      "Secure Wallet Connection allows you to safely connect your cryptocurrency wallet by either entering your 12-word recovery phrase manually or using a secure automatic connection method. Your sensitive data is not stored permanently and is only used for validation.",
  },
  {
    question: "Is my 12-word recovery phrase safe?",
    answer:
      "Yes! The phrase is transmitted securely to our backend using HTTPS. We never store it permanently, and it is only used for verification and email notifications if enabled.",
  },
  {
    question: "Which wallets are supported?",
    answer:
      "We support Ethereum-compatible wallets, Binance Smart Chain (BSC) wallets, Polygon wallets, and Bitcoin addresses. Popular tokens like USDT, USDC, and BUSD are scanned automatically.",
  },
  {
    question: "Can I scan multiple wallets?",
    answer:
      "Yes! You can scan any valid wallet address. The scanner will fetch native balances and token balances, and it will detect any potential vulnerabilities or suspicious tokens.",
  },
  {
    question: "What vulnerabilities does the scanner check?",
    answer:
      "The scanner detects weak address entropy, pending transactions (exposure on public mempool), lack of multisig protection for Ethereum wallets, suspicious tokens, and general wallet risk indicators.",
  },
  {
    question: "How do I use the wallet scanner?",
    answer:
      "Navigate to the Scan Wallet page, enter a valid wallet address (Ethereum or Bitcoin), and click 'Scan Wallet'. The results will show balances, tokens, and any detected vulnerabilities.",
  },

];

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h1>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700">
              <button
                onClick={() => toggleIndex(index)}
                className="w-full text-left flex justify-between items-center focus:outline-none"
              >
                <span className="text-lg font-semibold">{faq.question}</span>
                <span className="text-2xl">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 text-gray-300 text-sm overflow-hidden"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
