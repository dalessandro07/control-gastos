import React from 'react'

import { Button } from '@material-tailwind/react'

const MeetDeveloper = () => {
  return (
    <div className="my-5 flex justify-around">
      <Button color="teal" size="sm" variant="text">
        <a
          className="flex items-center gap-2 bg-gradient-to-l from-teal-600 to-teal-300 bg-clip-text text-transparent"
          href="https://www.linkedin.com/in/alessandro-rios/">
          LinkedIn
        </a>
      </Button>

      <Button color="blue-gray" size="sm" variant="text">
        <a
          className="flex items-center gap-2 bg-gradient-to-l from-gray-900 to-gray-600 bg-clip-text text-transparent"
          href="https://github.com/dalessandro07">
          Github
        </a>
      </Button>

      <Button size="sm" variant="text">
        <a
          className="flex items-center gap-2 bg-gradient-to-l from-blue-900 to-indigo-300 bg-clip-text text-transparent"
          href="https://paypal.me/alessandroriosv">
          Paypal
        </a>
      </Button>
    </div>
  )
}

export default MeetDeveloper
