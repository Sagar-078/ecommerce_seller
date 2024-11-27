
import React, { useEffect } from 'react'
import AppContextCreator from './Appcontext'

const Provider = ({children}:{children:React.ReactNode}) => {
    
    // useEffect(() => {
    //     console.log("hellow world");
    // }, [])

  return (
    <AppContextCreator>
        {children}
    </AppContextCreator>
  )
}

export default Provider