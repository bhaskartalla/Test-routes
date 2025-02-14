'use client'

import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const InfiniteScroll = () => {
  const [products, setProducts] = useState([]) // Stores the list of products
  const [skip, setSkip] = useState(0) // Tracks the number of items to skip
  const [loading, setLoading] = useState(false) // Tracks loading state
  const containerRef = useRef(null) // Reference to the container element

  // Fetch products from the API
  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `https://dummyjson.com/products?limit=5&skip=${skip}`
      )
      setProducts((prevProducts) => [
        ...prevProducts,
        ...response.data.products,
      ])
      setSkip((prevSkip) => prevSkip + 5)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  // Load more products when the user scrolls to the bottom
  useEffect(() => {
    const handleScroll = () => {
      if (
        containerRef.current &&
        window.innerHeight + window.scrollY >=
          containerRef.current.offsetHeight - 100 &&
        !loading
      ) {
        fetchProducts()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loading])

  // Remove products that are not in the viewport
  useEffect(() => {
    const handleVisibility = () => {
      const container = containerRef.current
      if (!container) return

      const children = Array.from(container.children)
      children.forEach((child) => {
        const rect = child.getBoundingClientRect()
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          container.removeChild(child) // Remove elements outside the viewport
        }
      })
    }

    window.addEventListener('scroll', handleVisibility)
    return () => window.removeEventListener('scroll', handleVisibility)
  }, [products])

  // Fetch initial products on mount
  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div>
      <h1>Infinite Scroll with DOM Optimization</h1>
      <div ref={containerRef}>
        {products.map((product) => (
          <div
            key={product.id}
            id={product.id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              margin: '10px 0',
            }}
          >
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
      {loading && <p>Loading more products...</p>}
    </div>
  )
}

export default InfiniteScroll
