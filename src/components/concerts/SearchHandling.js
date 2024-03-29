import axios from "axios";
import React, { useState, useEffect } from "react";

import ConcertPaginatedList from "./ConcertPaginatedList";

let emptyData = {
  concertList: [],
  totalEntries: 0,
  currentPage: 1,
};
//SEATGEEK API : NTUwMDgwMXwxNjcwNjQ4NjQ0Ljc2MTE4Njg
let apiProp = {
  apikey: "m9qVXGhOvdZmmUQs",
};

function SearchHandling(props) {
  const localProps = {
    ...props,
  };
  const [myData, setMyData] = useState(null);
  const [isLoaded, setisLoaded] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [foundLocation, setFoundLocation] = useState(false);

  useEffect(() => {
    setisLoaded(false);
    getUpcomingEventsByClientIP();
  }, [pageNumber]);

  const handlePageNumberChange = (page) => {
    setPageNumber(page);
  };

  useEffect(() => {
    setisLoaded(false);
    getUpcomingEventsByClientIP();
  }, [props.searchQuery, pageNumber]);

  const getUpcomingEventsByClientIP = async () => {
    const data = {
      concertList: [],
      totalEntries: 0,
      currentPage: 1,
    };
    var getData;

    if (props.searchQuery === "") {
      //get metro area ID by clientIP
      const metroAreaData = await axios.get(
        "https://api.songkick.com/api/3.0/search/locations.json?location=clientip&apikey=" +
          apiProp.apikey
      );

      const metroAreaID =
        metroAreaData.data.resultsPage.results.location[0].metroArea.id;

      //get metro area upcoming events
      getData = await axios.get(
        "https://api.songkick.com/api/3.0/metro_areas/" +
          metroAreaID +
          "/calendar.json?apikey=" +
          apiProp.apikey +
          "&page=" +
          pageNumber
      );
    } else {
      // may get incorrect city. need to add another drop down to choose state of city and crossrefrence after call to select the correct metro id
      if (localProps.searchType === "City Metro Area") {
        //get metro area ID by string input
        const metroAreaData = await axios.get(
          "https://api.songkick.com/api/3.0/search/locations.json?query=" +
            props.searchQuery +
            "&apikey=" +
            apiProp.apikey
        );
        var metroAreaResponse = metroAreaData.data.resultsPage.results;
   
        if (metroAreaResponse.length !== 0) {
         
          var length = metroAreaResponse.location.length;
          var searchIndex = 0;

          while (searchIndex < length) {
     
            if ('state' in metroAreaResponse.location[searchIndex].metroArea) {
              if (metroAreaResponse.location[searchIndex].metroArea.state.displayName === props.searchState) {
                break;
              }
            }     
              searchIndex++;
          }

          const metroAreaID = metroAreaResponse.location[searchIndex].metroArea.id;
          //get metro area upcoming events
          getData = await axios.get(
            "https://api.songkick.com/api/3.0/metro_areas/" +
              metroAreaID +
              "/calendar.json?apikey=" +
              apiProp.apikey +
              "&page=" +
              pageNumber
          );
        }
      } else if (props.searchType === "Venue") {
        //get venue ID by string input
        const venueData = await axios.get(
          "https://api.songkick.com/api/3.0/search/venues.json?query=" +
            props.searchQuery +
            "&apikey=" +
            apiProp.apikey
        );
        const venueDataResponse = venueData.data.resultsPage.results;
        if (venueDataResponse.length !== 0) {
          const venueID = venueDataResponse.venue[0].id;
          //get upcoming events by venue
          getData = await axios.get(
            "https://api.songkick.com/api/3.0/venues/" +
              venueID +
              "/calendar.json?apikey=" +
              apiProp.apikey
          );
        }
      } else if (props.searchType === "Artist") {
        //get artist ID by string input
        const artistData = await axios.get(
          "https://api.songkick.com/api/3.0/search/artists.json?query=" +
            props.searchQuery +
            "&apikey=" +
            apiProp.apikey +
            "&page=" +
            pageNumber
        );
        const artistDataResponse = artistData.data.resultsPage.results;
        if (artistDataResponse.length !== 0) {
          const artistID = artistDataResponse.artist[0].id;
          //get upcoming events by artist
          getData = await axios.get(
            "https://api.songkick.com/api/3.0/artists/" +
              artistID +
              "/calendar.json?apikey=" +
              apiProp.apikey
          );
        }
      }
    }

    data.concertList = getData.data.resultsPage.results.event;
    data.totalEntries = getData.data.resultsPage.totalEntries;
    data.currentPage = getData.data.resultsPage.page;
    data.concertList.forEach((item) => {
      if (item.start.time === null) {
        item.start.datetime = item.start.date;
        item.start.time = "N/A";
      } else {
        //formating time
        item.start.time = new Date(item.start.datetime).toLocaleTimeString();
        var splitTime = item.start.time.split(":");
        item.start.time =
          splitTime[0] +
          ":" +
          splitTime[1] +
          splitTime[2].substring(2, splitTime[2].length);
      }
      var temp = "";
      item.performance.forEach((performer) => {
        temp += performer.displayName;
        if (item.performance.indexOf(performer) < item.performance.length - 1) {
          temp += ", ";
        }
      });
      item.performance = temp;
    });

    if (getData !== null) {
      setMyData(data);
      setisLoaded(true);
    }
  };

  if (!isLoaded) {
    return (
      <ConcertPaginatedList
        data={emptyData}
        onSetPageNumber={handlePageNumberChange}
      />
    );
  }
  return (
    <ConcertPaginatedList
      data={myData}
      onSetPageNumber={handlePageNumberChange}
    />
  );
}
export default SearchHandling;
