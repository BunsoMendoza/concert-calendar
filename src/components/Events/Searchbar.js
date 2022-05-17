import React, { useState, useRef } from 'react';

function Searchbar(props) {
  
  const searchQueryRef = useRef();
  const searchTypeRef = useRef();
 const searchData ={
        searchQuery: "",
        searchType: "City Metro Area"
      }
    
  const onSubmit = (event) => {
    event.preventDefault();
     
    searchData.searchQuery = searchQueryRef.current.value;
    searchData.searchType = searchTypeRef.current.value;

     //passing data back to concert page
     props.onSetSearchData(searchData);
  }




    return (


        <div> 
           <form className="searchbox" onSubmit={onSubmit}>
        <input type="text" ref={searchQueryRef}  />
        <select name="selectList" id="selectList" ref={searchTypeRef} >
          <option value="City Metro Area">City Metro Area</option>
          <option value="Venue">Venue</option>
          <option value="Artist">Artist</option>
        </select>
        <input type="submit" value="Submit" />
      </form>
           
        </div>
    );
}

export default Searchbar;