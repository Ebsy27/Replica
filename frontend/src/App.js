import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { 
  Homepage, 
  ChatInterface, 
  ProjectView 
} from "./components";

function App() {
  const [currentProject, setCurrentProject] = useState(null);

  return (
    <div className="App bg-black min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <Homepage 
                onProjectCreate={setCurrentProject} 
              />
            } 
          />
          <Route 
            path="/chat" 
            element={
              <ChatInterface 
                onProjectCreate={setCurrentProject} 
              />
            } 
          />
          <Route 
            path="/project/:id" 
            element={
              <ProjectView 
                project={currentProject} 
              />
            } 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;