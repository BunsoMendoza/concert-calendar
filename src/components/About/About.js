import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Aboutcard from "./AboutCard";



function About() {
  return (
    <Container fluid className="about-section">
      
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
             <strong className="blue">About</strong>
            </h1>
            <Aboutcard />
          </Col>
          <Col
            md={5}
            style={{ paddingTop: "120px", paddingBottom: "50px" }}
            className="about-img"
          >
            
          </Col>
        </Row>
        <h1 className="project-heading">
          <strong className="blue">Header 1</strong>
        </h1>

      

        <h1 className="project-heading">
          <strong className="blue">Header 2</strong>
        </h1>
      

    
      </Container>
    </Container>
  );
}

export default About;