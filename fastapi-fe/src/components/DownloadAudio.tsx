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

    axios
      .post("http://localhost:8000/download", { video_url: videoUrl })
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
      <h1>Download audio from YouTube video</h1>
      <p>videos, that are DRM protected, cannot be downloaded</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={videoUrl}
          onChange={handleChange}
          placeholder="Enter YouTube video URL"
        />
        <button type="submit">Download audio</button>
      </form>
      {errorMessage && (
        <p style={{ color: "red" }}>{errorMessage}</p>
      )}
      {status ? <div>{status}</div> : null}
    </div>
  );
};

export default DownloadAudio;
