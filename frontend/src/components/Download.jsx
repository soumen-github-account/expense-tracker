import React, { useEffect, useState } from 'react';
import './AppDownload.css';
import app_store from '../assets/app_store.png';
import play_store from '../assets/play_store.png';

const Download = () => {

  return (
    <div className="app-download" id="app-download">
      <p>For a Better Experience<br />Install Our App</p>

      <div className="app-download-platforms">
        <img src={play_store} alt="Play Store" />
        <img src={app_store} alt="App Store" />
      </div>
        <button className="install-btn">
          Install Now
        </button>
    </div>
  );
};

export default Download;
