export default function Conversation() {
  return (   
    <div className='container h-screen w-5/6 md:w-2/3 pt-2 flex flex-col mx-auto text-gray-400'>
      <textarea readOnly={true} className='rounded-sm flex-grow resize-none border-2 border-gray-300 focus:outline-none' defaultValue={'(16:02) USER2 :\n\tHELLO WORLD'}></textarea>
      <div className='flex flex-row'>
        <button className='rounded-sm px-2 py-1 hover:bg-gray-200'>File</button> 
        <button className='rounded-sm px-2 py-1 hover:bg-gray-200'>Settings</button>
        <button className='rounded-sm px-2 py-1 hover:bg-gray-200'>Emoji</button>
      </div>
      <textarea className='rounded-sm resize-none border-2 border-gray-300 h-24 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent'></textarea>
      <button className='rounded-md self-end px-2 py-1 my-1 hover:bg-gray-200'>Send</button>
    </div>
  )
}
