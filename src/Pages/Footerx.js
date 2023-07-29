import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="mt-auto py-2 bg-light">
      <Container>
        <Row>
          <Col className="d-flex align-items-center justify-content-center">
            <p>&copy; {new Date().getFullYear()} Terima Kasih</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
