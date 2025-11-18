import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Landing from "./components/Landing";
import ConnectWallet from "./components/ConnectWallet";
import ScanWallet from "./components/ScanWallet";
import Faq from "./components/Faq";

const App = () => {
  useEffect(() => {
    // Tawk.to chat widget script
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/691c06b4dca098195ab99677/1jaankcbf";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []);

  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/connect" element={<ConnectWallet />} />
        <Route path="/scan" element={<ScanWallet />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>
    </Router>
  );
};

export default App;
