import React, { useRef } from 'react';
import './search-bar.css';
import { Col, Form, FormGroup } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import {BASE_URL} from "../utils/config";

const models = [
  { type: 'cafe', endpoint: '/cafe/search' },
  { type: 'hotel', endpoint: '/hotel/search' },
  { type: 'location', endpoint: '/location/search' },
  { type: 'pharmacie', endpoint: '/pharmacie/search' },
  { type: 'restaurant', endpoint: '/restaurant/search' },
  { type: 'travelagencie', endpoint: '/travelagencie/search' }
];

const SearchBar = () => {
  const locationRef = useRef('');
  const typeRef = useRef('');
  const nameRef = useRef('');
  const navigate = useNavigate();

  const searchHandler = async () => {
    const type = typeRef.current.value;
    const location = locationRef.current.value;
    const name = nameRef.current.value;

    if (type === '' && location === '' && name === '') {
      return alert('Fields are required!');
    }

    const model = models.find(m => m.type === type);
    if (!model) {
      return alert('Invalid search type!');
    }

    console.log(`${BASE_URL}${model.endpoint}/search?type=${type}&city=${location}&name=${name}`)

    const res = await fetch(`${BASE_URL}${model.endpoint}/search?type=${type}&city=${location}&name=${name}`);
    console.log(res)

    if (!res.ok) {
      return alert('Something went wrong');
    }

    const result = await res.json();
    console.log(result)
    navigate(`/search?type=${type}&city=${location}&name=${name}`, { state: result.data });
  };

  return (
    <Col lg="12">
      <div className="search__bar">
        <Form className="d-flex align-items-center form-gap-4">
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-search-line"></i>
            </span>
            <div>
              <h6>Name</h6>
              <input
                type="text"
                placeholder="What are you looking for?"
                ref={nameRef}
              />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-map-pin-line"></i>
            </span>
            <div>
              <h6>City</h6>
              <input type="text" placeholder="Where?" ref={locationRef} />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-map-pin-line"></i>
            </span>
            <div>
              <h6>Type</h6>
              <input type="text" placeholder="Category?" ref={typeRef} />
            </div>
          </FormGroup>
          <span className="search__icon" type="submit" onClick={searchHandler}>
            <i className="ri-search-line"></i>
          </span>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;
