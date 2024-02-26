import React,{useState,useEffect,useRef} from 'react';
import TImageStyled, { TImageProps } from './image.styled';
import TDefaultImage from 'assets/images/T_Default.png';

const TImage = ({ objectFit, objectPosition,src, ...props }: TImageProps) => {
  const [lazyLoad,setLazyLoad] = useState(true);
  const imageRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if('IntersectionObserver' in window&&imageRef.current){
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if(entry.isIntersecting){
            setLazyLoad(false);
            observer.disconnect();
          }
        });
      });
      observer.observe(imageRef.current);
    }
  },[]);
  return <TImageStyled ref={imageRef} fit={objectFit} src={lazyLoad?TDefaultImage:src} {...props} position={objectPosition} />;
};

export default TImage;
