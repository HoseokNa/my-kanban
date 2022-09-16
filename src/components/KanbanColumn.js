import styled from '@emotion/styled'
import { useEffect, useRef, useState } from 'react'
import AddButton from './AddButton'
import DeleteButton from './DeleteButton'
import KanbanItem from './KanbanItem'

const KanbanColumn = ({
  id,
  title,
  kanbanList,
  updateTitle,
  updateContent,
  deleteKanbanColumn,
  deleteKanbanItem,
  addKanbanItem,
  dragKanbanColumn,
  dragKanbanItem,
}) => {
  const inputRef = useRef(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [inputTitle, setInputTitle] = useState(title)
  const handleChange = (e) => {
    setInputTitle(e.target.value)
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setInputTitle(title)
      setIsEditMode(false)
      return
    }

    /** 내용이 공백으로 수정은 안됨 */
    if (e.target.value === '') {
      return
    }

    if (e.key === 'Enter') {
      updateTitle(id, inputTitle)
      setIsEditMode(false)
    }
  }
  const handleDragStart = (e) => {
    e.dataTransfer.setData('kanban-column-id', id)
  }
  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }
  const handleDragDrop = (e) => {
    e.preventDefault()

    if (e.dataTransfer.getData('kanban-item-id')) {
      return
    }

    dragKanbanColumn(
      parseInt(e.dataTransfer.getData('kanban-column-id'), 10),
      id,
    )
  }

  useEffect(() => {
    if (isEditMode) {
      inputRef.current.focus()
    }
  }, [isEditMode])

  return (
    <Container
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDragDrop}
    >
      <Header>
        <Title onClick={() => setIsEditMode(true)} isEditMode={isEditMode}>
          {title}
        </Title>
        <Input
          ref={inputRef}
          isEditMode={isEditMode}
          value={inputTitle}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            setInputTitle(title)
            setIsEditMode(false)
          }}
        />
        <DeleteButton onDelete={() => deleteKanbanColumn(id)} />
      </Header>

      <KanbanList>
        {kanbanList.map(({ id: itemId, content }) => (
          <KanbanItem
            key={itemId}
            id={itemId}
            content={content}
            updateContent={(itemId, nextContent) =>
              updateContent(id, itemId, nextContent)
            }
            deleteKanbanItem={(itemId) => deleteKanbanItem(id, itemId)}
            setColumnIdForDrag={(e) =>
              e.dataTransfer.setData('kanban-column-id', id)
            }
            dragKanbanItem={(fromdColumnId, fromItemId, toItemId) =>
              dragKanbanItem(fromdColumnId, id, fromItemId, toItemId)
            }
          />
        ))}
      </KanbanList>
      <AddButton onAdd={() => addKanbanItem(id)}>+ Add a card</AddButton>
    </Container>
  )
}

const Container = styled.div`
  width: 260px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: rgb(251, 251, 250);
`

const Header = styled.div`
  display: flex;
`

const Title = styled.div`
  flex-grow: 1;
  display: ${(props) => (props.isEditMode ? 'none' : 'flex')};
  align-items: center;
  font-size: 24px;
  font-weight: bold;
`

const Input = styled.input`
  display: ${(props) => (props.isEditMode ? 'block' : 'none')};
  width: 100%;
  height: 100%;
  font-size: 24px;
  font-weight: bold;
`

const KanbanList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export default KanbanColumn
