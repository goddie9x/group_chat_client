import styled from '@emotion/styled';
import { Property } from 'csstype';

export type TVideoCallItemProps = React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement> & {
  isTurnOnCamera?: boolean;
  isTurnOnMicrophone?: boolean;
  canToggleMedia?: boolean;
  onToggleCamera?: (isTurnOnCamera?: boolean) => void;
  onToggleMicrophone?: (isTurnOnMicrophone?: boolean) => void;
  background?: string;
  backgroundColor?: string;
  fit?: Property.ObjectFit;
  position?: Property.ObjectPosition;
  margin?: string | number;
  padding?: string | number;
  margintop?: number;
  marginbottom?: number;
  paddingTop?: number;
  paddingBottom?: number;
  marginLeft?: number;
  marginright?: number;
  paddingleft?: number;
  paddingright?: number;
  borderradius?: number;
  minwidth?: number;
  minheight?: number;
  maxwidth?: number;
  maxheight?: number;
  cursor?: string;
};

export const TStyledVideo = styled.video<TVideoCallItemProps>`
  border-radius: 8px;
  width: 100%;
  height: 100%;
  transform: scaleX(-1);
  aspect-ratio: 1.3;
  background: ${({ background }) => background};
  background-color: ${({ backgroundColor }) => backgroundColor};
  object-fit: ${({ fit }) => fit};
  object-position: ${({ position }) => position};
  max-width: 100%;
  max-height: 100%;
  margin: ${({ margin }) => (margin && Number(margin) ? margin + 'px' : margin)};
  padding: ${({ padding }) => (padding && Number(padding) ? padding + 'px' : padding)};
  margin-top: ${({ margintop }) => (margintop && Number(margintop) ? margintop + 'px' : margintop)};
  margin-bottom: ${({ marginbottom }) => (marginbottom && Number(marginbottom) ? marginbottom + 'px' : marginbottom)};
  padding-top: ${({ paddingTop }) => (paddingTop && Number(paddingTop) ? paddingTop + 'px' : paddingTop)};
  padding-bottom: ${({ paddingBottom }) => (paddingBottom && Number(paddingBottom) ? paddingBottom + 'px' : paddingBottom)};
  margin-left: ${({ marginLeft }) => (marginLeft && Number(marginLeft) ? marginLeft + 'px' : marginLeft)};
  margin-right: ${({ marginright }) => (marginright && Number(marginright) ? marginright + 'px' : marginright)};
  padding-left: ${({ paddingleft }) => (paddingleft && Number(paddingleft) ? paddingleft + 'px' : paddingleft)};
  padding-right: ${({ paddingright }) => (paddingright && Number(paddingright) ? paddingright + 'px' : paddingright)};
  border-radius: ${({ borderradius }) => (borderradius && Number(borderradius) ? borderradius + 'px' : borderradius)};
  min-width: ${({ minwidth }) => minwidth}px;
  min-height: ${({ minheight }) => minheight}px;
  max-width: ${({ maxwidth }) => maxwidth}px;
  max-height: ${({ maxheight }) => maxheight}px;
  cursor: ${({ cursor }) => cursor};
`;
