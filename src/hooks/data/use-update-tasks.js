import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

export const useUpdateTasks = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["updateTask", taskId],
    mutationFn: async (updatedFields) => {
      const { data: updatedTask } = await axios.patch(
        `http://localhost:3000/tasks/${taskId}`,
        updatedFields
      )
      return updatedTask
    },
    onSuccess: () => {
      queryClient.refetchQueries(["tasks"]) // faz um refetch na lista de tarefas para atualizar os dados
    },
  })
}
