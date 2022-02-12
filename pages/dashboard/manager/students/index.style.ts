import { Form, Input } from 'antd';
import styled from 'styled-components';

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const StyledSearch = styled(Input.Search)`
  width: 30%;
  display: block;
`;

export const StyledPaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
`;

export const ModalFormSubmit = styled(Form.Item)`
  position: absolute;
  bottom: 0;
  right: 8em;
  margin-bottom: 10px;
`;

// export const AddAndEditStudentForm = styled(Form)``;
