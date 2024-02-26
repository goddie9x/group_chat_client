import { styled } from '@mui/material';
import TInputTransformText from 'components/transform/inputAndText';

const TInputTransformTextStyled = styled(TInputTransformText)`
  &>.MuiBox-root {
    border-bottom: 1px solid ${({ theme }) => theme.palette.text.secondary};
  }
`;

export default TInputTransformTextStyled;
