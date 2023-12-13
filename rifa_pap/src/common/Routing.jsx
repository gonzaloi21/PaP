import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from '../pages/LandingPage/LandingPage'


function Routing () {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<LandingPage/>} />
            </Routes>
        </BrowserRouter>
        </>
    )   
}

export default Routing 