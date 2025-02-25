'use client'
// pages/index.tsx
import PollWidgetComponent from '@/components/poll-widget/PollWidget'
import { PollOption, PollWidgetProps } from '@/types/poll-widget'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

const PollWidget: NextPage = () => {
  // You could fetch this data from an API in getServerSideProps or use SWR/React Query
  const [pollData, setPollData] = useState<PollWidgetProps>(
    {} as PollWidgetProps
  )
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const API_URL = 'http://localhost:3333/polling'

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) throw new Error('Failed to fetch poll data')
        const data = await response.json()
        setPollData(data)
      } catch (err) {
        setError('Error loading poll.')
      } finally {
        setLoading(false)
      }
    }
    fetchPoll()
  }, [])

  const handleVote = async (optionId: string) => {
    const payload = {
      ...pollData,
      options: pollData.options.map((option: PollOption) =>
        option.id === optionId ? { ...option, votes: option.votes + 1 } : option
      ),
    }

    console.log('🚀 ~ payload ~ payload:', {
      payload,
      optionId,
    })

    try {
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        redirect: 'follow',
      })
      if (!response.ok) throw new Error('Failed to fetch poll data')
      const data = await response.json()
      console.log('🚀 ~ handleVote ~ data:', data)
      setPollData(data)
    } catch (err) {
      setError('Error loading poll.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <p>Loading poll...</p>
  if (error) return <p>{error}</p>
  if (!pollData) return <p>No poll found.</p>

  return (
    <div style={{ marginTop: '20px' }}>
      <PollWidgetComponent
        question={pollData.question}
        options={pollData.options}
        onVote={handleVote}
      />
    </div>
  )
}

export default PollWidget
