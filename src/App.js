import styled from '@emotion/styled'
import { useState } from 'react'
import KanbanColumn from './components/KanbanColumn'

const DUMMY_DATA = [
  {
    id: 1,
    title: 'title1',
    kanbanList: [
      { id: 1, content: '첫번째' },
      { id: 2, content: '두번째' },
      { id: 3, content: '세번째' },
    ],
  },
  {
    id: 2,
    title: 'title2',
    kanbanList: [
      { id: 1, content: '22 첫번째' },
      { id: 2, content: '22 두번째' },
      { id: 3, content: '22 세번째' },
    ],
  },
  {
    id: 3,
    title: 'title3',
    kanbanList: [
      { id: 1, content: '33 첫번째' },
      { id: 2, content: '33 두번째' },
      { id: 3, content: '33 세번째' },
    ],
  },
]

function App() {
  const [kanbanColumns, setKanbanColumns] = useState(DUMMY_DATA)
  const updateTitle = (kanbanColumnId, nextTitle) => {
    const nextKanbanColumns = kanbanColumns.map((kanbanColumn) => {
      if (kanbanColumn.id !== kanbanColumnId) {
        return kanbanColumn
      }

      return { ...kanbanColumn, title: nextTitle }
    })

    setKanbanColumns(nextKanbanColumns)
  }
  const updateContent = (kanbanColumnId, kanbanItemId, nextContent) => {
    const nextKanbanColumns = kanbanColumns.map((kanbanColumn) => {
      if (kanbanColumn.id !== kanbanColumnId) {
        return kanbanColumn
      }

      const nextKanbanList = kanbanColumn.kanbanList.map((item) => {
        if (item.id !== kanbanItemId) {
          return item
        }

        return { ...item, content: nextContent }
      })

      return { ...kanbanColumn, kanbanList: nextKanbanList }
    })

    setKanbanColumns(nextKanbanColumns)
  }
  const addKanbanItem = (kanbanColumnId) => {
    const nextKanbanColumns = kanbanColumns.map((kanbanColumn) => {
      if (kanbanColumn.id !== kanbanColumnId) {
        return kanbanColumn
      }

      const nextItem = {
        id: new Date().getMilliseconds(),
        content: '새로운 카드',
      }

      return {
        ...kanbanColumn,
        kanbanList: [...kanbanColumn.kanbanList, nextItem],
      }
    })

    setKanbanColumns(nextKanbanColumns)
  }
  const dragKanbanColumn = (fromId, toId) => {
    if (fromId === toId) {
      return
    }

    const fromIndex = kanbanColumns.findIndex(({ id }) => id === fromId)
    const toIndex = kanbanColumns.findIndex(({ id }) => id === toId)
    const fromKanbanItem = kanbanColumns[fromIndex]
    const nextKanbanColumns = kanbanColumns.filter(({ id }) => id !== fromId)
    const nexToIndex = nextKanbanColumns.findIndex(({ id }) => id === toId)

    fromIndex < toIndex
      ? nextKanbanColumns.splice(
          nexToIndex,
          1,
          nextKanbanColumns[nexToIndex],
          fromKanbanItem,
        )
      : nextKanbanColumns.splice(
          toIndex,
          1,
          fromKanbanItem,
          nextKanbanColumns[toIndex],
        )

    setKanbanColumns(nextKanbanColumns)
  }
  const dragKanbanItem = (kanbanColumnId, fromId, toId) => {
    if (fromId === toId) {
      return
    }

    const nextKanbanColumns = kanbanColumns.map((kanbanColumn) => {
      if (kanbanColumn.id !== kanbanColumnId) {
        return kanbanColumn
      }

      const kanbanItems = kanbanColumns.find(
        ({ id }) => id === kanbanColumnId,
      ).kanbanList
      const fromIndex = kanbanItems.findIndex(({ id }) => id === fromId)
      const toIndex = kanbanItems.findIndex(({ id }) => id === toId)
      const fromKanbanItem = kanbanItems[fromIndex]
      const nextKanbanItems = kanbanItems.filter(({ id }) => id !== fromId)
      const nexToIndex = nextKanbanItems.findIndex(({ id }) => id === toId)

      fromIndex < toIndex
        ? nextKanbanItems.splice(
            nexToIndex,
            1,
            nextKanbanItems[nexToIndex],
            fromKanbanItem,
          )
        : nextKanbanItems.splice(
            toIndex,
            1,
            fromKanbanItem,
            nextKanbanItems[toIndex],
          )

      return { ...kanbanColumn, kanbanList: nextKanbanItems }
    })

    setKanbanColumns(nextKanbanColumns)
  }

  return (
    <Container>
      {kanbanColumns.map(({ id, title, kanbanList }) => (
        <KanbanColumn
          key={id}
          id={id}
          title={title}
          kanbanList={kanbanList}
          updateTitle={updateTitle}
          updateContent={updateContent}
          addKanbanItem={addKanbanItem}
          dragKanbanColumn={dragKanbanColumn}
          dragKanbanItem={dragKanbanItem}
        />
      ))}
    </Container>
  )
}

export default App

const Container = styled.div`
  display: flex;
  gap: 24px;
`
