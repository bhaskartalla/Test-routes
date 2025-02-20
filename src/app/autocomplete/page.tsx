'use client'

import { useEffect, useState, useRef } from 'react'
import styles from './styles.module.css'
import SearchIcon from '@/assets/icons/search-icon.svg'
import CrossIcon from '@/assets/icons/cross-icon.svg'
import {
  CacheResultsType,
  ResultType,
  SearchResponseType,
} from '@/types/autocomplete'

const AutoComplete = () => {
  const [showAutoSearch, setShowAutoSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedResult, setSelectedResult] = useState('')
  const [cacheResults, setCacheResults] = useState<CacheResultsType>({})
  const [searchResults, setSearchResults] = useState<SearchResponseType>(
    {} as SearchResponseType
  )
  const [selectedIndex, setSelectedIndex] = useState(-1) // Track highlighted result
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    console.log('Cache Results:', cacheResults)
  }, [searchResults, selectedResult, cacheResults])

  const fetchData = async (searchQuery: string) => {
    if (cacheResults[searchQuery] !== undefined) {
      setSearchResults((prev) => ({
        ...prev,
        results: cacheResults[searchQuery],
      }))
      return
    }

    const response = await fetch(
      `https://google-search74.p.rapidapi.com/?query=${
        searchQuery || 'all'
      }&limit=10&related_keywords=true`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'google-search74.p.rapidapi.com',
          'x-rapidapi-key':
            '8d7f9fbf8amsh6c76b7dd75ed2b5p125aa8jsnce0632cc4f34',
        },
      }
    )

    const results: SearchResponseType = await response.json()
    setCacheResults((prev) => ({ ...prev, [searchQuery]: results.results }))
    setSearchResults(results)
  }

  useEffect(() => {
    if (!searchQuery) return
    const timer = setTimeout(() => fetchData(searchQuery), 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event?.target.value)
    setSelectedIndex(-1) // Reset selection on new input
  }

  const handleInputCross = () => {
    setSearchQuery('')
  }

  const handleInputOnFocus = () => {
    setShowAutoSearch(true)
    fetchData(searchQuery)
  }

  const handleResultsClick = (url: string) => {
    setSelectedResult(url)
    setShowAutoSearch(false)
    window.open(url, '_blank')
  }

  // Handle keyboard navigation
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.metaKey && event.key === 'k') {
      event.preventDefault()
      inputRef.current?.focus()
    }

    if (showAutoSearch && searchResults.results.length > 0) {
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setSelectedIndex((prev) =>
          prev < searchResults.results.length - 1 ? prev + 1 : 0
        )
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : searchResults.results.length - 1
        )
      } else if (event.key === 'Enter' && selectedIndex !== -1) {
        handleResultsClick(searchResults.results[selectedIndex].url)
      }
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [searchResults, selectedIndex])

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <h1>Auto Complete Search</h1>
        <h2 className={styles.selectedResult}>{selectedResult}</h2>
        <div
          className={`${styles.inputWrapper} ${
            showAutoSearch && searchResults?.results?.length
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
            placeholder={'Search for Results'}
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
        {showAutoSearch && searchResults?.results?.length ? (
          <div className={styles.searchResultsParent}>
            <ul
              ref={resultsRef}
              className={styles.searchResultsScrollable}
            >
              {searchResults.results?.map((result: ResultType, index) => (
                <li
                  key={result.position}
                  className={`${styles.autoSuggestion} ${
                    index === selectedIndex ? styles.highlight : ''
                  }`}
                  onMouseDown={() => handleResultsClick(result.url)}
                >
                  {result.title}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
export default AutoComplete
