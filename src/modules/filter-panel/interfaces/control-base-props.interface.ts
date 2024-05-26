import { ForwardedRef } from 'react';
import { IControlHandle } from './control-handle.interface';

export interface IControlBaseProps<T> {
  onChange?: (value: T) => void;
  onDefaultChange?: (isDefault: boolean) => void;
  ref?: ForwardedRef<IControlHandle>;
}
