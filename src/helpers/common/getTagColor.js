import { statuses } from '../../constants/User'

export const getTagColor = status => {
  switch (status) {
    case statuses.ACTIVE:
      return 'green'
    case statuses.ARCHIVED:
      return 'orange'
    case statuses.BLOCKED:
      return 'red'
    default:
      return null
  }
}
