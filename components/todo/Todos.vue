<template>
  <div class="row">
    <Todo
      v-for="todo in todos"
      :todo="todo"
      @deleteTodoEvent="$emit('deleteTodoEvent', $event)"
      @updateTodoEvent="$emit('updateTodoEvent', $event)"
      :key="todo._id"
    />
  </div>
</template>
<script>
import Todo from './Todo'
export default {
  props: {
    todos: {
      type: Array,
      required: false
    }
  },
  components: {
    Todo
  }
}
</script>