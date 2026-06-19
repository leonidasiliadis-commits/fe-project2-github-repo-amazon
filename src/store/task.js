import { defineStore } from "pinia"
import { supabase } from "../supabase"
import { useUserStore } from "./user"

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
    loading: false
  }),

  actions: {

    async fetchTasks() {
      const userStore = useUserStore()
      if (!userStore.userId) return

      this.loading = true

      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", userStore.userId)
        .order("id", { ascending: false })

      this.loading = false

      if (error) {
        console.log(error)
        return
      }

      this.tasks = data
    },

    async addTask(title) {
      const userStore = useUserStore()
      if (!title?.trim() || !userStore.userId) return

      const { data, error } = await supabase
        .from("tasks")
        .insert([
          {
            title: title.trim(),
            done: false,
            user_id: userStore.userId
          }
        ])
        .select()

      if (error) {
        console.log(error)
        return
      }

      this.tasks.unshift(data[0])
    },

    async toggleTask(task) {
      const { error } = await supabase
        .from("tasks")
        .update({ done: !task.done })
        .eq("id", task.id)

      if (error) return console.log(error)

      task.done = !task.done
    },

    async removeTask(id) {
      const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id)

      if (error) return console.log(error)

      this.tasks = this.tasks.filter(t => t.id !== id)
    },

    async updateTask(id, title) {
      if (!title?.trim()) return

      const { data, error } = await supabase
       .from("tasks")
       .update({ title: title.trim() })
        .eq("id", id)
        .select()

      if (error) return console.log(error)

      const index = this.tasks.findIndex(t => t.id === id)

      if (index !== -1) {
        this.tasks[index] = data[0]
      }
    }
  }
})


