import React, { useState, useEffect } from 'react';
import gridView from '../../icons/grid_view.svg';
import listView from '../../icons/list_view.svg';

function ViewButtons() {
  const view = document.getElementById('view');
  const users = document.getElementsByClassName('user');
  const [clientWidth, setClientWidth] = useState(0);

  useEffect(() => {
    setClientWidth(document.documentElement.clientWidth);
  }, []);

  // changes view for the user when going back from user page
  useEffect(() => {
    if (users.length > 0) {
      if (users[0].classList.contains('user-page-view')) {
        for (let i = 0; i < users.length; i += 1) {
          users[i].classList.remove('user-page-view');
          users[i].classList.add('user-list-view');
        }
      }
    }
  }, []);

  const changeToListView = () => {
    if (view) {
      view.classList.remove('grid');
      view.classList.add('list');
    }
    if (users) {
      for (let i = 0; i < users.length; i += 1) {
        users[i].classList.remove('user-grid-view');
        users[i].classList.add('user-list-view');
      }
    }
  };

  const changeToGridView = () => {
    if (view) {
      view.classList.remove('list');
      view.classList.add('grid');
    }
    if (users) {
      for (let i = 0; i < users.length; i += 1) {
        users[i].classList.remove('user-list-view');
        users[i].classList.add('user-grid-view');
      }
    }
  };
  return (
    <>
      {clientWidth > 600
        ? (
          <div className="view-buttons">
            <button className="list-view animate-button" type="button" onClick={changeToListView}><img src={listView} alt="list view" /></button>
            <button className="grid-view animate-button" type="button" onClick={changeToGridView}><img src={gridView} alt="grid view" /></button>
          </div>
        )
        : (<></>)}
    </>
  );
}

export default ViewButtons;
