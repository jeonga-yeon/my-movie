import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchThunk, sortSearch } from "../redux/modules/searchSlice";

const Nav = styled.div`
  background-color: #141414;
  padding: 30px;
  display: grid;
  grid-template-columns: 13% 1fr 20%;
  .logo {
    font-size: 35px;
    font-weight: 600;
    color: red;
  }
  ul {
    display: flex;
    align-items: center;
    li {
      color: white;
      margin-left: 10px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .search {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    input {
      height: 27px;
      width: 180px;
      border: 2px solid white;
      border-radius: 5px;
      padding-left: 10px;
      outline: none;
    }
    button {
      margin-left: 5px;
      height: 35px;
      width: 35px;
      border: 2px solid red;
      background-color: #141414;
      border-radius: 5px;
      .search-icon {
        color: red;
      }
      &:hover {
        cursor: pointer;
        background-color: red;
        .search-icon {
          color: white;
        }
      }
    }
  }
`;

const Navigation = () => {
  const { searchMovie } = useSelector((state) => state.search);
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      if (keyword === "") {
        return;
      } else {
        dispatch(getSearchThunk(keyword));
        dispatch(sortSearch(searchMovie));
        navigate(`/search?q=${keyword}`);
      }
    }
  };
  return (
    <Nav>
      <Link to="/" className="logo">
        My Movie
      </Link>
      <ul>
        <li onClick={() => navigate("/movies")}>Movies</li>
        <li onClick={() => navigate("/tvshows")}>TV Shows</li>
      </ul>
      <div className="search">
        <input
          type="text"
          placeholder="Search"
          onKeyPress={handleSearch}
          onChange={(event) => setKeyword(event.target.value)}
        />
        <button>
          <FontAwesomeIcon className="search-icon" icon={faSearch} />
        </button>
      </div>
    </Nav>
  );
};

export default Navigation;
