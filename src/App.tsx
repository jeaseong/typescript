import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Board from 'Components/Board';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { toDoState } from 'atoms/atoms';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import {
  Wrapper,
  Boards,
  AddBoardBtn,
  Form,
  Input,
  DeleteArea,
} from 'styles/BoardStyle';
import { IFormBoard } from 'types/Components/dragableBoard.interface';

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [isAdd, setIsAdd] = useState(false);
  const setBoard = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IFormBoard>();
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    // 이동하는 보드가 서로 다른 경우
    if (destination.droppableId !== source.droppableId) {
      if (destination.droppableId === 'trash') {
        setToDos((allBoards) => {
          const sourceBoard = [...allBoards[source.droppableId]];
          sourceBoard.splice(source.index, 1);
          return {
            ...allBoards,
            [source.droppableId]: sourceBoard,
          };
        });
      } else {
        setToDos((allBoards) => {
          const sourceBoard = [...allBoards[source.droppableId]];
          const taskObj = sourceBoard[source.index];
          const destinationBoard = [...allBoards[destination.droppableId]];
          sourceBoard.splice(source.index, 1);
          destinationBoard.splice(destination?.index, 0, taskObj);
          return {
            ...allBoards,
            [source.droppableId]: sourceBoard,
            [destination.droppableId]: destinationBoard,
          };
        });
      }
    }
  };

  const addBoard = () => {
    setIsAdd((cur) => !cur);
  };
  const onValid = ({ board }: IFormBoard) => {
    setBoard((allBoard) => {
      return {
        ...allBoard,
        [board]: [],
      };
    });
    setValue('board', '');
    setIsAdd((cur) => !cur);
  };

  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(toDos)?.map((boardId) => (
              <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
            ))}
          </Boards>
          {isAdd && (
            <Form onSubmit={handleSubmit(onValid)}>
              <Input
                {...register('board', { required: true })}
                type="text"
                placeholder="무슨 보드 만들거야?"
              />
            </Form>
          )}
          <AddBoardBtn onClick={addBoard}>+</AddBoardBtn>
        </Wrapper>
        <Droppable droppableId="trash">
          {(magic, info) => (
            <DeleteArea
              isDraggingOver={info.isDraggingOver}
              isDraggingFromThis={Boolean(info.draggingFromThisWith)}
              ref={magic.innerRef}
              {...magic.droppableProps}
            >
              {magic.placeholder}
              쓰레기통
            </DeleteArea>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
