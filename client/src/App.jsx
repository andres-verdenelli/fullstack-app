import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL

function App() {
  const [tasks, setTasks] = useState([])
  const [inputText, setInputText] = useState('')

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`${API_URL}/tasks`)
        const data = await response.json()
        setTasks(data)
      } catch (error) {
        console.log('Error fetching tasks:', error)
      }
    }
    fetchTask()
  }, [])

  const handleClick = () => {
    const postTask = async () => {
      try {
        const response = await fetch(`${API_URL}/tasks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: inputText }),
        })
        const newTask = await response.json()
        setTasks(prev => [...prev, newTask])
        setInputText('')
      } catch (error) {
        console.log('Error creating task', error)
      }
    }
    postTask()
  }
  return (
    <>
      <p>API: {import.meta.env.VITE_API_URL}</p>
      <h1>Tasks</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
      <div>
        <input
          className='border'
          type='text'
          name=''
          id=''
          value={inputText}
          onChange={e => setInputText(e.target.value)}
        />
        <button
          className='border p-2'
          onClick={handleClick}
        >
          Add task
        </button>
      </div>
    </>
  )
}
export default App
