import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from "./routes/Home";

import './index.css';
import Login from "./routes/Login";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <Routes>
            <Route path='/login' element={<Login />}></Route>

        </Routes>
    </BrowserRouter>
)
