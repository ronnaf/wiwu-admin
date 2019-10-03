import { auth } from '../../firebase'

export const sendEmailVerification = () => {
  const actionCodeSettings = {
    url: 'http://localhost:3000/'
  }

  auth.currentUser.sendEmailVerification(actionCodeSettings)
}
