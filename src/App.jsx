import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Landing from "./components/Landing";
import ConnectWallet from "./components/ConnectWallet";
import ScanWallet from "./components/ScanWallet";

const App = () => {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/connect" element={<ConnectWallet/>} />
        <Route path="/scan" element={<ScanWallet/>} />
    
      </Routes>
    </Router>
  );
};

export default App;
