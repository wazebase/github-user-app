/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import './organisation.scss';

interface IOrganisation {
    login:string;
    avatar:string;
}
function Organisation({ login, avatar }:IOrganisation) {
  return (
    <div className="org">
      <img src={avatar} alt={`organisation ${login} avatar`} />
      <li><a href={`https://github.com/${login}`} target="_blank" rel="noreferrer">{login}</a></li>
    </div>
  );
}

export default Organisation;
