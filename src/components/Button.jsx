import React from 'react'

//we shall create a common button component so that we do not have to  create it again and again 
// and we can then add properties as per need

function Button({
  children,
  type="button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {

// here props refer to those properties which might be later added into production..
  return (
    <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
      {children}
    </button>
  )

}

export default Button