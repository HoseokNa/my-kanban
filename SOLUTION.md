# 해결 과정

## TODO-LIST

### KanbanItem

- [x] 생성, 수정, 삭제.
- [x] 칼럼 내 이동, 같은 칼럼 안에서도 순서 변경.

### KanbanColumn

- [x] 생성, 수정, 삭제.
- [x] 최소 2개 이상 필요. 2개 이하로 삭제 불가.
- [x] 생성 시 오른쪽 끝에서 생성.
- [x] 칸반 아이템이 5개 이상일 때 스크롤 가능.
- [x] 칸반 칼런의 순서 변경 가능.

### 데이터

- [x] 새로고침해도 데이터가 유지.

## 진행방법

- `issue` 단위로 기능 개발.
- `feature/#이슈번호`로 브랜치 생성 후 작업 후 `main`에 머지.

## 데이터 구조 및 흐름.

- `App.js`에서 모든 데이터 관리.
- `KanbanColumn`이나 `KanbanItem`의 변경이 필요하면 `App.js`로 부터 받아온 함수를 실행하여 데이터를 상위에서 갱신한 후 새롭게 받아 온 데이터를 렌더링만 해준다.
- `App.js`의 데이터와 각 컴포넌트의 데이터를 일치화.

## 드래그 & 드랍

- `onDragStart`, `onDragOver`, `onDrop` 함수를 구현해서 제어.
- `KanbanItem`에서 `drop` 이벤트 발생시 이벤트가 전파되어 `KanbanColumn`의 `drop`도 같이 발생되어 `e.stopPropagation`로 전파를 방지.
- 드래그 시작시의 칼럼의 id, item의 id, 그리고 드랍 시의 칼럼의 id와 item의 id를 인자로 하여 로직을 처리.

## 텍스트 수정

- `input`과 `div` 태그를 연동.
- 클릭 전에는 `div` 태그를 렌더링하고 `input`은 숨김.
- 클릭 시 `isEditMode` 상태를 `true`로 변경하여 `input` 태그를 보여줌.
- `input`에서 text 수정 후 `enter` 입력시 `isEditMode`를 `false`로 변경, 상위에서 데이터를 갱신 한후 새로 받은 데이터를 `div` 태그로 렌더링.

## localStorage

- `store.js`에서 `localStorage`에 저장 및 불러오기 기능 구현.
- 처음 App 실행시 `localStorage`에 저장된 값 없으면 기본값으로 불러오기.
- 모든 데이터 변경시 마다 `updateKanbanColumns`에서 `localStorage`에 저장 후 업데이트하도록 구현.
