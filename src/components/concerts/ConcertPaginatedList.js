import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import * as mutations from "../../graphql/mutations";
import { API } from "aws-amplify";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    
    const concertDetails = {
      name: item.displayName.split(" (")[0],
      id: item.id,
    };
    
    const addConcert = API.graphql({
      query: mutations.createTodo,
      variables: { input: concertDetails },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }).then(() => toast("Concert added!"));
  };

  useEffect(() => {
    props.onSetPageNumber(currentPage);
    window.scrollTo(0, 0);
  }, [currentPage]);

  if (list.length === 0) {
    return (
      <div>
        <Container fluid className="empty-concert-list">
          <Container className="concert-list-content">
            <h1> Loading...</h1>
          </Container>
        </Container>
      </div>
    );
  } else {
    list.sort((a, b) =>
      a.start.datetime > b.start.datetime
        ? 1
        : a.start.datetime === b.start.datetime
        ? a.start.time > b.start.time
          ? 1
          : a.start.time === b.start.time
          ? a.displayName > b.displayName
            ? 1
            : -1
          : -1
        : -1
    );
    return (
      <div>
        <div className="top-paginated-buttons">
          <h4>
            Page {currentPage} of {numberOfPages}
          </h4>
          <button className="page-buttons" onClick={() => decrementPageNumber()}>Previous</button>
          <button className="page-buttons" onClick={() => incrementPageNumber()}>Next</button>
        </div>

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
                    <a
                      onClick={(e) => {
                        handleAddClick(e, item);
                      }}
                      className="custom-link"
                      style={{ color: "yellow" }}
                    >
                      +
                    </a>
                  </Col>
                </Row>
              </li>
            );
          })}
        </Container>
        <ToastContainer />
        <div className="bottom-paginate-buttons">
          <button className="page-buttons" onClick={() => decrementPageNumber()}>Previous</button>
          <button className="page-buttons" onClick={() => incrementPageNumber()}>Next</button>
          <h4>
            Page {currentPage} of {numberOfPages}
          </h4>
        </div>
      </div>
    );
  }
}
export default ConcertPaginatedList;
