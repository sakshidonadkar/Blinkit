import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const user = useSelector(state => state.user)

  console.log("user dashboard",user)
  return (
    <section className="bg-white">
  <div className="container mx-auto p-3 flex">
    {/** Left menu as a margin-like sidebar */}
    <div className="py-4 sticky top-24 max-h-[calc(100vh-96px)] overflow-y-auto hidden lg:flex lg:w-[250px] border-r">
      <UserMenu />
    </div>

    {/** Right content taking the remaining space */}
    <div className="bg-white min-h-[75vh] flex-1 px-4">
      <Outlet />
    </div>
  </div>
</section>

  )
}

export default Dashboard