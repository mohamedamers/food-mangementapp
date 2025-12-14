import React from 'react'
import SideBar from'../SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import Header from '../Header/Header'

export default function MasterLayout() {
  return (
    <div className='d-flex vh-100'>
        <div className="">
            <SideBar/>
        </div>
        <div className='w-100  overflow-auto'>
            <NavBar/>
            <Outlet/>
        </div>
    </div>
  )
}
