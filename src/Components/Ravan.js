import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddData, AddName } from './Action';

import './Ravan.css';

const Ravan = () => {
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const userdata = useSelector((state) => state.name);
  const dispatch = useDispatch();
  const [gender, setGender] = useState('All');
  const [domain, setDomain] = useState('All');
  const [available, setAvailable] = useState('All');
  const [userlenght, setUserlength] = useState(1);

  const search = userdata.filter((user) => user.first_name.includes(name));

  //const search1 = new Set([...userdata.map((user, index)=>user.gender)]);

  const genderSelecter = () => {
    return [...new Set(userdata.map((user) => user.gender))];
  };

  const domainSelecter = () => {
    return [...new Set(userdata.map((user) => user.domain))];
  };

  const availableSelecter = () => {
    return [...new Set(userdata.map((user) => user.available))];
  };

  /*
    .filter((user)=>user.gender=="Male")
    .filter((user)=>user.domain == "Finance")
    .filter((user)=>user.available == true)
    console.log(search)*/

  const add = (e) => {
    e.preventDefault();
    dispatch(AddName(search));
    setName(' ');
  };

  const handleGender = (e) => {
    setGender(e.target.value);
  };

  const handleDomain = (e) => {
    setDomain(e.target.value);
  };

  const handleAvailable = (e) => {
    setAvailable(e.target.value);
  };
  const selectedpagehandle = (selectedpage) => {
    if (
      selectedpage >= 1 &&
      selectedpage <= userdata.length / 20 &&
      selectedpage !== page
    ) {
      setPage(selectedpage);
    }
  };
  const clearfilter = () => {
    setAvailable('All');
    setDomain('All');
    setGender('All');
    setName('');
    setPage(1);
  };
  const apna = (user) => {
    console.log(user);
    return user;
  };

  return (
    <div>
      <div className="filter">
        <div className="title">Filter</div>
        <input
          type="text"
          placeholder=" Search "
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <div className="filter1">
          <label> Gender</label>
          <select value={gender} onChange={handleGender}>
            <option value="All">All</option>
            {genderSelecter().map((gender1) => {
              return (
                <option value={gender1} key={gender1}>
                  {gender1}
                </option>
              );
            })}
          </select>
        </div>
        <div className="filter1">
          <label> Domain </label>
          <select value={domain} onChange={handleDomain}>
            <option value="All">All</option>
            {domainSelecter().map((domain1) => {
              return (
                <option value={domain1} key={domain1}>
                  {domain1}
                </option>
              );
            })}
          </select>
        </div>
        <div className="filter1">
          <label> Availablity</label>
          <select value={available} onChange={handleAvailable}>
            <option value="All">All</option>
            {availableSelecter().map((available1) => {
              return (
                <option value={available1} key={available1}>
                  {available1}
                </option>
              );
            })}
          </select>
        </div>
        <div className="filter1">
          <button onClick={clearfilter}> Clear filter</button>
        </div>
      </div>

      <div className="table1">
        <hr />

        {userdata
          .filter((user) =>
            user.first_name.toLowerCase().startsWith(name.toLowerCase())
          )
          .filter((user) => (gender === 'All' ? user : user.gender === gender))
          .filter((user) => (domain === 'All' ? user : user.domain === domain))
          .filter((user) =>
            available === 'All' ? user : user.available === available
          )

          .slice(page * 20 - 20, page * 20)
          .map((data, index) => {
            return (
              <ul className="card" key={index}>
                <div className="image">
                  <li className="avatar">
                    <img src={data.avatar} alt="loading" />
                  </li>
                </div>
                <div className="info">
                  <li className="id">{data.id}</li>
                  <div className="fl">
                    <li className="firstname">{data.first_name}</li>
                    <li className="lastname">{data.last_name}</li>
                  </div>
                  <li className="gender">{data.gender}</li>
                  <li className="domain">{data.domain}</li>
                  <li className="available">{data.available}</li>
                </div>
              </ul>
            );
          })}

        {userdata.length > 0 && (
          <div className="pagnation">
            <div
              className="arrow"
              onClick={() => {
                selectedpagehandle(page - 1);
              }}
            >
              {'<'}
            </div>

            <div className="pagenumber">
              <li>{page}</li>
            </div>
            <div
              className="arrow"
              onClick={() => {
                selectedpagehandle(page + 1);
              }}
            >
              {'>'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ravan;
