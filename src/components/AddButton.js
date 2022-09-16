import styled from '@emotion/styled'

function AddButton({ children, onAdd }) {
  return <Button onClick={onAdd}>{children}</Button>
}

export default AddButton

const Button = styled.button`
  height: 32px;
  cursor: pointer;
`
