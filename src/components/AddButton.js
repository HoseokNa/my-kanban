import styled from '@emotion/styled'
import { GoPlus } from 'react-icons/go'

function AddButton({ children, onAdd }) {
  return (
    <Button onClick={onAdd}>
      <GoPlus />
      {children}
    </Button>
  )
}

export default AddButton

const Button = styled.button`
  flex-shrink: 0;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`
