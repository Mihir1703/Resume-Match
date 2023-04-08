import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import ShowJobs from './Components/ShowJobs'
import SingleJob from './Components/SingleJob'

const routes = {
    '/login': <><Login /></>,
    '/signup': <><SignUp /></>,
    '/allJobs': <><ShowJobs /></>,
    '/job/:id': <><SingleJob /></>,
}

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {
                    Object.keys(routes).map((route, index) => {
                        return (<Route key={index} path={route} element={routes[route]} />);
                    })
                }
            </Routes>
        </BrowserRouter>
    )
}

export default App