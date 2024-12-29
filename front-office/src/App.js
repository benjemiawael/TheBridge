import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SignInAdmin from './components/SignInAdmin';
import './App.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import AdminInterface from './components/MainComponent';

function App() {
  const [courses, setCourses] = useState([]);

  // Fonction pour ajouter un cours
  const addCourse = (newCourse) => {
    setCourses((prevCourses) => [...prevCourses, newCourse]);
  };

  // Fonction pour supprimer un cours
  const deleteCourse = (courseId) => {
    setCourses((prevCourses) => prevCourses.filter(course => course.id !== courseId));
  };

  // Fonction pour éditer un cours
  const editCourse = (updatedCourse) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === updatedCourse.id ? updatedCourse : course
      )
    );
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          
          <Route path="/" element={<Navigate to="/signin" />} />
          
          <Route path="/landingPage" element={<LandingPage courses={courses} />} />
          
          <Route path="/signin" element={<SignInAdmin />} />
          
          <Route path="/admin" 
            element={<AdminInterface addCourse={addCourse} editCourse={editCourse} deleteCourse={deleteCourse} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;