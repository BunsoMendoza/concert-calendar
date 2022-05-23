import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import * as queries from '../../graphql/queries';
import { API } from 'aws-amplify';
import Footer from "../Footer";

function Calendar() {
  
  const getUserEvents = async () => {
    const allTodos = await API.graphql({ query: queries.listTodos, authMode: "AMAZON_COGNITO_USER_POOLS" });
    console.log(allTodos);
  }

  useEffect(() => {
    getUserEvents();  
  }, []);

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
