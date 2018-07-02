import { saveBudget, fetchBudgets } from '../api'
import { guid } from '../../../utils'

export const createBudget = ({ commit }, data) => {
  let id = guid()
  let budget = Object.assign({ id: id }, data)
  commit('CREATE_BUDGET', { budget: budget })
  saveBudget(budget).then((value) => {

  })
}

export const loadBudgets = (state) => {
  if (!state.budgets || Object.keys(state.budgets).length === 0) {
    return fetchBudgets().then((res) => {
      state.commit('LOAD_BUDGETS', res)
    })
  }
}