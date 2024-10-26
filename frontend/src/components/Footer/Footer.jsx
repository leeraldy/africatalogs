import React from 'react';

import './footer.css';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import logo1 from '../../assets/images/analytikas.png';

const quick_links = [
  {
    path: '/home',
    display: 'Home',
  },
  {
    path: '/about',
    display: 'About',
  },
];

const quick_links2 = [
  {
    path: '/login',
    display: 'Login',
  },
  {
    path: '/register',
    display: 'Register',
  },
];
const quick_links3 = [
  {
    path: '/restaurant',
    display: 'Restaurants',
  },
  {
    path: '/pharmacie',
    display: 'Pharmacies',
  },
  {
    path: '/cafe',
    display: 'Cafes',
  },

  {
    path: '/travelagencie',
    display: 'TravelAgencies',
  },
  {
    path: '/hotel',
    display: 'Hotels',
  },
];

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3">
            <div className="logo">
              <div>
                <img src={logo1} alt="Africatalogs logo" height={100} width={50} />
                <p>
                  The company “Africatalogs” is a private company, created in
                  2024 and whose main activity is the publication of the economic
                  directory African/Congolese businesses which includes all
                  professional, industrial, commercial and craft activities.
                </p>
              </div>
              <div className="social__links d-flex align-items-center gap-4">
                <span>
                  <Link to="#">
                    {' '}
                    <i className="ri-facebook-circle-fill"></i>
                    {' '}
                    <i className="ri-twitter-fill"></i>
                    {' '}
                    <i className="ri-instagram-fill"></i>
                    {' '}
                    <i className="ri-youtube-fill"></i>
                  </Link>
                </span>
              </div>
            </div>
          </Col>
          <Col lg="2">
            <h5 className="footer__link-title">Discover</h5>
            <ListGroup className="footer__quick-links">
              {quick_links.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col lg="2">
            <h5 className="footer__link-title">Quick Links</h5>
            <ListGroup className="footer__quick-links">
              {quick_links2.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col lg="2">
            <h5 className="footer__link-title">Activities</h5>
            <ListGroup className="footer__quick-links">
              {quick_links3.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col lg="3">
            <h5 className="footer__link-title">Contact</h5>
            <ListGroup className="footer__quick-links">
              <ListGroupItem
                className="ps-0 border-0 d-flex
                                    align-items-center gap-3"
              >
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-map-pin-fill"></i>
                  </span>
                  Address:
                </h6>
                <p className="mb-0">Kinshasa, RDC</p>
              </ListGroupItem>
              <ListGroupItem
                className="ps-0 border-0 d-flex
                                    align-items-center gap-3"
              >
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-mail-fill"></i>
                  </span>
                  Email:
                </h6>
                <p className="mb-0">businessaddressrdc@gmail.com</p>
              </ListGroupItem>
              <ListGroupItem
                className="ps-0 border-0 d-flex
                                    align-items-center gap-3"
              >
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-phone-fill"></i>
                  </span>
                  Phone:
                </h6>
                <p className="mb-0">+243-540-399-680</p>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col lg="12" className="text-center pt-5">
            <p className="copyright">
              All rights reserved <i className="ri-copyright-line"></i> {year}{' '}
              Africatalogs{' '}
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
