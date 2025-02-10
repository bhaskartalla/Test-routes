import React from 'react'

interface IframeProps {
  src: string
  title: string
  width?: string
  height?: string
}

const Iframe: React.FC<IframeProps> = ({
  src = 'http://localhost:3000/react-webcam',
  title = 'Dummy Json',
  width = '100%',
  height = '500px',
}) => {
  return (
    <>
      <div>External Websites</div>
      <iframe
        src={src}
        title={title}
        width={width}
        height={height}
        style={{ border: 'none' }}
        loading='lazy'
      ></iframe>
    </>
  )
}

export default Iframe
