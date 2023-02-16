// App.js
import React, { useState, useEffect } from "react";
import "./App.css";

import VideoText from "./pages/VideoText";
import ProcessDiagram from "./pages/ProcessDiagram";


function App() {

  return (
    <div>

      <ProcessDiagram />
      <VideoText />

      <div className="flex">
        <div className="w-3/4 p-4">
          This div will take up 3/4 of the space.
        </div>
        <div className="w-1/4 p-4">
          This div will take up 1/4 of the space.
        </div>
      </div>

    </div>
  );
}

export default App;





