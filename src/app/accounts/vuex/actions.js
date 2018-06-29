import { removeAccount, saveAccount, fetchAccount } from '../api'
import { guid } from '../../../utils'

export const addAccount = ({ commit }, data) => {
  let id = guid()
  let account = Object.assign({ id: id }, data)
  commit('ADD_ACCOUNT', { account: data })
  saveAccount(account).then((value) => {
    // we've saved the account
  })
}

export const updateAccount = ({ commit }, data) => {
  commit('UPDATE_ACCOUNT', { account: data })
  saveAccount(data)
}

export const deleteAccount = ({ commit }, data) => {
  commit('DELETE_ACCOUNT', { account: data })
  removeAccount(data)
}

export const loadAccounts = (state) => {
  if (!state.accounts || Object.keys(state.accounts).length === 0) {
    return fetchAccount().then((res) => {
      let accounts = {}
      Object.keys(res).forEach((key) => { accounts[res[key].id] = res[key] })
      state.commit('LOAD_ACCOUNTS', accounts)
    })
  }
}
