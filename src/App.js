import { useState } from 'react'
import KanbanColumn from './components/KanbanColumn'

const DUMMY_ITEMS = [
  { id: 1, content: '첫번째' },
  { id: 2, content: '두번째' },
  { id: 3, content: '세번째' },
]

function App() {
  const [kanbanItems, setKanbanItems] = useState(DUMMY_ITEMS)
  const [title, setTitle] = useState('kanban title')
  const updateTitle = (nextTitle) => setTitle(nextTitle)
  const updateContent = (id, nextContent) => {
    const nextKanbanItems = kanbanItems.map((item) => {
      if (item.id !== id) {
        return item
      }

      return { ...item, content: nextContent }
    })

    setKanbanItems(nextKanbanItems)
  }
  const addKanbanItem = () =>
    setKanbanItems([
      ...kanbanItems,
      { id: kanbanItems.at(-1).id + 1, content: '새로운 카드' },
    ])

  return (
    <KanbanColumn
      title={title}
      kanbanList={kanbanItems}
      updateTitle={updateTitle}
      updateContent={updateContent}
      addKanbanItem={addKanbanItem}
    />
  )
}

export default App
