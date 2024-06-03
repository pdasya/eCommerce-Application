import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { Checkbox, Divider, FormControlLabel, FormGroup } from '@mui/material';
import { IControlHandle } from '@modules/filter-panel/interfaces/control-handle.interface';
import { IControlBaseProps } from '@modules/filter-panel/interfaces/control-base-props.interface';
import { useAppSelector } from '@hooks/use-app-selector.hook';
import { selectCustomFilters } from '@store/catalog/catalog.slice';
import styles from './multi-choice-control.component.module.scss';

interface IMultiChoiceControlProps extends IControlBaseProps<Record<string, boolean>> {
  options: Record<string, boolean>;
}

export const MultiChoiceControl = forwardRef<IControlHandle, IMultiChoiceControlProps>(
  ({ name, options, onChange, onDefaultChange }, ref) => {
    const clearedState = useMemo<Record<string, boolean>>(
      () => Object.keys(options).reduce((dict, option) => ({ ...dict, [option]: false }), {}),
      [options],
    );
    const [commonSwitchState, setCommonSwitchState] = useState(false);
    const [optionsState, setOptionsState] = useState(clearedState);
    const [isDefault, setIsDefault] = useState<boolean>(true);

    // TODO: Issue #189: Fix filter controls rerender issues
    const customFilters = useAppSelector(selectCustomFilters);
    useEffect(() => {
      setOptionsState(customFilters[name]);
    }, [customFilters]);

    useEffect(() => {
      const isAllChecked = Object.values(optionsState).every(state => state);
      const isDefaultState = Object.values(optionsState).every(value => value === false);

      setIsDefault(isDefaultState);
      setCommonSwitchState(isAllChecked);

      if (onChange) {
        onChange([name, optionsState]);
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

    const handleOptionChange = (optionName: string) => {
      setOptionsState({ ...optionsState, [optionName]: !optionsState[optionName] });
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
          <FormControlLabel
            control={<Checkbox checked={commonSwitchState} onChange={handleCommonSwitchChange} />}
            label="Select all"
          />
          <Divider />

          {Object.keys(options).map(optionName => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={optionsState[optionName] ?? false}
                  onChange={() => handleOptionChange(optionName)}
                />
              }
              label={optionName}
              key={optionName}
            />
          ))}
        </FormGroup>
      </div>
    );
  },
);
