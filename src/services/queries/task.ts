import { Q } from "@nozbe/watermelondb"
import { useInfiniteQuery, useMutation, UseMutationOptions } from "@tanstack/react-query"
import { max } from "lodash"

import { database } from "@/models"
import Task from "@/models/task.model"

import { CategoryType, findList } from "./category"

export type TaskType = {
  id?: string
  title: string
  isCompleted: boolean
  categoryId?: string
  category: CategoryType
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
        entity.category.set(category || payload.category)
      })
      return row
    })

    return result
  }
}

export const useInfiniteTasks = (params: TaskParams, options = {}) => {
  return useInfiniteQuery({
    queryKey: ["tasks", params],
    queryFn: async ({ pageParam = 1 }): Promise<TaskPage> => {
      const perPage = params?.per_page || 5000
      const indexOfLastProduct = pageParam * perPage
      const indexOfFirstPage = indexOfLastProduct - perPage
      const countData = await TaskDB.query().fetchCount()
      const pages = []
      for (let i = 1; i <= Math.ceil(countData / perPage); i++) {
        pages.push(i)
      }
      const lastPage = max(pages) || 1
      const data: Task[] = await TaskDB.query(
        Q.where("name", Q.like(`%${Q.sanitizeLikeString(params.search || "")}%`)),
        Q.where("id", Q.like(`${Q.sanitizeLikeString(params.id || "")}%`)),
        Q.sortBy("name", Q.asc),
        Q.skip(indexOfFirstPage),
        Q.take(perPage),
      ).fetch()

      return {
        data: data.map((item) => ({
          id: item.id,
          title: item.title,
          isCompleted: item.is_completed,
          categoryId: item.category.id,
          category: item.category,
        })),
        last_page: lastPage,
        current_page: pageParam,
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: TaskPage) => {
      if (!lastPage) {
        return undefined
      }
      return lastPage.current_page < lastPage.last_page ? lastPage.current_page + 1 : undefined
    },
    ...options,
  })
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
