
import Navbar from "./components/Navbar";

import ConcertsPage from "./components/Events/ConcertsPage";
import Banner from "./components/Banner";

import Calendar from "./components/UserCalendar/Calendar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Banner />
        <Navbar />
  

        <Routes> 
          <Route path="/" element={<ConcertsPage/>} />
          <Route path="/concerts" element={<ConcertsPage />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
