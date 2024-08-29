import Login from "./components/Pages/Login";
import React,{useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inbox from "./components/Pages/Inbox";
import WriteMails from "./components/Pages/WriteMails";
import { useSelector,useDispatch } from "react-redux";
import { authActions } from "./components/store/authSlice";
import Header from "./components/Pages/Header";
import Sent from "./components/Pages/Sent";

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
          {loggedIn && <Route path="/inbox" element={<Inbox />} />}
          {loggedIn && <Route path="/sent" element={<Sent />} />}
          {loggedIn && <Route path="/writeEmail" element={<WriteMails />} />}
        </Routes>
      </Router>
    </>
  );
}

export default App;
