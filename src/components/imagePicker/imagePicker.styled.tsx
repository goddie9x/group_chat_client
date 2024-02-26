import { styled } from '@mui/material';

import TBox from 'components/box';
import { TBoxProps } from 'components/box/box.styled';
import { TImageProps } from 'components/image/image.styled';

export type onSaveProps = {
  file: File | null;
  imageUrl?: string;
};

export type TImagePickerProps = TBoxProps & {
  src?: string;
  imageProps?: TImageProps;
  variant?: 'circle' | 'rounded' | 'square';
  editable?: boolean;
  setEditing?: (editable: boolean) => void;
  allowBrowse?: boolean;
  onSave?: ({ file, imageUrl }: onSaveProps) => void;
};

export type TImagePickerWrapperProps = TBoxProps & {
  variant?: 'circle' | 'rounded' | 'square';
};
const TImagePickerWrapper = styled(TBox)<TImagePickerWrapperProps>`
  position: relative;
  overflow: hidden;
  margin: auto;
  ${({ variant, theme }) => {
    switch (variant) {
      case 'circle':
        return 'border-radius: ' + theme.spacing(99999);
      case 'rounded':
        return 'border-radius: ' + theme.spacing(0.5);
      case 'square':
        return 'border-radius: ' + theme.spacing(0);
      default:
        return 'border-radius: ' + theme.spacing(0.5);
    }
  }}
`;

export default TImagePickerWrapper;
