import Navbar from "./components/navbar/Navbar";
import ConcertsPage from "./components/concerts/ConcertsPage";
import Calendar from "./components/calendar/Calendar";
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
        <Navbar />
        <Routes>
          <Route path="/" element={<ConcertsPage />} />
          <Route path="/concerts" element={<ConcertsPage />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
