import moment from 'moment'
import { saveBudget, fetchBudgets, removeBudget, saveCategory, fetchCategories } from '../api'
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

export const deleteBudget = ({ commit }, data) => {
  commit('DELETE_BUDGET', { budget: data })
  removeBudget(data)
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

export const updateBudgetCategory = ({ commit, dispatch, getters }, data) => {
  let newBudget = data.budgetCategory.budgeted
  let oldBudget = getters.getBudgetCategoryById(data.budget.id, data.budgetCategory.id).budgeted
  if (newBudget !== oldBudget) {
    dispatch('updateBudgetBalance', {
      budget: data.budget,
      param: 'budgeted',
      value: newBudget - oldBudget
    })
  }
  commit('UPDATE_BUDGET_CATEGORY', data)

  saveBudget(getters.getBudgetById(data.budget.id))
}

export const duplicateBudget = ({ commit, dispatch, getters, state }, data) => {
  if (!(data.buget && data.baseBudget)) return Promise.reject(new Error('Incorrect data sent to duplicateBudget'))
  let budget = Object.assign({}, data.budget)

  budget.budgeted = 0
  budget.budgetCategories = null

  commit('UPDATE_BUDGET', { budget: budget })

  budget = getters.getBudgetById(budget.id)
  if ('budgetCategories' in data.baseBudget) {
    Object.keys(data.baseBudget.budgetCategories).forEach((key) => {
      dispatch('createBudgetCategory', {
        budget: budget,
        budgetCategory: {
          category: data.baseBudget.budgetCategories[key].category,
          budgeted: data.baseBudget.budgetCategories[key].budgeted,
          spent: 0
        }
      })
    })
  }
  saveBudget(budget)
  return budget
}
