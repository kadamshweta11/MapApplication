
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FacilityPage from './pages/FacilityPage';
import Register from './components/Register';
import Login from './components/Login';
import UserProfilePage from './components/UserProfilePage';
import 'bootstrap-icons/font/bootstrap-icons.css';




function App() {
  return (
    <Router>
      
      <Routes>
     
        <Route path="/home" element={<HomePage />} />
        <Route path="/facility/:id" element={<FacilityPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
       
        <Route path="/userprofile" element={<UserProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
