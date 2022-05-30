import React, { useRef, useState } from "react";

function Searchbar(props) {

  const [isArtist, setIsArtist] = useState(false);
  const searchQueryRef = useRef();
  const searchTypeRef = useRef();
  const stateRef = useRef();
  const searchData = {
    searchQuery: "",
    searchType: "City Metro Area",
    state: "WA",
  };
  const states = [ 'WA', 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WV', 'WI', 'WY' ];


  const checkToDisplayCity = (event) => {
    if (event.target.value !== 'Artist') {
      setIsArtist(false);
    }else{
      setIsArtist(true);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    searchData.state = stateRef.current.value;
    searchData.searchQuery = searchQueryRef.current.value;
    searchData.searchType = searchTypeRef.current.value;

    //passing data back to concert page
    props.onSetSearchData(searchData);
  };

  if (isArtist) {
    return (
      <div>
        <form className="searchbox" onSubmit={onSubmit}>
          <input type="text" ref={searchQueryRef} />
          <select
            name="selectList"
            id="selectList"
            ref={searchTypeRef}
            onChange={checkToDisplayCity}
          >
            <option value="City Metro Area">City Metro Area</option>
            <option value="Venue">Venue</option>
            <option value="Artist">Artist</option>
          </select>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }else{
    return (
      <div>
        <form className="searchbox" onSubmit={onSubmit}>
          <input type="text" ref={searchQueryRef} />
          <select
            name="selectList"
            id="selectList"
            ref={stateRef}
          >
            {states.map(state => (
            <option value={state}>{state}</option>
            ))}
          </select>
          <select
            name="selectList"
            id="selectList"
            ref={searchTypeRef}
            onChange={checkToDisplayCity}
          >
            <option value="City Metro Area">City Metro Area</option>
            <option value="Venue">Venue</option>
            <option value="Artist">Artist</option>
          </select>
          
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Searchbar;
