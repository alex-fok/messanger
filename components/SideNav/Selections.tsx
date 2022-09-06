import { FC } from 'react'

const Selections:FC = () => {
  const itemClasses = 'text-gray-400 mb-5 hover:text-gray-800 cursor-pointer'
  return (
    <ul className='mt-12 text-xl font-semibold'>
      <li className={itemClasses}><a>Contact</a></li>
      <li className={itemClasses}><a>Profile</a></li>
    </ul>
  )
}

export default Selections
