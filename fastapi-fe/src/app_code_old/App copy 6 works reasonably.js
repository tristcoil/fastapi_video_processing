// App.js
import React, { useState, useEffect } from "react";


const Form = ({ onFormSubmit }) => {
  const [filename, setFilename] = useState("01一生のお願い教科書にない日本語9N_A7KEiXhg.mp3.txt");
  const [chunkNum, setChunkNum] = useState(0);
  const [chunkSize, setChunkSize] = useState(10);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(filename, chunkNum, chunkSize);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Filename:
          <input type="text" value={filename} onChange={(e) => { setFilename(e.target.value); }} />
        </label>
      </div>
      <div>
        <label>
          Chunk Number:
          <input type="number" value={chunkNum} onChange={(e) => { setChunkNum(e.target.value); }} />
        </label>
      </div>
      <div>
        <label>
          Chunk Size:
          <input type="number" value={chunkSize} onChange={(e) => { setChunkSize(e.target.value); }} />
        </label>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};




const Card = ({ filename, chunkNum, chunkSize }) => {
  //const [_filename, setFilename] = useState(filename);
  //const [_chunkNum, setChunkNum] = useState(chunkNum);
  //const [_chunkSize, setChunkSize] = useState(chunkSize);
  const [totalChunks, setTotalChunks] = useState(0);
  const [textChunk, setTextChunk] = useState("");
  const [prevChunkNum, setPrevChunkNum] = useState(chunkNum);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const handleSubmit = async () => {
    const response = await fetch(
      `http://localhost:8000/text_chunks/${filename}?chunk_num=${chunkNum}&chunk_size=${chunkSize}`
    );
    const data = await response.json();
    setTotalChunks(data.total_chunks);
    setTextChunk(data.chunk);
  };

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      handleSubmit();
    } else if (chunkNum !== prevChunkNum) {
      handleSubmit();
    }
  }, [chunkNum]);

  return (
    <div>
      <p>Filename: {filename}</p>
      <p>Chunk number: {chunkNum}</p>
      <p>Chunk size: {chunkSize}</p>
      <p>Total chunks: {totalChunks}</p>
      <p>Text chunk: {textChunk}</p>
    </div>
  );
};


function App() {
  const [formValue1, setFormValue1] = useState('');
  const [formValue2, setFormValue2] = useState('');
  const [formValue3, setFormValue3] = useState('');

  const handleFormSubmit = (value1, value2, value3) => {
    setFormValue1(value1);
    setFormValue2(value2);
    setFormValue3(value3);
  };

  return (
    <div className="App">
      <Form onFormSubmit={handleFormSubmit} />
      <Card filename={formValue1} chunkNum={formValue2} chunkSize={formValue3} />
    </div>
  );
}

export default App;







