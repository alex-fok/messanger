import Navbar from "./Navbar"

const Layout = (props: {children: any}) => {
  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <main className='h-5/6'>{props.children}</main>
    </div>
  )
}

export default Layout 
