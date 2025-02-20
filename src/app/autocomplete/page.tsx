'use client'

import { useEffect, useState, useRef } from 'react'
import styles from './styles.module.css'
import SearchIcon from '@/assets/icons/search-icon.svg'
import CrossIcon from '@/assets/icons/cross-icon.svg'
import {
  CacheResultsType,
  RecipeType,
  ResponseType,
} from '@/types/autocomplete'

const AutoComplete = () => {
  const [showAutoSearch, setShowAutoSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [cacheResults, setCacheResults] = useState<CacheResultsType>({})
  const [searchResults, setSearchResults] = useState<ResponseType>(
    {} as ResponseType
  )
  const [selectedTabIndex, setSelectedTabIndex] = useState(-1)

  const inputRef = useRef<HTMLInputElement>(null)
  const resultRef = useRef<HTMLUListElement>(null)

  const handleKeyDown = (event: KeyboardEvent) => {
    const { metaKey, ctrlKey, key } = event

    if (key === 'Escape') {
      event.preventDefault()
      setShowAutoSearch(false)
      setSelectedTabIndex(-1)
    }

    if ((metaKey || ctrlKey) && key === 'k') {
      event.preventDefault()
      inputRef.current?.focus()
    }

    if (showAutoSearch && searchResults.recipes?.length) {
      if (key === 'ArrowDown') {
        event.preventDefault()
        setSelectedTabIndex((prev) =>
          prev < searchResults.recipes.length - 1 ? prev + 1 : 0
        )
      } else if (key === 'ArrowUp') {
        event.preventDefault()
        setSelectedTabIndex((prev) =>
          prev > 0 ? prev - 1 : searchResults.recipes.length - 1
        )
      } else if (key === 'Enter' && selectedTabIndex !== -1) {
        handleResultsClick(searchResults.recipes[selectedTabIndex].image)
      }
    }
  }

  const fetchData = async (searchQuery: string) => {
    if (cacheResults[searchQuery] !== undefined) {
      setSearchResults((prev) => ({
        ...prev,
        recipes: cacheResults[searchQuery],
      }))
      return
    }

    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${searchQuery}`
    )
    const results: ResponseType = await response.json()
    setCacheResults((prev) => ({ ...prev, [searchQuery]: results.recipes }))
    setSearchResults(results)
  }

  useEffect(() => {
    // console.log('🚀 ~ AutoComplete ~ searchResults:', searchResults)
    // console.log('🚀 ~ AutoComplete ~ cacheResults:', cacheResults)
    setShowAutoSearch(!!searchResults.recipes?.length || false)
  }, [searchResults, cacheResults])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [searchResults, selectedTabIndex])

  useEffect(() => {
    if (!searchQuery) return
    const timer = setTimeout(() => fetchData(searchQuery), 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  useEffect(() => {
    if (selectedTabIndex >= 0 && resultRef.current) {
      const focusedItem = resultRef.current.children[
        selectedTabIndex
      ] as HTMLElement
      focusedItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [selectedTabIndex])

  const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(event?.target.value)

  const handleInputCross = () => {
    setSearchQuery('')
  }

  const handleInputOnFocus = () => {
    setShowAutoSearch(true)
    fetchData('')
  }

  const handleResultsClick = (url: string) => {
    setShowAutoSearch(false)
    window.open(url, '_blank')
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <h1>Auto Complete Search</h1>
        <div
          className={`${styles.inputWrapper} ${
            showAutoSearch && searchResults?.recipes?.length
              ? styles.inputWrapperFocus
              : ''
          }`}
        >
          <SearchIcon
            width={24}
            height={24}
            fill='#9aa0a6'
          />
          <input
            ref={inputRef}
            placeholder={'Search for Receipes (Cmd+k to focus)'}
            className={`${styles.searchInput} `}
            value={searchQuery}
            onChange={handleOnInputChange}
            onFocus={handleInputOnFocus}
            onBlur={() => setShowAutoSearch(false)}
          />
          {searchQuery && (
            <CrossIcon
              width={24}
              height={24}
              fill='#e8eaed'
              onClick={handleInputCross}
            />
          )}
        </div>
        {showAutoSearch && searchResults?.recipes?.length ? (
          <div className={styles.searchResultsParent}>
            <ul
              tabIndex={1}
              ref={resultRef}
              className={styles.searchResultsScrollable}
            >
              {searchResults.recipes?.map(
                (recipe: RecipeType, index: number) => (
                  <li
                    key={recipe.id}
                    className={`${styles.autoSuggestion} ${
                      selectedTabIndex === index ? styles.highlight : ''
                    }`}
                    onMouseDown={() => handleResultsClick(recipe.image)}
                  >
                    {recipe.name}
                  </li>
                )
              )}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  )
}
export default AutoComplete
