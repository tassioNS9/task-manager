import { useMutation, useQueryClient } from "@tanstack/react-query"
export const useUpdateTasks = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["updateTask", taskId],
    mutationFn: async (updatedFields) => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
      })
      if (!response.ok) {
        throw new Error("Erro ao atualizar a tarefa!")
      }
      const updatedTask = await response.json()
      return updatedTask
    },
    onSuccess: () => {
      queryClient.refetchQueries(["tasks"]) // faz um refetch na lista de tarefas para atualizar os dados
    },
  })
}
