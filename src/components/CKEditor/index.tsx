import React from 'react';
import { CKEditor, CKEditorConfig, CKEditorEventHandlerProp } from 'ckeditor4-react';

import TBox from 'components/box';
import { useTranslation } from 'react-i18next';
import { TBoxProps } from 'components/box/box.styled';

export type TEditorProps = {
  initData?: string;
  data?: string;
  containerProps?: TBoxProps;
  config?: CKEditorConfig;
  eventHandler?: Partial<CKEditorEventHandlerProp>;
};

function TEditor({ initData,data, containerProps, config, eventHandler }: TEditorProps) {
  const { t } = useTranslation();

  return (
    <TBox {...containerProps}>
      <CKEditor
        initData={initData}
        data={data}
        config={{
          filebrowserBrowseUrl: 'https://te11.herokuapp.com/images',
          filebrowserUploadMethod: 'form',
          filebrowserUploadUrl: 'https://te11api.herokuapp.com/cloudinary-upload',
          image_previewText: t('no_image_selected'),
          toolbarCanCollapse: true,
          ...config,
        }}
        {...eventHandler}
      />
    </TBox>
  );
}

export default TEditor;
