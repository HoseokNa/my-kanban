import styled from '@emotion/styled'
import { useEffect, useRef, useState } from 'react'

function KanbanItem({ id, content, updateContent }) {
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

  useEffect(() => {
    if (isEditMode) {
      inputRef.current.focus()
    }
  }, [isEditMode])

  return (
    <Container
      onClick={() => {
        setIsEditMode(true)
      }}
    >
      <Content isEditMode={isEditMode}>{content}</Content>
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
    </Container>
  )
}

export default KanbanItem

const Container = styled.div`
  box-sizing: border-box;
  width: 240px;
  height: 40px;
`

const Content = styled.div`
  display: ${(props) => (props.isEditMode ? 'none' : 'block')};
  width: 100%;
  height: 100%;
  border: solid 2px;
`

const Input = styled.input`
  display: ${(props) => (props.isEditMode ? 'block' : 'none')};
  width: 100%;
  height: 100%;
  border: solid 2px;
`
