// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
// import { BASE_URL } from '../../utils/config';
// import { AuthContext } from '../../context/AuthContext';

// // Define model schemas based on categories
// const modelSchemas = {
//   cafe: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
//   hotel: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating', 'lng', 'lat'],
//   location: ['name', 'category', 'subcategory', 'type', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating', 'lng', 'lat'],
//   pharmacie: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
//   restaurant: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
//   travelagencie: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
//   people: ['name', 'category', 'subcategory', 'dob', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// };

// // Define available categories
// const categories = Object.keys(modelSchemas);

// // Define subcategories for each category
// const subcategories = {
//   cafe: ['Coffee', 'Snacks', 'Brunch', 'Tea', 'Desserts', 'Vegan', 'Outdoor', 'Cozy'],
//   hotel: ['Budget', 'Luxury', 'Family', 'Business', 'Pet Friendly', 'Spa', 'Beachfront', 'Resort'],
//   location: ['Historic', 'Park', 'Museum', 'Landmark', 'Monument', 'Natural', 'Urban', 'Scenic'],
//   pharmacie: ['24/7', 'Prescription', 'OTC', 'Vitamins', 'Cosmetics', 'Health', 'Personal Care', 'Baby Products'],
//   restaurant: ['Fast Food', 'Fine Dining', 'Family', 'Buffet', 'Casual', 'Vegan', 'Seafood', 'Grill'],
//   travelagencie: ['International', 'Domestic', 'Adventure', 'Cruise', 'Group', 'Solo', 'Luxury', 'Budget'],
//   people: ['Actor', 'Musician', 'Athlete', 'Politician', 'Writer', 'Director', 'Scientist', 'Activist', 'Influencer'],
// };

// const EntityForm = ({ editMode = false }) => {
//   const [entityData, setEntityData] = useState({});
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [selectedSubcategories, setSelectedSubcategories] = useState([]);
//   const [photoFiles, setPhotoFiles] = useState([]);
//   const [errors, setErrors] = useState({});
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const { id } = useParams(); // Remove modelType from useParams

//   useEffect(() => {
//     if (editMode && id) {
//       // Fetch the entity data without relying on modelType from the route
//       axios.get(`${BASE_URL}/entity/${id}`)
//         .then(response => {
//           const data = response.data.data;
//           setEntityData(data);
//           setSelectedCategory(data.category);
//           setSelectedSubcategories(data.subcategory ? data.subcategory.split(',') : []);
//         })
//         .catch(error => {
//           console.error("There was an error fetching the data!", error);
//         });
//     }
//   }, [editMode, id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEntityData({ ...entityData, [name]: value });
//   };

//   const handleCategoryChange = (e) => {
//     const { value } = e.target;
//     setSelectedCategory(value);
//     setSelectedSubcategories([]); // Reset subcategories when a new category is selected
//     setEntityData({ ...entityData, category: value }); // Update category in entityData
//     // Optionally, reset other fields that might not be relevant to the new category
//     const newSchema = modelSchemas[value] || [];
//     const updatedData = {};
//     newSchema.forEach(field => {
//       if (field === 'category' || field === 'subcategory' || field === 'photo') {
//         // Keep these fields
//         updatedData[field] = entityData[field] || '';
//       } else {
//         updatedData[field] = '';
//       }
//     });
//     setEntityData(updatedData);
//   };

//   const handleSubcategoryChange = (e) => {
//     const { value, checked } = e.target;
//     if (checked) {
//       setSelectedSubcategories([...selectedSubcategories, value]);
//     } else {
//       setSelectedSubcategories(selectedSubcategories.filter(sub => sub !== value));
//     }
//   };

//   const handleFileChange = (e) => {
//     setPhotoFiles([...e.target.files]);
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     // Check if the category is selected
//     if (!selectedCategory) {
//       newErrors.category = 'Category is required';
//     }

//     // Check if at least one subcategory is selected
//     if (selectedSubcategories.length === 0) {
//       newErrors.subcategory = 'At least one subcategory is required';
//     }

//     // Validate other required fields from the schema
//     modelSchemas[selectedCategory]?.forEach(field => {
//       if (!entityData[field] && field !== 'lng' && field !== 'lat' && field !== 'photo' && field !== 'category' && field !== 'subcategory') {
//         newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
//       }
//     });

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     const formData = new FormData();
//     Object.keys(entityData).forEach(key => {
//       formData.append(key, entityData[key]);
//     });

//     formData.append('subcategory', selectedSubcategories.join(','));

//     if (photoFiles.length > 0) {
//       photoFiles.forEach(file => formData.append('photo', file));
//     }

//     // Construct the endpoint based on selectedCategory
//     const endpoint = `${BASE_URL}/${selectedCategory}${editMode ? `/${id}` : ''}`;
//     const method = editMode ? 'put' : 'post';

//     axios({
//       method,
//       url: endpoint,
//       data: formData,
//       headers: { 'Content-Type': 'multipart/form-data' }
//     })
//       .then(() => navigate('/'))
//       .catch(error => {
//         console.error(`There was an error ${editMode ? 'updating' : 'creating'} the ${selectedCategory}!`, error);
//       });
//   };

//   const handleDelete = (e) => {
//     e.preventDefault();
//     if (!selectedCategory) {
//       console.error("Category is not selected. Cannot delete the entity.");
//       return;
//     }
//     axios.delete(`${BASE_URL}/${selectedCategory}/${id}`)
//       .then(() => navigate('/'))
//       .catch(error => {
//         console.error("There was an error deleting the entity!", error);
//       });
//   };

//   return (
//     <Container>
//       <Row>
//         <Col lg="12">
//           <h2>{editMode ? `Edit ${selectedCategory || 'Entity'}` : `Create a ${'Entity'} Catalog`}</h2>
//           {Object.keys(errors).length > 0 && (
//             <Alert color="danger">
//               {Object.values(errors).map((error, index) => (
//                 <div key={index}>{error}</div>
//               ))}
//             </Alert>
//           )}
//           <Form onSubmit={handleSubmit}>
//             {/* Category Selection */}
//             <FormGroup>
//               <Label for="category">Category</Label>
//               <Input
//                 type="select"
//                 name="category"
//                 id="category"
//                 value={selectedCategory}
//                 onChange={handleCategoryChange}
//                 required
//               >
//                 <option value="">Select Category</option>
//                 {categories.map(type => (
//                   <option key={type} value={type}>
//                     {type.charAt(0).toUpperCase() + type.slice(1)}
//                   </option>
//                 ))}
//               </Input>
//               {errors.category && <Alert color="danger">{errors.category}</Alert>}
//             </FormGroup>

//             {/* Dynamically Render Fields Based on Selected Category */}
//             {selectedCategory && modelSchemas[selectedCategory]?.map((field) => {
//               // Skip 'category' and 'subcategory' as they are handled separately
//               if (field === 'category' || field === 'subcategory') return null;

//               return (
//                 <FormGroup key={field}>
//                   <Label for={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
//                   {field === 'photo' ? (
//                     <Input
//                       type="file"
//                       name={field}
//                       id={field}
//                       multiple
//                       onChange={handleFileChange}
//                     />
//                   ) : (
//                     <Input
//                       type={field === 'password' ? 'password' : (field === 'desc' ? 'textarea' : 'text')}
//                       name={field}
//                       id={field}
//                       value={entityData[field] || ''}
//                       onChange={handleChange}
//                       required={field !== 'lng' && field !== 'lat'}
//                     />
//                   )}
//                   {errors[field] && <Alert color="danger">{errors[field]}</Alert>}
//                 </FormGroup>
//               );
//             })}

//             {/* Subcategory Selection */}
//             {selectedCategory && (
//               <FormGroup>
//                 <Label>Subcategories</Label>
//                 <div>
//                   {subcategories[selectedCategory]?.map(sub => (
//                     <FormGroup key={sub} check inline>
//                       <Label check>
//                         <Input
//                           type="checkbox"
//                           value={sub}
//                           checked={selectedSubcategories.includes(sub)}
//                           onChange={handleSubcategoryChange}
//                         />
//                         {sub}
//                       </Label>
//                     </FormGroup>
//                   ))}
//                 </div>
//                 {errors.subcategory && <Alert color="danger">{errors.subcategory}</Alert>}
//               </FormGroup>
//             )}

//             <Button type="submit" color="primary" className="me-2">
//               {editMode ? 'Update' : 'Create'}
//             </Button>
//             {editMode && (
//               <Button color="danger" onClick={handleDelete}>
//                 Delete
//               </Button>
//             )}
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default EntityForm;



import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { BASE_URL } from '../../utils/config';
import { AuthContext } from '../../context/AuthContext';

const modelSchemas = {
  cafe: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
  hotel: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating', 'lng', 'lat'],
  location: ['name', 'category', 'subcategory', 'type', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating', 'lng', 'lat'],
  pharmacie: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
  restaurant: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
  travelagencie: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
  people: ['name', 'category', 'subcategory', 'dob', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
};
const modelTypes = ['cafe', 'hotel', 'location', 'pharmacie', 'restaurant', 'travelagencie', 'people'];
const subcategories = {
  cafe: ['Coffee', 'Snacks', 'Brunch', 'Tea', 'Desserts', 'Vegan', 'Outdoor', 'Cozy'],
  hotel: ['Budget', 'Luxury', 'Family', 'Business', 'Pet Friendly', 'Spa', 'Beachfront', 'Resort'],
  location: ['Historic', 'Park', 'Museum', 'Landmark', 'Monument', 'Natural', 'Urban', 'Scenic'],
  pharmacie: ['24/7', 'Prescription', 'OTC', 'Vitamins', 'Cosmetics', 'Health', 'Personal Care', 'Baby Products'],
  restaurant: ['Fast Food', 'Fine Dining', 'Family', 'Buffet', 'Casual', 'Vegan', 'Seafood', 'Grill'],
  travelagencie: ['International', 'Domestic', 'Adventure', 'Cruise', 'Group', 'Solo', 'Luxury', 'Budget'],
  people: ['Actor', 'Musician', 'Athlete', 'Politician', 'Writer', 'Director', 'Scientist', 'Activist', 'Influencer'],
};

const EntityForm = ({ editMode = false }) => {
  const [entityData, setEntityData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [photoFiles, setPhotoFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id, modelType } = useParams();

  useEffect(() => {
    if (editMode && id) {
      axios.get(`${BASE_URL}/${modelType}/${id}`)
        .then(response => {
          setEntityData(response.data.data);
          setSelectedCategory(response.data.data.category);
          setSelectedSubcategories(response.data.data.subcategory ? response.data.data.subcategory.split(',') : []);
        })
        .catch(error => {
          console.error("There was an error fetching the data!", error);
        });
    }
  }, [editMode, id, modelType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntityData({ ...entityData, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setSelectedCategory(value);
    setSelectedSubcategories([]); // Reset subcategories when a new category is selected
  };

  const handleSubcategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedSubcategories([...selectedSubcategories, value]);
    } else {
      setSelectedSubcategories(selectedSubcategories.filter(sub => sub !== value));
    }
  };

  const handleFileChange = (e) => {
    setPhotoFiles([...e.target.files]);
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Check if the category is selected
    if (!selectedCategory) {
      newErrors.category = 'Category is required';
    }

    // Check if at least one subcategory is selected
    if (selectedSubcategories.length === 0) {
      newErrors.subcategory = 'At least one subcategory is required';
    }

    // Validate other required fields from the schema
    modelSchemas[modelType]?.forEach(field => {
      if (!entityData[field] && field !== 'lng' && field !== 'lat' && field !== 'photo' && field !== 'category' && field !== 'subcategory') {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    Object.keys(entityData).forEach(key => {
      formData.append(key, entityData[key]);
    });

    formData.append('category', selectedCategory);
    formData.append('subcategory', selectedSubcategories.join(','));

    if (photoFiles.length > 0) {
      photoFiles.forEach(file => formData.append('photo', file));
    }

    const endpoint = `${BASE_URL}/${modelType}${editMode ? `/${id}` : ''}`;
    const method = editMode ? 'put' : 'post';

    axios({
      method,
      url: endpoint,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(() => navigate('/'))
      .catch(error => {
        console.error(`There was an error ${editMode ? 'updating' : 'creating'} the ${modelType}!`, error);
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios.delete(`${BASE_URL}/${modelType}/${id}`)
      .then(() => navigate('/'))
      .catch(error => {
        console.error("There was an error deleting the entity!", error);
      });
  };

  return (
    <Container>
      <Row>
        <Col lg="12">
          <h2>{editMode ? `Edit ${modelType}` : `Creating a ${modelType} catalog`}</h2>
          {Object.keys(errors).length > 0 && (
            <Alert color="danger">
              {Object.values(errors).map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            {modelSchemas[modelType]?.map((field) => (
              <FormGroup key={field}>
                <Label for={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                {field === 'category' ? (
                  <Input
                    type="select"
                    name={field}
                    id={field}
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {modelTypes.map(type => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </Input>
                ) : field === 'subcategory' ? (
                  <div>
                    {subcategories[selectedCategory]?.map(sub => (
                      <FormGroup key={sub} check inline>
                        <Label check>
                          <Input
                            type="checkbox"
                            value={sub}
                            checked={selectedSubcategories.includes(sub)}
                            onChange={handleSubcategoryChange}
                          />
                          {sub}
                        </Label>
                      </FormGroup>
                    ))}
                    {errors.subcategory && <Alert color="danger">{errors.subcategory}</Alert>}
                  </div>
                ) : field === 'photo' ? (
                  <Input
                    type="file"
                    name={field}
                    id={field}
                    multiple
                    onChange={handleFileChange}
                  />
                ) : (
                  <Input
                    type={field === 'password' ? 'password' : 'text'}
                    name={field}
                    id={field}
                    value={entityData[field] || ''}
                    onChange={handleChange}
                    required={field !== 'lng' && field !== 'lat' && field !== 'photo'}
                  />
                )}
              </FormGroup>
            ))}
            {errors.category && <Alert color="danger">{errors.category}</Alert>}
            <Button type="submit">{editMode ? 'Update' : 'Create'} {modelType}</Button>
            {editMode && <Button color="danger" onClick={handleDelete}>Delete {modelType}</Button>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EntityForm;



// // import React, { useState, useEffect, useContext } from 'react';
// // import axios from 'axios';
// // import { useNavigate, useParams } from 'react-router-dom';
// // import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
// // import { BASE_URL } from '../../utils/config';
// // import { AuthContext } from '../../context/AuthContext';

// // const modelSchemas = {
// //   cafe: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// //   hotel: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating', 'lng', 'lat'],
// //   location: ['name', 'category', 'subcategory', 'type', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating', 'lng', 'lat'],
// //   pharmacie: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// //   restaurant: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// //   travelagencie: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// //   people: ['name', 'category', 'subcategory', 'dob', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// // };
// // const modelTypes = ['cafe', 'hotel', 'location', 'pharmacie', 'restaurant', 'travelagencie', 'people'];
// // const subcategories = {
// //   cafe: ['Coffee', 'Snacks', 'Brunch', 'Tea', 'Desserts', 'Vegan', 'Outdoor', 'Cozy'],
// //   hotel: ['Budget', 'Luxury', 'Family', 'Business', 'Pet Friendly', 'Spa', 'Beachfront', 'Resort'],
// //   location: ['Historic', 'Park', 'Museum', 'Landmark', 'Monument', 'Natural', 'Urban', 'Scenic'],
// //   pharmacie: ['24/7', 'Prescription', 'OTC', 'Vitamins', 'Cosmetics', 'Health', 'Personal Care', 'Baby Products'],
// //   restaurant: ['Fast Food', 'Fine Dining', 'Family', 'Buffet', 'Casual', 'Vegan', 'Seafood', 'Grill'],
// //   travelagencie: ['International', 'Domestic', 'Adventure', 'Cruise', 'Group', 'Solo', 'Luxury', 'Budget'],
// //   people: ['Actor', 'Musician', 'Athlete', 'Politician', 'Writer', 'Director', 'Scientist', 'Activist'],
// // };

// // const EntityForm = ({ editMode = false }) => {
// //   const [entityData, setEntityData] = useState({});
// //   const [selectedCategory, setSelectedCategory] = useState('');
// //   const [selectedSubcategories, setSelectedSubcategories] = useState([]);
// //   const [photoFiles, setPhotoFiles] = useState([]);
// //   const [errors, setErrors] = useState({});
// //   const { user } = useContext(AuthContext);
// //   const navigate = useNavigate();
// //   const { id, modelType } = useParams();

// //   useEffect(() => {
// //     if (editMode && id) {
// //       axios.get(`${BASE_URL}/${modelType}/${id}`)
// //         .then(response => {
// //           setEntityData(response.data.data);
// //           setSelectedCategory(response.data.data.category);
// //           setSelectedSubcategories(response.data.data.subcategory || []);
// //         })
// //         .catch(error => {
// //           console.error("There was an error fetching the data!", error);
// //         });
// //     }
// //   }, [editMode, id, modelType]);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setEntityData({ ...entityData, [name]: value });
// //   };

// //   const handleCategoryChange = (e) => {
// //     const { value } = e.target;
// //     setSelectedCategory(value);
// //     setSelectedSubcategories([]); // Reset subcategories when a new category is selected
// //   };

// //   const handleSubcategoryChange = (e) => {
// //     const { value, checked } = e.target;
// //     if (checked) {
// //       setSelectedSubcategories([...selectedSubcategories, value]);
// //     } else {
// //       setSelectedSubcategories(selectedSubcategories.filter(sub => sub !== value));
// //     }
// //   };

// //   const handleFileChange = (e) => {
// //     setPhotoFiles([...e.target.files]);
// //   };

// //   const validateForm = () => {
// //     const newErrors = {};
// //     modelSchemas[modelType]?.forEach(field => {
// //       if (!entityData[field] && field !== 'lng' && field !== 'lat' && field !== 'photo') {
// //         newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
// //       }
// //     });

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     if (!validateForm()) return;

// //     const formData = new FormData();
// //     Object.keys(entityData).forEach(key => {
// //       formData.append(key, entityData[key]);
// //     });

// //     formData.append('category', selectedCategory);
// //     formData.append('subcategory', selectedSubcategories.join(','));

// //     if (photoFiles.length > 0) {
// //       photoFiles.forEach(file => formData.append('photo', file));
// //     }

// //     const endpoint = `${BASE_URL}/${modelType}${editMode ? `/${id}` : ''}`;
// //     const method = editMode ? 'put' : 'post';

// //     axios({
// //       method,
// //       url: endpoint,
// //       data: formData,
// //       headers: { 'Content-Type': 'multipart/form-data' }
// //     })
// //       .then(() => navigate('/'))
// //       .catch(error => {
// //         console.error(`There was an error ${editMode ? 'updating' : 'creating'} the ${modelType}!`, error);
// //       });
// //   };

// //   const handleDelete = (e) => {
// //     e.preventDefault();
// //     axios.delete(`${BASE_URL}/${modelType}/${id}`)
// //       .then(() => navigate('/'))
// //       .catch(error => {
// //         console.error("There was an error deleting the entity!", error);
// //       });
// //   };

// //   return (
// //     <Container>
// //       <Row>
// //         <Col lg="12">
// //           <h2>{editMode ? `Edit ${modelType}` : `Create ${modelType}`}</h2>
// //           {Object.keys(errors).length > 0 && (
// //             <Alert color="danger">
// //               {Object.values(errors).map((error, index) => (
// //                 <div key={index}>{error}</div>
// //               ))}
// //             </Alert>
// //           )}
// //           <Form onSubmit={handleSubmit}>
// //             {modelSchemas[modelType]?.map((field) => (
// //               <FormGroup key={field}>
// //                 <Label for={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
// //                 {field === 'category' ? (
// //                   <Input
// //                     type="select"
// //                     name={field}
// //                     id={field}
// //                     value={selectedCategory}
// //                     onChange={handleCategoryChange}
// //                   >
// //                     <option value="">Select Category</option>
// //                     {modelTypes.map(type => (
// //                       <option key={type} value={type}>
// //                         {type.charAt(0).toUpperCase() + type.slice(1)}
// //                       </option>
// //                     ))}
// //                   </Input>
// //                 ) : field === 'subcategory' ? (
// //                   <div>
// //                     {subcategories[selectedCategory]?.map(sub => (
// //                       <FormGroup key={sub} check inline>
// //                         <Label check>
// //                           <Input
// //                             type="checkbox"
// //                             value={sub}
// //                             checked={selectedSubcategories.includes(sub)}
// //                             onChange={handleSubcategoryChange}
// //                           />
// //                           {sub}
// //                         </Label>
// //                       </FormGroup>
// //                     ))}
// //                   </div>
// //                 ) : field === 'photo' ? (
// //                   <Input
// //                     type="file"
// //                     name={field}
// //                     id={field}
// //                     multiple
// //                     onChange={handleFileChange}
// //                   />
// //                 ) : (
// //                   <Input
// //                     type={field === 'password' ? 'password' : 'text'}
// //                     name={field}
// //                     id={field}
// //                     value={entityData[field] || ''}
// //                     onChange={handleChange}
// //                     required={field !== 'lng' && field !== 'lat' && field !== 'photo'}
// //                   />
// //                 )}
// //               </FormGroup>
// //             ))}
// //             <Button type="submit">{editMode ? 'Update' : 'Create'} {modelType}</Button>
// //             {editMode && <Button color="danger" onClick={handleDelete}>Delete {modelType}</Button>}
// //           </Form>
// //         </Col>
// //       </Row>
// //     </Container>
// //   );
// // };

// // export default EntityForm;



// // // import React, { useState, useEffect, useContext } from 'react';
// // // import axios from 'axios';
// // // import { useNavigate, useParams } from 'react-router-dom';
// // // import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
// // // import { BASE_URL } from '../../utils/config';
// // // import { AuthContext } from '../../context/AuthContext';

// // // const modelSchemas = {
// // //   cafe: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// // //   hotel: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating', 'lng', 'lat'],
// // //   location: ['name', 'category', 'subcategory', 'type', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating', 'lng', 'lat'],
// // //   pharmacie: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// // //   restaurant: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// // //   travelagencie: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// // //   people: ['name', 'category', 'subcategory', 'dob', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// // // };

// // // const EntityForm = ({ editMode = false }) => {
// // //   const [entityData, setEntityData] = useState({});
// // //   const [photoFiles, setPhotoFiles] = useState([]);
// // //   const [errors, setErrors] = useState({});
// // //   const { user } = useContext(AuthContext);
// // //   const navigate = useNavigate();
// // //   const { id, modelType } = useParams();

// // //   useEffect(() => {
// // //     if (editMode && id) {
// // //       axios.get(`${BASE_URL}/${modelType}/${id}`)
// // //         .then(response => {
// // //           setEntityData(response.data.data);
// // //         })
// // //         .catch(error => {
// // //           console.error("There was an error fetching the data!", error);
// // //         });
// // //     }
// // //   }, [editMode, id, modelType]);

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setEntityData({ ...entityData, [name]: value });
// // //   };

// // //   const handleFileChange = (e) => {
// // //     setPhotoFiles([...e.target.files]);
// // //   };

// // //   const validateForm = () => {
// // //     const newErrors = {};
// // //     modelSchemas[modelType]?.forEach(field => {
// // //       if (!entityData[field] && field !== 'lng' && field !== 'lat' && field !== 'photo') {
// // //         newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
// // //       }
// // //     });

// // //     setErrors(newErrors);
// // //     return Object.keys(newErrors).length === 0;
// // //   };

// // //   const handleSubmit = (e) => {
// // //     e.preventDefault();
// // //     if (!validateForm()) return;

// // //     const formData = new FormData();
// // //     Object.keys(entityData).forEach(key => {
// // //       formData.append(key, entityData[key]);
// // //     });

// // //     if (photoFiles.length > 0) {
// // //       photoFiles.forEach(file => formData.append('photo', file));
// // //     }

// // //     const endpoint = `${BASE_URL}/${modelType}${editMode ? `/${id}` : ''}`;
// // //     const method = editMode ? 'put' : 'post';

// // //     axios({
// // //       method,
// // //       url: endpoint,
// // //       data: formData,
// // //       headers: { 'Content-Type': 'multipart/form-data' }
// // //     })
// // //       .then(() => navigate('/'))
// // //       .catch(error => {
// // //         console.error(`There was an error ${editMode ? 'updating' : 'creating'} the ${modelType}!`, error);
// // //       });
// // //   };

// // //   const handleDelete = (e) => {
// // //     e.preventDefault();
// // //     axios.delete(`${BASE_URL}/${modelType}/${id}`)
// // //       .then(() => navigate('/'))
// // //       .catch(error => {
// // //         console.error("There was an error deleting the entity!", error);
// // //       });
// // //   };

// // //   return (
// // //     <Container>
// // //       <Row>
// // //         <Col lg="12">
// // //           <h2>{editMode ? `Edit ${modelType}` : `Create ${modelType}`}</h2>
// // //           {Object.keys(errors).length > 0 && (
// // //             <Alert color="danger">
// // //               {Object.values(errors).map((error, index) => (
// // //                 <div key={index}>{error}</div>
// // //               ))}
// // //             </Alert>
// // //           )}
// // //           <Form onSubmit={handleSubmit}>
// // //             {modelSchemas[modelType]?.map((field) => (
// // //               <FormGroup key={field}>
// // //                 <Label for={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
// // //                 {field === 'photo' ? (
// // //                   <Input
// // //                     type="file"
// // //                     name={field}
// // //                     id={field}
// // //                     multiple
// // //                     onChange={handleFileChange}
// // //                   />
// // //                 ) : (
// // //                   <Input
// // //                     type={field === 'password' ? 'password' : 'text'}
// // //                     name={field}
// // //                     id={field}
// // //                     value={entityData[field] || ''}
// // //                     onChange={handleChange}
// // //                     required={field !== 'lng' && field !== 'lat' && field !== 'photo'}
// // //                   />
// // //                 )}
// // //               </FormGroup>
// // //             ))}
// // //             <Button type="submit">{editMode ? 'Update' : 'Create'} {modelType}</Button>
// // //             {editMode && <Button color="danger" onClick={handleDelete}>Delete {modelType}</Button>}
// // //           </Form>
// // //         </Col>
// // //       </Row>
// // //     </Container>
// // //   );
// // // };

// // // export default EntityForm;


// // // // import React, { useState, useEffect, useContext } from 'react';
// // // // import axios from 'axios';
// // // // import { useNavigate, useParams } from 'react-router-dom';
// // // // import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
// // // // import { BASE_URL } from '../../utils/config';
// // // // import { AuthContext } from '../../context/AuthContext';

// // // // const modelSchemas = {
// // // //   cafe: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// // // //   hotel: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating', 'lng', 'lat'],
// // // //   location: ['name', 'category', 'subcategory', 'type', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating', 'lng', 'lat'],
// // // //   pharmacie: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// // // //   restaurant: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// // // //   travelagencie: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// // // //   people: ['name', 'category', 'subcategory', 'dob', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// // // // };

// // // // const EntityForm = ({ editMode = false }) => {
// // // //   const [entityData, setEntityData] = useState({});
// // // //   const [errors, setErrors] = useState({});
// // // //   const { user } = useContext(AuthContext);
// // // //   const navigate = useNavigate();
// // // //   const { id, modelType } = useParams();

// // // //   useEffect(() => {
// // // //     if (editMode && id) {
// // // //       axios.get(`${BASE_URL}/${modelType}/${id}`)
// // // //         .then(response => setEntityData(response.data.data))
// // // //         .catch(error => console.error("There was an error fetching the data!", error));
// // // //     }
// // // //   }, [editMode, id, modelType]);

// // // //   const validateForm = () => {
// // // //     const newErrors = {};
// // // //     modelSchemas[modelType]?.forEach((field) => {
// // // //       if (!entityData[field] && field !== 'lng' && field !== 'lat' && field !== 'photo' && field !== 'role') {
// // // //         newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
// // // //       }
// // // //     });
// // // //     setErrors(newErrors);
// // // //     return Object.keys(newErrors).length === 0;
// // // //   };

// // // //   const handleChange = (e) => {
// // // //     const { name, value, files } = e.target;
// // // //     if (name === 'photo') {
// // // //       setEntityData({ ...entityData, [name]: files });
// // // //     } else {
// // // //       setEntityData({ ...entityData, [name]: value });
// // // //     }
// // // //   };

// // // //   const handleSubmit = (e) => {
// // // //     e.preventDefault();
// // // //     if (!validateForm()) return;

// // // //     const endpoint = `${BASE_URL}/${modelType}${editMode ? `/${id}` : ''}`;
// // // //     const method = editMode ? 'put' : 'post';

// // // //     const requestData = {
// // // //       ...entityData,
// // // //       ownerId: user._id,
// // // //       emailId: user.email,
// // // //       photo: [...entityData.photo].map(file => file.name) // Mocking photo field to handle file names only
// // // //     };

// // // //     axios[method](endpoint, requestData)
// // // //       .then(() => navigate('/'))
// // // //       .catch(error => console.error(`There was an error ${editMode ? 'updating' : 'creating'} the ${modelType}!`, error));
// // // //   };

// // // //   const handleDelete = (e) => {
// // // //     e.preventDefault();
// // // //     axios.delete(`${BASE_URL}/${modelType}/${id}`)
// // // //       .then(() => navigate('/'))
// // // //       .catch(error => console.error("There was an error deleting the hotel!", error));
// // // //   };

// // // //   return (
// // // //     <Container>
// // // //       <Row>
// // // //         <Col lg="12">
// // // //           <h2>{editMode ? `Edit ${modelType}` : `Create ${modelType}`}</h2>
// // // //           <Form onSubmit={handleSubmit}>
// // // //             {modelSchemas[modelType]?.map((field) => (
// // // //               <FormGroup key={field}>
// // // //                 <Label for={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
// // // //                 <Input
// // // //                   type={field === 'photo' ? 'file' : (field === 'password' ? 'password' : 'text')}
// // // //                   name={field}
// // // //                   id={field}
// // // //                   value={field === 'photo' ? undefined : entityData[field] || ''}
// // // //                   onChange={handleChange}
// // // //                   multiple={field === 'photo'}
// // // //                   required={field !== 'lng' && field !== 'lat' && field !== 'photo' && field !== 'role'}
// // // //                 />
// // // //                 {errors[field] && <p className="text-danger">{errors[field]}</p>}
// // // //               </FormGroup>
// // // //             ))}
// // // //             <Button type="submit">{editMode ? 'Update' : 'Create'} {modelType}</Button>
// // // //             {editMode && <Button onClick={handleDelete} className="ms-2" color="danger">Delete {modelType}</Button>}
// // // //           </Form>
// // // //         </Col>
// // // //       </Row>
// // // //     </Container>
// // // //   );
// // // // };

// // // // export default EntityForm;


// // // // // import React, { useState, useEffect, useContext } from 'react';
// // // // // import axios from 'axios';
// // // // // import { useNavigate, useParams } from 'react-router-dom';
// // // // // import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
// // // // // import { BASE_URL } from '../../utils/config';
// // // // // import { AuthContext } from '../../context/AuthContext';

// // // // // const modelSchemas = {
// // // // //   cafe: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// // // // //   hotel: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating', 'lng', 'lat'],
// // // // //   location: ['name', 'category', 'subcategory', 'type', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating', 'lng', 'lat'],
// // // // //   pharmacie: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// // // // //   restaurant: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// // // // //   travelagencie: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// // // // //   people: ['name', 'category', 'subcategory', 'dob', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// // // // // };

// // // // // const EntityForm = ({ editMode = false }) => {
// // // // //   const [entityData, setEntityData] = useState({});
// // // // //   const [validationErrors, setValidationErrors] = useState({});
// // // // //   const { user } = useContext(AuthContext);
// // // // //   const navigate = useNavigate();
// // // // //   const { id, modelType } = useParams();
  
// // // // //   useEffect(() => {
// // // // //     if (editMode && id) {
// // // // //       axios.get(`${BASE_URL}/${modelType}/${id}`)
// // // // //         .then(response => {
// // // // //           setEntityData(response.data.data);
// // // // //         })
// // // // //         .catch(error => {
// // // // //           console.error("Error fetching data", error);
// // // // //         });
// // // // //     }
// // // // //   }, [editMode, id, modelType]);

// // // // //   const handleChange = (e) => {
// // // // //     const { name, value, files } = e.target;
// // // // //     if (name === 'photo') {
// // // // //       setEntityData({ ...entityData, [name]: files });
// // // // //     } else {
// // // // //       setEntityData({ ...entityData, [name]: value });
// // // // //     }
// // // // //   };

// // // // //   const validateFields = () => {
// // // // //     const errors = {};
// // // // //     modelSchemas[modelType].forEach(field => {
// // // // //       if (!entityData[field] && field !== 'lng' && field !== 'lat' && field !== 'photo') {
// // // // //         errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
// // // // //       }
// // // // //     });
// // // // //     setValidationErrors(errors);
// // // // //     return Object.keys(errors).length === 0;
// // // // //   };

// // // // //   const handleSubmit = (e) => {
// // // // //     e.preventDefault();
// // // // //     if (!validateFields()) return;

// // // // //     const endpoint = `${BASE_URL}/${modelType}${editMode ? `/${id}` : ''}`;
// // // // //     const method = editMode ? 'put' : 'post';

// // // // //     const requestData = {
// // // // //       ...entityData,
// // // // //       ownerId: user._id,
// // // // //       emailId: user.email,
// // // // //       photo: Array.from(entityData.photo || []).map(file => file.name) // send just file names for now
// // // // //     };

// // // // //     axios[method](endpoint, requestData)
// // // // //       .then(response => {
// // // // //         navigate('/');
// // // // //       })
// // // // //       .catch(error => {
// // // // //         console.error(`Error ${editMode ? 'updating' : 'creating'} ${modelType}`, error);
// // // // //       });
// // // // //   };

// // // // //   const handleDelete = (e) => {
// // // // //     e.preventDefault();
// // // // //     axios.delete(`${BASE_URL}/${modelType}/${id}`)
// // // // //       .then(() => {
// // // // //         navigate('/');
// // // // //       })
// // // // //       .catch(error => {
// // // // //         console.error("Error deleting entity", error);
// // // // //       });
// // // // //   };

// // // // //   return (
// // // // //     <Container>
// // // // //       <Row>
// // // // //         <Col lg="12">
// // // // //           <h2>{editMode ? `Edit ${modelType}` : `Create ${modelType}`}</h2>
// // // // //           {Object.keys(validationErrors).length > 0 && (
// // // // //             <Alert color="danger">
// // // // //               {Object.values(validationErrors).map((error, idx) => (
// // // // //                 <div key={idx}>{error}</div>
// // // // //               ))}
// // // // //             </Alert>
// // // // //           )}
// // // // //           <Form onSubmit={handleSubmit}>
// // // // //             {modelSchemas[modelType]?.map((field) => (
// // // // //               <FormGroup key={field}>
// // // // //                 <Label for={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
// // // // //                 <Input
// // // // //                   type={field === 'photo' ? 'file' : field === 'password' ? 'password' : 'text'}
// // // // //                   name={field}
// // // // //                   id={field}
// // // // //                   multiple={field === 'photo'}
// // // // //                   value={field !== 'photo' ? entityData[field] || '' : undefined}
// // // // //                   onChange={handleChange}
// // // // //                   required={field !== 'lng' && field !== 'lat' && field !== 'photo'}
// // // // //                 />
// // // // //               </FormGroup>
// // // // //             ))}
// // // // //             <Button type="submit">{editMode ? 'Update' : 'Create'} {modelType}</Button>
// // // // //             {editMode && <Button onClick={handleDelete}>Delete {modelType}</Button>}
// // // // //           </Form>
// // // // //         </Col>
// // // // //       </Row>
// // // // //     </Container>
// // // // //   );
// // // // // };

// // // // // export default EntityForm;


// // // // // // import React, { useState, useEffect, useContext } from 'react';
// // // // // // import axios from 'axios';
// // // // // // import { useNavigate, useParams } from 'react-router-dom';
// // // // // // import { Container, Row, Col, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
// // // // // // import { BASE_URL } from '../../utils/config';
// // // // // // import { AuthContext } from '../../context/AuthContext';

// // // // // // const modelSchemas = {
// // // // // //   cafe: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// // // // // //   hotel: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating', 'lng', 'lat'],
// // // // // //   location: ['name', 'category', 'subcategory', 'type', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating', 'recommended', 'lng', 'lat'],
// // // // // //   pharmacie: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// // // // // //   restaurant: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// // // // // //   travelagencie: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// // // // // //   people: ['name', 'category', 'subcategory', 'dob', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// // // // // // };

// // // // // // const EntityForm = ({ editMode = false }) => {
// // // // // //   const [entityData, setEntityData] = useState({});
// // // // // //   const [errors, setErrors] = useState({});
// // // // // //   const { user } = useContext(AuthContext);
// // // // // //   const navigate = useNavigate();
// // // // // //   const { id, modelType } = useParams();

// // // // // //   useEffect(() => {
// // // // // //     if (editMode && id) {
// // // // // //       axios.get(`${BASE_URL}/${modelType}/${id}`)
// // // // // //         .then(response => {
// // // // // //           setEntityData(response.data.data);
// // // // // //         })
// // // // // //         .catch(error => {
// // // // // //           console.error("There was an error fetching the data!", error);
// // // // // //         });
// // // // // //     }
// // // // // //   }, [editMode, id, modelType]);

// // // // // //   const handleChange = (e) => {
// // // // // //     const { name, value, files } = e.target;
// // // // // //     if (name === 'photo' && files) {
// // // // // //       // Convert image files to base64 or other formats to send without FormData
// // // // // //       const fileArray = Array.from(files).map(file => URL.createObjectURL(file)); 
// // // // // //       setEntityData({ ...entityData, [name]: fileArray });
// // // // // //     } else {
// // // // // //       setEntityData({ ...entityData, [name]: value });
// // // // // //     }
// // // // // //   };

// // // // // //   const validateFields = () => {
// // // // // //     let validationErrors = {};
// // // // // //     modelSchemas[modelType]?.forEach(field => {
// // // // // //       if (field !== 'lng' && field !== 'lat' && field !== 'photo' && !entityData[field]) {
// // // // // //         validationErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
// // // // // //       }
// // // // // //     });
// // // // // //     setErrors(validationErrors);
// // // // // //     return Object.keys(validationErrors).length === 0;
// // // // // //   };

// // // // // //   const handleSubmit = (e) => {
// // // // // //     e.preventDefault();
// // // // // //     if (!validateFields()) return; // If validation fails, do not proceed

// // // // // //     const endpoint = `${BASE_URL}/${modelType}${editMode ? `/${id}` : ''}`;
// // // // // //     const method = editMode ? 'put' : 'post';
    
// // // // // //     entityData.ownerId = user._id;
// // // // // //     entityData.emailId = user.email;

// // // // // //     axios[method](endpoint, entityData)
// // // // // //       .then(response => {
// // // // // //         navigate('/');
// // // // // //       })
// // // // // //       .catch(error => {
// // // // // //         console.error(`There was an error ${editMode ? 'updating' : 'creating'} the ${modelType}!`, error);
// // // // // //       });
// // // // // //   };

// // // // // //   const handleDelete = (e) => {
// // // // // //     e.preventDefault();
// // // // // //     axios.delete(`${BASE_URL}/${modelType}/${id}`)
// // // // // //       .then(response => {
// // // // // //         navigate('/');
// // // // // //       })
// // // // // //       .catch(error => {
// // // // // //         console.error("There was an error deleting the hotel!", error);
// // // // // //       });
// // // // // //   };

// // // // // //   return (
// // // // // //     <Container>
// // // // // //       <Row>
// // // // // //         <Col lg="12">
// // // // // //           <h2>{editMode ? `Edit ${modelType}` : `Create ${modelType}`}</h2>
// // // // // //           <Form onSubmit={handleSubmit}>
// // // // // //             {modelSchemas[modelType]?.map((field) => (
// // // // // //               <FormGroup key={field}>
// // // // // //                 <Label for={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
// // // // // //                 {field === 'photo' ? (
// // // // // //                   <Input
// // // // // //                     type="file"
// // // // // //                     name={field}
// // // // // //                     id={field}
// // // // // //                     multiple
// // // // // //                     onChange={handleChange}
// // // // // //                   />
// // // // // //                 ) : (
// // // // // //                   <Input
// // // // // //                     type={field === 'password' ? 'password' : 'text'}
// // // // // //                     name={field}
// // // // // //                     id={field}
// // // // // //                     value={entityData[field] || ''}
// // // // // //                     onChange={handleChange}
// // // // // //                     invalid={!!errors[field]}
// // // // // //                   />
// // // // // //                 )}
// // // // // //                 {errors[field] && <FormFeedback>{errors[field]}</FormFeedback>}
// // // // // //               </FormGroup>
// // // // // //             ))}
// // // // // //             <Button type="submit">{editMode ? 'Update' : 'Create'} {modelType}</Button>
// // // // // //             {editMode && <Button onClick={handleDelete}>Delete {modelType}</Button>}
// // // // // //           </Form>
// // // // // //         </Col>
// // // // // //       </Row>
// // // // // //     </Container>
// // // // // //   );
// // // // // // };

// // // // // // export default EntityForm;



// // // // // // // import React, { useState, useEffect, useContext } from 'react';
// // // // // // // import axios from 'axios';
// // // // // // // import { useNavigate, useParams } from 'react-router-dom';
// // // // // // // import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
// // // // // // // import { BASE_URL } from '../../utils/config';
// // // // // // // import { AuthContext } from '../../context/AuthContext';

// // // // // // // const modelSchemas = {
// // // // // // //   cafe: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// // // // // // //   hotel: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating', 'lng', 'lat'],
// // // // // // //   location: ['name', 'category', 'subcategory', 'type', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating', 'lng', 'lat'],
// // // // // // //   pharmacie: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// // // // // // //   restaurant: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// // // // // // //   travelagencie: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// // // // // // //   people: ['name', 'category', 'subcategory', 'dob', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// // // // // // // };

// // // // // // // const EntityForm = ({ editMode = false }) => {
// // // // // // //   const [entityData, setEntityData] = useState({});
// // // // // // //   const [errors, setErrors] = useState({});
// // // // // // //   const [photoFiles, setPhotoFiles] = useState([]);
// // // // // // //   const { user } = useContext(AuthContext);
// // // // // // //   const navigate = useNavigate();
// // // // // // //   const { id, modelType } = useParams();

// // // // // // //   useEffect(() => {
// // // // // // //     if (editMode && id) {
// // // // // // //       axios.get(`${BASE_URL}/${modelType}/${id}`)
// // // // // // //         .then(response => {
// // // // // // //           setEntityData(response.data.data);
// // // // // // //         })
// // // // // // //         .catch(error => {
// // // // // // //           console.error("Error fetching data!", error);
// // // // // // //         });
// // // // // // //     }
// // // // // // //   }, [editMode, id, modelType]);

// // // // // // //   const handleChange = (e) => {
// // // // // // //     const { name, value } = e.target;
// // // // // // //     setEntityData({ ...entityData, [name]: value });
// // // // // // //   };

// // // // // // //   const handlePhotoChange = (e) => {
// // // // // // //     setPhotoFiles([...e.target.files]);
// // // // // // //   };

// // // // // // //   const validateForm = () => {
// // // // // // //     let newErrors = {};
// // // // // // //     modelSchemas[modelType]?.forEach(field => {
// // // // // // //       if (!entityData[field] && field !== 'lng' && field !== 'lat' && field !== 'photo') {
// // // // // // //         newErrors[field] = `${field} is required`;
// // // // // // //       }
// // // // // // //     });
// // // // // // //     setErrors(newErrors);
// // // // // // //     return Object.keys(newErrors).length === 0;
// // // // // // //   };

// // // // // // //   const handleSubmit = async (e) => {
// // // // // // //     e.preventDefault();
// // // // // // //     if (!validateForm()) return;

// // // // // // //     const endpoint = `${BASE_URL}/${modelType}${editMode ? `/${id}` : ''}`;
// // // // // // //     const method = editMode ? 'put' : 'post';

// // // // // // //     const formData = new FormData();
// // // // // // //     Object.keys(entityData).forEach((key) => {
// // // // // // //       formData.append(key, entityData[key]);
// // // // // // //     });
// // // // // // //     formData.append('ownerId', user._id);
// // // // // // //     formData.append('emailId', user.email);

// // // // // // //     photoFiles.forEach((file) => {
// // // // // // //       formData.append('photo', file);
// // // // // // //     });

// // // // // // //     try {
// // // // // // //       await axios({
// // // // // // //         method,
// // // // // // //         url: endpoint,
// // // // // // //         data: formData,
// // // // // // //         headers: { 'Content-Type': 'multipart/form-data' },
// // // // // // //       });
// // // // // // //       navigate('/');
// // // // // // //     } catch (error) {
// // // // // // //       console.error(`Error ${editMode ? 'updating' : 'creating'} the ${modelType}!`, error);
// // // // // // //       setErrors({ submit: 'Submission failed. Please try again later.' });
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleDelete = async (e) => {
// // // // // // //     e.preventDefault();
// // // // // // //     try {
// // // // // // //       await axios.delete(`${BASE_URL}/${modelType}/${id}`);
// // // // // // //       navigate('/');
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Error deleting the entity!", error);
// // // // // // //       setErrors({ delete: 'Deletion failed. Please try again later.' });
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <Container>
// // // // // // //       <Row>
// // // // // // //         <Col lg="12">
// // // // // // //           <h2>{editMode ? `Edit ${modelType}` : `Create ${modelType}`}</h2>
// // // // // // //           {errors.submit && <Alert color="danger">{errors.submit}</Alert>}
// // // // // // //           <Form onSubmit={handleSubmit}>
// // // // // // //             {modelSchemas[modelType]?.map((field) => (
// // // // // // //               <FormGroup key={field}>
// // // // // // //                 <Label for={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
// // // // // // //                 {field === 'photo' ? (
// // // // // // //                   <Input
// // // // // // //                     type="file"
// // // // // // //                     name={field}
// // // // // // //                     id={field}
// // // // // // //                     multiple
// // // // // // //                     onChange={handlePhotoChange}
// // // // // // //                   />
// // // // // // //                 ) : (
// // // // // // //                   <Input
// // // // // // //                     type={field === 'password' ? 'password' : 'text'}
// // // // // // //                     name={field}
// // // // // // //                     id={field}
// // // // // // //                     value={entityData[field] || ''}
// // // // // // //                     onChange={handleChange}
// // // // // // //                     required={field !== 'lng' && field !== 'lat' && field !== 'photo'}
// // // // // // //                   />
// // // // // // //                 )}
// // // // // // //                 {errors[field] && <Alert color="danger">{errors[field]}</Alert>}
// // // // // // //               </FormGroup>
// // // // // // //             ))}
// // // // // // //             <Button type="submit">{editMode ? 'Update' : 'Create'} {modelType}</Button>
// // // // // // //             {editMode && <Button onClick={handleDelete}>Delete {modelType}</Button>}
// // // // // // //           </Form>
// // // // // // //         </Col>
// // // // // // //       </Row>
// // // // // // //     </Container>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default EntityForm;



// // // // // // // // import React, { useState, useEffect, useContext } from 'react';
// // // // // // // // import axios from 'axios';
// // // // // // // // import { useNavigate, useParams } from 'react-router-dom';
// // // // // // // // import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
// // // // // // // // import { BASE_URL } from '../../utils/config';
// // // // // // // // import { AuthContext } from '../../context/AuthContext';

// // // // // // // // const modelSchemas = {
// // // // // // // //   cafe: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// // // // // // // //   hotel: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating', 'lng', 'lat'],
// // // // // // // //   location: ['name', 'category', 'subcategory', 'type', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating', 'lng', 'lat'],
// // // // // // // //   pharmacie: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// // // // // // // //   restaurant: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// // // // // // // //   travelagencie: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// // // // // // // //   people: ['name', 'category', 'subcategory', 'dob', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// // // // // // // // };

// // // // // // // // const EntityForm = ({ editMode = false }) => {
// // // // // // // //   const [entityData, setEntityData] = useState({});
// // // // // // // //   const [errors, setErrors] = useState({});
// // // // // // // //   const [photo, setPhoto] = useState(null);  // Track the photo file separately
// // // // // // // //   const { user } = useContext(AuthContext);
// // // // // // // //   const navigate = useNavigate();
// // // // // // // //   const { id } = useParams();
// // // // // // // //   const { modelType } = useParams();

// // // // // // // //   useEffect(() => {
// // // // // // // //     if (editMode && id) {
// // // // // // // //       axios.get(`${BASE_URL}/${modelType}/${id}`)
// // // // // // // //         .then(response => {
// // // // // // // //           setEntityData(response.data.data);
// // // // // // // //         })
// // // // // // // //         .catch(error => {
// // // // // // // //           console.error("There was an error fetching the data!", error);
// // // // // // // //         });
// // // // // // // //     }
// // // // // // // //   }, [editMode, id, modelType]);

// // // // // // // //   const validateFields = () => {
// // // // // // // //     let validationErrors = {};
// // // // // // // //     modelSchemas[modelType]?.forEach((field) => {
// // // // // // // //       if (!entityData[field] && field !== 'lng' && field !== 'lat' && field !== 'photo') {
// // // // // // // //         validationErrors[field] = `${field} is required`;
// // // // // // // //       }
// // // // // // // //       if (field === 'email' && entityData[field] && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(entityData[field])) {
// // // // // // // //         validationErrors[field] = 'Invalid email address';
// // // // // // // //       }
// // // // // // // //     });
// // // // // // // //     if (photo && !photo.type.startsWith('image/')) {
// // // // // // // //       validationErrors['photo'] = 'Photo must be an image file';
// // // // // // // //     }
// // // // // // // //     setErrors(validationErrors);
// // // // // // // //     return Object.keys(validationErrors).length === 0;
// // // // // // // //   };

// // // // // // // //   const handleChange = (e) => {
// // // // // // // //     const { name, value } = e.target;
// // // // // // // //     setEntityData({ ...entityData, [name]: value });
// // // // // // // //   };

// // // // // // // //   const handlePhotoChange = (e) => {
// // // // // // // //     const file = e.target.files[0];
// // // // // // // //     setPhoto(file);
// // // // // // // //   };

// // // // // // // //   const handleSubmit = (e) => {
// // // // // // // //     e.preventDefault();
// // // // // // // //     if (!validateFields()) return;

// // // // // // // //     const formData = new FormData();
// // // // // // // //     Object.keys(entityData).forEach((key) => {
// // // // // // // //       formData.append(key, entityData[key]);
// // // // // // // //     });
// // // // // // // //     if (photo) formData.append('photo', photo);
// // // // // // // //     formData.append('ownerId', user._id);
// // // // // // // //     formData.append('emailId', user.email);

// // // // // // // //     const endpoint = `${BASE_URL}/${modelType}${editMode ? `/${id}` : ''}`;
// // // // // // // //     const method = editMode ? 'put' : 'post';

// // // // // // // //     axios({
// // // // // // // //       method: method,
// // // // // // // //       url: endpoint,
// // // // // // // //       data: formData,
// // // // // // // //       headers: { 'Content-Type': 'multipart/form-data' },
// // // // // // // //     })
// // // // // // // //       .then(response => {
// // // // // // // //         navigate('/');
// // // // // // // //       })
// // // // // // // //       .catch(error => {
// // // // // // // //         console.error(`There was an error ${editMode ? 'updating' : 'creating'} the ${modelType}!`, error);
// // // // // // // //       });
// // // // // // // //   };

// // // // // // // //   const handleDelete = (e) => {
// // // // // // // //     e.preventDefault();
// // // // // // // //     axios.delete(`${BASE_URL}/${modelType}/${id}`)
// // // // // // // //       .then(response => {
// // // // // // // //         navigate('/');
// // // // // // // //       })
// // // // // // // //       .catch(error => {
// // // // // // // //         console.error(`There was an error deleting the ${modelType}!`, error);
// // // // // // // //       });
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <Container>
// // // // // // // //       <Row>
// // // // // // // //         <Col lg="12">
// // // // // // // //           <h2>{editMode ? `Edit ${modelType}` : `Create ${modelType}`}</h2>
// // // // // // // //           {Object.keys(errors).length > 0 && (
// // // // // // // //             <Alert color="danger">
// // // // // // // //               {Object.values(errors).map((error, idx) => (
// // // // // // // //                 <p key={idx}>{error}</p>
// // // // // // // //               ))}
// // // // // // // //             </Alert>
// // // // // // // //           )}
// // // // // // // //           <Form onSubmit={handleSubmit}>
// // // // // // // //             {modelSchemas[modelType]?.map((field) => (
// // // // // // // //               <FormGroup key={field}>
// // // // // // // //                 <Label for={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
// // // // // // // //                 {field === 'photo' ? (
// // // // // // // //                   <Input
// // // // // // // //                     type="file"
// // // // // // // //                     name={field}
// // // // // // // //                     id={field}
// // // // // // // //                     onChange={handlePhotoChange}
// // // // // // // //                     accept="image/*"
// // // // // // // //                   />
// // // // // // // //                 ) : (
// // // // // // // //                   <Input
// // // // // // // //                     type={field === 'password' ? 'password' : 'text'}
// // // // // // // //                     name={field}
// // // // // // // //                     id={field}
// // // // // // // //                     value={entityData[field] || ''}
// // // // // // // //                     onChange={handleChange}
// // // // // // // //                     required={field !== 'lng' && field !== 'lat' && field !== 'photo' && field !== 'role'}
// // // // // // // //                   />
// // // // // // // //                 )}
// // // // // // // //               </FormGroup>
// // // // // // // //             ))}
// // // // // // // //             <Button type="submit">{editMode ? 'Update' : 'Create'} {modelType}</Button>
// // // // // // // //             {editMode && <Button onClick={handleDelete}>Delete {modelType}</Button>}
// // // // // // // //           </Form>
// // // // // // // //         </Col>
// // // // // // // //       </Row>
// // // // // // // //     </Container>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default EntityForm;


// // // // // // // // // import React, { useState, useEffect, useContext } from 'react';
// // // // // // // // // import axios from 'axios';
// // // // // // // // // import { useNavigate, useParams } from 'react-router-dom';
// // // // // // // // // import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
// // // // // // // // // import { BASE_URL } from '../../utils/config';
// // // // // // // // // import { AuthContext } from '../../context/AuthContext';

// // // // // // // // // const modelSchemas = {
// // // // // // // // //   cafe: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// // // // // // // // //   hotel: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating', 'lng', 'lat'],
// // // // // // // // //   location: ['name', 'category', 'subcategory', 'type', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating', 'recommended', 'lng', 'lat'],
// // // // // // // // //   pharmacie: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// // // // // // // // //   restaurant: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// // // // // // // // //   travelagencie: ['name', 'category', 'subcategory', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// // // // // // // // //   people: ['name', 'category', 'subcategory', 'dob', 'city', 'address', 'email', 'photo', 'desc', 'contact', 'recommended', 'avgRating'],
// // // // // // // // //   // user: ['username', 'email', 'password', 'photo', 'role']
// // // // // // // // // }; 

// // // // // // // // // const EntityForm = ({ editMode = false }) => {
// // // // // // // // //   const [entityData, setEntityData] = useState({});
// // // // // // // // //   const {user, dispatch} = useContext(AuthContext)
// // // // // // // // //   const navigate = useNavigate();
// // // // // // // // //   const { id } = useParams();
// // // // // // // // //   const { modelType } = useParams();
// // // // // // // // //   console.log(modelType)
// // // // // // // // //   console.log(user)

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (editMode && id) {
// // // // // // // // //       axios.get(`${BASE_URL}/${modelType}/${id}`)
// // // // // // // // //         .then(response => {
// // // // // // // // //           setEntityData(response.data.data);
// // // // // // // // //         })
// // // // // // // // //         .catch(error => {
// // // // // // // // //           console.error("There was an error fetching the data!", error);
// // // // // // // // //         });
// // // // // // // // //     }
// // // // // // // // //   }, [editMode, id, modelType]);

// // // // // // // // //   const handleChange = (e) => {
// // // // // // // // //     const { name, value } = e.target;
// // // // // // // // //     setEntityData({ ...entityData, [name]: value });
// // // // // // // // //   };

// // // // // // // // //   const handleSubmit = (e) => {
// // // // // // // // //     e.preventDefault();
// // // // // // // // //     const endpoint = `${BASE_URL}/${modelType}${editMode ? `/${id}` : ''}`;
// // // // // // // // //     console.log(endpoint)
// // // // // // // // //     const method = editMode ? 'put' : 'post';
// // // // // // // // //     entityData.ownerId = user._id;
// // // // // // // // //     entityData.emailId = user.email;
// // // // // // // // //     console.log(entityData)

// // // // // // // // //     axios[method](endpoint, entityData)
// // // // // // // // //       .then(response => {
// // // // // // // // //         navigate('/');
// // // // // // // // //       })
// // // // // // // // //       .catch(error => {
// // // // // // // // //         console.error(`There was an error ${editMode ? 'updating' : 'creating'} the ${modelType}!`, error);
// // // // // // // // //       });
// // // // // // // // //   };

// // // // // // // // //   const handleDelete = (e) => {
// // // // // // // // //     e.preventDefault();
// // // // // // // // //       axios.delete(`${BASE_URL}/${modelType}/${id}`)
// // // // // // // // //         .then(response => {
// // // // // // // // //             navigate('/');
// // // // // // // // //         })
// // // // // // // // //         .catch(error => {
// // // // // // // // //           console.error("There was an error deleting the hotel!", error);
// // // // // // // // //         });
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <Container>
// // // // // // // // //       <Row>
// // // // // // // // //         <Col lg="12">
// // // // // // // // //           <h2>{editMode ? `Edit ${modelType}` : `Create ${modelType}`}</h2>
// // // // // // // // //           <Form onSubmit={handleSubmit}>
// // // // // // // // //             {modelSchemas[modelType]?.map((field) => (
// // // // // // // // //               <FormGroup key={field}>
// // // // // // // // //                 <Label for={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
// // // // // // // // //                 <Input
// // // // // // // // //                   type={field === 'password' ? 'password' : 'text'}
// // // // // // // // //                   name={field}
// // // // // // // // //                   id={field}
// // // // // // // // //                   value={entityData[field] || ''}
// // // // // // // // //                   onChange={handleChange}
// // // // // // // // //                   required={field !== 'lng' && field !== 'lat' && field !== 'photo' && field !== 'role'}
// // // // // // // // //                 />
// // // // // // // // //               </FormGroup>
// // // // // // // // //             ))}
// // // // // // // // //             <Button type="submit">{editMode ? 'Update' : 'Create'} {modelType}</Button>
// // // // // // // // //             <Button onClick={handleDelete}>Delete {modelType}</Button>
// // // // // // // // //           </Form>
// // // // // // // // //         </Col>
// // // // // // // // //       </Row>
// // // // // // // // //     </Container>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default EntityForm;