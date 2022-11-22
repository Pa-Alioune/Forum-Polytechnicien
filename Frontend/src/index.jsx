import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import GlobalStyle from './utils/styles/GlobalStyle';
import Login from './pages/Login';
import Register from './pages/Register';
import Error from './pages/Error';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GlobalStyle />
        <Router>
            <Routes>
                <Route exact path='/' element={<Login/>} />
                <Route path='/register' element={<Register/>}/>
                <Route path='/*' element={<Error />}/>
            </Routes>
        </Router>
        
    </React.StrictMode>
);