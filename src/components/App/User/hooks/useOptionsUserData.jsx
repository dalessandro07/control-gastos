import React from 'react'

import useCreationTime from './useCreationTime'

import EditUser from '../edit/EditUser'
import SelectDivisa from '../divisa/SelectDivisa'
import HelpCenter from '../help/HelpCenter'
import MeetDeveloper from '../help/MeetDeveloper'

const useOptionsUserData = () => {
  const { isMoreThanAMonth } = useCreationTime()

  const userOptions = [
    {
      id: 1,
      title: 'Editar perfil',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
      ),
      content: <EditUser EditUser />
    },
    {
      id: 2,
      title: 'Cambiar moneda',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor">
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      content: <SelectDivisa />
    },
    {
      id: 3,
      title: 'Centro de ayuda',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
      content: <HelpCenter />
    }
  ]

  if (isMoreThanAMonth) {
    userOptions.push({
      id: 4,
      title: 'Apoya al desarrollador',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="20"
          height="20"
          viewBox="0 0 30 30"
          fill="currentColor">
          <path d="M 14.28125 2.0039062 C 8.86125 1.8659063 4.0044844 5.8295938 3.1464844 11.183594 C 2.5044844 15.191594 4.031375 18.872953 6.734375 21.251953 C 7.564375 21.981953 8 23.061969 8 24.167969 L 8 28 L 18 28 L 18 26.441406 C 18 25.580406 18.550187 24.816922 19.367188 24.544922 L 22.632812 23.457031 C 23.448813 23.184031 24 22.419594 24 21.558594 L 24 17.744141 L 26.267578 16.962891 A 1 1 0 0 0 27 16 A 1 1 0 0 0 26.773438 15.369141 L 26.746094 15.335938 A 1 1 0 0 0 26.716797 15.302734 L 23.958984 11.998047 C 23.5582 6.4851023 19.861766 2.1444805 14.28125 2.0039062 z M 14.800781 8.0175781 C 14.928078 7.99175 15.062266 7.9915312 15.197266 8.0195312 C 15.738266 8.1275313 16.089469 8.6533125 15.980469 9.1953125 L 13.980469 19.195312 C 13.886469 19.671312 13.468953 20 13.001953 20 C 12.936953 20 12.870687 19.994469 12.804688 19.980469 C 12.263687 19.872469 11.910531 19.344734 12.019531 18.802734 L 14.019531 8.8027344 C 14.099781 8.3954844 14.418891 8.0950625 14.800781 8.0175781 z M 9.1855469 10.017578 C 9.3133281 10.041937 9.4391875 10.093172 9.5546875 10.169922 C 10.014688 10.476922 10.139031 11.096641 9.8320312 11.556641 L 8.2011719 14 L 9.8320312 16.445312 C 10.139031 16.905313 10.014688 17.525031 9.5546875 17.832031 C 9.3836875 17.945031 9.1919531 18 9.0019531 18 C 8.6789531 18 8.3599688 17.843688 8.1679688 17.554688 L 6.1679688 14.554688 C 5.9439687 14.218687 5.9439687 13.781312 6.1679688 13.445312 L 8.1679688 10.445312 C 8.3974687 10.100312 8.8022031 9.9445 9.1855469 10.017578 z M 18.8125 10.017578 C 19.195328 9.9445 19.601781 10.100312 19.832031 10.445312 L 21.832031 13.445312 C 22.056031 13.781313 22.056031 14.218687 21.832031 14.554688 L 19.832031 17.554688 C 19.640031 17.843688 19.321047 18 18.998047 18 C 18.808047 18 18.616313 17.945031 18.445312 17.832031 C 17.985312 17.525031 17.860969 16.905313 18.167969 16.445312 L 19.798828 14 L 18.167969 11.554688 C 17.860969 11.094687 17.985312 10.474969 18.445312 10.167969 C 18.560313 10.091219 18.684891 10.041937 18.8125 10.017578 z"></path>
        </svg>
      ),
      content: <MeetDeveloper />
    })
  }

  return { userOptions }
}

export default useOptionsUserData
