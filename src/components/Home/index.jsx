import React from 'react';

import * as packageJSON from '!json!../../../package.json';

const home = (props)=>{
  return (<div>
    <div>{packageJSON.name}</div>
    <p>{packageJSON.description}</p>
    <p>{packageJSON.license}</p>
    <p>{packageJSON.author}</p>
    <div>
    {JSON.stringify(packageJSON.dependencies)}
    </div>

    <div>
    {JSON.stringify(packageJSON.devDependencies)}
    </div>

  </div>);
};

module.exports = home;
