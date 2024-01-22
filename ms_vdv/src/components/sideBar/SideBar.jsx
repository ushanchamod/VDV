import React from 'react'
import './style.scss'
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/img/login_logo.png'

const navLinks = [
    {
        title: 'Dashboard',
        path: '/'
    },
    {
        title: 'Manage Jobs',
        path: '/jobs'
    },
];

const SideBar = () => {
    return (
        <div className='side-bar-container'>
            <div className="logo">
                <div>
                    <img src={Logo} alt="logo_image" />
                    {/* <p>ADMIN</p> */}
                </div>
            </div>
            <div className="inner-container">
                <div className="list-container">
                    <ul>
                        {navLinks.map((link, index) => (
                            <li key={index} >
                                <NavLink to={link.path} className="NavLink"
                                >
                                    {link.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SideBar