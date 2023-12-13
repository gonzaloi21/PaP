import React, { useState, useEffect, useContext } from 'react'
import './LandingPage.css'
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import LotteryBox from '../../components/LotteryBox/LotteryBox';
import WinnerTable from '../../components/WinnerTable/WinnerTable';

function LandingPage() {
    // const [winners, setWinners] = useState([]); // Nuevo estado para la lista de ganadores

    // useEffect(() => {
    //     const obtainWinners = async () => {
    //       try {
    //         const winners = await fetch(`http://localhost:3000/participants/winners`);
    //         const data_winners = await winners.json();
    //         setWinners(data_winners);
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     };
    //     obtainWinners();
    //   }, []);

    return (
        <>
        <Navbar />
        {/* <div className='content'> */}
            <div className='box'>
        <LotteryBox />
            </div>
        {/* <WinnerTable winners={winners} />
        </div> */}
        <Footer />
        </>
    )
}

export default LandingPage;