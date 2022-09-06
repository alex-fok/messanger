import Navbar from '../Navbar'
import type { LayoutFC } from '../../types/components/layout'

const Layout:LayoutFC = ({children}) => {
  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <main className='h-5/6 flex flex-row'>
          {children}
      </main>
    </div>
  )
}

export default Layout 
