import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import "./index.css"; // Ensure CSS is included

function App() {
  const handleClose = () => {
    console.log("Form closed");
    // You can add logic to navigate away or toggle modal visibility
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/users" />} /> {/* Redirect / to /users */}
        <Route path="/users" element={<UserList />} />
        <Route path="/add-user" element={<UserForm onClose={handleClose} />} />
        <Route path="/edit-user/:id" element={<UserForm onClose={handleClose} />} />
      </Routes>
    </Router>
  );
}

export default App;