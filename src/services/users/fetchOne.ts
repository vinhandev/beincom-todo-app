import { userSchema } from "@/types/schemas/user"

import { instance } from "@/services/instance"

export default async (id: number) => {
  const response = await instance.get(`users/${id}`).json()
  return userSchema.parse(response)
}
