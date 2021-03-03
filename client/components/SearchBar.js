import React, { useReducer, useState, useContext } from 'react';
import { initialHomeState, homeReducer } from '../state/reducers';
import { HomeContext } from '../state/contexts';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';

// on form submit:
// send a GET request to '/politicians/' with the user-entered address concatenated on

const SearchBar = () => {
 const { homeDispatch } = useContext(HomeContext);
  const [address, setAddress] = useState('');

  const onChange = (e) => {
    console.log('Changing state... New value:', e.target.value);
    setAddress(e.target.value);
  }

  const onSubmit = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault(); // prevent page refesh
    }
    console.log('Form state:', address);
    // don't submit an empty string
    if (!address) return;

    fetch('/politicians/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address,
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log('Data from POST to /politicians:', data);
      homeDispatch({
        type: 'OPEN_SEARCH_RESULTS',
        payload: data
       })
    })
    .catch(err => console.error('ERROR getting politicians:', err));
  }

  return (
    <div className="searchBarContainer">
      <div className="formContainer">
        <form className="form"
        onSubmit={onSubmit}>
          <label>Find your representatives:
            <input className="formField"
            type="text"
            id="search"
            placeholder="Home address..."
            onChange={onChange} />
          </label>
          <button className="searchSubmit" onClick={onSubmit}>Search</button>
        </form>
      </div>
    </div>
  )
}

export default SearchBar;