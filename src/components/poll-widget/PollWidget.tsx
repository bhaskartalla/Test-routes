// components/PollWidget.tsx
import React, { useState } from 'react'
import styles from './PollWidget.module.css'
import { PollOption, PollWidgetProps } from '@/types/poll-widget'

const PollWidgetComponent: React.FC<PollWidgetProps> = ({
  question,
  options: initialOptions,
  totalVotes: initialTotalVotes = 0,
  onVote,
}) => {
  const [options, setOptions] = useState<PollOption[]>(initialOptions)
  const [totalVotes, setTotalVotes] = useState(
    initialTotalVotes ||
      initialOptions.reduce((sum, option) => sum + option.votes, 0)
  )
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const [hasVoted, setHasVoted] = useState(false)

  const handleOptionSelect = (optionId: string) => {
    if (!hasVoted) {
      setSelectedOptionId(optionId)
    }
  }

  const handleVote = () => {
    if (selectedOptionId && !hasVoted) {
      const updatedOptions = options.map((option) =>
        option.id === selectedOptionId
          ? { ...option, votes: option.votes + 1 }
          : option
      )

      setOptions(updatedOptions)
      setTotalVotes(totalVotes + 1)
      setHasVoted(true)

      // Notify parent component if callback provided
      if (onVote) {
        onVote(selectedOptionId)
      }
    }
  }

  const calculatePercentage = (votes: number) => {
    if (totalVotes === 0) return 0
    return Math.round((votes / totalVotes) * 100)
  }

  return (
    <div className={styles.pollWidget}>
      <h2 className={styles.question}>{question}</h2>

      <div className={styles.options}>
        {options.map((option) => (
          <div
            key={option.id}
            className={`${styles.option} ${
              selectedOptionId === option.id ? styles.selected : ''
            } ${hasVoted ? styles.voted : ''}`}
            onClick={() => handleOptionSelect(option.id)}
          >
            <div className={styles.optionContent}>
              <div className={styles.optionText}>{option.text}</div>

              {hasVoted && (
                <div className={styles.results}>
                  <div className={styles.percentage}>
                    {calculatePercentage(option.votes)}%
                  </div>
                  <div className={styles.votes}>
                    {option.votes} vote{option.votes !== 1 ? 's' : ''}
                  </div>
                </div>
              )}
            </div>

            {hasVoted && (
              <div className={styles.progressBarContainer}>
                <div
                  className={styles.progressBar}
                  style={{ width: `${calculatePercentage(option.votes)}%` }}
                >
                  {selectedOptionId === option.id && (
                    <div className={styles.yourVote}>Your vote</div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        {!hasVoted ? (
          <button
            className={styles.voteButton}
            disabled={!selectedOptionId}
            onClick={handleVote}
          >
            Vote
          </button>
        ) : (
          <div className={styles.totalVotes}>
            {totalVotes} total vote{totalVotes !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  )
}

export default PollWidgetComponent
