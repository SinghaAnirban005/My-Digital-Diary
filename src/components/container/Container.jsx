import React from 'react'

// Container file acts as a container for containing children prop passed

function Container({children}) {
  return <div className='w-full max-w-7xl mx-auto px-4'> 

  {children} 
  
  </div>;
  
}

export default Container