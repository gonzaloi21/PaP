import React from 'react';
import './WinnerTable.css';

function WinnerTable({ winners }) {

  return (
    <div className='tabla-container'>
      <table className='tabla-campeones'>
        <thead>
          <tr className='encabezado'>
            <th>N°Premio</th>
            <th>N°Rifa</th>
            <th>Marca</th>
            <th>Premio</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Celular</th>
          </tr>
        </thead>
        <tbody className='contenido-tabla'>
          {winners.map((winner ) => (
            <FilaTabla key={winner.number} winner={winner} reward={winner.reward}/>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FilaTabla({ winner }) {

  const { prize, number, name, lastname, phone, prize_name, brand } = winner;

  return (
    <tr className='datos'>
      <td className='premio-numero'><b>{prize}</b></td>
      <td className='dato-numero'><b>{number}</b></td>
      {/* //si no hay premio aparece un N/A */}
      <td className='dato-marca'>{brand ? brand : 'N/A'}</td>
      <td className='dato-premio'>{prize_name ? prize_name : 'N/A'}</td>
      <td className='dato-nombre'>{name}</td>
      <td className='dato-apellido'>{lastname}</td>
      <td className='dato-cel'>{phone}</td>
    </tr>
  );
}

export default WinnerTable;
