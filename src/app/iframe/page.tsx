'use client'

import React from 'react'
import { IframeProps } from '@/types/iframe'

// Create a reusable component for the iframe
const IframeComponent = ({
  src = 'http://bfe.dev',
  title = 'Dummy Json',
  width = '100%',
  height = '100%',
}: IframeProps) => {
  return (
    <iframe
      src={src}
      title={title}
      width={width}
      height={height}
      style={{ border: 'none' }}
      loading='lazy'
    ></iframe>
  )
}

// This is the actual page component which doesn't take props from outside
export default function IframePage() {
  // Define the iframe properties inside the page component
  const iframeProps = {
    src: 'http://bfe.dev',
    title: 'Dummy Json',
    width: '100%',
    height: '500px', // Setting a specific height for the page
  }

  return (
    <div className='container'>
      <h1>Iframe Example</h1>
      <div style={{ width: '100%', height: '500px' }}>
        <IframeComponent {...iframeProps} />
      </div>
    </div>
  )
}
