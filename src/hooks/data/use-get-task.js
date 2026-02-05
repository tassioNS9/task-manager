import { useQuery } from "@tanstack/react-query"

import { api } from "../../lib/axios"

export const useGetTask = (taskId, reset) => {
  return useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const { data: task } = await api.get(`/tasks/${taskId}`)
      reset(task)
      return task
    },
  })
}
