import React, { useState } from 'react';
import './App.css';
import {Editor, Viewer } from './Canvas.js';

const deploy = file => {
  //
}

function App() {
  const [code, setCode] = useState('');
  return (
    <div className="flex flex-column w-100 h-100">
      <div className="flex flex-row w-100 h-75">
        <Editor
            changeHandler={setCode}
            code={code}
        />
        <Viewer raw={code}/>
      </div>
        <a
          role="button"
          className="deploy flex f1 w-100 h-25 pointer justify-center items-center "
          tabIndex={0}
          onClick={() => deploy(code)}
          onKeyUp={() => deploy(code)}
        >
          DEPLOY
        </a>
    </div>
  );
}

export default App;
