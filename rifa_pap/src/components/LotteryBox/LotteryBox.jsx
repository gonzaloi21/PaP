  import React, { useState, useEffect } from 'react';
  import './LotteryBox.css';
  import WinnerTable from '../WinnerTable/WinnerTable';

  const LotteryBox = () => {
    const [winnerNumber, setWinnerNumber] = useState('');
    const [winnerName, setWinnerName] = useState('Esperando Sorteo...');
    const [winners, setWinners] = useState([]); // Lista de ganadores y premios
    const [shouldUpdateTable, setShouldUpdateTable] = useState(false);
    const [nextPrize, setNextPrize] = useState('');

    useEffect(() => {
      const obtainWinners = async () => {
        try {
          const winnersResponse = await fetch(`http://localhost:3000/participants/winners`);
          const data_winners = await winnersResponse.json();
          setWinners(data_winners);
          setShouldUpdateTable(false);
        } catch (error) {
          console.log(error);
        }
      };
      obtainWinners();
    }, [shouldUpdateTable]);

    useEffect(() => {
      // Función para obtener el próximo premio
      const fetchNextPrize = async () => {
        try {
          const nextPrizeResponse = await fetch('http://localhost:3000/prizes/next');
          const nextPrizeData = await nextPrizeResponse.json();

          console.log(nextPrizeData);
          
          // Hay un próximo premio
          setNextPrize(`PRÓXIMO PREMIO: ${nextPrizeData.prize_name} de ${nextPrizeData.brand}`); // Ajusta según la estructura de tu modelo
          
        } catch (error) {
          console.error(error);

        }
      };
      fetchNextPrize();  
    },)

    // useEffect(() => {
    //   if (countdown > 0) {
    //     const timerId = setInterval(() => {
    //       setCountdown((prevCountdown) => prevCountdown - 1);
    //       setWinnerName(countdown)
    //     }, 1000);
  
    //     return () => clearInterval(timerId);
    //   }});

// ...

const handleDraw = async (type) => {
  try {
    // setCountdown(3);
    const response = await fetch('http://localhost:3000/participants/sort', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ command: type })
    });

    if (!response.ok) {
      if (response.status === 404) {
        // Manejar el caso de que no hay premios disponibles
        console.log('No hay premios disponibles');
        // Puedes ajustar el mensaje o realizar otras acciones según tu necesidad
        setNextPrize('Gracias por participar!');
        // También puedes retornar o hacer cualquier otra cosa según tus necesidades
        return;
      } else {
        // Otro tipo de error
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
      }
    }

    const data = await response.json();

    if (type === 'sorteo' && data.winner.winner) {
      // Solo actualiza winnerName y winnerNumber si hay premios disponibles
      setWinnerNumber(data.winner.number);
      setWinnerName(`¡Felicidades ${data.winner.name}!`);

      // Agrega el ganador a la lista de ganadores y premios
      setWinners((prevWinners) => [
        ...prevWinners,
        {
          winner: data.winner
        }
      ]);
      setShouldUpdateTable(true);
    
    } else if (type === 'agua') {
      setWinnerName(`¡Al agua ${data.winner.name} ${data.winner.lastname}!`);
    }
  } catch (error) {
    console.log('Error en handleDraw');
    console.error(error);
  }
};

// ...
    const Reset = async () => {
      try {
        const response = await fetch('http://localhost:3000/participants/reset', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          const message = `An error has occurred: ${response.status}`;
          throw new Error(message);
        }

        const data = await response.json();
        setWinnerNumber(data.number);
        setWinnerName(`Esperando Sorteo...`);

        // Reiniciar la lista de ganadores y premios
        setWinners([]);
        setShouldUpdateTable(true);
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <div className="lottery-box">
        <div className="first-column">
          <div className="winner-name">{winnerName}</div>
          <div className="winner-number">Rifa N°{winnerNumber}</div>
          <div className="buttons">
            <button className="sortear" onClick={() => handleDraw('sorteo')}>
              Sortear
            </button>
            <button className="agua" onClick={() => handleDraw('agua')}>
              Al agua
            </button>
          </div>
          <button className="reiniciar" onClick={Reset}>
            Reiniciar Rifa
          </button>
        </div>
        <div className="second-column">
          <h2 className='next'><b>{nextPrize}</b></h2>
          <div className="tabla-campeones">
            {/* Agrega una key con el valor shouldUpdateTable para forzar la actualización */}
            <WinnerTable key={shouldUpdateTable} winners={winners}/>
          </div>
        </div>
      </div>
    );
  };

  export default LotteryBox;
