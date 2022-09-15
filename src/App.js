import { useState } from 'react'
import KanbanItem from './components/KanbanItem'

function App() {
  const [content, setContent] = useState('kanban item')
  const updateContent = (nextContent) => setContent(nextContent)

  return <KanbanItem content={content} updateContent={updateContent} />
}

export default App
