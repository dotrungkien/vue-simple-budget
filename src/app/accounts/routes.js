import * as components from './components'

export default [
  {
    path: '/',
    component: components.AccountsListView,
    name: 'accountsListView'
  },
  {
    path: '/accounts/create',
    component: components.CreateUpdateAccount,
    name: 'createAccount'
  },
  {
    path: '/accounts/:accountId/edit',
    component: components.CreateUpdateAccount,
    name: 'editAccount'
  }
]
