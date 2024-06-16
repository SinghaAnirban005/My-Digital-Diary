import React from 'react'
import { useId } from 'react'

function Input({
  label,
  type="text",
  className="",
  ...props
}, ref) {
  // In order to set an unique id ()  for label and input box
  const id = useId()

  return (
    <div className='w-full'>
        {label && <label 
            className='inline-block mb-1 pl-1 text-white' 
            htmlFor={id}>
                {label}
            </label>
        }

        <input
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            ref={ref}
            {...props}
            id={id}
        />
    </div>
  )
}

export default React.forwardRef(Input)