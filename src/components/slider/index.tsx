import { SwiperSlide } from 'swiper/react';
import React, { useCallback } from 'react';

import TSliderStyled, { TSliderProps } from './slider.styled';
import TBox from 'components/box';

const TSlider = ({ items, width, height, renderItem, ...props }: TSliderProps<any>) => {
  const memoizedRenderItem = useCallback(renderItem, []);

  return (
    <TBox width={width} height={height} {...props}>
      <TSliderStyled
        spaceBetween={30}
        slidesPerView={4}
        breakpoints={{
          992: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          576: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1: {
            slidesPerView: 1,
          },
        }}
        loop={true}
        navigation={true}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
          },
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        {...props}
      >
        {items.map((item, index) => {
          return item ? <SwiperSlide key={index}>{memoizedRenderItem(item)}</SwiperSlide> : null;
        })}
      </TSliderStyled>
    </TBox>
  );
};

export default TSlider;
