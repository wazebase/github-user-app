import React from 'react';
import { IRepo } from '../../interfaces/IRepo';
import './repo.scss';

function Repo({ url, name }:IRepo) {
  return (
    <div>
      <li><a href={url} target="_blank" rel="noreferrer">{name}</a></li>
    </div>
  );
}

export default Repo;
