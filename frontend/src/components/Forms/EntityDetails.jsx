import React, { useEffect } from 'react';
import '../../styles/entreprise-details.css';
import { Container, Row, Col } from 'reactstrap';
import { useParams, Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
// import QRCode from 'qrcode.react';  // For the QR Code
import QRCode from "react-qr-code";
import useFetch from '../../hooks/useFetch';
import { BASE_URL } from '../../utils/config';

const EntityDetails = () => {
  const { modelType, id } = useParams();

  // Fetch data from the database
  const { data: entity, loading, error } = useFetch(`${BASE_URL}/${modelType}/${id}`);
  const entityDetailLink = `${window.location.origin}/${modelType}/${id}`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [entity]);

  if (loading) return <h4 className="text-center pt-5">Loading...</h4>;
  if (error) return <h4 className="text-center pt-5">{error}</h4>;

  return (
    <>
      <section>
        <Container>
          {loading && <h4 className="text-center pt-5">Loading...</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              <Col lg="8">
                <div className="hotel__info">
                  <h2>{entity.name}</h2>
                  <div className="hotel__content">
                    {/* Carousel for entity photos */}
                    {entity.photo && entity.photo.length > 0 && (
                      <Carousel>
                        {entity.photo.map((photo, index) => (
                          <Carousel.Item key={index}>
                            <img
                              className="d-block w-100"
                              src={photo}
                              alt={`Slide ${index}`}
                            />
                          </Carousel.Item>
                        ))}
                      </Carousel>
                    )}

                    <div className="d-flex align-items-center gap-5 mt-3">
                      <span className="entreprise__restaurant d-flex align-items-center gap-1">
                        <i className="ri-map-pin-fill" style={{ color: 'var(--secondary-color)' }}></i>
                        {entity.city}
                      </span>
                      <span className="entreprise___rating d-flex align-items-center gap-1">
                        <i className="ri-star-fill" style={{ color: 'var(--secondary-color)' }}></i>
                        {entity.avgRating}
                      </span>
                    </div>
                  </div>

                  <div className="hotel__extra-details">
                    <h6>{entity.address}</h6>
                    <span>
                      <i className="ri-phone-fill" style={{ color: 'var(--secondary-color)' }}></i>
                      {entity.contact}
                    </span>
                    <span>
                      <i className="ri-mail-fill" style={{ color: 'var(--secondary-color)' }}></i>
                      {entity.email}
                    </span>
                    <h6>Description</h6>
                    <p>{entity.desc}</p>
                  </div>

                  {/* QR Code for the detail page link */}
                  <div className="mt-4">
                    <h6>Scan for Details</h6>
                    <QRCode value={entityDetailLink} size={128} />
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
    </>
  );
};

export default EntityDetails;


// import React, { useEffect } from 'react';
// import '../../styles/entreprise-details.css';
// import { Container, Row, Col } from 'reactstrap';
// import { useParams } from 'react-router-dom';
// import useFetch from '../../hooks/useFetch';
// import { BASE_URL } from '../../utils/config';

// const EntityDetails = () => {
//   const { modelType, id } = useParams();

//   // Fetch data from the database
//   const { data: entity, loading, error } = useFetch(`${BASE_URL}/${modelType}/${id}`);
//   console.log(entity)
//   console.log(entity.photo)
//   console.log(entity.image)
//   // console.log(entity?.photo[0])

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [entity]);

//   if (loading) return <h4 className="text-center pt-5">Loading...</h4>;
//   if (error) return <h4 className="text-center pt-5">{error}</h4>;

//   return (
//     <>
//     <section>
//         <Container>
//           {loading && <h4 className="text-center pt-5">Loading...</h4>}
//           {error && <h4 className="text-center pt-5">{error}</h4>}
//           {!loading && !error && (
//             <Row>
//               <Col lg="8">
//                 <div className="hotel__info">
//                   <h2>{entity.name}</h2>
//                   <div className="hotel__content">
//                     <img src={entity.image} alt="" />
//                     <div className="d-flex align-items-center gap-5">
//                       <span className="entreprise__restaurant d-flex align-items-center gap-1">
//                         <i
//                           className="ri-map-pin-fill"
//                           style={{ color: 'var(--secondary-color)' }}
//                         ></i>{' '}
//                         {entity.city}
//                       </span>
//                       <span className="entreprise___rating d-flex align-items-center gap-1">
//                         <i
//                           className="ri-star-fill"
//                           style={{ color: 'var(--secondary-color)' }}
//                         ></i>{' '}
//                         {entity.avgRating}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="hotel__extra-details">
//                     <h6>{entity.address}</h6>
//                     <span>
//                       <i
//                         className="ri-phone-fill"
//                         style={{ color: 'var(--secondary-color)' }}
//                       ></i>{' '}
//                       {entity.contact}
//                     </span>
//                     <span>
//                       <i
//                         className="ri-mail-fill"
//                         style={{ color: 'var(--secondary-color)' }}
//                       ></i>{' '}
//                       {entity.email}
//                     </span>
//                     <h6>Description</h6>
//                     <p>{entity.desc}</p>
//                   </div>
//                 </div>
//               </Col>
//             </Row>
//           )}
//         </Container>
//       </section>
//       <section>
//         <Container>
//           <Row>
//             <Col lg="8">
//               <div className="entity__info">
//                 <h2>{entity.name}</h2>
//                 <div className="entity__content">
//                   <img src={entity.image} alt="" />
//                   <div className="d-flex align-items-center gap-5">
//                     <span className="entity__location d-flex align-items-center gap-1">
//                       <i className="ri-map-pin-fill" style={{ color: 'var(--secondary-color)' }}></i>
//                       {entity.city}
//                     </span>
//                     {entity.avgRating && (
//                       <span className="entity__rating d-flex align-items-center gap-1">
//                         <i className="ri-star-fill" style={{ color: 'var(--secondary-color)' }}></i>
//                         {entity.avgRating}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//                 <div className="entity__extra-details">
//                   <h6>{entity.address}</h6>
//                   {entity.contact && (
//                     <span>
//                       <i className="ri-phone-fill" style={{ color: 'var(--secondary-color)' }}></i>
//                       {entity.contact}
//                     </span>
//                   )}
//                   {entity.email && (
//                     <span>
//                       <i className="ri-mail-fill" style={{ color: 'var(--secondary-color)' }}></i>
//                       {entity.email}
//                     </span>
//                   )}
//                   <h6>Description</h6>
//                   <p>{entity.desc}</p>
//                 </div>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </section>
//     </>
//   );
// };

// export default EntityDetails;