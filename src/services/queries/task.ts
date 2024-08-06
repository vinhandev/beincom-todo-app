import { useMutation, UseMutationOptions } from "@tanstack/react-query"

import { database } from "@/models"
import Task from "@/models/task.model"

import { CategoryType, findList } from "./category"

export type TaskType = {
  id?: string
  title: string
  isCompleted: boolean
  categoryId?: string
  category: CategoryType
  createdAt?: number
}

export type TaskParams = {
  id?: string
  search?: string
  category_id?: string
  per_page?: number
}

type TaskPage = {
  current_page: number
  last_page: number
  data: TaskType[]
}

export const TaskDB = database.collections.get<Task>("tasks")

export const findTask = async (id: string) => {
  return TaskDB.find(id)
}

export const addTask = async (payload: TaskType) => {
  const category = await findList(payload.categoryId ?? "")
  if (category) {
    const result = await database.write(async () => {
      const row = await TaskDB.create((entity) => {
        entity.title = payload.title
        entity.is_completed = payload.isCompleted
        entity.created_at = new Date().getTime()
        entity.category.set(category || payload.category)
      })
      return row
    })

    return result
  }
}

export const updateTask = async (payload: TaskType) => {
  console.log("updateTask", payload.id, payload.categoryId, payload)
  const category = await findList(payload.categoryId ?? "")
  const task = await findTask(payload.id ?? "")

  console.log("updateTask", payload, task, category)

  const result = await database.write(async () => {
    return await task.update((entity) => {
      entity.title = payload.title
      entity.is_completed = payload.isCompleted
      entity.category.set(category || payload.category)
    })
  })

  return result
}

export const deleteTask = async (id: string) => {
  const task = await findTask(id)
  if (task) {
    await database.write(async () => {
      await task.destroyPermanently()
    })
  }
}

export const useAddTask = () => {
  const mutationOptions: UseMutationOptions<any, Error, TaskType> = {
    mutationFn: addTask,
  }
  return useMutation(mutationOptions)
}

export const useUpdateTask = () => {
  const mutationOptions: UseMutationOptions<any, Error, TaskType> = {
    mutationFn: updateTask,
  }
  return useMutation(mutationOptions)
}

export const useDeleteTask = () => {
  const mutationOptions: UseMutationOptions<any, Error, string> = {
    mutationFn: deleteTask,
  }
  return useMutation(mutationOptions)
}
