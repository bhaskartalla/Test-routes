'use client'

import React, { useState, useCallback, useEffect } from 'react'
import './styles.css'
import {
  ProgressBarPropsType,
  StageProgressPropsType,
  StageType,
  StepType,
} from '@/types/progressbar'

const ProgressBar: React.FC<ProgressBarPropsType> = ({ stages }) => {
  let currentStep = 0,
    currentPage = '',
    nextPage = ''

  const index = stages.findIndex((stage) => stage.progress < stage.steps)
  if (index !== -1) {
    currentStep = index + 1
    currentPage = stages[index].name
    nextPage = index + 1 < stages.length ? stages[index + 1].name : ''
  }

  return (
    <div className='progress-container'>
      <div className='header'>
        <span>
          {`${currentStep}/${stages.length}`} <b>{currentPage}</b>
        </span>
        {currentStep < stages.length && (
          <span>
            Next: <b>{nextPage}</b>
          </span>
        )}
      </div>

      <div className='progress-bars'>
        {stages.map((stage, index) => (
          <StageProgress
            key={index}
            progress={(stage.progress / stage.steps) * 100}
          />
        ))}
      </div>
    </div>
  )
}

const StageProgress: React.FC<StageProgressPropsType> = React.memo(
  ({ progress }) => {
    return (
      <div className='stage-bar'>
        <div
          className='fill'
          style={{ transform: `translateX(${progress - 100}%)` }}
        ></div>
      </div>
    )
  }
)

const MultiStepProgressBar: React.FC = () => {
  const [stages, setStages] = useState<StageType[]>([
    {
      name: 'A',
      steps: 3,
      progress: 0,
    },
    {
      name: 'B',
      steps: 4,
      progress: 0,
    },
    {
      name: 'C',
      steps: 3,
      progress: 0,
    },
    {
      name: 'D',
      steps: 2,
      progress: 0,
    },
    {
      name: 'E',
      steps: 5,
      progress: 0,
    },
    {
      name: 'F',
      steps: 1,
      progress: 0,
    },
    {
      name: 'G',
      steps: 7,
      progress: 0,
    },
  ])

  const handlePrevStep = () => {
    setStages((prev) => {
      let index = prev.findIndex((stage) => stage.progress === 0)
      if (index === -1) index = prev.length - 1
      else index -= 1

      return prev.map((stage, i) =>
        i === index ? { ...stage, progress: stage.progress - 1 } : stage
      )
    })
  }

  const handleNextStep = () => {
    setStages((prev) => {
      let index = prev.findIndex((stage) => stage.progress < stage.steps)
      return prev.map((stage, i) =>
        i === index ? { ...stage, progress: stage.progress + 1 } : stage
      )
    })
  }

  return (
    <div className='form-wizard'>
      <ProgressBar stages={stages} />
      <div className='navigation-buttons'>
        <button onClick={handlePrevStep}>Prev</button>
        <button onClick={handleNextStep}>Next</button>
      </div>
    </div>
  )
}

export default MultiStepProgressBar
