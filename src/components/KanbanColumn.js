import styled from '@emotion/styled'
import { useEffect, useRef, useState } from 'react'
import KanbanItem from './KanbanItem'

const KanbanColumn = ({
  id,
  title,
  kanbanList,
  updateTitle,
  updateContent,
  addKanbanItem,
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

  useEffect(() => {
    if (isEditMode) {
      inputRef.current.focus()
    }
  }, [isEditMode])

  return (
    <Container>
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
      <KanbanList>
        {kanbanList.map(({ id: itemId, content }) => (
          <KanbanItem
            key={itemId}
            id={itemId}
            content={content}
            updateContent={(itemId, nextContent) =>
              updateContent(id, itemId, nextContent)
            }
            dragKanbanItem={(fromId, toId) => dragKanbanItem(id, fromId, toId)}
          />
        ))}
      </KanbanList>
      <AddButton onClick={() => addKanbanItem(id)}>+ Add a card</AddButton>
    </Container>
  )
}

const Container = styled.div`
  width: 260px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 16px;
`

const Title = styled.div`
  display: ${(props) => (props.isEditMode ? 'none' : 'block')};
  font-weight: bold;
`

const Input = styled.input`
  display: ${(props) => (props.isEditMode ? 'block' : 'none')};
  width: 100%;
  height: 100%;
  border: solid 2px;
`

const KanbanList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const AddButton = styled.button`
  cursor: pointer;
`

export default KanbanColumn
