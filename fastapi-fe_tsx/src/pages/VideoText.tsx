// App.js
import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./VideoText.css";

// import Form from '../components/Form';
// import Card from '../components/Card';
// import FullTextCard from '../components/FullTextCard';
// import ListFiles from '../components/ListFiles';
// import Navigation from '../components/Navigation';
// import DownloadAudio from '../components/DownloadAudio';
// import TranscribeAudio from '../components/video/TranscribeAudio';
// import SplitFile from '../components/SplitFile';
// import ProcessSplitFiles from '../components/ProcessSplitFiles';
import { Form, Card, FullTextCard, ListFiles, Navigation, DownloadAudio, TranscribeAudio, SplitFile, ProcessSplitFiles } from "../components";




function VideoText() {
  const [formValue1_1, setFormValue1_1] = useState('default');
  const [formValue2_1, setFormValue2_1] = useState(-1);
  const [formValue3_1, setFormValue3_1] = useState(-1);

  const [formValue1_2, setFormValue1_2] = useState('default');
  const [formValue2_2, setFormValue2_2] = useState(-1);
  const [formValue3_2, setFormValue3_2] = useState(-1);



  const handleFormSubmit_1 = (value1: any, value2: any, value3: any) => {
    setFormValue1_1(value1);
    setFormValue2_1(value2);
    setFormValue3_1(value3);
  };

  const handleFormSubmit_2 = (value1: any, value2: any, value3: any) => {
    setFormValue1_2(value1);
    setFormValue2_2(value2);
    setFormValue3_2(value3);
  };


  return (
    <div className="App">


      {/* <div>
      <ul className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4" id="tabs-tab"
        role="tablist">
        <li className="nav-item" role="presentation">
          <a href="#tabs-home" className="nav-link block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent active"
            id="tabs-home-tab" data-bs-toggle="pill" data-bs-target="#tabs-home" role="tab" aria-controls="tabs-home"
            aria-selected="true">Original</a>
        </li>
        <li className="nav-item" role="presentation">
          <a href="#tabs-profile" className="nav-link block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent"
            id="tabs-profile-tab" data-bs-toggle="pill" data-bs-target="#tabs-profile" role="tab"
            aria-controls="tabs-profile" aria-selected="false">Translation</a>
        </li>
      </ul>
      <div className="tab-content" id="tabs-tabContent">
        <div className="tab-pane fade show active" id="tabs-home" role="tabpanel" aria-labelledby="tabs-home-tab">
          Tab 1 content
          <Card prefix="" filename={formValue1_1} chunkNum={Number(formValue2_1)} chunkSize={Number(formValue3_1)} />
        </div>
        <div className="tab-pane fade" id="tabs-profile" role="tabpanel" aria-labelledby="tabs-profile-tab">
          Tab 2 content
          <Card prefix="translation" filename={formValue1_2} chunkNum={Number(formValue2_2)} chunkSize={Number(formValue3_2)} />
        </div>
      </div>
</div> */}






      <h1 className="text-lg text-blue-900">Video to text</h1>
      <br></br>
      <p>
        FastAPI backend running on http://localhost:8000, provides option to download audio from youtube video and process it into text files.
      </p>
      <small>
        Eventually, there can be additional endpoints that take the whisper generated file and will slice it in memory,
        contact chat GPT to make translations on the fly and make summary of the text.
        So we have one big file with the text (15 minutes worth of video), chop it to blocks that chatGPT can handle. And process it accordingly.
      </small>

      <div>


        <div className="flex">





          <div className="w-1/4 p-4">
            <DownloadAudio />
          </div>
          <div className="w-1/4 p-4">
            <TranscribeAudio />
          </div>
          <div className="w-1/4 p-4">
            <SplitFile />
          </div>
          <div className="w-1/4 p-4">
            optional placeholder
          </div>



        </div>

        <div className="flex flex-wrap">
          <br></br>
          <h1 className="text-lg text-blue-900">Process split files</h1>
          <p className="font-mono text-xs text-gray">
            insert name of parent file output.txt and it will translate all files called
            output_0.txt, output_1.txt, output_2.txt, ...
            it will call them
            translation_output_0.txt, translation_output_1.txt, translation_output_2.txt, ...
            then these files are joined into one big translation file called
            translation_output.txt
          </p>
          <br></br>

          <div className="w-1/4 p-4">
            <ProcessSplitFiles workType="translation" />
          </div>
          <div className="w-1/4 p-4">
            <ProcessSplitFiles workType="vocabulary" />
          </div>
          <div className="w-1/4 p-4">
            <ProcessSplitFiles workType="grammar" />
          </div>
          <div className="w-1/4 p-4">
            <ProcessSplitFiles workType="summary" />
          </div>
        </div>



      </div>

      <div className="flex">

        <Form prefix="" filename_prop="01一生のお願い教科書にない日本語9N_A7KEiXhg.mp3.txt" onFormSubmit={handleFormSubmit_1} />
        <Form prefix="translation" filename_prop="01一生のお願い教科書にない日本語9N_A7KEiXhg.mp3.txt" onFormSubmit={handleFormSubmit_2} />
        <Navigation prefix="original" filename={formValue1_1} chunkNum={Number(formValue2_1)} chunkSize={Number(formValue3_1)} setFilename={setFormValue1_1} setChunkNum={setFormValue2_1} setChunkSize={setFormValue3_1} />
        <Navigation prefix="translation" filename={formValue1_2} chunkNum={Number(formValue2_2)} chunkSize={Number(formValue3_2)} setFilename={setFormValue1_2} setChunkNum={setFormValue2_2} setChunkSize={setFormValue3_2} />


        {/* <FullTextCard prefix="youtube" filename={formValue1_1} />
        <ListFiles type="audio" />
        <ListFiles type="text" /> */}
      </div>







      {/*   
      <div className="card-container">
        <Card prefix="" filename={formValue1_1} chunkNum={Number(formValue2_1)} chunkSize={Number(formValue3_1)} />
        <Card prefix="translation" filename={formValue1_2} chunkNum={Number(formValue2_2)} chunkSize={Number(formValue3_2)} /> 
*/}

      <div className="flex">
        <div className="w-2/4 p-4">


          <div className="flex items-start">
            <ul className="nav nav-tabs flex flex-col flex-wrap list-none border-b-0 pl-0 mr-4" id="tabs-tabVertical"
              role="tablist">
              <li className="nav-item flex-grow text-center" role="presentation">
                <a href="#tabs-homeVertical" className="nav-link block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent active"
                  id="tabs-home-tabVertical" data-bs-toggle="pill" data-bs-target="#tabs-homeVertical" role="tab"
                  aria-controls="tabs-homeVertical" aria-selected="true">Original</a>
              </li>
              <li className="nav-item flex-grow text-center" role="presentation">
                <a href="#tabs-profileVertical" className="nav-link block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent"
                  id="tabs-profile-tabVertical" data-bs-toggle="pill" data-bs-target="#tabs-profileVertical" role="tab"
                  aria-controls="tabs-profileVertical" aria-selected="false">Translation</a>
              </li>
              <li className="nav-item flex-grow text-center" role="presentation">
                <a href="#tabs-messagesVertical" className="nav-link block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent"
                  id="tabs-messages-tabVertical" data-bs-toggle="pill" data-bs-target="#tabs-messagesVertical" role="tab"
                  aria-controls="tabs-messagesVertical" aria-selected="false">Other</a>
              </li>
            </ul>
            <div className="tab-content" id="tabs-tabContentVertical">
              <div className="tab-pane fade show active" id="tabs-homeVertical" role="tabpanel"
                aria-labelledby="tabs-home-tabVertical">
                Tab 1 content vertical
                <Card prefix="" filename={formValue1_1} chunkNum={Number(formValue2_1)} chunkSize={Number(formValue3_1)} />
              </div>
              <div className="tab-pane fade" id="tabs-profileVertical" role="tabpanel" aria-labelledby="tabs-profile-tabVertical">
                Tab 2 content vertical
                <Card prefix="translation" filename={formValue1_2} chunkNum={Number(formValue2_2)} chunkSize={Number(formValue3_2)} />
              </div>
              <div className="tab-pane fade" id="tabs-messagesVertical" role="tabpanel"
                aria-labelledby="tabs-profile-tabVertical">
                Tab 3 content vertical
              </div>
            </div>
          </div>

















        </div>


        {/*<div className="info-card-container">  */}
        <div className="w-1/4 p-4">


          <ul className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4" id="tabs-tab"
            role="tablist">
            <li className="nav-item" role="presentation">
              <a href="#tabs-home" className="nav-link block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent active"
                id="tabs-home-tab" data-bs-toggle="pill" data-bs-target="#tabs-home" role="tab" aria-controls="tabs-home"
                aria-selected="true">Vocab</a>
            </li>
            <li className="nav-item" role="presentation">
              <a href="#tabs-profile" className="nav-link block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent"
                id="tabs-profile-tab" data-bs-toggle="pill" data-bs-target="#tabs-profile" role="tab"
                aria-controls="tabs-profile" aria-selected="false">Grammar</a>
            </li>
            <li className="nav-item" role="presentation">
              <a href="#tabs-messages" className="nav-link block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent"
                id="tabs-messages-tab" data-bs-toggle="pill" data-bs-target="#tabs-messages" role="tab"
                aria-controls="tabs-messages" aria-selected="false">Summary</a>
            </li>
          </ul>
          <div className="tab-content" id="tabs-tabContent">
            <div className="tab-pane fade show active" id="tabs-home" role="tabpanel" aria-labelledby="tabs-home-tab">
              Tab 1 content
              <FullTextCard prefix="vocab" filename={formValue1_1} />
            </div>
            <div className="tab-pane fade" id="tabs-profile" role="tabpanel" aria-labelledby="tabs-profile-tab">
              Tab 2 content
              <FullTextCard prefix="grammar" filename={formValue1_1} />
            </div>
            <div className="tab-pane fade" id="tabs-messages" role="tabpanel" aria-labelledby="tabs-profile-tab">
              Tab 3 content
              <FullTextCard prefix="summary" filename={formValue1_1} />
            </div>
          </div>


          {/* 
          <FullTextCard prefix="vocab" filename={formValue1_1} />
          <FullTextCard prefix="grammar" filename={formValue1_1} />
          <FullTextCard prefix="summary" filename={formValue1_1} /> 
          */}
        </div>






        <div className="w-1/4 p-4">
          <ul className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4" id="tabs-tab3"
            role="tablist">
            <li className="nav-item" role="presentation">
              <a href="#tabs-home3" className="nav-link w-full block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent active"
                id="tabs-home-tab3" data-bs-toggle="pill" data-bs-target="#tabs-home3" role="tab" aria-controls="tabs-home3"
                aria-selected="true">YouTube</a>
            </li>
            <li className="nav-item" role="presentation">
              <a href="#tabs-profile3" className="nav-link w-full block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent"
                id="tabs-profile-tab3" data-bs-toggle="pill" data-bs-target="#tabs-profile3" role="tab"
                aria-controls="tabs-profile3" aria-selected="false">.mp3</a>
            </li>
            <li className="nav-item" role="presentation">
              <a href="#tabs-messages3" className="nav-link w-full block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent"
                id="tabs-messages-tab3" data-bs-toggle="pill" data-bs-target="#tabs-messages3" role="tab"
                aria-controls="tabs-messages3" aria-selected="false">.txt</a>
            </li>
          </ul>
          <div className="tab-content" id="tabs-tabContent3">
            <div className="tab-pane fade show active" id="tabs-home3" role="tabpanel" aria-labelledby="tabs-home-tab3">
              Tab 1 content button version
              <FullTextCard prefix="youtube" filename={formValue1_1} />
            </div>
            <div className="tab-pane fade" id="tabs-profile3" role="tabpanel" aria-labelledby="tabs-profile-tab3">
              Tab 2 content button version
              <ListFiles type="audio" />
            </div>
            <div className="tab-pane fade" id="tabs-messages3" role="tabpanel" aria-labelledby="tabs-profile-tab3">
              Tab 3 content button version
              <ListFiles type="text" />
            </div>
          </div>
        </div>

      </div>




















      <div className="flex">
        <div className="w-3/4 p-4">
          This div will take up 3/4 of the space.
        </div>
        <div className="w-1/4 p-4">
          This div will take up 1/4 of the space.
        </div>
      </div>


      <div className="flex">
        <div className="w-1/2 p-4">
          This div will take up 50% of the space.
        </div>
        <div className="w-1/4 p-4">
          This div will take up 25% of the space.
        </div>
        <div className="w-1/4 p-4">
          This div will take up 25% of the space.
        </div>
      </div>





    </div>
  );
}

export default VideoText;





