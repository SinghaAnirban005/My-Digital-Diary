import React from 'react'
import Container from '../container/Container.jsx'
import Logo from '../Logo.jsx'
import LogoutBtn from './LogoutBtn.jsx'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {

  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  //Based on actve stattus we shall navigate to the respective directory...
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]

  
  return (
    <header className='py-3 shadow bg-blue-900'>
      <Container>
        <nav className='flex items-center'>
        <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />

              </Link>
          </div>

          <ul className='flex ml-auto'>
            {
              navItems.map((item) => item.active ? (
                <li className='font-bold font-sans' key={item.name}>
                  <button
                  onClick={() => navigate(item.slug)}
                  className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' >
                    {item.name}
                  </button> 

                </li>
              )
                : null )
            }
            {authStatus && (
              <li className='font-bold font-sans'>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header