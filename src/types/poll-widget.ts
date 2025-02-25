export type PollOption = {
  id: string
  text: string
  votes: number
}

export type PollWidgetProps = {
  question: string
  options: PollOption[]
  totalVotes?: number
  onVote?: (optionId: string) => void
}
