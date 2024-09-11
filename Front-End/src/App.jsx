import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const App = () => {
  const [rotation, setRotation] = useState(0);
  const [colors, setColors] = useState([]);
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const generateColors = () => {
      const newColors = Array.from({ length: 100 }, () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      });
      setColors(newColors);
    };

    generateColors();
  }, []);

  const spinWheel = () => {
    const baseUrl = 'http://localhost:3000';
  
    fetch(`${baseUrl}/random`, {
      method: 'POST',
      mode: 'cors',
    })
      .then(res => res.json())
      .then(data => {
        setResult(data.value);
  
        const newRotation = rotation + Math.floor(Math.random() * 5000) + 500;
        setRotation(newRotation);
  
        setTimeout(() => {
          setShowModal(!showModal);
        }, 5000);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <>
      <div className='container'>
        <div className='spin-btn' onClick={spinWheel}>Spin</div>
        <div className='wheel' style={{ transform: `rotate(${rotation}deg)` }}>
          {numbers.map((number, index) => (
            <div
              key={index}
              className='number'
              style={{ '--i': index + 1, '--clr': colors[index] }}
            >
            </div>
          ))}
        </div>
        {showModal && 
        <div className='blur'>
          <div className='modal'>
            <h1>Your number is {result}</h1>
            <button
            onClick={() => setShowModal(!showModal)}>Spin again</button>
          </div>
        </div>
        }
      </div>
    </>
  );
}

export default App;

