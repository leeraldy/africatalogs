import React from "react";
import Slider from "react-slick";
import Restaurants from "../../assets/images/Restaurants.png"
import Pharmacie  from "../../assets/images/pharmacien.png"
import Cafes from "../../assets/images/Cafes.png"
import Hotels from "../../assets/images/Hotels.png"
import Agencevoyages from "../../assets/images/agences-voyages.png"
import "./../Testimonial/testimonial.css"
import { Link } from "react-router-dom";

const Testimonials = () => {

    const settings = {
        dots:true,
        infinite:true,
        autoplay:true,
        speed:500,
        swipeToSlide:true,
        autoplaySpeed:2000,
        slidesToShow:3,

        responsive:[
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll:1,
                    infinite:true,
                    dots:true,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll:1,
                },
            },
        ]
    }
    return (
    <Slider {...settings}>

        <div className="testimonial py-4 px-3">
                <img src={Restaurants} className="h-25 rounded-2" alt="" />
                <div className="content_slider">
                
                    <h3 className="location_name"> <Link to={`/restaurant`}>RESTAURANTS</Link></h3>
                    </div>
        </div>

        <div className="testimonial py-4 px-3">
                <img src={Pharmacie} className="h-25 rounded-2" alt="" />
                <div className="content_slider">
                    <h3 className="location_name"> <Link to={`/pharmacie`} >PHARMACIES</Link></h3>
                </div>
        </div>

        <div className="testimonial py-4 px-3">
                <img src={Cafes} className="h-25 rounded-2" alt="" />
                <div className="content_slider">
                    <h3 className="location_name"> <Link to={`/cafe`}>CAFES</Link></h3>
                </div>
        </div>
        <div className="testimonial py-4 px-3">
                <img src={Agencevoyages} className="h-25 rounded-2" alt="" />
                <div className="content_slider">
                    <h3 className="location_name"> <Link to={`/travelagencie`}>TRAVEL AGENCIES</Link></h3>
                </div>
        </div>
        <div className="testimonial py-4 px-3">
                <img src={Hotels} className="h-25 rounded-2" alt="" />
                <div className="content_slider">
                    <h3 className="location_name"> <Link to= {`/hotel`} >HOTELS</Link></h3>
                </div>
        </div>


    </Slider>
    );

};
export default Testimonials;
