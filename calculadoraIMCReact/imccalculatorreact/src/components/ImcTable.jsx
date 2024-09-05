import React from 'react'
import './ImcTable.css'

export const ImcTable = ({data, imc, info, infoClass, resetCalc}) => {
  return (
    <div className='container'>
      <p id='imcNumber'>
        Seu IMC é: <span className={infoClass}>{imc}</span>
      </p>
      <p id='imcClass'>
        Situação atual: <span className={infoClass}>{info}</span>
      </p>
      <h3>Confira as classificações:</h3>
      <div className="imc-table">
        <div className="table-header">
          <h4>IMC</h4>
          <h4>Classificação</h4>
          <h4>Obesidade</h4>
        </div>
        {data.map((item) => (
          <div className="table-data" key={item.info}>
            <p>{item.classification}</p>
            <p>{item.info}</p>
            <p>{item.obesity}</p>
          </div>
        ))}
      </div>
      <button id='backbtn' onClick={resetCalc}>Voltar</button>

    </div>
  )
}

