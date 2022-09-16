import styled from '@emotion/styled'

function DeleteButton({ onDelete }) {
  return <Button onClick={onDelete}>X</Button>
}

export default DeleteButton

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
