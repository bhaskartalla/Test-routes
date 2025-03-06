'use client'

import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

// 🌍 WebSocket Connection
const socket: Socket = io('http://localhost:4000')

const Communication: React.FC = () => {
  // ✅ Define State Types
  const [longPollingMsg, setLongPollingMsg] = useState<string>('')
  const [sseMsg, setSseMsg] = useState<string>('')
  const [webSocketMsg, setWebSocketMsg] = useState<string>('')
  const [chatMessage, setChatMessage] = useState<string>('')

  // 🌍 Long Polling Implementation
  const fetchLongPolling = async (): Promise<void> => {
    try {
      const response: Response = await fetch(
        'http://localhost:4000/long-polling'
      )
      const data: { message: string } = await response.json()
      setLongPollingMsg(data.message)
      fetchLongPolling() // Restart polling
    } catch (error) {
      console.error('Long Polling Error:', error)
      setTimeout(fetchLongPolling, 5000) // Retry after 5 seconds
    }
  }

  // 🌍 Server-Sent Events (SSE)
  useEffect(() => {
    const eventSource: EventSource = new EventSource(
      'http://localhost:4000/sse'
    )

    eventSource.onmessage = (event: MessageEvent) => {
      setSseMsg(event.data)
    }

    return () => eventSource.close() // Cleanup on unmount
  }, [])

  // 🌍 WebSocket Listener
  useEffect(() => {
    const socketListener = (data: string) => setWebSocketMsg(data)

    socket.on('websocket-message', socketListener)

    return () => {
      socket.off('websocket-message', socketListener)
      socket.disconnect()
    }
  }, [])

  // 🌍 Start Long Polling on Mount
  useEffect(() => {
    fetchLongPolling()
  }, [])

  const handleChatMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('🚀 ~ handleChatMessage ~ event:', event.target.value)

    setChatMessage(event.target.value)
  }

  const handleSendMessage = () => {
    console.log('🚀 ~ handleChatMessage ~ event:')
    socket.emit('websocket-message', chatMessage)
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>📡 Real-Time Updates</h1>
      <p>
        <strong>Long Polling:</strong> {longPollingMsg}
      </p>
      <p>
        <strong>Server-Sent Events (SSE):</strong> {sseMsg}
      </p>
      <div>
        <input
          value={chatMessage}
          onChange={handleChatMessage}
        />
        <strong>WebSockets:</strong> {webSocketMsg}
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  )
}

export default Communication
