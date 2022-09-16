import styled from '@emotion/styled'
import { RiDeleteBack2Fill } from 'react-icons/ri'
function DeleteButton({ onDelete }) {
  return (
    <Button onClick={onDelete}>
      <RiDeleteBack2Fill size="24px" />
    </Button>
  )
}

export default DeleteButton

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
`
