import Conversation from '../components/Conversation'
import Navbar from '../components/Navbar'
import SideNav from '../components/SideNav'

export default function Home() {
  return (
    <div className='flex flex-row'>
      <div className='h-screen w-100 flex flex-grow flex-col'>
        <Navbar />
        <div className='flex flex-row h-5/6'>
          <SideNav />
          <Conversation/>
        </div>
      </div>
    </div>
  )
}
