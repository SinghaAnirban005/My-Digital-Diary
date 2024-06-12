import React from 'react'
import github from "../components/Header/github.jpg"

function Logo({width = '100px'}) {
  return (
    <div>
      <a href='https://github.com/SinghaAnirban005' target='_blank'><img src={github} alt='Logo' className='h-14 rounded-3xl' /></a>
    </div>
  )
}

export default Logo