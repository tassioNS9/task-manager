import { useMutation, useQueryClient } from "@tanstack/react-query"

import { taskMutationKeys } from "../../keys/mutations"
import { taskQueryKeys } from "../../keys/queries"
import { api } from "../../lib/axios"
export const useUpdateTasks = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: taskMutationKeys.update(taskId),
    mutationFn: async (updatedFields) => {
      const { data: updatedTask } = await api.patch(
        `/tasks/${taskId}`,
        updatedFields
      )
      return updatedTask
    },
    onSuccess: () => {
      queryClient.refetchQueries(taskQueryKeys.getAll()) // faz um refetch na lista de tarefas para atualizar os dados
    },
  })
}
