import React from 'react';
import '../App.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const NAV = () => {
  // Fungsi untuk menangani klik menu dengan smooth scrolling
  const handleSmoothScroll = (target) => {
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">NAV</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <button className="nav-link" onClick={() => handleSmoothScroll('berita')}>Berita Terbaru</button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={() => handleSmoothScroll('berita-lama')}>Berita Lama</button>
            </li>
          </ul>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NAV;
