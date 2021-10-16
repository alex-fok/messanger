import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='top-0 w-screen flex flex-row bg-gray-900 pr-12 md:pr-36 lg:pr-48 py-5 justify-end text-gray-400'>
      <Link href='#'><a className='px-3 hover:text-gray-200 cursor-pointer'>Profile</a></Link>
      <Link href='/login'><a className='px-3 hover:text-gray-200'>Login</a></Link>
    </nav>
  )
}
export default Navbar
