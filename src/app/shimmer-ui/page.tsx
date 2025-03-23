'use client'

import { useEffect, useState } from 'react'
import styles from './style.module.css'
import ShimmerImage from '@/components/shimmer-ui/shimmer'

type MemeType = {
  postLink: string
  subreddit: string
  title: string
  url: string
  nsfw: false
  spoiler: false
  author: string
  ups: number
  preview: string[]
}

type MemeResponseType = {
  count: number
  memes: MemeType[]
}

const ShimmerUI = () => {
  const [memes, setMemes] = useState<MemeType[]>([])
  const [showShimmer, setShowShimmer] = useState(false)

  const fetchMemeApi = async () => {
    try {
      setShowShimmer(true)
      const response = await fetch('https://meme-api.com/gimme/10')
      const data: MemeResponseType = await response.json()
      setShowShimmer(false)
      setMemes((prev) => [...prev, ...data.memes])
    } catch (error) {
      setShowShimmer(false)
      console.log('🚀 ~ fetchMemeApi ~ error:', error)
    }
  }

  const handleFetchMemes = () => {
    console.log('🚀 ~ handleFetchMemes ~:', {
      scrollY,
      innerHeight,
      scrollHeight: document.body.scrollHeight,
    })
    if (
      window.scrollY + window.innerHeight >=
      window.document.body.scrollHeight - 10
    ) {
      fetchMemeApi()
    }
  }

  useEffect(() => {
    fetchMemeApi()
    window.addEventListener('scroll', handleFetchMemes)
    return () => window.removeEventListener('scroll', handleFetchMemes)
  }, [])

  return (
    <div className={styles.main}>
      {memes.map((meme, ind) => (
        <div
          id={meme.title}
          key={meme.title + ind}
          className={styles.meme_card}
        >
          <h3>{meme.title}</h3>
          <img
            className={styles.meme_image}
            src={meme.url}
            alt={meme.title}
            style={{ objectFit: 'contain' }}
          />
          <h4>{meme.author}</h4>
        </div>
      ))}

      {showShimmer && <ShimmerImage />}
    </div>
  )
}
export default ShimmerUI
