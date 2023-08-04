import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import SignUp from './components/signup/Signup';
import LoginForm from './components/Login/Login';
import AppBar from './components/navbar/AppBar';
import Post from './components/Post/Post';
import Home from './components/Home/Home';
import Save from './components/Saved/Save';
import NoFound from './components/NoFound/NoFound'; // Update the import statement here
import Footer from './components/Footer/Footer';

export default function App() {
  return (
    <>
      <div style={{minHeight:"100vh",height:"auto"}}>
      <BrowserRouter>
        <AppBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/post' element={<Post />} />
          <Route path='/saved' element={<Save />} />
          <Route path='*' element={<NoFound />} />
        </Routes>
     
      </BrowserRouter>
    </div>
    <div className='mt-3'>

    <Footer />
    </div>
    </>
  );
}
