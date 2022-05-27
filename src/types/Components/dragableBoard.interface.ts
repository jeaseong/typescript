import { IToDo } from 'atoms/atoms';

export interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
  boardId: string;
}

export interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

export interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

export interface IForm {
  toDo: string;
}

export interface IFormBoard {
  board: string;
}
