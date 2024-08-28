import Login from "./components/Pages/Login";
import React,{useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import WriteMails from "./components/Pages/WriteMails";
import { useSelector,useDispatch } from "react-redux";
import { authActions } from "./components/store/authSlice";
import Header from "./components/Pages/Header";
function App() {
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      dispatch(authActions.revivePage())
  }},[dispatch,token]);


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
