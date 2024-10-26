import React, { useState, useEffect } from 'react';
import '../../styles/cafes.css';
import EntityCard from '../EntityCard';
import CommonSection from '../CommonSection';
import { Col, Container, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { BASE_URL } from '../../utils/config';
import GoogleMapComponent from '../GoogleMapComponent';

const DynamicEntities = () => {
  const { modelType } = useParams();
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const { data: entities, loading, error } = useFetch(`${BASE_URL}/${modelType}?page=${page}`);
  const { data: entityCount } = useFetch(`${BASE_URL}/${modelType}/search/count`);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (entityCount) {
      const pages = Math.ceil(entityCount / 8);
      setPageCount(pages);
    }
  }, [page, entityCount]);

  return (
    <>
      <CommonSection title={`All ${modelType.charAt(0).toUpperCase() + modelType.slice(1)}s`} />
      <section>
        <Container>
          {loading && <h4 className="text-center pt-5">Loading...</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              {entities?.map((entity) => (
                <Col lg="3" md="6" sm="6" key={entity._id}>
                  <EntityCard entity={entity} modelType={modelType} />
                </Col>
              ))}
              <Col lg="12">
                <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                  {[...Array(pageCount).keys()].map((number) => (
                    <span
                      key={number}
                      onClick={() => setPage(number)}
                      className={page === number ? 'active__page' : ''}
                    >
                      {number + 1}
                    </span>
                  ))}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <GoogleMapComponent />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default DynamicEntities;
