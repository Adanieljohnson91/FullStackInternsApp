/* eslint-disable camelcase */
import React from "react";
import PropTypes from "prop-types";
import "./skillCard.css";

const SkillCard = props => {
  const headline = props.results.headline.slice(0, 100);
  const title = props.results.published_title.slice(0, 25);
  return (
    <>
      <div className="col-lg-3 col-xl-3">
        <div className="card shadow">
          <img
            className="card-img-top"
            src={props.results.image_480x270}
            alt="Card"
          />
          <div className="card-body">
            <h4 className="card-title">{title}</h4>
            <h6 className="card-text">
              <em>{headline}...</em>
            </h6>
            <a
              href={`http://udemy.com${props.results.url}`}
              className="btn btn-primary"
              rel="noopener noreferrer"
              target="_blank"
            >
              View More
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
SkillCard.propTypes = {
  results: PropTypes.shape({
    headline: PropTypes.string,
    image_480x270: PropTypes.string,
    url: PropTypes.string,
    published_title: PropTypes.string
  })
};
export default SkillCard;

/*
Set Up Card
Set Up Get Sub Catagories
Set Up get All
*/
