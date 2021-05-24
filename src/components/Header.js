import React, { useState } from "react";
import logo from "../assets/logo.png";
import search from "../assets/search.svg";
import user from "../assets/user.svg";

function Logo() {
  return (
    <div className="logo-container">
      <img className="logo" src={logo} alt="Pin It Logo" />
    </div>
  );
}

function SearchBox(props) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleInputChange(event) {
    setSearchTerm(event.target.value);
  }

  function resetInput() {
    setSearchTerm("");
  }

  function callFetchFunction(event) {
    event.preventDefault();
    props.fetchImages(searchTerm);
    resetInput();
  }

  return (
    <div className="search-box-container">
      <label className="search-box">
        <button className="search-button" onClick={callFetchFunction}>
          <img className="search-icon" src={search} alt="" />
        </button>
        <input
          onChange={handleInputChange}
          className="search-input"
          type="text"
          placeholder="Search"
        />
      </label>
    </div>
  );
}

function User() {
  return (
    <div className="user-container">
      <div className="user">
        <img className="user-icon" src={user} alt="" />
      </div>
    </div>
  );
}

function Header(props) {
  return (
    <header className="Header">
      <Logo />
      <SearchBox fetchImages={props.fetchImages} />
      <User />
    </header>
  );
}

export default Header;
