import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: {
      todos: []
    },
    mutations: {
      setTodos(state, todos) {
        state.todos = todos;
      },
      addTodo(state, todo) {
        state.todos.push(todo);
      },
      deleteTodo(state, todo) {
        let todoIndex = state.todos.findIndex((t) => t._id == todo._id);
        if (todoIndex>-1) {
          state.todos.splice(todoIndex, 1);
        }
      },
      updateTodo(state, todo) {
        let todoIndex = state.todos.findIndex((t) => t._id == todo._id);
        if (todoIndex>-1) {
          state.todos.splice(todoIndex, 1, todo);
        }

      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
       return context.$axios.get("/get-all").then(res=>{
        vuexContext.commit('setTodos', res.data.docs);
        })
      },
      addTodo(vuexContext, todo) {
        this.$axios.post("/save",{todoText:todo}).then(res=>{
          console.log(res)
          let newTodo={
            _id:res.data.data._id,
            text:todo
          }
          vuexContext.commit('addTodo', newTodo);
        })
      
      },
      deleteTodo(vuexContext, todo) {
        console.log(todo)
        this.$axios.post("/delete",{todo}).then(res=>{
          console.log(res)
        vuexContext.commit('deleteTodo', todo);
        })
      },
      updateTodo(vuexContext, todo) {
        this.$axios.put("/update",{todo}).then(res=>{
          console.log(res)
          vuexContext.commit('updateTodo', todo);

        })
      }
    },
    getters: {
      getTodos(state) {
        return state.todos;
      }
    }
  });
};

export default createStore;
