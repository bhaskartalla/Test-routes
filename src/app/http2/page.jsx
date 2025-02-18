'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Http2 = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    // Fetch data from the HTTP/2 API
    axios
      .get('https://localhost:3001/api/products', {
        httpsAgent: new (require('https').Agent)({
          rejectUnauthorized: false,
        }), // Ignore SSL for local testing
      })
      .then((response) => {
        setProducts(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [])

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Http2

// import React, { useEffect, useState } from 'react'

// function HTTP2() {
//   const [data, setData] = useState(null)

//   useEffect(() => {
//     // Make an API call to the HTTP/2 server
//     fetch('https://localhost:3001/api/data')
//       .then((response) => response.json())
//       .then((data) => setData(data))
//       .catch((error) => console.error('Error fetching data:', error))
//   }, [])

//   return (
//     <div>
//       <h1>React App with HTTP/2</h1>
//       {data ? <p>{data.message}</p> : <p>Loading...</p>}
//     </div>
//   )
// }

// export default HTTP2
