import {  LinearProgress, LinearProgressProps, styled } from '@mui/material';
import { TBoxProps } from 'components/box/box.styled';

export type TLinearProgressProps = LinearProgressProps &
  TBoxProps & {
    showPercentage?: boolean;
    fontSize?: number;
    fontWeight?: number;
  };

const TLinearProgressStyled = styled(LinearProgress)`
  height: 100%;
  width: 100%;
  .MuiLinearProgress-bar{
    border-radius: 999999px;
  }
`;

export default TLinearProgressStyled;
