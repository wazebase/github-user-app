import React from 'react';
import { IOrganisation } from '../../interfaces/IOrganisation';

import './organisation.scss';

function Organisation({ login, avatar }:IOrganisation) {
  return (
    <div className="org">
      <img src={avatar} alt={`organisation ${login} avatar`} />
      <li><a href={`https://github.com/${login}`} target="_blank" rel="noreferrer">{login}</a></li>
    </div>
  );
}

export default Organisation;
