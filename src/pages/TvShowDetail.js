/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faUsers,
  faFilm,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { getTvDetailThunk } from "../redux/modules/tvDetailSlice";
import TvCard from "../components/TvCard";
import YouTube from "react-youtube";
import Loading from "../components/Loading";

const Container = styled.div`
  .wrapper-bottom {
    flex-direction: column;
    align-items: center;
    .all-reviews,
    .all-related {
      margin-top: 30px;
    }
    .all-related {
      display: grid;
      justify-content: center;
      grid-template-columns: repeat(3, 300px);
      gap: 20px;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
  margin-bottom: 100px;
  .related {
    width: 1140px;
    margin: 0px 15px;
    display: flex;
    .reviews,
    .related-movies {
      background-color: #f0f0f0;
      color: #7f8c8d;
      padding: 20px 40px;
      &:hover {
        cursor: pointer;
      }
      &:focus {
        background-color: #fe4635;
        color: white;
      }
    }
    .reviews {
      margin-right: 30px;
    }
  }
  .all-reviews {
    line-height: 30px;
    width: 1140px;
    height: auto;
    padding: 40px;
    border: 3px solid white;
    box-sizing: border-box;
    .review__result {
      padding-bottom: 20px;
      margin-bottom: 20px;
      border-bottom: 1px solid white;
      .review__author {
        font-size: 20px;
      }
    }
    #last-review {
      border: none;
      padding-bottom: 0px;
      margin-bottom: 0px;
    }
  }
  .all-related {
    width: 1140px;
  }
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
  .trailer {
    display: flex;
    margin-top: 20px;
    font-size: 18px;
    &:hover {
      cursor: pointer;
    }
    .trailer__icon {
      color: #ff3838;
      margin-right: 5px;
    }
    .trailer__span {
      color: #ff3838;
    }
  }
  .trailer__wrapper {
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    .trailer__popup {
      position: fixed;
      top: 50%;
      margin-top: -20%;
      z-index: 1000;
      border: 1px solid #d1d8dd;
      .trailer__back {
        position: absolute;
        top: -5%;
        right: 0;
        font-size: 20px;
        &:hover {
          cursor: pointer;
          color: tomato;
        }
      }
    }
  }
`;

const TvShowDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { tvDetail, tvReviews, tvRecommendation, tvTrailer, loading } =
    useSelector((state) => state.tvShow);
  const [reviews, setReviews] = useState(true);
  const [trailer, setTrailer] = useState(false);
  const opts = {
    height: "585",
    width: "960",
    playerVars: {
      autoplay: 1,
    },
  };
  useEffect(() => {
    dispatch(getTvDetailThunk(id));
  }, [id]);
  if (loading) return <Loading loading={loading} />;
  return (
    <Container>
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
          {tvTrailer.results.length !== 0 ? (
            <div className="trailer" onClick={() => setTrailer(true)}>
              <FontAwesomeIcon icon={faFilm} className="trailer__icon" />
              <span className="trailer__span">Watch Trailer</span>
            </div>
          ) : null}

          {trailer ? (
            <div className="trailer__wrapper">
              <div className="trailer__popup">
                <YouTube videoId={tvTrailer.results[0].key} opts={opts} />
                <FontAwesomeIcon
                  icon={faTimes}
                  className="trailer__back"
                  onClick={() => setTrailer(false)}
                />
              </div>
            </div>
          ) : null}
        </Detail>
      </Wrapper>
      <Wrapper className="wrapper-bottom">
        <div className="related">
          <button
            className="reviews"
            onClick={() => setReviews(true)}
            style={{
              backgroundColor: reviews ? "#fe4635" : "#f0f0f0",
              color: reviews ? "white" : "#7f8c8d",
            }}
          >
            REVIEWS ({tvReviews.results.length})
          </button>
          <button
            className="related-movies"
            onClick={() => setReviews(false)}
            style={{
              backgroundColor: reviews ? "#f0f0f0" : "#fe4635",
              color: reviews ? "#7f8c8d" : "white",
            }}
          >
            RELATED MOVIES ({tvRecommendation.results.length})
          </button>
        </div>
        {reviews ? (
          <div className="all-reviews">
            {tvReviews.results.map((review, index) => (
              <div
                key={index}
                className="review__result"
                id={index === tvReviews.results.length - 1 ? "last-review" : ""}
              >
                <div className="review__author">{review.author}</div>
                <p className="review__content">{review.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="all-related">
            {tvRecommendation.results.map((tvShow, index) => (
              <TvCard key={index} tvShow={tvShow} width={300} />
            ))}
          </div>
        )}
      </Wrapper>
    </Container>
  );
};

export default TvShowDetail;
