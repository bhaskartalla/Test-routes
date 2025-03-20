'use client'
import React, { useRef, useEffect } from 'react'

const WebcamComponent = () => {
  // Specify HTMLVideoElement as the type for the ref
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const startWebcam = async () => {
      try {
        // Get access to the webcam
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        })

        // Attach the stream to the video element
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (error) {
        console.error('Error accessing webcam:', error)
      }
    }

    startWebcam()

    return () => {
      // Clean up by stopping the webcam when the component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        // Cast srcObject to MediaStream to access getTracks()
        const stream = videoRef.current.srcObject as MediaStream
        const tracks = stream.getTracks()

        tracks.forEach((track) => track.stop())
      }
    }
  }, [])

  return (
    <div>
      <h1>Webcam Example</h1>
      <h2>Webcam Component</h2>
      <video
        ref={videoRef}
        autoPlay
      />
    </div>
  )
}

export default WebcamComponent
