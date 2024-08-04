import { Q } from "@nozbe/watermelondb"
import { useInfiniteQuery, useMutation, UseMutationOptions } from "@tanstack/react-query"
import { max } from "lodash"

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

export const useInfiniteCategories = (params: CategoryParams, options = {}) => {
  return useInfiniteQuery({
    queryKey: ["categories", params],
    queryFn: async ({ pageParam = 1 }): Promise<CategoryPage> => {
      const perPage = params?.per_page || 5000
      const indexOfLastCategory = pageParam * perPage
      const indexOfFirstPage = indexOfLastCategory - perPage
      const countData = await CategoryDB.query().fetchCount()
      const pages = []
      for (let i = 1; i <= Math.ceil(countData / perPage); i++) {
        pages.push(i)
      }
      const lastPage = max(pages) || 1
      const data: Category[] = await CategoryDB.query(
        Q.where("name", Q.like(`%${Q.sanitizeLikeString(params.search || "")}%`)),
        Q.where("id", Q.like(`${Q.sanitizeLikeString(params.id || "")}%`)),
        Q.sortBy("name", Q.asc),
        Q.skip(indexOfFirstPage),
        Q.take(perPage),
      ).fetch()

      return {
        data: data.map((item) => ({ id: item.id, name: item.title, tasks: item.tasks })),
        last_page: lastPage,
        current_page: pageParam,
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: CategoryPage) => {
      if (!lastPage) {
        return undefined
      }
      return lastPage.current_page < lastPage.last_page ? lastPage.current_page + 1 : undefined
    },
    ...options,
  })
}
