import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Footer from "../footer/Footer";
import CalendarList from "./CalendarList";


function Calendar() {
  
  return (
    <div>
      <Container fluid className="calendar-page">
        <Container className="concert-list">
    
          <CalendarList />
        </Container>
      </Container>
      <Footer />
    </div>
  );
}
export default Calendar;
