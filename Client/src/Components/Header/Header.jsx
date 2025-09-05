import React from 'react'
import { useSelector } from 'react-redux'

const Header = () => {
  const data = useSelector((store) => store.userData)

  return (
    <div>
      Header {data ? data.userName : "Guest"}
    </div>
  )
}

export default Header
