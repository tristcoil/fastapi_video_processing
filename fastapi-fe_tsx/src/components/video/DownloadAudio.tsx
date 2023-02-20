import React, { useState } from 'react';
import axios from 'axios';

interface DownloadAudioProps {
}

const DownloadAudio: React.FC<DownloadAudioProps> = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(event.target.value);
    setErrorMessage("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const youtubeVideoUrlPattern = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
    if (!youtubeVideoUrlPattern.test(videoUrl)) {
      setErrorMessage("Invalid YouTube video URL");
      return;
    }

    // axios
    //   .post("http://localhost:8000/download", { video_url: videoUrl })
    //   .then((response) => {
    //     console.log(response.data);
    //     setVideoUrl("");
    //     setErrorMessage("");
    //     setStatus(response.data.status);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     setErrorMessage("An error occurred while making the API call");
    //   });

    axios.post(
      //"http://localhost:8000/api/download",
      "/api/download",
      { video_url: videoUrl },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      }
    )
      .then((response) => {
        console.log(response.data);
        setVideoUrl("");
        setErrorMessage("");
        setStatus(response.data.status);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("An error occurred while making the API call");
      });
    
    



  };







  return (
    <div>
      <h1 className="text-lg text-blue-900">Download audio from YouTube video</h1>
      <p>videos, that are DRM protected, cannot be downloaded</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="filenamebox" className="form-label inline-block mb-2 text-gray-700">Youtube link</label>
        <input
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          type="text"
          value={videoUrl}
          onChange={handleChange}
          id="filenamebox"

          placeholder="Enter YouTube video URL"
        />
        <button type="submit" className=" px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Download audio</button>

      </form>
      {errorMessage && (
        <p style={{ color: "red" }}>{errorMessage}</p>
      )}
      {status ? <div>{status}</div> : null}
    </div>
  );
};

export default DownloadAudio;
