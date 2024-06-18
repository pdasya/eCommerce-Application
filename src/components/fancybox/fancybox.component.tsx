import React, { useRef, useEffect, PropsWithChildren, FC } from 'react';
import { Fancybox as NativeFancybox } from '@fancyapps/ui';
import { OptionsType } from '@fancyapps/ui/types/Fancybox/options';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

interface Props {
  options?: Partial<OptionsType>;
  delegate?: string;
}

export const Fancybox: FC<PropsWithChildren<Props>> = ({ options, delegate, children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const Delegate = delegate || '[data-fancybox]';
    const Options = {
      Hash: false,
      Toolbar: {
        display: {
          left: [],
          middle: [],
          right: ['close'],
        },
      },
      ...(options || {}),
    };

    NativeFancybox.bind(container, Delegate, Options);

    return () => {
      NativeFancybox.unbind(container);
      NativeFancybox.close();
    };
  }, []);

  return (
    <div className="f-carousel" ref={containerRef}>
      {children}
    </div>
  );
};
