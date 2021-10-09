import Navbar from "./Navbar"

const Layout = (props: {children: any}) => {
  return (
    <div className='h-screen flex flex-col w-full'>
      <Navbar />
      <main className='w-full flex flex-grow'>{props.children}</main>
    </div>
  )
}

export default Layout 
