import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

 const Conversation = () => {
  return (   
    <div className='container w-5/6 sm:w-3/4 pt-6 pb-12 pr-12 md:pr-36 lg:pr-48 flex flex-col mx-auto'>
      <ul className='rounded-md border-2 border-gray-300 flex-grow focus:outline-none px-4 py-4 overflow-hidden overflow-y-scroll'>
      <li className='py-2 mb-3'>
        <p className='mb-3'>Person 1 : </p>
        <p className='rounded-md border border-gray-400 inline-block py-2 px-4'>
          <span>HELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLD</span>
        </p>
      </li>
        <li className='py-2 mb-3'><p className='mb-3'>Person 1 : </p><p className='rounded-md border border-gray-400 inline-block py-2 px-4'><span>WORLD</span></p></li>
        <li className='py-2 mb-3'><p className='mb-3'>Person 1 : </p><p className='rounded-md border border-gray-400 inline-block py-2 px-4'><span>HELLO</span></p></li>
        <li className='py-2 mb-3'><p className='mb-3'>Person 1 : </p><p className='rounded-md border border-gray-400 inline-block py-2 px-4'><span>WORLD</span></p></li>
        <li className='py-2 mb-3'><p className='mb-3'>Person 1 : </p><p className='rounded-md border border-gray-400 inline-block py-2 px-4'><span>HELLO</span></p></li>
        <li className='py-2 mb-3'><p className='mb-3'>Person 1 : </p><p className='rounded-md border border-gray-400 inline-block py-2 px-4'><span>WORLD</span></p></li>
        <li className='py-2 mb-3'><p className='mb-3'>Person 1 : </p><p className='rounded-md border border-gray-400 inline-block py-2 px-4'><span>HELLO</span></p></li>
        <li className='py-2 mb-3'><p className='mb-3'>Person 1 : </p><p className='rounded-md border border-gray-400 inline-block py-2 px-4'><span>WORLD</span></p></li>
        <li className='py-2 mb-3'><p className='mb-3'>Person 1 : </p><p className='rounded-md border border-gray-400 inline-block py-2 px-4'><span>HELLO</span></p></li>
        <li className='py-2 mb-3'><p className='mb-3'>Person 1 : </p><p className='rounded-md border border-gray-400 inline-block py-2 px-4'><span>WORLD</span></p></li>
        <li className='py-2 mb-3'><p className='mb-3'>Person 1 : </p><p className='rounded-md border border-gray-400 inline-block py-2 px-4'><span>HELLO</span></p></li>
        <li className='py-2 mb-3'><p className='mb-3'>Person 1 : </p><p className='rounded-md border border-gray-400 inline-block py-2 px-4'><span>WORLD</span></p></li>
        <li className='py-2 mb-3'><p className='mb-3'>Person 1 : </p><p className='rounded-md border border-gray-400 inline-block py-2 px-4'><span>HELLO</span></p></li>
        <li className='py-2 mb-3'><p className='mb-3'>Person 1 : </p><p className='rounded-md border border-gray-400 inline-block py-2 px-4'><span>WORLD</span></p></li>
        <li className='py-2 mb-3'><p className='mb-3'>Person 1 : </p><p className='rounded-md border border-gray-400 inline-block py-2 px-4'><span>HELLO</span></p></li>
        <li className='py-2 mb-3'><p className='mb-3'>Person 1 : </p><p className='rounded-md border border-gray-400 inline-block py-2 px-4'><span>WORLD</span></p></li>
        <li className='py-2 mb-3'><p className='mb-3'>Person 1 : </p><p className='rounded-md border border-gray-400 inline-block py-2 px-4'><span>HELLO</span></p></li>
        
      </ul>
      <div className='flex flex-row text-gray-400'>
        <button className='rounded-sm px-2 py-1 hover:bg-gray-200'>File</button> 
        <button className='rounded-sm px-2 py-1 hover:bg-gray-200'>Settings</button>
        <button className='rounded-sm px-2 py-1 hover:bg-gray-200'>Emoji</button>
      </div>
      <div className='flex flex-row item-stretch'>
        <textarea className='rounded-md resize-none w-11/12 border-2 border-gray-300 h-10 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent'></textarea>
        <button className='rounded-md w-1/12 px-2 m-2 text-xl text-gray-500 hover:bg-gray-200 hover:text-indigo-500'>
          <FontAwesomeIcon icon={['fas', 'paper-plane']}/>
        </button>
      </div>
    </div>
  )
}
export default Conversation
