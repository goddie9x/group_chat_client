import React, { useEffect, useState } from 'react';

import TGrid from 'components/grid';
import TImage from 'components/image';
import TCard from 'components/card';
import { TGridProps } from 'components/grid/grid.styled';
import TButton from 'components/button';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setAlert } from 'store/slices/alert';
import { setLoading } from 'store/slices/common';
import TPagination from 'components/pagination';
import { useLocation } from 'react-router-dom';
import { IMAGE_ENDPOINT } from 'constants/apiEndPoint';
import fetchDataWithoutCredential from 'utils/fetchDataWithCredential';

export type TImageProps = { url?: string; _id?: string };

export type TImagesViewProps = TGridProps & {
  onSelected?: (url?: string, id?: string) => void;
  deleteable?: boolean;
};
const getUrlParam = (paramName: string) => {
  const reParam = new RegExp('(?:[?&]|&)' + paramName + '=([^&]+)', 'i');
  const match = window.location.search.match(reParam);

  return match && match.length > 1 ? match[1] : null;
};

const TImagesView = ({ onSelected, deleteable, ...props }: TImagesViewProps) => {
  const [images, setImages] = useState<Array<TImageProps>>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { search } = useLocation();

  useEffect(() => {
    dispatch(setLoading(true));
    fetch(IMAGE_ENDPOINT.GET_LIST_IMAGE_BY_PAGE + page)
      .then((res) => {
        dispatch(setLoading(false));
        if (res.status >= 400) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(({ images, totalPage }) => {
        setImages([...images]);
        setTotalPage(totalPage);
      })
      .catch(() => {
        dispatch(setAlert({ title: t('error'), message: t('load_data_failed'), type: 'error' }));
      });
  }, [page]);

  return (
    <>
      <TGrid container spacing={2} {...props}>
        {images.map(({ url, _id }, index) => (
          <TGrid
            item
            key={index}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            height={25}
            onClick={() => {
              if (search.includes('CKEditor')) {
                const funcNum = getUrlParam('CKEditorFuncNum');
                const windowForCkeditor = window.opener.CKEDITOR.tools.callFunction(funcNum, url);
                windowForCkeditor.close();
              }
              onSelected?.(url, _id);
            }}
          >
            <TCard width="100%" height="100%" position="relative">
              {!!deleteable && (
                <TButton
                  position="absolute"
                  variant="contained"
                  color="error"
                  height={3}
                  right={1}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dispatch(setLoading(true));
                    fetchDataWithoutCredential({
                      url: IMAGE_ENDPOINT.GET_IMAGE_BY_ID + _id,
                      method: 'DELETE',
                      body: { tokenUser: localStorage.getItem('tokenUser') },
                    })
                      .then((res) => {
                        if (res.status >= 400) {
                          throw new Error(res.statusText);
                        }
                        setImages(images.filter((image) => image._id !== _id));
                        dispatch(setAlert({ title: t('success'), message: t('delete_successfully'), type: 'success' }));
                        dispatch(setLoading(false));
                      })
                      .catch(() => {
                        dispatch(setAlert({ title: t('error'), message: t('delete_failed'), type: 'error' }));
                        dispatch(setLoading(false));
                      });
                  }}
                >
                  {t('delete')}
                </TButton>
              )}
              <TImage src={url} objectFit="cover" />
            </TCard>
          </TGrid>
        ))}
      </TGrid>
      {totalPage > 1 && (
        <TPagination
          page={page}
          count={totalPage}
          onChange={(e, value) => setPage(value)}
          containerProps={{
            marginY: 2,
            marginX: 'auto',
          }}
        />
      )}
    </>
  );
};

export default TImagesView;
