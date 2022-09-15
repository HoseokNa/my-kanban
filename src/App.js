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
  const dragKanbanItem = (fromId, toId) => {
    if (fromId === toId) {
      return
    }

    const fromIndex = kanbanItems.findIndex(({ id }) => id === fromId)
    const toIndex = kanbanItems.findIndex(({ id }) => id === toId)
    const fromKanbanItem = kanbanItems[fromIndex]
    const nextKanbanItems = kanbanItems.filter(({ id }) => id !== fromId)
    const nexToIndex = nextKanbanItems.findIndex(({ id }) => id === toId)

    if (fromIndex < toIndex) {
      nextKanbanItems.splice(
        nexToIndex,
        1,
        nextKanbanItems[nexToIndex],
        fromKanbanItem,
      )
      setKanbanItems(nextKanbanItems)

      return
    }

    nextKanbanItems.splice(toIndex, 1, fromKanbanItem, nextKanbanItems[toIndex])
    setKanbanItems(nextKanbanItems)
  }

  return (
    <KanbanColumn
      title={title}
      kanbanList={kanbanItems}
      updateTitle={updateTitle}
      updateContent={updateContent}
      addKanbanItem={addKanbanItem}
      dragKanbanItem={dragKanbanItem}
    />
  )
}

export default App
