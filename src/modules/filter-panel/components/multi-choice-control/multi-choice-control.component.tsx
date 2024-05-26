import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { Checkbox, Divider, FormControlLabel, FormGroup } from '@mui/material';
import { IControlHandle } from '@modules/filter-panel/interfaces/control-handle.interface';
import { IControlBaseProps } from '@modules/filter-panel/interfaces/control-base-props.interface';
import styles from './multi-choice-control.component.module.scss';

interface IMultiChoiceControlProps extends IControlBaseProps<Record<string, boolean>> {
  selectAllOption?: boolean;
  options: Record<string, boolean>;
  initialState: Record<string, boolean>;
}

export const MultiChoiceControl = forwardRef<IControlHandle, IMultiChoiceControlProps>(
  ({ options, selectAllOption = true, initialState, onChange, onDefaultChange }, ref) => {
    const clearedState = useMemo<Record<string, boolean>>(
      () => Object.keys(options).reduce((dict, option) => ({ ...dict, [option]: false }), {}),
      [options],
    );
    const [commonSwitchState, setCommonSwitchState] = useState(false);
    const [optionsState, setOptionsState] = useState(initialState);
    const [isDefault, setIsDefault] = useState<boolean>(true);

    useEffect(() => {
      const isAllChecked = Object.values(optionsState).every(state => state);
      const isDefaultState = Object.values(optionsState).every(value => value === false);

      setIsDefault(isDefaultState);
      setCommonSwitchState(isAllChecked);

      if (onChange) {
        onChange(optionsState);
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
        setOptionsState(clearedState);
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

          {Object.keys(options).map(name => (
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
