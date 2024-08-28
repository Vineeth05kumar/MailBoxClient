import Login from "./components/Pages/Login";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import WriteMails from "./components/Pages/WriteMails";
import { authActions } from "./components/store/authSlice";
import { useDispatch } from "react-redux";
function App() {
  const dispatch = useDispatch();

  const logoutHandler = ()=>{
    dispatch(authActions.logout());
  }

  return (
    <>
    <button onClick={logoutHandler}>Logout</button>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='writeEmail' element={<WriteMails/>} />
      </Routes>
    </Router>
    </>
    
  );
}

export default App;
