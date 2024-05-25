import React, {
  forwardRef,
  Fragment,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { Checkbox, Divider, FormControlLabel, FormGroup } from '@mui/material';
import { IControlHandle } from '@modules/filter-panel/interfaces/control-handle.interface';
import { IControlBaseProps } from '@modules/filter-panel/interfaces/control-base-props.interface';
import styles from './multi-choice-control.component.module.scss';

interface IOption {
  name: string;
}

interface IMultiChoiceControlProps extends IControlBaseProps<IOption[]> {
  selectAllOption?: boolean;
  options: IOption[];
}

const initialState = false;

export const MultiChoiceControl = forwardRef<IControlHandle, IMultiChoiceControlProps>(
  ({ options, selectAllOption = true, onChange, onDefaultChange }, ref) => {
    const initialOptionsState = useMemo<Record<string, boolean>>(
      () => options.reduce((dict, option) => ({ ...dict, [option.name]: initialState }), {}),
      [options],
    );
    const [commonSwitchState, setCommonSwitchState] = useState(initialState);
    const [optionsState, setOptionsState] = useState(initialOptionsState);
    const [isDefault, setIsDefault] = useState<boolean>(true);

    useEffect(() => {
      const isAllChecked = Object.values(optionsState).every(state => state);
      const isDefaultState = Object.keys(initialOptionsState).every(
        key => initialOptionsState[key] === optionsState[key],
      );

      setIsDefault(isDefaultState);
      setCommonSwitchState(!!isAllChecked);
      if (onChange) {
        onChange(
          Object.entries(optionsState)
            .filter(state => state[1] === true)
            .map(([name]) => ({ name })),
          isDefaultState,
        );
      }
    }, [optionsState]);

    useEffect(() => {
      if (onDefaultChange) {
        onDefaultChange(isDefault);
      }
    }, [isDefault]);

    const handleCommonSwitchChange = () => {
      const newState = !commonSwitchState;
      setCommonSwitchState(newState);
      setOptionsState(Object.fromEntries(Object.keys(optionsState).map(key => [key, newState])));
    };

    const handleOptionChange = (name: string) => {
      setOptionsState({ ...optionsState, [name]: !optionsState[name] });
    };

    useImperativeHandle(ref, () => ({
      reset() {
        setOptionsState(initialOptionsState);
      },
      getIsDefault() {
        return isDefault;
      },
    }));

    return (
      <div className={styles.root}>
        <FormGroup>
          {selectAllOption && (
            <>
              <FormControlLabel
                control={
                  <Checkbox checked={commonSwitchState} onChange={handleCommonSwitchChange} />
                }
                label="Select all"
              />
              <Divider />
            </>
          )}

          {options.map(({ name }) => (
            <FormControlLabel
              control={
                <Checkbox checked={optionsState[name]} onChange={() => handleOptionChange(name)} />
              }
              label={name}
              key={name}
            />
          ))}
        </FormGroup>
      </div>
    );
  },
);
