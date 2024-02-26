import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import TBox from 'components/box';
import TImage from 'components/image';
import TButton from 'components/button';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import TIconButton from 'components/iconButton';
import TImagePickerWrapper, { TImagePickerProps } from './imagePicker.styled';
import TModal from 'components/modal';
import TImagesView from 'components/imagesView';
import TMenu from 'components/menu';
import { MenuItem } from '@mui/material';

import { RootState } from 'store';

const TImagePicker = ({ imageProps, allowBrowse, editable, variant, src, onSave, ...props }: TImagePickerProps) => {
  const { t } = useTranslation();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(src);
  const [openFullSizeImage, setOpenFullSizeImage] = useState(false);
  const [openSelectedImage, setOpenSelectedImage] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const imageInput = useRef<HTMLInputElement>(null);
  const userData = useSelector((state: RootState) => state.auth.userData);

  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event !== null && event.target !== null && event.target.files !== null && event.target.files[0] !== null) {
      const fileUploaded = event.target.files[0];
      setImageFile(fileUploaded);
      setImageUrl(URL.createObjectURL(fileUploaded));
    }
  };

  const handleClickAddPhoto = () => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  };
  useEffect(() => {
    setImageUrl(src);
  }, [src]);

  return (
    <TBox display="flex" flexDirection="column" alignItems="center" margin="auto" {...props}>
      <TImagePickerWrapper variant={variant} width={props.width} height={props.width}>
        <TImage src={imageUrl}  objectFit="cover" {...imageProps} onClick={() => setOpenFullSizeImage(true)} width="100%" height="100%" />
        <TModal open={openFullSizeImage} onClose={() => setOpenFullSizeImage(false)}>
          <TImage src={imageUrl} objectFit="cover" {...imageProps} width="100%" height="auto" />
        </TModal>
        <TModal open={openSelectedImage} width="95vw" onClose={() => setOpenSelectedImage(false)}>
          <TImagesView
            onSelected={(url) => {
              setImageUrl(url);
              setImageFile(null);
              setOpenSelectedImage(false);
              setAnchorEl(null);
            }}
            deleteable={userData&&userData.role<2}
          />
        </TModal>
        {editable && (
          <TBox position="absolute" bottom={0} textalign="center" width="100%">
            <TBox display="none">
              <input type="file" accept=".jpg,.png" ref={imageInput} onChange={handleChangeImage} />
            </TBox>
            {!!allowBrowse ? (
              <>
                <TIconButton background="transparent" variant="extended" onClick={(e) => setAnchorEl(e.currentTarget)}>
                  <AddAPhotoIcon />
                </TIconButton>
                <TMenu open={!!anchorEl} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
                  <MenuItem>
                    <TButton title={t('images')} onClick={() => setOpenSelectedImage(true)}>
                      {t('select_from_library')}
                    </TButton>
                  </MenuItem>
                  <MenuItem>
                    <TButton onClick={handleClickAddPhoto}>{t('select_from_device')}</TButton>
                  </MenuItem>
                </TMenu>
              </>
            ) : (
              <TIconButton background="transparent" variant="extended" onClick={handleClickAddPhoto}>
                <AddAPhotoIcon />
              </TIconButton>
            )}
          </TBox>
        )}
      </TImagePickerWrapper>
      {editable && (imageFile || imageUrl != src) && (
        <TBox marginY={2}>
          <TButton
            variant="contained"
            color="primary"
            marginright={2}
            height={4}
            onClick={() => {
              const newImageData = { file: imageFile, imageUrl: imageFile?'':imageUrl };
              onSave?.({ ...newImageData });
              setImageFile(null);
            }}
          >
            {t('save')}
          </TButton>
          <TButton
            variant="outlined"
            color="primary"
            height={4}
            onClick={() => {
              setImageFile(null);
              setImageUrl(src);
            }}
          >
            {t('cancel')}
          </TButton>
        </TBox>
      )}
    </TBox>
  );
};

export default TImagePicker;
