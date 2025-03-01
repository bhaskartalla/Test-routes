// Define types for steps and stages
export type StepType = {
  name: string
}

export type StageType = {
  name: string
  steps: number
  progress: number
}

// Props for ProgressBar component
export type ProgressBarPropsType = {
  stages: StageType[]
}

// Props for StageProgress component
export type StageProgressPropsType = {
  progress: number
}
