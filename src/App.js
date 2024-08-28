import Login from "./components/Pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import WriteMails from "./components/Pages/WriteMails";
import { useSelector } from "react-redux";
import Header from "./components/Pages/Header";
function App() {
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/auth" element={<Login />} />
          {loggedIn && <Route path="/welcome" element={<Welcome />} />}
          {loggedIn && <Route path="/writeEmail" element={<WriteMails />} />}
        </Routes>
      </Router>
    </>
  );
}

export default App;
