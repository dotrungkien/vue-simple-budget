import localforage from 'localforage'
import { processAPIData } from '../../utils'
const ACCOUNT_NAMESPACE = 'ACCOUNT-'

export const fetchAccount = () => {
  return localforage.startsWith(ACCOUNT_NAMESPACE).then((res) => {
    return processAPIData(res)
  })
}

export const saveAccount = (account) => {
  return localforage
    .setItem(ACCOUNT_NAMESPACE + account.id, account)
    .then((value) => {
      return value
    })
    .catch((err) => {
      console.log('oops! the account was to far gone, there we nothign we could to save him', err)
    })
}

export const removeAccount = (account) => {
  return localforage
    .removeItem(ACCOUNT_NAMESPACE + account.id)
    .then(() => {
      return true
    })
    .catch((err) => {
      console.log(err)
      return false
    })
}
