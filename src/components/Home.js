import React from "react";
import { Container, Row } from "react-bootstrap";
import Footer from "./Footer";


function Home() {
  return (
    <div>
      <Container fluid className="home-section">
        <Container className="home-content">

          <h1 className="project-heading">
            <strong className="blue">Home Header</strong>
          </h1>
          

          <p className="blue">we need content here!</p>

        </Container>

      </Container>
      <Footer />
    </div>
  );
}

export default Home;
