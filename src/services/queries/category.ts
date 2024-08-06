import { Q } from "@nozbe/watermelondb"
import { useMutation, UseMutationOptions } from "@tanstack/react-query"

import { database } from "@/models"
import Category from "@/models/category.model"

export type CategoryType = {
  id?: string
  user_id?: string
  name: string
  tasks: number
}

export type CategoryParams = {
  search?: string
  id?: string
  per_page?: number
}

export type CategoryPage = {
  current_page: number
  last_page: number
  data: CategoryType[]
}

export const CategoryDB = database.collections.get<Category>("categories")

export function findList(id: string) {
  return CategoryDB.find(id)
}

export async function addList(payload: CategoryType) {
  const isExistedTitle = await CategoryDB.query(Q.where("title", Q.eq(payload.name)))

  if (isExistedTitle.length > 0) {
    throw new Error("Category already exists")
  }

  const result = await database.write(async () => {
    const row = await CategoryDB.create((entity) => {
      entity.title = payload.name
      entity.user_id = payload.user_id
    })
    return row
  })

  return result
}

export async function updateList(payload: CategoryType) {
  const category = await findList(payload.id ?? "")

  const result = await database.write(async () => {
    return await category.update((entity) => {
      entity.title = payload.name
      entity.user_id = payload.user_id
    })
  })

  return result
}

export async function deleteList(id: string) {
  const category = await findList(id)
  if (category) {
    await database.write(async () => {
      await category.destroyPermanently()
    })
  }
}

export const useAddCategory = () => {
  const mutationOptions: UseMutationOptions<any, Error, CategoryType> = {
    mutationFn: addList,
  }
  return useMutation(mutationOptions)
}

export const useUpdateCategory = () => {
  const mutationOptions: UseMutationOptions<any, Error, CategoryType> = {
    mutationFn: updateList,
  }
  return useMutation(mutationOptions)
}

export const useDeleteCategory = () => {
  const mutationOptions: UseMutationOptions<any, Error, string> = {
    mutationFn: deleteList,
  }
  return useMutation(mutationOptions)
}
