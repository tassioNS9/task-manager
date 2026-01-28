import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState({})
  useEffect(() => {
    const getTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      })
      const data = await response.json()
      console.log(data, "dadad")
      setTask(data)
    }
    getTask()
  }, [taskId])

  return <div>{task?.title}</div>
}

export default TaskDetailsPage
