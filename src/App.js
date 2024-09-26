import React, { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';
import './index.css';
import display from './photos/Display.svg';
import down from './photos/down.svg';
import {api_url} from './constant.js';

function App() {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [groupBy, setGroupBy] = useState('status');
  const [sortBy, setSortBy] = useState('priority');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(api_url)
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.tickets);
        setUsers(data.users);
      });
  }, []);

  const toggleDropDown = () => {
    setDropDownOpen((prev) => !prev);
  }
  const handleGroupByChange = (e) => {
    setGroupBy(e.target.value);
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="App">
      <div className="header">
        <div className="dropdown">
          <button onClick={toggleDropDown} className="dropbutton">
            <img src={display} alt="" />
            Display
            <img src={down} alt="" />
          </button>
        </div>
        {dropDownOpen &&
          <div className='dropdown-options'>
            <div className="first-dropdown">
            <label>Grouping: </label>
            <select onChange={handleGroupByChange} value={groupBy}>
              <option value="status">Status</option>
              <option value="userId">User</option>
              <option value="priority">Priority</option>
            </select>
            </div>
            <div className="first-dropdown">
            <label>Ordering: </label>
            <select onChange={handleSortByChange} value={sortBy}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
            </div>
          </div>
        }
      </div>


      <KanbanBoard tickets={tickets} groupBy={groupBy} sortBy={sortBy} users={users} />
    </div>
  );
}

export default App;
