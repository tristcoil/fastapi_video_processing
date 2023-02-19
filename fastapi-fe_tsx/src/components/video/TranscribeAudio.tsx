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


    // axios
    //   .post("http://localhost:8000/transcribe", { file_name: fileName })
    //   .then((response) => {
    //     console.log(response.data);
    //     setFileName("");
    //     setStatus(response.data.status);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     setStatus("Error while transcribing audio");
    //   });

    axios.post(
      "http://localhost:8000/transcribe",
      { file_name: fileName },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: false,
      }
    )
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
      <h1 className="text-lg text-blue-900">Transcribe audio file</h1>
      <form onSubmit={handleSubmit}>
      <label htmlFor="filenamebox" className="form-label inline-block mb-2 text-gray-700">File name to be processed</label>

        <input
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

          type="text"
          value={fileName}
          onChange={handleChange}
          placeholder="Enter file name"
          id="filenamebox"
        />
        <button className=" px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" type="submit">Transcribe audio</button>
      </form>
      {status ? <div>{status}</div> : null}
    </div>
  );
};

export default TranscribeAudio;
