<template>
  <div id="budgets-list">
    I'm a list of budgets!

    <router-link :to="{ name: 'createBudget' }">Add a budget</router-link>
    <router-link :to="{ name: 'accountsListView' }">View accounts</router-link>

    <ul>
      <li v-for="(budget, key) in budgets" :key=key>
        {{ budget.month | moment }}
        ${{ budget.budgeted }}
        ${{ budget.spent }}
        ${{ budget.income }}
        <router-link :to="{ name: 'updateBudget', params: { budgetId: budget.id }}">Edit</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { moment } from '../../../filters'

export default {
  name: 'budgets-list',
  mounted () {
    this.loadBudgets()
  },
  filters: {
    moment
  },
  methods: {
    ...mapActions([
      'loadBudgets'
    ])
  },
  computed: {
    ...mapState({
      'budgets': state => state.budgets.budgets
    })
  }
}
</script>

<style scoped lang='scss'>
  #budgets-list-view {

  }
</style>
