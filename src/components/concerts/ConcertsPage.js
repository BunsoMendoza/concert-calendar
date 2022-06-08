import { Container } from "react-bootstrap";
import SearchHandling from "./SearchHandling";
import Footer from "../footer/Footer";
import Searchbar from "./Searchbar";
import React, { useState, useRef } from "react";

function ConcertsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("City Metro Area");
  const [searchByState, setSearchByState] = useState("WA");
  const setSearchData = (enteredSearchData) => {
    const searchData = {
      ...enteredSearchData,
    };
    setSearchQuery(searchData.searchQuery);
    setSearchType(searchData.searchType);
    setSearchByState(searchData.state);
    if (searchQuery == "") {
      console.log("From concertPage " + searchType + ". Search: (empty)");
    } else {
      console.log(
        "From concertPage " + searchType + ". Search: " + searchQuery
      );
    }
  };

  return (
    <div>
      <Container fluid className="concert-page">
        <Searchbar onSetSearchData={setSearchData} />
        <Container className="concert-list">
          <SearchHandling searchQuery={searchQuery} searchType={searchType} searchState={searchByState}/>
        </Container>
      </Container>
      <Footer />
    </div>
  );
}
export default ConcertsPage;
