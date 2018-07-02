import moment from 'moment'
import { saveBudget, fetchBudgets } from '../api'
import { guid } from '../../../utils'

const verifyUniqueMonth = (budgets, budget) => {
  let month = moment(budget.month)
  return !Object.values(budgets).find((o) => {
    return month.isSame(o.month, 'month')
  })
}

export const createBudget = ({ commit, state }, data) => {
  let unique = verifyUniqueMonth(state.budgets, data)
  if (!unique) {
    return Promise.reject(new Error('a Budget already exists for this month'))
  }
  let id = guid()
  let budget = Object.assign({ id: id }, data)
  commit('CREATE_BUDGET', { budget: budget })
  saveBudget(budget).then((value) => {
  })
}

export const updateBudget = ({ commit }, data) => {
  commit('UPDATE_BUDGET', { budget: data })
  saveBudget(data)
}

export const loadBudgets = (state) => {
  if (!state.budgets || Object.keys(state.budgets).length === 0) {
    return fetchBudgets().then((res) => {
      state.commit('LOAD_BUDGETS', res)
    })
  }
}
