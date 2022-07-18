import connectToDB from './mongodb'
import type { SearchReturn } from '../../types/lib/db/search'

const search = async({name, $or}:{name: string, $or: string[]}, keyword: string) : Promise<SearchReturn> => {
  const client = await connectToDB()
  const db = client.db()

  const isColValid = db.listCollections({name})
  if(!isColValid) return {error: 'No Collection Found'}
  
  const query = {
    $or: $or.map(category => ({[category]: keyword}))
  }

  const projection = { _id: 0, username: 1 }
  const results = await db.collection(name).find(query).project(projection).toArray()    
  return { searchResult: results }
  
}
export default search
