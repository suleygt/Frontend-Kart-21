import React from 'react';
import { useState } from 'react'
import './styles.css'
import Header from './components/Header'
import FrontMessage from './components/FrontMessage'
import InnerMessage from './components/InnerMessage'

//export default function App() {


export default function App() {
  const [cardInfo, setCardInfo] = useState({
    isOpen: false,
    isMouseDown: false,
    initialX: null,
  });

  const handleMouseDown = (event) => {
    setCardInfo((prevCardInfo) => ({
      ...prevCardInfo,
      isMouseDown: true,
      initialX: event.clientX,
    }));
  };

  const handleMouseUp = () => {
    if (cardInfo.isOpen) {
      setCardInfo((prevCardInfo) => ({
        ...prevCardInfo,
        isOpen: false,
      }));
    }

    setCardInfo((prevCardInfo) => ({
      ...prevCardInfo,
      isMouseDown: false,
      initialX: null,
    }));
  };

  const handleMouseMove = (event) => {
    const { isMouseDown, initialX, isOpen } = cardInfo;

    if (isMouseDown && !isOpen) {
      const deltaX = event.clientX - initialX;

      if (deltaX > 50) {
        setCardInfo((prevCardInfo) => ({
          ...prevCardInfo,
          isOpen: true,
        }));
      }
    }

    setCardInfo((prevCardInfo) => ({
      ...prevCardInfo,
      initialX: event.clientX,
    }));
  };

  const handleMouseMoveClose = (event) => {
    const { isMouseDown, initialX, isOpen } = cardInfo;

    if (isMouseDown && isOpen) {
      const deltaY = event.clientY - initialX;

      if (deltaY > 0) {
        setCardInfo((prevCardInfo) => ({
          ...prevCardInfo,
          isOpen: false,
        }));
      }
    }

    setCardInfo((prevCardInfo) => ({
      ...prevCardInfo,
      initialX: event.clientY,
    }));
  };

  return (
    <div className="wrapper">
      <Header />
      <div className="card">
        <InnerMessage />
        <div
          onClick={() =>
            setCardInfo((prevCardInfo) => ({
              ...prevCardInfo,
              isOpen: !prevCardInfo.isOpen,
            }))
          }
          onMouseDown={handleMouseDown}
          onMouseMove={cardInfo.isOpen ? handleMouseMoveClose : handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseOut={handleMouseUp}
          className={`cover ${cardInfo.isOpen && 'open'}`}
        >
         <FrontMessage/>
          <img src="./images/forLoop.png" alt="For Loop" />
        </div>
      </div>
    </div>
  );
}