import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import * as queries from '../../graphql/queries';
import { API } from 'aws-amplify';
import Footer from "../Footer";
import CalendarList from "./CalendarList";


function Calendar() {
  



  return (
    <div>
      <Container fluid className="calendar-page">
        <Container className="calendar-content">
          <h1>Calendar</h1>
          <CalendarList />
        </Container>
      </Container>
      <Footer />
    </div>
  );
}
export default Calendar;
