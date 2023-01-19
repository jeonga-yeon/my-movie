/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUsers } from "@fortawesome/free-solid-svg-icons";
import { getTvDetailThunk } from "../redux/modules/tvDetailSlice";

const Loading = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  .spinner {
    margin-top: 200px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
  margin-bottom: 100px;
`;

const Poster = styled.div`
  margin: 0px 15px;
  img {
    width: 540px;
  }
`;

const Detail = styled.div`
  width: 540px;
  height: 750px;
  margin: 0px 15px;
  padding-left: 30px;
  .genres {
    display: flex;
    flex-wrap: wrap;
    .genre__wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #dc143d;
      margin-right: 15px;
      margin-bottom: 5px;
      padding: 5px 10px;
      border-radius: 20px;
      .genre {
        font-size: 20px;
        padding-bottom: 5px;
      }
    }
  }
  h1 {
    margin-top: 20px;
    font-size: 70px;
  }
  .tagline {
    margin-top: 25px;
    font-size: 25px;
  }
  .vote {
    margin-top: 25px;
    display: flex;
    font-size: 20px;
    .vote-average,
    .popularity {
      margin-right: 30px;
    }
    .icon__average,
    .icon__popularity {
      margin-right: 5px;
    }
    .icon__average {
      color: yellow;
    }
    .icon__popularity {
      color: #788899;
    }
    .adult {
      color: black;
      font-weight: 600;
      height: 24px;
      width: 24px;
      padding-right: 2px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 10px;
      background-color: red;
      border-radius: 10%;
    }
  }
  .overview {
    margin: 20px 0px;
    padding: 30px 0px;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    line-height: 30px;
  }
  .detail {
    border-bottom: 1px solid white;
    padding: 15px 0px;
    padding-bottom: 25px;
    ul {
      li {
        margin-bottom: 10px;
        .detail-component {
          display: inline-block;
          text-align: center;
          width: 120px;
          padding: 3px 0px;
          padding-bottom: 7px;
          border-radius: 10px;
          background-color: #dc143d;
          margin-right: 10px;
        }
      }
    }
  }
`;

const TvShowDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { tvDetail, loading } = useSelector((state) => state.tvShow);
  useEffect(() => {
    dispatch(getTvDetailThunk(id));
  }, []);
  if (loading)
    return (
      <Loading>
        <ClipLoader
          className="spinner"
          color="white"
          loading={loading}
          size={150}
        />
      </Loading>
    );
  return (
    <Wrapper>
      <Poster>
        <img
          src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${tvDetail.poster_path}`}
        />
      </Poster>
      <Detail>
        <div className="genres">
          {tvDetail.genres.map((genre, index) => (
            <div className="genre__wrap" key={index}>
              <span className="genre">{genre.name}</span>
            </div>
          ))}
        </div>
        <h1>{tvDetail.name}</h1>
        <div className="tagline">{tvDetail.tagline}</div>
        <div className="vote">
          <div className="vote-average">
            <FontAwesomeIcon icon={faStar} className="icon__average" />
            {tvDetail.vote_average}
          </div>
          <div className="popularity">
            <FontAwesomeIcon icon={faUsers} className="icon__popularity" />
            {tvDetail.popularity}
          </div>
          {tvDetail.adult ? (
            <div className="adult">
              <span>18</span>
            </div>
          ) : null}
        </div>
        <div className="overview">
          <p>{tvDetail.overview}</p>
        </div>
        <div className="detail">
          <ul>
            <li>
              <span className="detail-component">Episodes</span>
              <span>{tvDetail.number_of_episodes}</span>
            </li>
            <li>
              <span className="detail-component">Seasons</span>
              <span>{tvDetail.number_of_seasons}</span>
            </li>
            <li>
              <span className="detail-component">First Air Date</span>
              <span>{tvDetail.first_air_date}</span>
            </li>
          </ul>
        </div>
      </Detail>
    </Wrapper>
  );
};

export default TvShowDetail;
