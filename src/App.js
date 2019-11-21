/* eslint-disable import/first */
/* eslint-disable no-unused-vars */

import React from 'react';

import Index from "./components/index";
// import {  } from "./components/index";
import CSV from "./components/csv/csvUpload";

function App() {
  return (
    <div className="ui container" style={{marginTop:50}}>
      <h2 className="ui header huge">
        <i className="dna icon"></i>
        <div className="content" >
         Detection Algorithm
        </div>
      </h2>
    <div className="ui placeholder container "> 
      <div className="ui   segment">
        <div className="ui two column very relaxed stackable  centered grid" >
          <div className="column" >
            <Index />
              </div>
              <div className="ui middle aligned  centered column" >

              <CSV />

              </div>
            </div>
            <div className="ui vertical divider">
              Or
  </div>
          </div>






          
      </div></div>
  );
}

export default App;



