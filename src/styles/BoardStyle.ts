import styled from 'styled-components';
import { IAreaProps } from 'types/Components/dragableBoard.interface';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const AddBoardBtn = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  transition: all 0.1s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: none;
  }
`;

export const Area = styled.div<IAreaProps>`
  background-color: ${(props) => {
    if (props.isDraggingOver) return '#dfe6e9';
    if (props.isDraggingFromThis) return '#b2bec3';
    return 'transparent';
  }};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

export const Form = styled.form`
  width: 70%;
  margin: 0 auto 20px;
`;
export const BoardForm = styled(Form)`
  width: 100%;
  padding: 0 10px;
  input {
    width: 100%;
    height: 40px;
  }
`;
export const Input = styled.input`
  width: 100%;
`;

export const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

export const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
  gap: 10px;
  margin-bottom: 50px;
`;

export const BoardContainer = styled.div`
  width: 300px;
  padding: 10px 0px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

export const Card = styled.div<{ isDragging: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) =>
    props.isDragging ? '#74b9ff' : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? '0px 2px 5px rgba(0, 0, 0, 0.05)' : 'none'};
`;

export const DeleteBtn = styled(AddBoardBtn)`
  width: 20px;
  height: 20px;
`;

export const DeleteArea = styled(AddBoardBtn)<IAreaProps>`
  background-color: ${(props) => {
    if (props.isDraggingOver) return '#dfe6e9';
    if (props.isDraggingFromThis) return '#b2bec3';
    return '#dfe6e9';
  }};
  width: 60px;
  height: 60px;
`;
