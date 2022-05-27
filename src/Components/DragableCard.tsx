import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Card, DeleteBtn } from 'styles/BoardStyle';
import { useSetRecoilState } from 'recoil';
import { toDoState } from 'atoms/atoms';
import { IDragabbleCardProps } from '../types/Components/dragableBoard.interface';

function DragableCard({
  toDoId,
  toDoText,
  index,
  boardId,
}: IDragabbleCardProps) {
  const setToDos = useSetRecoilState(toDoState);

  const deleteToDo = () => {
    setToDos((cur) => {
      const cp = { ...cur };
      const sourceBoard = [...cur[boardId]];
      sourceBoard.splice(index, 1);
      return {
        ...cp,
        [boardId]: sourceBoard,
      };
    });
  };
  return (
    <Draggable draggableId={`${toDoId}`} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          <span>{toDoText}</span>
          <DeleteBtn onClick={deleteToDo}>X</DeleteBtn>
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragableCard);
