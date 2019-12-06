<template>
  <section class="todoapp">
    <!-- header -->
    <header class="header">
      <input class="new-todo" autocomplete="off" placeholder="待办事项" @keyup.enter="addTodo">
    </header>
    <!-- main section -->
    <section class="main" v-show="todos.length">
      <input class="toggle-all" id="toggle-all" type="checkbox" :checked="allChecked" @change="toggleAll({ done: !allChecked })">
      <label for="toggle-all"></label>
      <ul class="todo-list">
        <todo @toggleTodo='toggleTodo' @editTodo='editTodo' @deleteTodo='deleteTodo' v-for="(todo, index) in filteredTodos" :key="index"
          :todo="todo"></todo>
      </ul>
    </section>
  </section>
</template>

<script>
import Todo from './Todo.vue'

const STORAGE_KEY = 'todos'
const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
}
const defalutList = [
  { text: '项目批准[宁海县小型水利工程]', done: false },
  { text: '项目审核[余姚市姚江城区堤防工程]', done: false },
  { text: '项目验收[江北区姚江堤防工程洪塘段]', done: false },
  { text: '项目批准[慈溪市风城水库工程]', done: false },
  { text: '项目批准[宁海县小型水利工程]', done: false },
  { text: '项目验收[江北区姚江堤防工程洪塘段]', done: false },
  { text: '项目批准[宁海县小型水利工程]', done: true },
  { text: '项目审核[余姚市姚江城区堤防工程]', done: true }
]
export default {
  components: { Todo },
  data() {
    return {
      visibility: 'all',
      filters,
      // todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || defalutList
      todos: defalutList
    }
  },
  computed: {
    allChecked() {
      return this.todos.every(todo => todo.done)
    },
    filteredTodos() {
      return filters[this.visibility](this.todos)
    },
    remaining() {
      return this.todos.filter(todo => !todo.done).length
    }
  },
  methods: {
    setLocalStorgae() {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
    },
    addTodo(e) {
      const text = e.target.value
      if (text.trim()) {
        this.todos.push({
          text,
          done: false
        })
        this.setLocalStorgae()
      }
      e.target.value = ''
    },
    toggleTodo(val) {
      val.done = !val.done
      this.setLocalStorgae()
    },
    deleteTodo(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
      this.setLocalStorgae()
    },
    editTodo({ todo, value }) {
      todo.text = value
      this.setLocalStorgae()
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.done)
      this.setLocalStorgae()
    },
    toggleAll({ done }) {
      this.todos.forEach(todo => {
        todo.done = done
        this.setLocalStorgae()
      })
    }
  },

}
</script>

<style lang="scss">
  @import './index.scss';
</style>
