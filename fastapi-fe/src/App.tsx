// App.js
import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./App.css";

import Form from './components/Form';
import Card from './components/Card';
import FullTextCard from './components/FullTextCard';
import ListFiles from './components/ListFiles';
import Navigation from './components/Navigation';
import DownloadAudio from './components/DownloadAudio';
import TranscribeAudio from './components/TranscribeAudio';
import SplitFile from './components/SplitFile';
import ProcessSplitFiles from './components/ProcessSplitFiles';



function App() {
  const [formValue1_1, setFormValue1_1] = useState('default');
  const [formValue2_1, setFormValue2_1] = useState(-1);
  const [formValue3_1, setFormValue3_1] = useState(-1);

  const [formValue1_2, setFormValue1_2] = useState('default');
  const [formValue2_2, setFormValue2_2] = useState(-1);
  const [formValue3_2, setFormValue3_2] = useState(-1);



  const handleFormSubmit_1 = (value1, value2, value3) => {
    setFormValue1_1(value1);
    setFormValue2_1(value2);
    setFormValue3_1(value3);
  };

  const handleFormSubmit_2 = (value1, value2, value3) => {
    setFormValue1_2(value1);
    setFormValue2_2(value2);
    setFormValue3_2(value3);
  };


  return (
    <div className="App">


      <div className="flex space-x-2 justify-center">
        <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</button>
      </div>



      <div className="accordion" id="accordionExample">
  <div className="accordion-item bg-white border border-gray-200">
    <h2 className="accordion-header mb-0" id="headingOne">
      <button className="
        accordion-button
        relative
        flex
        items-center
        w-full
        py-4
        px-5
        text-base text-gray-800 text-left
        bg-white
        border-0
        rounded-none
        transition
        focus:outline-none
      " type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true"
        aria-controls="collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne"
      data-bs-parent="#accordionExample">
      <div className="accordion-body py-4 px-5">
        <strong>This is the first item's accordion body.</strong> It is shown by default,
        until the collapse plugin adds the appropriate classes that we use to style each
        element. These classes control the overall appearance, as well as the showing and
        hiding via CSS transitions. You can modify any of this with custom CSS or overriding
        our default variables. It's also worth noting that just about any HTML can go within
        the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div className="accordion-item bg-white border border-gray-200">
    <h2 className="accordion-header mb-0" id="headingTwo">
      <button className="
        accordion-button
        collapsed
        relative
        flex
        items-center
        w-full
        py-4
        px-5
        text-base text-gray-800 text-left
        bg-white
        border-0
        rounded-none
        transition
        focus:outline-none
      " type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false"
        aria-controls="collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo"
      data-bs-parent="#accordionExample">
      <div className="accordion-body py-4 px-5">
        <strong>This is the second item's accordion body.</strong> It is hidden by default,
        until the collapse plugin adds the appropriate classes that we use to style each
        element. These classes control the overall appearance, as well as the showing and
        hiding via CSS transitions. You can modify any of this with custom CSS or overriding
        our default variables. It's also worth noting that just about any HTML can go within
        the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div className="accordion-item bg-white border border-gray-200">
    <h2 className="accordion-header mb-0" id="headingThree">
      <button className="
        accordion-button
        collapsed
        relative
        flex
        items-center
        w-full
        py-4
        px-5
        text-base text-gray-800 text-left
        bg-white
        border-0
        rounded-none
        transition
        focus:outline-none
      " type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false"
        aria-controls="collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree"
      data-bs-parent="#accordionExample">
      <div className="accordion-body py-4 px-5">
        <strong>This is the third item's accordion body.</strong> It is hidden by default,
        until the collapse plugin adds the appropriate classes that we use to style each
        element. These classes control the overall appearance, as well as the showing and
        hiding via CSS transitions. You can modify any of this with custom CSS or overriding
        our default variables. It's also worth noting that just about any HTML can go within
        the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
</div>














      <h1>Video to text</h1>
      <p>FastAPI backend running on http://localhost:8000, provides option to download audio from youtube video and process it into text files</p>
      <p>eventually, there can be additional endpoints that take the whisper generated file and will slice it in memory,
        contact chat GPT to make translations on the fly and make summary of the text.
        So we have one big file with the text (15 minutes worth of video), chop it to blocks that chatGPT can handle. And process it accordingly.
      </p>


      <div>
        <DownloadAudio />
        <TranscribeAudio />
        <SplitFile />
        <ProcessSplitFiles workType="translation" />
        <ProcessSplitFiles workType="vocabulary" />
        <ProcessSplitFiles workType="grammar" />
        <ProcessSplitFiles workType="summary" />
      </div>

      <div className="card-container">
        <div>
          <Form prefix="" filename_prop="01一生のお願い教科書にない日本語9N_A7KEiXhg.mp3.txt" onFormSubmit={handleFormSubmit_1} />
          <Form prefix="translation" filename_prop="01一生のお願い教科書にない日本語9N_A7KEiXhg.mp3.txt" onFormSubmit={handleFormSubmit_2} />
          <Navigation prefix="original" filename={formValue1_1} chunkNum={Number(formValue2_1)} chunkSize={Number(formValue3_1)} setFilename={setFormValue1_1} setChunkNum={setFormValue2_1} setChunkSize={setFormValue3_1} />
          <Navigation prefix="translation" filename={formValue1_2} chunkNum={Number(formValue2_2)} chunkSize={Number(formValue3_2)} setFilename={setFormValue1_2} setChunkNum={setFormValue2_2} setChunkSize={setFormValue3_2} />
        </div>
        <FullTextCard prefix="youtube" filename={formValue1_1} />
        <ListFiles type="audio" />
        <ListFiles type="text" />
      </div>

      <div className="card-container">
        <Card prefix="" filename={formValue1_1} chunkNum={Number(formValue2_1)} chunkSize={Number(formValue3_1)} />
        <Card prefix="translation" filename={formValue1_2} chunkNum={Number(formValue2_2)} chunkSize={Number(formValue3_2)} />
        <div className="info-card-container">
          <FullTextCard prefix="vocab" filename={formValue1_1} />
          <FullTextCard prefix="grammar" filename={formValue1_1} />
          <FullTextCard prefix="summary" filename={formValue1_1} />
        </div>
      </div>

    </div>
  );
}

export default App;





