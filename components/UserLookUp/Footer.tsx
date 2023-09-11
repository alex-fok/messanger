import { useContext, useMemo } from 'react'
import AppContext from 'contexts/app'
import { getNewVal } from 'utils/valGenerator'
import type { FooterFC } from 'types/components/userLookup'

const Footer:FooterFC = ({chat, usersFound, onClose}) => {
  const {user} = useContext(AppContext)
  const {dispatchActive, dispatchList} = useMemo(() => ({
    dispatchActive: chat.dispatchActive,
    dispatchList: chat.dispatchList
  }), [chat])

  const createTmp = () => {
    const tmpId = `tmp_${getNewVal()}`
    const participants = [user.username, ...usersFound.list.filter(users => users.added).map(users => users.username)]
    dispatchActive({
      type:'createTmp',
      participants,
      tmpId
    })
    dispatchList({
      type:'addTmpChat',
      participants,
      tmpId
    })
    onClose()
  }

  return (
    <div className='px-2 py-1 font-light self-end'>
      <button
        className={`px-2 py-1 rounded font-light disabled:text-gray-300 ${usersFound.count === 0 ? 'cursor-auto' : 'cursor-pointer hover:underline'}`}
        onClick={createTmp}
        disabled={usersFound.count === 0}
      >Create Chat</button>
      <button
        className='px-2 py-1 rounded font-light disabled:text-gray-300 hover:underline'
        onClick={onClose}
      >Close</button>
    </div>
  )
}

export default Footer
