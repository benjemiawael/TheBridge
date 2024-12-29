import React from 'react';  
import Header from './Header';  
import MainContent from './MainContent';  
import CourseCardList from './CourseCardList';  
import Contact from './ContactUs';  
import '../App.css'; 

function LandingPage() {  
  return (  
    <div className="LandingPage">  
      <Header />  
      <MainContent />  
      <CourseCardList />  
      <Contact />  
    </div>  
  );  
}  

export default LandingPage;