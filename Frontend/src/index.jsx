import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import GlobalStyle from './utils/styles/GlobalStyle';
import Login from './pages/Login';
import Register from './pages/Register';
import CentreInteret from './pages/CentreInteret';
import Error from './pages/Error';
import Home from './pages/Home';
import { SelectionProvider } from './utils/styles/Contexte';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <SelectionProvider>
            <GlobalStyle />
            <Router>
                <Routes>
                    <Route exact path='/' element={<Login/>} />
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/*' element={<Error />}/>
                    <Route path='/center' element={<CentreInteret/>}/>
                    <Route path='/home' element={<Home/>}/>
                </Routes>
            </Router>
        </SelectionProvider> 
    </React.StrictMode>
);