export default function SideNav() {
  return (
    <nav className='w-44 ml-4 lg:ml-12 lg:px-8'>
    <ul className='mt-12  text-xl font-semibold'>
      <li className='text-gray-400 mb-5 hover:text-gray-800 cursor-pointer' href='#'><a>Contact</a></li>
      <li className='text-gray-400 mb-5 hover:text-gray-800 cursor-pointer' href='#'><a>Profile</a></li>
    </ul>
    <br />
    <figure>
      <figcaption className='text-gray-400 text-base font-light mb-2'>Direct Messages</figcaption>
      <ul>
        <li className='text-gray-600 text-sm px-2 mb-1 cursor-pointer'>Person 1</li>
        <li className='text-gray-600 text-sm px-2 mb-1 cursor-pointer'>Person 1</li>
      </ul>
    </figure>
    </nav>
  )
}
