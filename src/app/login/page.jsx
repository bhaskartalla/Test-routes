'use client'
import React, { useEffect, useState, useRef } from 'react'
import './login.css'

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false)
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false)
  const modalContentRef = useRef(null)

  useEffect(() => {
    console.log({ isModalOpen, hasScrolledToBottom, isCheckboxChecked })
  }, [isModalOpen, hasScrolledToBottom, isCheckboxChecked])

  const handleModalScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = modalContentRef.current
    console.log('🚀 ~ handleModalScroll ~:', {
      scrollHeight,
      scrollTop,
      clientHeight,
    })
    if (scrollTop + clientHeight + 1 >= scrollHeight) {
      setHasScrolledToBottom(true)
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleCheckboxChange = () => {
    if (hasScrolledToBottom && !isModalOpen) {
      setIsCheckboxChecked(!isCheckboxChecked)
    }
  }

  return (
    <div className='app'>
      <div className='login-form'>
        <h2>Login Page</h2>
        <form>
          <label>Email:</label>
          <input
            type='email'
            placeholder='Enter your email'
            required
          />

          <label>Password:</label>
          <input
            type='password'
            placeholder='Enter your password'
            required
          />

          <div className='terms-container'>
            <input
              type='checkbox'
              checked={isCheckboxChecked}
              onChange={handleCheckboxChange}
              disabled={!hasScrolledToBottom || isModalOpen}
            />
            <span>
              I agree to the{' '}
              <button
                type='button'
                onClick={() => setIsModalOpen(true)}
              >
                Terms and Conditions
              </button>
            </span>
          </div>

          <button
            type='submit'
            disabled={!isCheckboxChecked}
          >
            Login
          </button>
        </form>
      </div>

      {isModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <h2>Terms and Conditions</h2>
            <div
              id='modal-content'
              className='modal-body'
              ref={modalContentRef}
              onScroll={handleModalScroll}
            >
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                vel nisi risus. Proin non dui id eros auctor malesuada. Cras nec
                arcu vel nulla euismod consequat sed a velit. Pellentesque
                vehicula lacus in tellus consequat fermentum. Nulla facilisi.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                vel nisi risus. Proin non dui id eros auctor malesuada. Cras nec
                arcu vel nulla euismod consequat sed a velit. Pellentesque
                vehicula lacus in tellus consequat fermentum. Nulla facilisi.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                vel nisi risus. Proin non dui id eros auctor malesuada. Cras nec
                arcu vel nulla euismod consequat sed a velit. Pellentesque
                vehicula lacus in tellus consequat fermentum. Nulla facilisi.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                vel nisi risus. Proin non dui id eros auctor malesuada. Cras nec
                arcu vel nulla euismod consequat sed a velit. Pellentesque
                vehicula lacus in tellus consequat fermentum. Nulla facilisi.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                vel nisi risus. Proin non dui id eros auctor malesuada. Cras nec
                arcu vel nulla euismod consequat sed a velit. Pellentesque
                vehicula lacus in tellus consequat fermentum. Nulla facilisi.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                vel nisi risus. Proin non dui id eros auctor malesuada. Cras nec
                arcu vel nulla euismod consequat sed a velit. Pellentesque
                vehicula lacus in tellus consequat fermentum. Nulla facilisi.
              </p>{' '}
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                vel nisi risus. Proin non dui id eros auctor malesuada. Cras nec
                arcu vel nulla euismod consequat sed a velit. Pellentesque
                vehicula lacus in tellus consequat fermentum. Nulla facilisi.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                vel nisi risus. Proin non dui id eros auctor malesuada. Cras nec
                arcu vel nulla euismod consequat sed a velit. Pellentesque
                vehicula lacus in tellus consequat fermentum. Nulla facilisi.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                vel nisi risus. Proin non dui id eros auctor malesuada. Cras nec
                arcu vel nulla euismod consequat sed a velit. Pellentesque
                vehicula lacus in tellus consequat fermentum. Nulla facilisi.
              </p>
            </div>
            <button onClick={handleModalClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login
