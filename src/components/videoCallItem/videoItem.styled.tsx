import styled from '@emotion/styled';

export type TVideoCallItemProps = React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement> & {
  isTurnOnCamera?: boolean;
  isTurnOnMicrophone?: boolean;
  canToggleMedia?: boolean;
  onToggleCamera?: (isTurnOnCamera?: boolean) => void;
  onToggleMicrophone?: (isTurnOnMicrophone?: boolean) => void;
};

export const TStyledVideo = styled.video<TVideoCallItemProps>`
  width: 100%;
  height: 100%;
`;
