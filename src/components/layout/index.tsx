import { Outlet } from 'react-router-dom'


const DefaultLayout = () => {
  return (
    <div className='flex min-h-screen  w-screen bg-black text-white justify-center items-center'><Outlet /></div>
  )
}

export default DefaultLayout