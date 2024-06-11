
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FacilityPage from './pages/FacilityPage';
import Register from './components/Register';
import Login from './components/Login';
import 'bootstrap-icons/font/bootstrap-icons.css';


// const PrivateRoute = ({ element, ...rest }) => {
//   const token = localStorage.getItem('token');
//   return (
//     <Route
//       {...rest}
//       element={token ? element : <Navigate to="/login" replace />}
//     />
//   );
// };

function App() {
  return (
    <Router>
      <Routes>
      {/* <PrivateRoute path="/" element={<HomePage />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/facility/:id" element={<FacilityPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
