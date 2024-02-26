
import { Swiper, SwiperProps } from 'swiper/react';
import SwiperCore, { Pagination, Navigation, EffectFade, Autoplay } from 'swiper';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import {  styled } from '@mui/material';

import { TBoxProps } from 'components/box/box.styled';

SwiperCore.use([Pagination, EffectFade, Navigation, Autoplay]);

export type TSliderProps<T> = Omit<SwiperProps, "width" | "height"> & TBoxProps & {
  items: Array<T>;
  renderItem: (item: T) => React.ReactNode;
};

const TSliderStyled = styled(Swiper)`
    width: 100%;
    height: 100%;
    .swiper-pagination-bullet{
        width: ${({ theme }) => theme.spacing(2.25)};
        line-height: ${({ theme }) => theme.spacing(2.25)};
        height: ${({ theme }) => theme.spacing(2.25)};
        background-color: ${({ theme }) => theme.palette.primary.main};
        color: ${({ theme }) => theme.palette.common.white};
    }
`;

export default TSliderStyled;