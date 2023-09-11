import type { CurrentUsersFC } from 'types/components/userLookup'

const CurrentUsers: CurrentUsersFC = ({username, currentChat}) => {
  if (!currentChat) return null
  return (
    <>
      <div className='font-light text-sm mb-2'>Added Users:</div>
        <div className='flex ml-2'>
        { currentChat.participants.filter(p => p !== username).map(user => 
          <div
            key={user}
            className='border border-gray-400 px-2 py-1 m-1 rounded text-xs font-light'
          >{user}
          </div>
        )}
      </div>
    </>
  ) 
}

export default CurrentUsers
