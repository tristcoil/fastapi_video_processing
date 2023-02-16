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
      <h1 className="text-lg text-blue-900">Split file into chunks with length n</h1>
      <form onSubmit={handleSubmit}>
      <label htmlFor="filenamebox" className="form-label inline-block mb-2 text-gray-700">File name to be processed</label>
        <input
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          type="text"
          value={state.fileName}
          onChange={handleChange}
          placeholder="Enter file name"
          id="filenamebox"
        />
        <button className=" px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" type="submit">Split file</button>
      </form>
      {state.status ? <div>{state.status}</div> : null}
    </div>
  );
};

export default SplitFile;
