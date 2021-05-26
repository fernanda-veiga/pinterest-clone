import React from "react";
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
  function handleInputChange(event) {
    props.setSearchTerm(event.target.value);
  }

  function callFetchFunction(event) {
    event.preventDefault();
    props.fetchImagesOnSearch(props.searchTerm);
  }

  function callFetchFunctionOnEnter(event) {
    if (event.key === "Enter") {
      callFetchFunction(event);
    }
  }

  return (
    <div className="search-box-container">
      <label className="search-box">
        <button className="search-button" onClick={callFetchFunction}>
          <img className="search-icon" src={search} alt="" />
        </button>
        <input
          onChange={handleInputChange}
          onKeyDown={callFetchFunctionOnEnter}
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
      <SearchBox
        fetchImagesOnSearch={props.fetchImagesOnSearch}
        searchTerm={props.searchTerm}
        setSearchTerm={props.setSearchTerm}
      />
      <User />
    </header>
  );
}

export default Header;
