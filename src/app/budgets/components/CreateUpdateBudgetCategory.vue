<template>
  <tr id="budget-category-create-edit-view">
      <td>
        <multiselect
          :value="budgetCategory.category"
          @input="updateCategorySelection"
          :taggable="true"
          @tag="handleCreateCategory"
          :options="getCategorySelectList"
          placeholder="Select or create a category"
          label="name"
          track-by="id"
        ></multiselect>
      </td>

      <td>
        <p class="control has-icon">
          <input type="number" step="0.01" class="input" v-model="budgetCategory.budgeted" />
          <span class="icon">
            <i class="fa fa-usd" aria-hidden="true"></i>
          </span>
        </p>
      </td>

      <td>
        <span class="subtitle is-5">${{ budgetCategory.spent }}</span>
      </td>

      <td>
        <a class="button is-primary" @click.prevent="processSave">Add</a>
      </td>
  </tr>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
  name: 'budget-category-create-edit-view',
  components: {
    Multiselect
  },
  data: () => {
    return {
      budgetCategory: {}
    }
  },
  mounted () {

  },
  methods: {
    ...mapActions([

    ]),
    processSave () {
      this.$emit('add-budget-category', this.budgetCategory)
      this.budgetCategory = {}
    },
    handleCreateCategory (category) {
      let newCategory = { name: category }
      this.createCategory(newCategory).then((val) => {
        this.updateCategorySelection(val)
      })
    },
    updateCategorySelection (category) {
      this.$set(this.budgetCategory, 'category', category)
    }
  },
  computed: {
    ...mapGetters([
      'getCategorySelectList'
    ])
  }
}
</script>
