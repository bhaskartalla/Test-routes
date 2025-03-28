export type SearchResponseType = {
  searchTerm: string
  knowledgePanel: KnowledgePanelType
  results: ResultType[]
  relatedKeywords: RelatedKeywordsType
}

export type KnowledgePanelType = {
  name: string
  label: string
  description: DescriptionType
  image: ImageType
  info: InfoType[]
}

export type DescriptionType = {
  text: string
  url: string
  site: string
}

export type ImageType = {
  url: string
  width: number
  height: number
  pageURL: string
}

export type InfoType = {
  title: string
  labels: string[]
}

export type RelatedKeywordsType = {
  spellingSuggestionHTML: null
  spellingSuggestion: null
  keywords: KeywordType[]
}

export type KeywordType = {
  position: number
  knowledge: KnowledgeType | null
  keywordHTML: string
  keyword: string
}

export type KnowledgeType = {
  title: string
  label: string
  image: string
}

export type ResultType = {
  position: number
  url: string
  title: string
  description: string
}

// export type CacheResultsType = {
//   [key: string]: ResultType[]
// }

export type RecipeType = {
  id: number
  name: string
  ingredients: string[]
  instructions: string[]
  prepTimeMinutes: number
  cookTimeMinutes: number
  servings: number
  difficulty: string
  cuisine: string
  caloriesPerServing: number
  tags: string[]
  userId: number
  image: string
  rating: number
  reviewCount: number
  mealType: string[]
}

export type ResponseType = {
  recipes: RecipeType[]
  total: number
  skip: number
  limit: number
}

export type CacheResultsType = {
  [key: string]: RecipeType[]
}
