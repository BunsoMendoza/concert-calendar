import React, { useEffect,useState} from "react";
import { Container, Row, Col } from "react-bootstrap";
import * as mutations from "../../graphql/mutations";
import { API } from "aws-amplify";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function CalendarTable(props) { 
  const [list, setToDoList] = useState([]);
  const [isLoaded, setisLoaded] = useState(false);
  

  useEffect(() => {
  
   
    if(props.itemCount !== 0){ 
      setToDoList(props.data);
     
      //delayed this for a quick fix for async data bug
      const timer = setTimeout(() => {
        setisLoaded(true);
       
    
      }, 1000);
      return () => clearTimeout(timer);
    } 
  }, [props]);

  const handleDeleteClick = (event, item) => {
    event.preventDefault();

    const concertDetails = {
      id: item.id,
    };

    API.graphql({
      query: mutations.deleteTodo,
      variables: { input: concertDetails },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }).then(() => toast("Concert Deleted!"));
     
  }; 
 
  if (!isLoaded) {
    return (
      <div> 
        <Container className="concert-list-content">
          <h1> Loading...</h1>
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
                        <a
                          onClick={(e) => {
                            handleDeleteClick(e, item);
                          }}
                          style={{ color: "blue" }}
                          className="custom-link"
                        > 
                          Remove
                        </a>
                      </Col>
                    </Row>
                  </li> 
                );
              })}
           
          </Container>
        </Container>
        <ToastContainer />
      </div>
    );
  }
}
export default CalendarTable;
