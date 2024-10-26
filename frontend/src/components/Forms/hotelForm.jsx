import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { BASE_URL } from '../../utils/config';

const HotelForm = ({ editMode = false }) => {
  const [data, setData] = useState({
    name: '',
    city: '',
    address: '',
    email: '',
    photo: '',
    desc: '',
    contact: '',
    avgRating: '',
    lng: '',
    lat: ''
  });
  
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (editMode && id) {
      axios.get(`${BASE_URL}/hotels/${id}`)
        .then(response => {
          setData(response.data.data);
        })
        .catch(error => {
          console.error("There was an error fetching the hotel data!", error);
        });
    }
  }, [editMode, id]);

  console.log(data)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      axios.put(`${BASE_URL}/hotels/${id}`, data)
        .then(response => {
            navigate('/');
        })
        .catch(error => {
          console.error("There was an error updating the hotel!", error);
        });
    } else {
      axios.post(`${BASE_URL}/hotels`, data)
        .then(response => {
            navigate('/');
        })
        .catch(error => {
          console.error("There was an error creating the hotel!", error);
        });
    }
  };
  const handleDelete = (e) => {
    e.preventDefault();
      axios.delete(`${BASE_URL}/hotels/${id}`)
        .then(response => {
            navigate('/');
        })
        .catch(error => {
          console.error("There was an error deleting the hotel!", error);
        });
  };

  return (
    <Container>
      <Row>
        <Col lg="12">
          <h2>{editMode ? 'Edit Hotel' : 'Create Hotel'}</h2>
          <Form onSubmit={handleSubmit}>
            {Object.keys(data).map((key) => (
            // {Object.keys(data.data).map((key) => (
              <FormGroup key={key}>
                <Label for={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                {/* {console.log(key)} */}
                {/* {console.log(data.data[key])} */}
                <Input
                  type="text"
                  name={key}
                  id={key}
                  value={data[key]}
                //   value={data.data[key]}
                  onChange={handleChange}
                  required={key !== 'lng' && key !== 'lat'}
                />
              </FormGroup>
            ))}
            <Button type="submit">{editMode ? 'Update Hotel' : 'Create Hotel'}</Button>
            <Button onClick={handleDelete}>Delete Hotel</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default HotelForm;
