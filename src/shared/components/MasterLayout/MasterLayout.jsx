import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import SideBar from '../SideBar/SideBar'

export default function MasterLayout() {
  return (
    <div className='d-flex vh-100'>
        <div className="">
            <SideBar/>
        </div>
        <div className='w-100  overflow-auto'>
            <NavBar />
            <Outlet/>
        </div>
    </div>
  )
}
