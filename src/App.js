import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './components/mahasiswaList'; // Ensure this path is correct
import 'bulma/css/bulma.min.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/mahasiswa" element={<UserList />} />
          {/* Other routes */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;