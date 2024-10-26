import React from 'react';
import { Container } from 'reactstrap';

const CommonSection = ({ title }) => {
  return (
    <section className="common__section">
      <Container>
        <h2 className="section__title">{title}</h2>
      </Container>
    </section>
  );
};

export default CommonSection;
