import styled from '@emotion/styled'
import { useEffect, useRef, useState } from 'react'
import DeleteButton from './DeleteButton'

function KanbanItem({
  id,
  content,
  updateContent,
  deleteKanbanItem,
  setColumnIdForDrag,
  dragKanbanItem,
}) {
  const inputRef = useRef(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [inputContent, setInputContent] = useState(content)
  const handleChange = (e) => {
    setInputContent(e.target.value)
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setInputContent(content)
      setIsEditMode(false)
      return
    }

    /** 내용이 공백으로 수정은 안됨 */
    if (e.target.value === '') {
      return
    }

    if (e.key === 'Enter') {
      updateContent(id, inputContent)
      setIsEditMode(false)
    }
  }
  const handleDragStart = (e) => {
    setColumnIdForDrag(e)
    e.dataTransfer.setData('kanban-item-id', id)
  }
  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }
  const handleDragDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dragKanbanItem(
      parseInt(e.dataTransfer.getData('kanban-column-id'), 10),
      parseInt(e.dataTransfer.getData('kanban-item-id'), 10),
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
      <Content
        onClick={() => {
          setIsEditMode(true)
        }}
        isEditMode={isEditMode}
      >
        {content}
      </Content>
      <Input
        ref={inputRef}
        isEditMode={isEditMode}
        value={inputContent}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          setInputContent(content)
          setIsEditMode(false)
        }}
      />
      <DeleteButton onDelete={() => deleteKanbanItem(id)} />
    </Container>
  )
}

export default KanbanItem

const Container = styled.div`
  flex-shrink: 0;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: white;
`

const Content = styled.div`
  flex-grow: 1;
  width: 100%;
  height: 100%;
  display: ${(props) => (props.isEditMode ? 'none' : 'flex')};
  align-items: center;
  padding-left: 8px;
  box-shadow: rgb(15 15 15 / 10%) 0px 0px 0px 1px,
    rgb(15 15 15 / 10%) 0px 2px 4px;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Input = styled.input`
  display: ${(props) => (props.isEditMode ? 'block' : 'none')};
  width: 100%;
  height: 100%;
  border: solid 2px;
`
