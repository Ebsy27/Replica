import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { 
  Homepage, 
  BuilderInterface 
} from "./components";

function App() {
  return (
    <div className="App bg-black min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={<Homepage />} 
          />
          <Route 
            path="/build" 
            element={<BuilderInterface />} 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;