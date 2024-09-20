import './App.css'

import Img from './img/img.jpg'

import { useContext } from 'react'
import { CountdownContext } from './context/CountdownContext'

import { Outlet } from 'react-router-dom'

function App() {
  const {event} = useContext(CountdownContext)

  let eventImage = null

  if (event) eventImage = event.img 

  return (
    <div className='App' 
    style={eventImage
      ? {backgroundImage: `url(${eventImage})`} 
      : {backgroundImage: `url(${Img})`}}>
      <div className="container">
        <Outlet />
      </div>
    </div>
  ) 
}

export default App
