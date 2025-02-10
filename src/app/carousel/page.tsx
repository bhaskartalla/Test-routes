'use client'
import React, { useEffect, useState } from 'react'
import './Carousel.css'

interface CarouselProps {
  images: string[]
  fallbackImage: string
}

const Carousel: React.FC<CarouselProps> = () => {
  const images = [
    'https://loremflickr.com/cache/resized/defaultImage.small_200_200_nofilter.jpg',
    'https://loremflickr.com/cache/resized/65535_54044987934_7fd42f72d6_n_200_200_nofilter.jpg',
    'https://loremflickr.com/cache/resized/65535_53848295095_808fb4dd83_m_200_200_nofilter.jpg',
    'https://invalid-image-url', // Invalid URL to demonstrate fallback
    'https://commondatastorage.googleapis.com/codeskulptor-assets/gutenberg.jpg',
  ]

  const fallbackImage =
    'https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back01.jpg'

  const [currentIndex, setCurrentIndex] = useState(0)
  const [loadedImages, setLoadedImages] = useState<string[]>([])

  useEffect(() => {
    console.log('🚀 ~ loadedImages:', loadedImages)
  }, [loadedImages])

  useEffect(() => {
    // Prefetch all images
    images.forEach((image) => {
      const img = new Image()
      img.src = image
      img.onload = () => {
        let splits = image.split('/')
        console.log('image loaded', splits[splits.length - 1])
        setLoadedImages((prev) => [...new Set<string>([...prev, image])])
      }
      img.onerror = () => {
        console.log('image error')
        setLoadedImages((prev) => [
          ...new Set<string>([...prev, fallbackImage]),
        ])
      }
    })
  }, [])

  const nextSlide = () => {
    console.log('🚀 ~ nextSlide ~ :', currentIndex)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % loadedImages.length)
  }

  const prevSlide = () => {
    console.log('🚀 ~ prevSlide ~ :', currentIndex)
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? loadedImages.length - 1 : prevIndex - 1
    )
  }

  return (
    <div className='carousel'>
      <button
        className='carousel-button prev'
        onClick={prevSlide}
      >
        &#8249;
      </button>
      <div className='carousel-image-container'>
        <img
          src={loadedImages[currentIndex] || fallbackImage}
          alt={`Slide ${currentIndex}`}
          className='carousel-image'
        />
      </div>
      <button
        className='carousel-button next'
        onClick={nextSlide}
      >
        &#8250;
      </button>
    </div>
  )
}

export default Carousel
