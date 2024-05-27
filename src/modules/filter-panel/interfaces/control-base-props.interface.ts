import { ForwardedRef } from 'react';
import { IControlHandle } from './control-handle.interface';

export interface IControlBaseProps<T> {
  name: string;
  ref?: ForwardedRef<IControlHandle>;
  onChange?: (payload: [string, T]) => void;
  onDefaultChange?: (isDefault: boolean) => void;
}
