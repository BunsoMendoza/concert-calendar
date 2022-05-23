import React, { useEffect, useState } from "react";
import { Container, Row, Col} from "react-bootstrap";
import * as queries from '../../graphql/queries';
import { API } from 'aws-amplify';
function CalendarList() {

    const [toDoList, setToDoList] = useState([]);

    const getUserEvents = async () => {
        const allTodos = await API.graphql({ query: queries.listTodos, authMode: "AMAZON_COGNITO_USER_POOLS" }).then(() => setToDoList(allTodos.data.items));

        
      }
    
      useEffect(() => {
        getUserEvents();
        console.log(toDoList);    
      }, []);

      if (toDoList.length == 0) {
        return (
          <div>
            
              <Container className="calendar-list-content">
                <h1> Loading...</h1>
              </Container>
            
          </div>
        );
      } else {
      }

}
export default CalendarList;