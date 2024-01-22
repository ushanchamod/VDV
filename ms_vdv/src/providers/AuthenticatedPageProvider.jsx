import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import SideBar from '../components/sideBar/SideBar'
import User from '../assets/img/default_user.png'
import { BsFilterLeft } from 'react-icons/bs'
import instance from '../service/AxiosInstance'


const NavTop = () => {
  const [username, setUsername] = useState(null)

  useEffect(() => {
    const getUserName = async () => {
      try {
        const response = await instance.get('/admin/check-auth')
        setUsername(response.data.username)
      } catch (error) {
        console.log(error)
      }
    }
    getUserName()
  })
  return (
    <div style={{ width: '100%', height: '50px', background: '#fff', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', boxSizing: 'border-box', position: 'relative', display: 'flex', justifyContent: 'space-between', paddingRight: '20px' }}>
      <div style={{ height: '100%', display: 'flex', alignItems: 'center', boxSizing: 'border-box' }}>
        <BsFilterLeft style={{ fontSize: 35, cursor: 'pointer', padding: '0 5px' }} />
      </div>

      <div style={{ height: '100%', display: 'flex', alignItems: 'center', boxSizing: 'border-box' }}>
        <img src={User} alt="user icon" style={{ height: '40px', width: '40px', borderRadius: '50%', border: '1px solid #eee' }} />
        <p style={{ marginLeft: 10, fontFamily: 'arial', fontWeight: 'bold', color: '#EF3038' }}>{username ? username: "Loading ...."}</p>
      </div>
    </div>
  )

}

const AuthenticatedPageProvider = () => {
  const location = useLocation();

  const [page, setPage] = useState('Dashboard');

  useEffect(() => {

    if (location.pathname === '/') {
      setPage('Dashboard');
    } else if (location.pathname === '/jobs') {
      setPage('');
    }

  }, [location]);

  return (
    <div style={{ width: '100vw', height: '100vh', boxSizing: 'border-box', display: 'flex', flexDirection: 'row' }}>

      <div style={{ background: 'red', boxSizing: 'border-box', overflowX: 'hidden' }}>
        <SideBar />
      </div>

      <div style={{ background: '#fff', width: '100%', boxSizing: 'border-box', height: '100vh', overflow: 'hidden' }}>
        
        <NavTop />

        <div style={{ width: '100%', height: 'calc(100vh - 50px)', boxSizing: 'border-box', paddingTop: 10, overflowY: 'auto', background: '#fff' }}>
          
          <div>
            <h1 style={{ fontFamily: 'arial', fontSize: 20, paddingBottom: 0 }}>{page}</h1>
          </div>

          <Outlet />
        </div>

      </div>
    </div>
  )
}

export default AuthenticatedPageProvider;