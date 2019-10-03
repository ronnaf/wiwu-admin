import { notification } from 'antd'

import { firestore } from '../../firebase'

export const generateKey = async () => {
  try {
    const user = await firestore.collection('adminKeys').add({
      user: null
    })

    const args = {
      message: 'Successfully Generated Admin Key',
      description: `New admin code: ${user.id}`,
      duration: 0,
      placement: 'bottomLeft'
    }
    notification.success(args)
  } catch (e) {
    notification.error({
      message: 'Generate Admin Key Failed',
      description: e.message,
      placement: 'bottomLeft'
    })
  }
}
