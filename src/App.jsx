import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Landing from "./components/Landing";
import ConnectWallet from "./components/ConnectWallet";
import ScanWallet from "./components/ScanWallet";
import Faq from "./components/Faq";

const App = () => {
  return (
    <Router>
      <Header />
      <div className="pt-[60px]">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/connect" element={<ConnectWallet />} />
          <Route path="/scan" element={<ScanWallet />} />
          <Route path="/faq" element={<Faq />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
