import axios from "axios";
import React, { useState, useEffect } from 'react';

/*
upcoming events by artist name
https://api.songkick.com/api/3.0/artists/{artist_id}/calendar.json?apikey={your_api_key}
id
displayName
uri
*/


/*
Get venue id by name
https://api.songkick.com/api/3.0/search/venues.json?query={venue_name}&apikey={your_api_key}
id
displayName
city{displayName,country}
description
uri

upcoming events by venue
https://api.songkick.com/api/3.0/venues/{venue_id}/calendar.json?apikey={your_api_key}
*/

/*
Event Details
fetchQuery = https://api.songkick.com/api/3.0/events/{event_id}.json?apikey={your_api_key}
ageRestriction
displayName
flaggedAsEnded
id
location{city,long,lat}
performance[]
start{data, datetime,time}
popularity
venue{id,displayName}
*/
/*
metroarea id by name 
https://api.songkick.com/api/3.0/search/locations.json?query={input}&apikey=m9qVXGhOvdZmmUQs
city{displayName,country} 
metroArea{id uri}


metroarea upcoming events
https://api.songkick.com/api/3.0/metro_areas/{metro_area_id}/calendar.json?apikey={your_api_key}
let fetchQuery = 'https://api.songkick.com/api/3.0/events.json?apikey=m9qVXGhOvdZmmUQs&location=sk:2846';
*/

/*
https://api.songkick.com/api/3.0/search/locations.json?location=clientip&apikey=m9qVXGhOvdZmmUQs
location{metroArea{country{displayName}, uri, state{displayName}, displayName, id}}
*/

import ConcertPaginatedList from "./ConcertPaginatedList";


let emptyData = {
  concertList: [],
  totalEntries: 0,
  currentPage: 1
}


let apiProp = {
  apikey: "m9qVXGhOvdZmmUQs",
  seattleEventId: '2846'
};





function SearchHandling(props) {
  const localProps = {
    ...props
  }
  const [myData, setMyData] = useState(null);
  const [isLoaded, setisLoaded] = useState(false);
  const[pageNumber, setPageNumber] = useState(0);
  useEffect(() => {
    setisLoaded(false);
    getUpcomingEventsByClientIP();
    console.log(myData);
    console.log(props);

  }, [pageNumber]);
  const handlePageNumberChange = (page) =>{
    setPageNumber(page);
  }

  useEffect(() => {
    setisLoaded(false);
    getUpcomingEventsByClientIP();
    console.log(myData);
    console.log(props);

  }, [props.searchQuery, pageNumber]);

  const getUpcomingEventsByClientIP = async () => {
    const data = {
      concertList: [],
      totalEntries: 0,
      currentPage: 1
    }
    var getData;

    if (props.searchQuery == '') {

      const metroAreaData = await axios.get('https://api.songkick.com/api/3.0/search/locations.json?location=clientip&apikey=' + apiProp.apikey);
      const metroAreaID = metroAreaData.data.resultsPage.results.location[0].metroArea.id;
      getData = await axios.get('https://api.songkick.com/api/3.0/metro_areas/' + metroAreaID + '/calendar.json?apikey=' + apiProp.apikey + '&page=' + pageNumber);

    } else {
        // may get incorrect city. need to add another drop down to choose state of city and crossrefrence after call to select the correct metro id
      if (localProps.searchType == "City Metro Area") {
        const metroAreaData = await axios.get('https://api.songkick.com/api/3.0/search/locations.json?query=' + props.searchQuery + '&apikey=' + apiProp.apikey);
        const metroAreaResponse = metroAreaData.data.resultsPage.results;
        if (metroAreaResponse.length != 0) {
          const metroAreaID = metroAreaResponse.location[0].metroArea.id;
          getData = await axios.get('https://api.songkick.com/api/3.0/metro_areas/' + metroAreaID + '/calendar.json?apikey=' + apiProp.apikey + '&page=' + pageNumber);
          console.log(getData);
        }

      } else if (props.searchType == "Venue") {
        const venueData = await axios.get('https://api.songkick.com/api/3.0/search/venues.json?query=' + props.searchQuery + '&apikey=' + apiProp.apikey);
        const venueDataResponse = venueData.data.resultsPage.results;
        if (venueDataResponse.length != 0) {
          const venueID = venueDataResponse.venue[0].id;
          getData = await axios.get('https://api.songkick.com/api/3.0/venues/' + venueID + '/calendar.json?apikey=' + apiProp.apikey);
          console.log(getData);
        }

      } else if (props.searchType == "Artist") {
        const artistData = await axios.get('https://api.songkick.com/api/3.0/search/artists.json?query=' + props.searchQuery + '&apikey=' + apiProp.apikey + '&page=' + pageNumber);
        const artistDataResponse = artistData.data.resultsPage.results;
        if (artistDataResponse.length != 0) {
          const artistID = artistDataResponse.artist[0].id;
          getData = await axios.get('https://api.songkick.com/api/3.0/artists/' + artistID + '/calendar.json?apikey=' + apiProp.apikey);
          console.log(getData);
        }

      }

    }

    data.concertList = getData.data.resultsPage.results.event;
    data.totalEntries = getData.data.resultsPage.totalEntries;
    data.currentPage = getData.data.resultsPage.page;
    data.concertList.forEach(item => {
      if (item.start.time == null) {
        item.start.datetime = item.start.date;
        item.start.time = "N/A";
      } else {
        //formating time
        item.start.time = new Date(item.start.datetime).toLocaleTimeString();
        var splitTime = item.start.time.split(":");
        item.start.time = splitTime[0] + ":" + splitTime[1] + splitTime[2].substring(2, splitTime[2].length);
      }
      var temp = "";
      item.performance.forEach(performer => {
        temp += performer.displayName;
        if (item.performance.indexOf(performer) < item.performance.length - 1) {
          temp += ", ";
        }
      });
      item.performance = temp;
    }


    );
    if (getData != null) {
      setMyData(data);
      setisLoaded(true);
    

    }




  }



  if (!isLoaded) {
    return (
      <ConcertPaginatedList data={emptyData} onSetPageNumber={handlePageNumberChange}/>
    );
  }
  return (
    <ConcertPaginatedList data={myData} onSetPageNumber={handlePageNumberChange}/>
  );
}
export default SearchHandling;