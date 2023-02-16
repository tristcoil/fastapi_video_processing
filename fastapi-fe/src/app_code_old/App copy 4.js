// App.js
import React, { useState } from "react";



// Form.js
function Form({ formData, onChange }) {
  const handleChange = (e) => {
    onChange({ [e.target.name]: e.target.value });
  };

  return (
    <form>
      <div>
        <label>
          Filename:
          <input
            type="text"
            name="filename"
            value={formData.filename}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Chunk Number:
          <input
            type="number"
            name="chunkNum"
            value={formData.chunkNum}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Chunk Size:
          <input
            type="number"
            name="chunkSize"
            value={formData.chunkSize}
            onChange={handleChange}
          />
        </label>
      </div>
    </form>
  );
}


function App() {
  const [formData, setFormData] = useState({
    filename: "01一生のお願い教科書にない日本語9N_A7KEiXhg.mp3.txt",
    chunkNum: 0,
    chunkSize: 10,
  });

  const handleFormDataChange = (newData) => {
    setFormData({ ...formData, ...newData });
  };

  return (
    <div className="App">
      <Form formData={formData} onChange={handleFormDataChange} />
    </div>
  );
}

export default App;







