import { useForm } from 'react-hook-form';
import { Droppable } from 'react-beautiful-dnd';
import { BoardContainer, Title, Area, BoardForm } from 'styles/BoardStyle';
import { IBoardProps, IForm } from 'types/Components/dragableBoard.interface';
import { toDoState } from 'atoms/atoms';
import { useSetRecoilState } from 'recoil';
import DragableCard from './DragableCard';

function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue('toDo', '');
  };

  return (
    <BoardContainer>
      <Title>{boardId}</Title>
      <BoardForm onSubmit={handleSubmit(onValid)}>
        <input
          {...register('toDo', { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </BoardForm>
      <Droppable droppableId={boardId}>
        {(magic, info) => (
          <Area
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DragableCard
                key={toDo.id}
                boardId={boardId}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </BoardContainer>
  );
}

export default Board;
