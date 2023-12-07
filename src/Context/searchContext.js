import {createContext} from 'react'

const SearchContext = createContext({
  searchInput: '',
  onChangeSearchInput: () => {},
  fetchSearchMovies: () => {},
})

export default SearchContext
