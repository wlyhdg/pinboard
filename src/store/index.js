import Vue from "vue";
import Vuex from "vuex";
import defaultBoard from "@/default-board";
import { saveStatePlugin } from "../utils";
import { uuid } from "@/default-board";

Vue.use(Vuex);

const board = JSON.parse(localStorage.getItem("board")) || defaultBoard;

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board
  },
  mutations: {
    CREATE_TASK(state, { tasks, name }) {
      tasks.push({
        name,
        id: uuid()
      });
    },
    UPDATE_TASK(state, { task, key, value }) {
      task[key] = value;
    },
    MOVE_TASK(state, { fromTasks, toTasks, taskIndex }) {
      //remove the task
      const taskToMove = fromTasks.splice(taskIndex, 1)[0];
      toTasks.push(taskToMove);
    }
  },
  actions: {},
  getters: {
    getTask: state => id => {
      for (const column of state.board.columns) {
        for (const task of column.tasks) {
          if (task.id === id) {
            return task;
          }
        }
      }
    }
  },
  modules: {}
});
