import moment from 'moment'
import { saveBudget, fetchBudgets, saveCategory, fetchCategories } from '../api'
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

export const createCategory = ({ commit, state }, data) => {
  let id = guid()
  let category = Object.assign({ id: id }, data)
  commit('CREATE_CATEGORY', { category: category })
  saveCategory(category)
}

export const updateBudgetBalance = ({ commit, getters }, data) => {
  commit('UPDATE_BUDGET_BALANCE', data)
  saveBudget(getters.getBudgetById(data.budget.id))
}

export const loadCategories = ({ commit, state }) => {
  if (!state.categories || Object.keys(state.categories).length === 0) {
    return fetchCategories().then((res) => {
      commit('LOAD_CATEGORIES', res)
    })
  }
}

export const createBudgetCategory = ({ commit, dispatch, getters }, data) => {
  if (!data.budget.budgetCategories || Object.keys(data.budget.budgetCategories).length === 0) {
    commit('CREATE_EMPTY_BUDGET_CATEGORY_OBJECT', data.budget)
  }

  let id = guid()
  let budgetCategory = Object.assign({ id: id }, data.budgetCategory)
  commit('CREATE_BUDGET_CATEGORY', { budget: data.budget, budgetCategory: budgetCategory })
  saveBudget(getters.getBudgetById(data.budget.id))

  dispatch('updateBudgetBalance', {
    budget: data.budget,
    param: 'budgeted',
    value: budgetCategory.budgeted
  })
}
