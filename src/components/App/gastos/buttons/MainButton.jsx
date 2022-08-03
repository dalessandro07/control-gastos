import React from 'react'
import { Link } from 'react-router-dom'

const MainButton = ({ url, pathsIcon, title }) => {
  return (
    <Link to={url}>
      <button className="flex flex-col items-center justify-center rounded-md bg-gray-800 p-2 hover:bg-gray-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-9 w-9"
          viewBox="0 0 20 20"
          fill="#fcfcfc">
          {pathsIcon.map((path, index) => (
            <path fillRule="evenodd" clipRule="evenodd" key={index} d={path} />
          ))}
        </svg>
        <p className="text-sm text-gray-100">{title}</p>
      </button>
    </Link>
  )
}

export default MainButton
