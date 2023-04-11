import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import ShowJobs from './Components/ShowJobs'
import SingleJob from './Components/SingleJob'
import ShowJobsApplication from './Components/ShowJobsApplication'
import ShowApplicants from './Components/ShowApplicants'
import PostJob from './Components/PostJob'
import ApplicantTable from './Components/ApplicantTable'
import Index from './Components/Index'

const routes = {
    '/': <><Index /></>,
    '/login': <><Login /></>,
    '/signup': <><SignUp /></>,
    '/allJobs': <><ShowJobs /></>,
    '/job/:id/:is_applied': <><SingleJob /></>,
    '/myApplications': <><ShowJobsApplication /></>,
    '/my_posted_jobs': <><ShowApplicants /></>,
    '/post_job': <><PostJob /></>,
    '/applicant/:id': <><ApplicantTable /></>,
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