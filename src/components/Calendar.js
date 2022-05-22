import React from "react";
import { Container } from "react-bootstrap";

import Footer from "./Footer";

function Calendar() {
 

  return (
    <div>
      <Container fluid className="calendar-page">
        <Container className="calendar-content">
          <h1 className="project-heading">
            <strong className="blue">Calendar Header</strong>
          </h1>
        </Container>
      </Container>
      <Footer />
    </div>
  );
}
export default Calendar;
