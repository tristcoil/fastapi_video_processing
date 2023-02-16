// App.js
import React, { useState } from "react";



// Form.js
// function Form({ formData, onChange }) {
//   const handleChange = (e) => {
//     onChange({ [e.target.name]: e.target.value });
//   };

//   return (
//     <form>
//       <div>
//         <label>
//           Filename:
//           <input
//             type="text"
//             name="filename"
//             value={formData.filename}
//             onChange={handleChange}
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           Chunk Number:
//           <input
//             type="number"
//             name="chunkNum"
//             value={formData.chunkNum}
//             onChange={handleChange}
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           Chunk Size:
//           <input
//             type="number"
//             name="chunkSize"
//             value={formData.chunkSize}
//             onChange={handleChange}
//           />
//         </label>
//       </div>
//     </form>
//   );
// }

// --------------------------------------------------------------------------------------------


const Form = ({ onFormSubmit }) => {
  const [filename, setFilename] = useState("01一生のお願い教科書にない日本語9N_A7KEiXhg.mp3.txt");
  const [chunkNum, setChunkNum] = useState(0);
  const [chunkSize, setChunkSize] = useState(10);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(filename,chunkNum, chunkSize);
  };


  return (
    <div className="Form">
      <div>
        <label>
          Filename:
          <input
            type="text"
            value={filename}
            onChange={(e) => {
              setFilename(e.target.value);
            }}
          />
        </label>
      </div>
      <div>
        <label>
          Chunk Number:
          <input
            type="number"
            value={chunkNum}
            onChange={(e) => {
              setChunkNum(e.target.value);
            }}
          />
        </label>
      </div>
      <div>
        <label>
          Chunk Size:
          <input
            type="number"
            value={chunkSize}
            onChange={(e) => {
              setChunkSize(e.target.value);
            }}
          />
        </label>
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

















const Card = ({ filename, chunkNum, chunkSize }) => {
  return (
    <div>
      <p>Filename: {filename}</p>
      <p>Chunk number: {chunkNum}</p>
      <p>Chunk size: {chunkSize}</p>
    </div>
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
      <Card filename={formData.filename} chunkNum={formData.chunkNum} chunkSize={formData.chunkSize} />
    </div>
  );
}

export default App;







