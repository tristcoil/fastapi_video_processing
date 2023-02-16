import React, { useState } from "react";
import axios from "axios";

interface TranscribeAudioProps {

}

const TranscribeAudio: React.FC<TranscribeAudioProps> = () => {
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!fileName.endsWith(".mp3")) {
      setStatus("File must be in .mp3 format");
      return;
    }
    axios
      .post("http://localhost:8000/transcribe", { file_name: fileName })
      .then((response) => {
        console.log(response.data);
        setFileName("");
        setStatus(response.data.status);
      })
      .catch((error) => {
        console.error(error);
        setStatus("Error while transcribing audio");
      });
  };

  return (
    <div>
      <h1>Transcribe audio file</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={fileName}
          onChange={handleChange}
          placeholder="Enter file name"
        />
        <button type="submit">Transcribe audio</button>
      </form>
      {status ? <div>{status}</div> : null}
    </div>
  );
};

export default TranscribeAudio;
