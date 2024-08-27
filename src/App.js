import Login from "./components/Pages/Login";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Welcome from "./components/Welcome";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/welcome' element={<Welcome />} />
      </Routes>
    </Router>
  );
}

export default App;
