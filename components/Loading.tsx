import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const Loading = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  margin-top: -24px;
  margin-left: -24px;
`;

export default () => (
  <Loading>
    <FontAwesomeIcon icon="cog" size="3x" color="DodgerBlue" spin />
  </Loading>
);
