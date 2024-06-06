import React from 'react'


function Container({children}) {
  return <div className='w-full max-w-7xl mx-auto px-4'> 
  {/* <Header /> */}
  {children} 
  {/* <Footer /> */}
  </div>;
  
}

export default Container