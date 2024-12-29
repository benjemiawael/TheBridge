import React, { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';
import '../styles/CourseList.css';

function CoursesList() {
    const [showAll, setShowAll] = useState(false);
    const [courses, setCourses] = useState([]);
    const [displayedCourses, setDisplayedCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://localhost:3000/courses');
                if (!response.ok) {
                    throw new Error('Failed to fetch courses');
                }
                const data = await response.json();
                setCourses(data);
                setDisplayedCourses(data.slice(0, 3)); 
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, []);

    const handleViewMoreLess = () => {
        if (showAll) {
            setDisplayedCourses(courses.slice(0, 3)); 
        } else {
            setDisplayedCourses(courses); 
        }
        setShowAll(!showAll);
    };

    if (!courses.length) {
        return <div>Loading courses...</div>; 
    }

    return (
        <div className="courses-list-container">
            <div className="title-and-button-container">
                <h2>Discover Our Courses</h2>
                <button className="view-more-button" onClick={handleViewMoreLess}>
                    {showAll ? "View Less" : "View More"}
                </button>
            </div>

            <div className="courses-container">
                {displayedCourses.map((course, index) => (
                    <CourseCard key={index} {...course} />
                ))}
            </div>
        </div>
    );
}

export default CoursesList;