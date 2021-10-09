const Navbar = () => {
  return (
    <nav className='top-0 w-full flex flex-row bg-gray-900 pr-12 md:pr-36 lg:pr-48 py-5 justify-end text-gray-400'>
      <a className='px-3 hover:text-gray-200 cursor-pointer'>Profile</a>
      <a className='px-3 hover:text-gray-200' href='/login'>Login</a>
    </nav>
  )
}
export default Navbar
