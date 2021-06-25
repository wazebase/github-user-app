/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import './repo.scss';

interface IRepo {
    url:string;
    name: string;
}
function Repo({ url, name }:IRepo) {
  return (
    <div>
      <li><a href={url} target="_blank" rel="noreferrer">{name}</a></li>
    </div>
  );
}

export default Repo;
