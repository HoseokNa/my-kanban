import styled from '@emotion/styled'
import { useState } from 'react'
import AddButton from './AddButton'
import KanbanColumn from './KanbanColumn'
import { getItem, setItem } from '../utils/store'

const LOCAL_KANBAN_COLUMN = 'KANBAN_COLUMNS'
const MIN_KANBAN_COLUMN_SIZE = 2
const DEFAULT_KANBAN_COLUMNS = [
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
      { id: 4, content: '22 첫번째' },
      { id: 5, content: '22 두번째' },
      { id: 6, content: '22 세번째' },
    ],
  },
]

function App() {
  const [kanbanColumns, setKanbanColumns] = useState(
    getItem(LOCAL_KANBAN_COLUMN, DEFAULT_KANBAN_COLUMNS),
  )
  const updateKanbanColumns = (nextKanbanColumns) => {
    setItem(LOCAL_KANBAN_COLUMN, nextKanbanColumns)
    setKanbanColumns(nextKanbanColumns)
  }
  const updateTitle = (kanbanColumnId, nextTitle) => {
    const nextKanbanColumns = kanbanColumns.map((kanbanColumn) => {
      if (kanbanColumn.id !== kanbanColumnId) {
        return kanbanColumn
      }

      return { ...kanbanColumn, title: nextTitle }
    })

    updateKanbanColumns(nextKanbanColumns)
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

    updateKanbanColumns(nextKanbanColumns)
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

    updateKanbanColumns(nextKanbanColumns)
  }
  const deleteKanbanColumn = (deletedId) => {
    if (kanbanColumns.length === MIN_KANBAN_COLUMN_SIZE) {
      alert('column은 최소 2개가 있어야하기 때문에 삭제할 수 없습니다.')

      return
    }

    const nextKanbanColumns = kanbanColumns.filter(({ id }) => id !== deletedId)

    updateKanbanColumns(nextKanbanColumns)
  }
  const deleteKanbanItem = (kanbanColumnId, kanbanItemId) => {
    const nextKanbanColumns = kanbanColumns.map((kanbanColumn) => {
      if (kanbanColumn.id !== kanbanColumnId) {
        return kanbanColumn
      }

      const nextKanbanList = kanbanColumn.kanbanList.filter(
        ({ id }) => id !== kanbanItemId,
      )

      return { ...kanbanColumn, kanbanList: nextKanbanList }
    })

    updateKanbanColumns(nextKanbanColumns)
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

    updateKanbanColumns(nextKanbanColumns)
  }
  const dragKanbanItem = (
    fromKanbanColumnId,
    toKanbanColumnId,
    fromId,
    toId,
  ) => {
    if (!fromId || !toId) {
      return
    }

    if (fromId === toId) {
      return
    }

    if (fromKanbanColumnId === toKanbanColumnId) {
      const nextKanbanColumns = kanbanColumns.map((kanbanColumn) => {
        if (kanbanColumn.id !== fromKanbanColumnId) {
          return kanbanColumn
        }

        const kanbanItems = kanbanColumns.find(
          ({ id }) => id === fromKanbanColumnId,
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

      updateKanbanColumns(nextKanbanColumns)

      return
    }

    const fromKanbanItems = kanbanColumns.find(
      ({ id }) => id === fromKanbanColumnId,
    ).kanbanList
    const fromKanbanItem = fromKanbanItems.find(({ id }) => id === fromId)
    const nextFromKanbanItems = fromKanbanItems.filter(
      ({ id }) => id !== fromId,
    )

    const toKanbanItems = kanbanColumns.find(
      ({ id }) => id === toKanbanColumnId,
    ).kanbanList
    const toIndex = toKanbanItems.findIndex(({ id }) => id === toId)
    const nextToKanbanItems = [...toKanbanItems]

    toIndex === 0
      ? nextToKanbanItems.splice(
          toIndex,
          1,
          fromKanbanItem,
          nextToKanbanItems[toIndex],
        )
      : nextToKanbanItems.splice(
          toIndex,
          1,
          nextToKanbanItems[toIndex],
          fromKanbanItem,
        )

    const nextKanbanColumns = kanbanColumns.map((kanbanColumn) => {
      if (
        kanbanColumn.id !== fromKanbanColumnId &&
        kanbanColumn.id !== toKanbanColumnId
      ) {
        return kanbanColumn
      }

      if (kanbanColumn.id === fromKanbanColumnId) {
        return { ...kanbanColumn, kanbanList: nextFromKanbanItems }
      }

      return { ...kanbanColumn, kanbanList: nextToKanbanItems }
    })

    updateKanbanColumns(nextKanbanColumns)
  }
  const handleAddKanbanColumn = () => {
    const nextKanbanColumn = {
      id: new Date().getMilliseconds(),
      title: 'title',
      kanbanList: [],
    }

    updateKanbanColumns([...kanbanColumns, nextKanbanColumn])
  }

  return (
    <Container kanbanColumnSize={kanbanColumns.length}>
      {kanbanColumns.map(({ id, title, kanbanList }) => (
        <KanbanColumn
          key={id}
          id={id}
          title={title}
          kanbanList={kanbanList}
          updateTitle={updateTitle}
          updateContent={updateContent}
          addKanbanItem={addKanbanItem}
          deleteKanbanColumn={deleteKanbanColumn}
          deleteKanbanItem={deleteKanbanItem}
          dragKanbanColumn={dragKanbanColumn}
          dragKanbanItem={dragKanbanItem}
        />
      ))}
      <AddButton onAdd={handleAddKanbanColumn}>Add new Column</AddButton>
    </Container>
  )
}

export default App

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  gap: 24px;
  padding: 16px 16px;
  overflow-x: auto;
`
