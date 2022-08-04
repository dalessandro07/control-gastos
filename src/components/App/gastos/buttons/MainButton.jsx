import React from 'react'
import { Link } from 'react-router-dom'

const MainButton = ({ url, pathsIcon, title }) => {
  return (
    <Link to={url}>
      <button className="flex flex-col items-center justify-center p-2 hover:scale-105">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="#fff">
          {pathsIcon.map((path, index) => (
            <path fillRule="evenodd" clipRule="evenodd" key={index} d={path} />
          ))}
        </svg>
        <p className="text-xs text-white">{title}</p>
      </button>
    </Link>
  )
}

export default MainButton
