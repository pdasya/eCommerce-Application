import { ForwardedRef } from 'react';
import { IControlHandle } from './control-handle.interface';

export interface IControlBaseProps<T> {
  onChange?: (value: T, isDefault: boolean) => void;
  onDefaultChange?: (isDefault: boolean) => void;
  ref?: ForwardedRef<IControlHandle>;
}
