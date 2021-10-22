import mongodb from './mongodb'
import type {Document} from 'mongodb'

type SearchResultType = { searchResult: Document[] }
type ErrorType = { error: string }
type SearchReturnType = SearchResultType | ErrorType

const search = async({name, $or}:{name: string, $or: string[]}, keyword: string) : Promise<SearchReturnType> => {
  const client = await mongodb
  const db = client.db()

  const isColExisting = db.listCollections({name})
  if(!isColExisting) return {error: 'No Collection Found'}
  
  const query = {
    $or: $or.map(category => ({[category]: keyword}))
  }

  const projection = { _id: 0, username: 1 }
  const results = await db.collection(name).find(query).project(projection).toArray()    
  return { searchResult: results }
  
}
export default search
