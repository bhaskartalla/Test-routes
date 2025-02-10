'use client'

import React, { useState, useEffect } from 'react'

const ReactCopyToClipboard = () => {
  const [copyText, setCopyText] = useState({ value: '', copied: false })

  useEffect(() => {
    const copyTimer = setTimeout(() => {
      if (copyText.copied) {
        setCopyText({ value: '', copied: false })
      }
    }, 2000)

    return () => clearTimeout(copyTimer)
  }, [copyText.copied])

  const handleInputChange = (event: any) => {
    setCopyText(event.target.value)
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(copyText.value)
      .then(() => setCopyText((prev) => ({ ...prev, copied: true })))
      .catch((error) => console.error('Error copying to clipboard:', error))
  }

  return (
    <div>
      <h1>Copy to Clipboard</h1>
      <input
        style={{ color: 'red' }}
        type='text'
        value={copyText.value}
        onChange={handleInputChange}
        placeholder='Enter text to copy'
      />
      <button onClick={handleCopyToClipboard}>Copy</button>
      {copyText.copied && <div>Copied to clipboard</div>}
    </div>
  )
}

export default ReactCopyToClipboard
