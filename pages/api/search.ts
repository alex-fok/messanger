import { NextApiRequest, NextApiResponse } from 'next'
import dbSearch from '../../lib/db/search'
import getJwtPayload from '../../lib/authentication/getJwtPayload'

type SearchRequestBody = {
  type: string,
  keyword: string
}

const dbNameMap:Record<string, {name: string, $or:string[]}> = {
  'user': {
    name: 'user',
    $or: ['username', 'nickname']
  }
}

const search = async (req:NextApiRequest, res:NextApiResponse) => {
  const payload = getJwtPayload(req.headers.cookie)
  
  if (!payload) return {error: 'User not logged in', redirect: true}
  
  const {type, keyword}: SearchRequestBody = req.body 
  if (type in dbNameMap) {
    const dbResult = await dbSearch(dbNameMap[type], keyword)
    return res.json(dbResult)
  }
  res.json({searchResult: []})
}
export default search
