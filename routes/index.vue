<script lang="ts">
type TodoItem = {
  id: number
  message: string
  completed: boolean
}

type Store = {
  todos: TodoItem[]
}

const store: Store = {
  todos: JSON.parse(window.localStorage?.getItem('todos') || '[]'),
}

export const data: Data<Store, Store> = {
  cacheTtl: 0, // no cache
  get: () => {
    return store
  },
  put: async (req) => {
    const { message } = await req.json()
    if (typeof message === 'string') {
      const id = Date.now()
      store.todos.push({ id, message, completed: false })
      window.localStorage?.setItem('todos', JSON.stringify(store.todos))
    }
    return store
  },
  patch: async (req) => {
    const { id, message, completed } = await req.json()
    const todo = store.todos.find((todo) => todo.id === id)
    if (todo) {
      if (typeof message === 'string') {
        todo.message = message
      }
      if (typeof completed === 'boolean') {
        todo.completed = completed
      }
      window.localStorage?.setItem('todos', JSON.stringify(store.todos))
    }
    return store
  },
  delete: async (req) => {
    const { id } = await req.json()
    if (id) {
      store.todos = store.todos.filter((todo) => todo.id !== id)
      window.localStorage?.setItem('todos', JSON.stringify(store.todos))
    }
    return store
  },
}
</script>

<script setup lang="ts">
import { Head, useData } from 'aleph/vue'

const { data, isMutating, mutation } = useData()

async function onChange(todo: TodoItem) {
  const { id } = todo
  const completed = !todo.completed
  mutation.patch({ id, completed }, 'replace')
}

async function onSubmit(e: any) {
  e.preventDefault()
  const form = e.currentTarget
  const fd = new FormData(form)
  const message = fd.get('message')?.toString().trim()
  if (message) {
    mutation.put(
      { message },
      {
        // optimistic update without waiting for the server response
        optimisticUpdate: (data) => {
          return {
            todos: [...data.todos, { id: 0, message, completed: false }],
          }
        },
        // replace the data with the new data that is from the server response
        replace: true,
      }
    )
    form.reset()
    setTimeout(() => {
      form.querySelector('input')?.focus()
    }, 0)
  }
}

function onClick(todo: TodoItem) {
  mutation.delete({ id: todo.id }, 'replace')
}
</script>

<template>
  <div className="bg-red">
    <Head>
      <title>Todo</title>
      <meta name="description" content="A todos app powered by Aleph.js" />
    </Head>
    <h1>Todo Hallo Jan</h1>
    <ul>
      <li v-for="todo in data?.todos" :key="todo.id">
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="onChange(todo)"
        />
        <label :class="todo.completed ? 'completed' : ''">{{
          todo.message
        }}</label>
        <button @click="onClick(todo)"></button>
      </li>
    </ul>
    <form @submit="onSubmit">
      <input
        :disabled="!!isMutating"
        type="text"
        name="message"
        placeholder="What needs to be done?"
        autofocus="autofocus"
        autocomplete="off"
      />
    </form>
  </div>
</template>
