import React from 'react';

import * as packageJSON from '../../../package.json';

const about = () => {
  return (<div>
    <h1>{packageJSON.name} <small>by {packageJSON.author}</small></h1>
    <p>Source: <a href={packageJSON.repository}>{packageJSON.repository}</a></p>
    <p>License: {packageJSON.license}</p>

    <p>{packageJSON.description}</p>

    <hr/>

      <div>

        <h4>Scripts</h4>
        <ul style={{listStyle:'none', paddingLeft: 5}}>
          {(Object.keys(packageJSON.scripts)).map((key, index)=>{
            return <li key={index} style={{marginBottom: 8}}>
              <code>{key}</code> : {packageJSON.scripts[key]}
            </li>;
          })}
        </ul>
      </div>
      <hr/>

    <div>

      <div style={{display:'inline-block', verticalAlign:'top', marginRight: '5%', marginLeft: '5%'}}>
        <h4>Runtime Dependencies</h4>
        <ul style={{listStyle:'none', paddingLeft: 5}}>
          {(Object.keys(packageJSON.dependencies)).map((key, index)=>{
            return <li key={index} style={{marginBottom: 8}}>
              <a href='https://www.npmjs.com/package/'>{key}</a> ({packageJSON.dependencies[key]})
              </li>;
          })}
        </ul>
      </div>

      <div style={{display:'inline-block', verticalAlign:'top', marginRight: '5%', marginLeft: '5%'}}>
        <h4>Build Depedencies</h4>
          <ul style={{listStyle:'none', paddingLeft: 5}}>
            {(Object.keys(packageJSON.devDependencies)).map((key, index)=>{
              return <li key={index} style={{marginBottom: 8}}>
                <a href='https://www.npmjs.com/package/'>{key}</a> ({packageJSON.devDependencies[key]})
                </li>;
            })}
          </ul>
      </div>

    </div>

  </div>);
};

export default about;
