import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import React, { useEffect, useState } from "react"

const UserLookUpModal = ({hideContent, keyword}: { hideContent: ()=>void, keyword:string }) => {
  const [usersFound, setUsersFound] = useState<{username:string}[]>([])

  useEffect(()=> {
    (async () => {
      const {data} = await axios({
        method: 'POST',
        url: `/api/search`,
        data: { type: 'user', keyword }
      })
      console.log(data.searchResult)
      setUsersFound(data.searchResult)
    })()
  },[])

  return (
    <div className='flex fixed inset-0 items-center justify-center z-10 sm:p-4 bg-gray-800 bg-opacity-50' onClick={hideContent}>

      <article className='flex flex-col inline-block w-96 px-5 py-3 rounded-md bg-gray-100' onClick={(e)=>{e.stopPropagation()}}>
        <span className='self-end font-thin text-3xl leading-5 cursor-pointer' onClick={hideContent}>&times;</span>
        {/* <h1 className='m-2 text-lg font-semibold'>CREATE ACCOUNT</h1> */}
        {usersFound.length > 0 ?
          <ul className='m-2'>
            {usersFound.map(user => 
              <li className='py-2 gap-2 rounded flex flex-row items-center hover:bg-gray-200'>
                 <FontAwesomeIcon icon={['fas', 'user']}/>
                <span className='cursor-default' >{user.username}</span>
              </li>
            )}
          </ul>
          : <p className='text-gray-400 p-4 text-lg text-center'>No Results</p>
        }
        
      </article>
    </div>
  )

}
export default UserLookUpModal
