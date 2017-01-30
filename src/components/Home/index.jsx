import React from 'react';

import * as packageJSON from '../../../package.json';

const home = ()=>{
  return (<div>
    <div>{packageJSON.name}</div>
    <p>{packageJSON.description}</p>

  </div>);
};

module.exports = home;
