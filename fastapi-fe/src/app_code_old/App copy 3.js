import React, { useState, useEffect } from "react";

function App() {
  const [filename, setFilename] = useState("01一生のお願い教科書にない日本語9N_A7KEiXhg.mp3.txt");
  const [chunkNum, setChunkNum] = useState(0);
  const [chunkSize, setChunkSize] = useState(10);
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

  const handleNext = () => {
    if (chunkNum < totalChunks - 1) {
      console.log(chunkNum);
      setPrevChunkNum(chunkNum);
      setChunkNum(chunkNum + 1);
      console.log(chunkNum);  // does not update value, so handle submit is behind
      //handleSubmit();
    }
  };


  const handlePrev = () => {
    if (chunkNum > 0) {
      setPrevChunkNum(chunkNum);
      setChunkNum(parseInt(chunkNum) - 1);
      //handleSubmit();
    }
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
    <div className="App">
      <h1>Text Chunks</h1>
      <div>
        <label>
          Filename:
          <input
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Chunk Number:
          <input
            type="number"
            value={chunkNum}
            onChange={(e) => setChunkNum(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Chunk Size:
          <input
            type="number"
            value={chunkSize}
            onChange={(e) => setChunkSize(e.target.value)}
          />
        </label>
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div>
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
      <div>
        <p>Total Chunks: {totalChunks}</p>
        <p>Current Chunk number: {chunkNum}</p>
        <p>Text Chunk: {textChunk}</p>
      </div>
    </div>
  );
}

export default App;
