import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import { API } from "aws-amplify";
import axios from "axios";
import CalendarTable from "./CalendarTable";

function CalendarList() {
  const [toDoList, setToDoList] = useState([]);
  const [isLoaded, setisLoaded] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  var concertData;
  var concertDataArray = [];
  var eventData;
  useEffect(() => {
    setisLoaded(false);
    getUserEventIDs().catch(console.error);
    
  }, []);
  const getUserEventIDs = async () => {
    concertData = await API.graphql({
      query: queries.listTodos,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }).then((data) => {
      setItemCount(data.data.listTodos.items.length);
      data.data.listTodos.items.forEach((item) => {
        
        getUserEvents(item.id);
      });
    }).then((data) => {; 

    if(concertData !== null){
    setToDoList(concertDataArray);
    setisLoaded(true);
   
    }
  });
  };

  const getUserEvents = async (item) => {
    
    await axios
      .get(
        "https://api.songkick.com/api/3.0/events/" +
          item +
          ".json?apikey=m9qVXGhOvdZmmUQs"
      )
      .then((data) => {
        eventData = data.data.resultsPage.results.event;
        if (eventData.start.time === null) {
          eventData.start.datetime = eventData.start.date;
          eventData.start.time = "N/A";
        } else {
          //formating time
          eventData.start.time = new Date(
            eventData.start.datetime
          ).toLocaleTimeString();
          var splitTime = eventData.start.time.split(":");
          eventData.start.time =
            splitTime[0] +
            ":" +
            splitTime[1] +
            splitTime[2].substring(2, splitTime[2].length);
        }
        var temp = "";
        eventData.performance.forEach((performer) => {
          temp += performer.displayName;
          if (
            eventData.performance.indexOf(performer) <
            eventData.performance.length - 1
          ) {
            temp += ", ";
          }
        })
        eventData.performance = temp;

        concertDataArray.push(eventData);
      });
  };

  

 if(!isLoaded){
  return (<CalendarTable data={[]} itemCount={0}/>);
 }else{
  return (<CalendarTable data={toDoList} itemCount={itemCount}/>);
  }
}
export default CalendarList;
