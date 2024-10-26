import React from 'react';
import { Link } from 'react-router-dom';

const EntityCard = ({ entity, modelType }) => {
    console.log(modelType)
  const { _id, name, city, photo, avgRating } = entity;
  return (
    <div className="entity__card">
      <div className="entity__img">
        <img src={photo} alt={name} />
      </div>
      <div className="entity__content">
        <h5 className="entity__title">
          <Link to={`/${modelType}/${_id}`}>{name}</Link>
        </h5>
        <div className="entity__info">
          <span className="entity__location">
            <i className="ri-map-pin-fill"></i> {city}
          </span>
          {avgRating && (
            <span className="entity__rating">
              <i className="ri-star-fill"></i> {avgRating}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntityCard;
