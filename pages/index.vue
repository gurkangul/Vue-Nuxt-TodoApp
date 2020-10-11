<template>
  <div class="container main-container pt-5">
    <h3 class="text-center">Express.js ile ToDo App | Nuxt.js</h3>
    <TodoForm @addTodoEvent="addTodo($event)" />
    <h3 class="text-center mt-5 mb-3">Yapılacaklar Listesi</h3>
    <Alert v-if="todos.length === 0" />
    <Todos
      v-else
      @deleteTodoEvent="deleteTodo($event)"
      @updateTodoEvent="showUpdateContainer($event)"
      :todos="todos"
    />
    <UpdateTodo
      @cancelEvent="isShow = false"
      :class="{ 'show-update-container': isShow }"
      :todo="toUpdateTodo"
      @updateEvent="updatedTodo($event)"
    />
  </div>
</template>

<script>
import Todos from '@/components/todo/Todos'
import TodoForm from '@/components/todo/TodoForm'
import UpdateTodo from '@/components/todo/UpdateTodo'
import Alert from '@/components/todo/Alert'

export default {
  components: {
    Todos,
    TodoForm,
    UpdateTodo,
    Alert
  },
  data() {
    return {
      isShow: false,
      toUpdateTodo: null
    }
  },
  methods: {
    addTodo(todo) {
      this.$store.dispatch('addTodo', todo)
    },
    deleteTodo(todo) {
      this.$store.dispatch('deleteTodo', todo)
    },
    showUpdateContainer(todo) {
      console.log(todo)
      this.isShow = true
      this.toUpdateTodo = todo
      console.log(this.toUpdateTodo)
    },
    updatedTodo(newTodo) {
      this.isShow = false
      this.$store.dispatch('updateTodo', newTodo)
    }
  },
  computed: {
    todos() {
      return this.$store.getters.getTodos
    }
  }
}
</script>
