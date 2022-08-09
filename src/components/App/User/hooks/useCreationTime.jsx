import { useAuth } from '../../../../context/AuthContext'
import moment from 'moment'

const useCreationTime = () => {
  const { user } = useAuth()

  const createdAtTimestamp = new Date(Number(user?.reloadUserInfo?.createdAt))
  const createdAt = moment(createdAtTimestamp).fromNow()

  const isMoreThanAMonth =
    createdAt.includes('mes') ||
    createdAt.includes('meses') ||
    createdAt.includes('año') ||
    createdAt.includes('años')

  return {
    createdAt,
    isMoreThanAMonth
  }
}

export default useCreationTime
