import React from 'react';
import '../styles/about.css';

import { Container, Row, Col } from 'reactstrap';
// import aboutImg from '../assets/images/about.png';
import aboutImg from '../assets/images/sopal.png';
import Subtitle from './../shared/Subtitle';
import Testimonials from '../components/Testimonial/DynamicTestimonials';
import GoogleMapComponent from '../components/GoogleMapComponent';

const About = () => {
  return (
    <>
      {/*----------- About section start ---------*/}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="about__content">
                <div className="about__subtitle d-flex align-items-center ">
                  <Subtitle
                    subtitle={'Who we are'}
                  />
                </div>
                <h1>
                  Welcome to <span className="highlight">Africatalogs</span>
                </h1>
                <p>
                  Africatalogs is your trusted directory for discovering and connecting with local African businesses. 
                  Founded in 2024, our platform provides a comprehensive listing of professionals, companies, and services 
                  across a wide range of industries, including healthcare, hospitality, and commerce. Our goal is to make 
                  it easier for people to find essential services quickly and confidently.
                </p>
              </div>
            </Col>
            <Col lg="6">
              <div className="about__img-box">
                <img src={aboutImg} alt="About Africatalogs" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/*----------- Mission section start ---------*/}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={'Our Mission'} />
              <h2 className="mission__title"> Connecting Africa, One Business at a Time</h2>
              <p>
                Our mission is to simplify the process of finding reliable local businesses by creating an accessible 
                directory for everyone. Africatalogs aims to promote local businesses, helping them be discovered by 
                customers and prospects alike. We believe in fostering growth through digital visibility, ensuring businesses 
                are not just found but trusted.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/*----------- What We Offer section start ---------*/}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={'What We Offer'} />
              <h2 className="offer__title"> Services & Benefits</h2>
            </Col>
            <Col lg="4">
              <h3>Comprehensive Listings</h3>
              <p>
                We provide a detailed listing of businesses across various categories, including healthcare, 
                hospitality, restaurants, travel, and more. Search by category, city, or type to find the services 
                you need quickly.
              </p>
            </Col>
            <Col lg="4">
              <h3>Recommendations</h3>
              <p>
                Based on location and user feedback, Africatalogs offers recommendations to help users make 
                informed decisions when selecting businesses or services.
              </p>
            </Col>
            <Col lg="4">
              <h3>Easy to Use</h3>
              <p>
                Our platform is designed to be user-friendly, making it easy to find businesses with just a few clicks. 
                Whether you're searching for local doctors, restaurants, or hotels, Africatalogs connects you effortlessly.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/*----------- Testimonials section start ---------*/}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={'What Our Users Say'} />
              <h2 className="testimonial__title"> Testimonials</h2>
            </Col>
            <Col lg="12">
              <Testimonials />
            </Col>
          </Row>
        </Container>
      </section>

      {/*----------- Contact Information section start ---------*/}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={'Contact Us'} />
              <h2 className="contact__title"> Get In Touch</h2>
              <p>For any inquiries or more information, feel free to contact us:</p>
              <p><strong>Address:</strong> Kinshasa, RDC</p>
              <p><strong>Email:</strong> <a href="mailto:businessaddressrdc@gmail.com">businessaddressrdc@gmail.com</a></p>
              <p><strong>Phone:</strong> +243-540-399-680</p>
            </Col>
            <Col lg="12">
              <GoogleMapComponent />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default About;
