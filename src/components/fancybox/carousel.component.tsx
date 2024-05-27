import React, { useRef, useEffect, PropsWithChildren, FC } from 'react';
import { Carousel as NativeCarousel } from '@fancyapps/ui';
import '@fancyapps/ui/dist/carousel/carousel.css';
import { Thumbs } from '@fancyapps/ui/dist/carousel/carousel.thumbs.esm.js';
import '@fancyapps/ui/dist/carousel/carousel.thumbs.css';
import type { OptionsType } from '@fancyapps/ui/types/Carousel/options';

interface Props {
  options?: Partial<OptionsType>;
}

const defaults: Partial<OptionsType> = {
  Dots: false,
  Thumbs: {
    type: 'classic',
  },
};

export const Carousel: FC<PropsWithChildren<Props>> = ({ options, children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const Options = {
      ...defaults,
      ...(options || {}),
    };

    const instance = new NativeCarousel(container, Options, { Thumbs });

    return () => {
      instance.destroy();
    };
  });

  return (
    <div className="f-carousel" ref={containerRef}>
      {children}
    </div>
  );
};
