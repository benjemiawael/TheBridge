import React, { useState, useEffect } from 'react';
import '../styles/MainComponent.css';

const MainComponent = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [editCourse, setEditCourse] = useState(null);

 
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:3000/courses');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);


  const handleAddCourse = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }

    try {
      const response = await fetch('http://localhost:3000/courses', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add course');
      }

      const newCourse = await response.json();
      setCourses([...courses, newCourse]); 
      setActivePage('manageCourses'); 
      setTitle('');
      setPrice('');
      setThumbnail(null); 
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };


  const handleUpdateCourse = async (e, courseId) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }

    try {
      const response = await fetch(`http://localhost:3000/courses/${courseId}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update course');
      }

      const updatedCourse = await response.json();
      setCourses(courses.map(course => course._id === courseId ? updatedCourse : course)); // Update course in the list
      setActivePage('manageCourses');
      setTitle('');
      setPrice('');
      setThumbnail(null);
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

 
  const handleDeleteCourse = async (courseId) => {
    try {
      const response = await fetch(`http://localhost:3000/courses/${courseId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete course');
      }

      setCourses(courses.filter(course => course._id !== courseId)); 
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className="main-container">
      {}
      <nav className="navbar">
        <button onClick={() => setActivePage('dashboard')}>Dashboard</button>
        <button onClick={() => setActivePage('addCourse')}>Add Course</button>
        <button onClick={() => setActivePage('manageCourses')}>Manage Courses</button>
        <button onClick={() => {
  
  window.location.href = "/signin"; 
}}>
  SignOut
</button>
  <button onClick={() => {
  
  window.location.href = "/landingPage"; 
}}>Go to Landing Page</button>
      </nav>

      {}
      <div className="content">
        {activePage === 'dashboard' && (
          <div className="dashboard">
            <h2>Dashboard</h2>
            <p>Welcome to the admin dashboard! Here are some stats:</p>
            <ul className="statsList">
              <li className="statItem">Total Courses: {courses.length}</li>
              
            </ul>
          </div>
        )}

        {activePage === 'addCourse' && (
          <div className="add-course">
            <h2>Add a New Course</h2>
            <form onSubmit={handleAddCourse}>
              <div>
                <label>Course Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Course Price:</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Course Thumbnail:</label>
                <input
                  type="file"
                  onChange={(e) => setThumbnail(e.target.files[0])}
                />
              </div>
              <button type="submit" className='submitButton'>Add Course</button>
            </form>
          </div>
        )}

        {activePage === 'manageCourses' && (
          <div className="manage-courses">
            <h2>Manage Courses</h2>
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course._id}>
                    <td>
                      <img 
                        src={course.imgsrc}
                        alt={course.title} 
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                      />
                    </td>
                    <td>{course.title}</td>
                    <td>${course.price}</td>
                    <td>
                      <button className='editButton'  onClick={() => { setActivePage('editCourse'); setEditCourse(course); }}>Edit</button>
                      <button className='deleteButton ' onClick={() => handleDeleteCourse(course._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activePage === 'editCourse' && editCourse && (
          <div className="edit-course">
            <h2>Edit Course</h2>
            <form onSubmit={(e) => handleUpdateCourse(e, editCourse._id)}>
              <div>
                <label>Course Title:</label>
                <input
                  type="text"
                  value={title || editCourse.title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Course Price:</label>
                <input
                  type="number"
                  value={price || editCourse.price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Course Thumbnail:</label>
                <input
                  type="file"
                  onChange={(e) => setThumbnail(e.target.files[0])}
                />
              </div>
              <button type="submit">Update Course</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainComponent;