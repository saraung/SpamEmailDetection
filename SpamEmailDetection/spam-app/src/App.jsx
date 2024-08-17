import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Spamui from './components/Spamui';
import { Route, Routes } from 'react-router-dom';
import Contact from './components/Contact';

function App() {
 

  return (
    <>
      <div>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Spamui/>}/>
          <Route path='/s' element={<Contact/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
