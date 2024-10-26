import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "./../Testimonial/testimonial.css";

// Import your images
import Restaurants from "../../assets/images/Restaurants.png";
import Pharmacie from "../../assets/images/pharmacien.png";
import Cafes from "../../assets/images/Cafes.png";
import Hotels from "../../assets/images/Hotels.png";
import Agencevoyages from "../../assets/images/agences-voyages.png";

// Configuration object for different models
const models = [
  { type: 'restaurant', image: Restaurants, displayName: 'RESTAURANTS' },
  { type: 'pharmacie', image: Pharmacie, displayName: 'PHARMACIES' },
  { type: 'cafe', image: Cafes, displayName: 'CAFES' },
  { type: 'hotel', image: Hotels, displayName: 'HOTELS' },
  { type: 'travelagencie', image: Agencevoyages, displayName: 'TRAVEL AGENCIES' }
];

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {models.map(({ type, image, displayName }) => (
        <div className="testimonial py-4 px-3" key={type}>
          <img src={image} className="h-25 rounded-2" alt={displayName} width={400} height={400}/>
          <div className="content_slider">
            <h3 className="location_name">
              <Link to={`/${type}`}>{displayName}</Link>
            </h3>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Testimonials;
