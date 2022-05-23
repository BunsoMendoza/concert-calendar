import React, { useEffect, useState } from "react";
import { Container, Row, Col} from "react-bootstrap";
import * as mutations from '../../graphql/mutations';
import { API } from "aws-amplify";
function ConcertPaginatedList(props) {
  const list = props.data.concertList;
  const [currentPage, setCurrentPage] = useState(props.data.currentPage);

  const numberOfPages = Math.ceil(props.data.totalEntries / 50);

  function incrementPageNumber() {
    if (currentPage !== numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  }
  function decrementPageNumber() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handleAddClick = (event, item) => {
    event.preventDefault();

    console.log(item);
    const concertDetails = {
      name: item.displayName.split(" (")[0],
      id: item.id
  
    };
    const addConcert = API.graphql({ query: mutations.createTodo, variables: {input: concertDetails}, authMode: "AMAZON_COGNITO_USER_POOLS" }).then(() => alert("it worked!"));

  }

  useEffect(() => {
    props.onSetPageNumber(currentPage);
  }, [currentPage]);

  if (list.length == 0) {
    return (
      <div>
        <Container fluid className="concert-list">
          <Container className="concert-list-content">
            <h1> Loading...</h1>
          </Container>
        </Container>
      </div>
    );
  } else {
    return (
      <div>
        <Container fluid className="concert-list">
          <Container className="concert-list-content">
            <div className="list-group-item" id="list-item">
              <Row>
                <Col md="3">
                  <strong>Event</strong>
                </Col>
                <Col md="2">
                  <strong>Location</strong>
                </Col>
                <Col md="1">
                  <strong>Date</strong>
                </Col>
                <Col md="1">
                  <strong>Time</strong>
                </Col>
                <Col md="2">
                  <strong>Venue</strong>
                </Col>
                <Col md="2">
                  <strong>Scheduled Performers</strong>
                </Col>
                <Col md="1"></Col>
              </Row>
            </div>

            {list.map((item) => {
              return (
                <li
                  href="#"
                  className="list-group-item list-group-item-action"
                  id="list-item"
                >
                  <Row>
                    <Col md="3">{item.displayName.split(" (")[0]}</Col>
                    <Col md="2">
                      {item.location["city"].substring(
                        0,
                        item.location["city"].length - 4
                      )}
                    </Col>
                    <Col md="1">
                      {new Date(item.start.datetime).toLocaleDateString()}
                    </Col>
                    <Col md="1">{item.start.time}</Col>
                    <Col md="2">{item.venue.displayName}</Col>
                    <Col md="2">{item.performance}</Col>
                    <Col md="1">
                      <a onClick={(e) => {handleAddClick(e, item);}} style={{color: "blue"}}>Add</a>
                    </Col>
                  </Row>
                </li>
              );
            })}
          </Container>
        </Container>
        <button onClick={() => decrementPageNumber()}>Previous</button>
        <button onClick={() => incrementPageNumber()}>Next</button>
        <h4>
          Page {currentPage} of {numberOfPages}
        </h4>
      </div>
    );
  }
}
export default ConcertPaginatedList;
