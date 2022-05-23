import React, { useEffect, useState } from "react";
import { Container, Row, Col} from "react-bootstrap";
import * as queries from '../../graphql/queries';
import { API } from 'aws-amplify';
function CalendarList() {

    const [toDoList, setToDoList] = useState([]);

    const getUserEvents = async () => {
        const allTodos = await API.graphql({ query: queries.listTodos, authMode: "AMAZON_COGNITO_USER_POOLS" });
        setToDoList(allTodos.data.items);
        console.log(toDoList);
      }
    
      useEffect(() => {
        getUserEvents();  
      }, []);


}
export default CalendarList;