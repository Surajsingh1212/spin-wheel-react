import React,{useState} from 'react'
import Spin1 from './Spin1';

const App = () => {
  const [rotationAngle, setRotationAngle] = useState(0);

  const spinHandler = () => {
    // Generate a random angle for spin
    const randomAngle = Math.floor(Math.random() * 360) + 720; // You can customize this range
    setRotationAngle(rotationAngle + randomAngle);
  };
  return (
    <div className="app-container">
    <Spin1 spinHandler={spinHandler} />
  </div>
  )
}

export default App
