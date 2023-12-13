import styled from 'styled-components';

export const Button = styled.button`
  justify-self: center;
  align-self: center;
  width: 80%;
  heigth: 100%;
  border: none;
  border-radius: 15px;
  padding: 7px;
  font-weight: bold;
  font-size: 16px;
  background-color: #d0dce6;
`;

export const CheckButton = styled(Button)`
  color: ${(props) => (props.$checked ? 'white' : 'black')};
  background-color: ${(props) => (props.$checked ? '#2c6290' : '#d0dce6')};
`;

export const SaveButton = styled.button`
  width: 130px;
  height: 30px;
  border: none;
  font-size: 17px;
  font-weight: bold;
  background-color: #7396b5;
  border-radius: 7px;
`;
