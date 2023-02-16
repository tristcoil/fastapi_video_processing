import React, { useState } from 'react';
import axios from 'axios';

interface SplitFileState {
  fileName: string;
  status: string;
}

const SplitFile: React.FC = () => {
  const [state, setState] = useState<SplitFileState>({
    fileName: "",
    status: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, fileName: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!state.fileName.endsWith(".txt")) {
      setState({ ...state, status: "File must be in .txt format" });
      return;
    }
    axios
      .post("http://localhost:8000/split", { filename: state.fileName })
      .then((response) => {
        console.log(response.data);
        setState({ fileName: "", status: response.data.status });
      })
      .catch((error) => {
        console.error(error);
        setState({ ...state, status: "Error while splitting file" });
      });
  };

  return (
    <div>
      <h1>Split file into chunks with length n</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={state.fileName}
          onChange={handleChange}
          placeholder="Enter file name"
        />
        <button type="submit">Split file</button>
      </form>
      {state.status ? <div>{state.status}</div> : null}
    </div>
  );
};

export default SplitFile;
