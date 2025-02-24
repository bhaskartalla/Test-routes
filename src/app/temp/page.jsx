'use client'

import React, { useState } from 'react'
import './Temp.css'

function Temp() {
  const [fontSize, setFontSize] = useState(16)

  const increaseFontSize = () => {
    setFontSize((prev) => prev + 2)
    document.documentElement.style.fontSize = `${fontSize + 2}px`
  }

  const decreaseFontSize = () => {
    setFontSize((prev) => prev - 2)
    document.documentElement.style.fontSize = `${fontSize - 2}px`
  }

  return (
    <div>
      <h1 className='header'>Welcome to My React Temp</h1>
      <button
        className='button'
        onClick={increaseFontSize}
      >
        Increase Font Size
      </button>
      <button
        className='button'
        onClick={decreaseFontSize}
      >
        Decrease Font Size
      </button>
    </div>
  )
}

export default Temp
