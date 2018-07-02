import localforage from 'localforage'
import { processAPIData } from '../../utils'

const BUDGET_NAMESPACE = 'BUDGET-'

export const saveBudget = (budget) => {
  budget = Object.assign({}, budget)
  budget.month = budget.month.toJSON()
  return localforage.setItem(BUDGET_NAMESPACE + budget.id, budget)
    .then((value) => {
      return value
    })
    .catch((err) => {
      console.log('had a litte trouble saving that budget', err)
    })
}

export const fetchBudgets = () => {
  return localforage.startsWith(BUDGET_NAMESPACE).then((res) => {
    let budgets = processAPIData(res)
    Object.keys(budgets).forEach((o) => {
      budgets[o].month = new Date(budgets[o].month)
    })
    return budgets
  })
}
