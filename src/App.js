import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LocalDisplay from "./Comp/LocalRemote/LocalDisplay";
import RemoteDisplay from "./Comp/LocalRemote/RemoteDisplay";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LocalDisplay />} />
          <Route path="/display" element={<RemoteDisplay />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
