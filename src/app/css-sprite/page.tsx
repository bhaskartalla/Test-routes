'use client'
import React from 'react'
import './styles.css'

const Icon = ({ type }: { type: string }) => {
  return <span className={`sprite ${type}`} />
}

const Navbar = () => {
  return (
    <nav>
      <Icon type='home' />
      <Icon type='search' />
      <Icon type='previous' />
      <Icon type='next' />
    </nav>
  )
}

export default Navbar
