import type {Document} from 'mongodb'
type SearchResult = { searchResult: Document[] }
type Error = { error: string }
export type SearchReturn = SearchResult | Error
