import React, { cloneElement, FC, useMemo, useRef, useState } from 'react';
import { Button, Collapse, IconButton, ListItemButton, ListItemText } from '@mui/material';
import { IControlHandle } from '@modules/filter-panel/interfaces/control-handle.interface';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import { IControlBaseProps } from '@modules/filter-panel/interfaces/control-base-props.interface';
import classNames from 'classnames';
import styles from './control-wrapper.component.module.scss';

interface IControlWrapperProps {
  control: React.ReactElement<IControlBaseProps<unknown>>;
  caption: string;
}

export const ControlWrapper: FC<IControlWrapperProps> = ({ caption, control }) => {
  const childRef = useRef<IControlHandle>(null);
  const [isOpen, setOpen] = useState<boolean>(true);
  const [isDefault, setIsDefault] = useState<boolean>(true);
  const referencedControl = useMemo(
    () => cloneElement(control, { ref: childRef, onDefaultChange: setIsDefault }),
    [control],
  );

  const handleClick = () => {
    setOpen(!isOpen);
  };

  return (
    <div className={styles.root}>
      <ListItemButton onClick={handleClick} className={!isDefault ? styles.headerActive : ''}>
        <ListItemText>
          <h3>{caption}</h3>
        </ListItemText>
        {!isOpen && !isDefault ? (
          <IconButton
            onClick={event => {
              event.stopPropagation();
              childRef.current?.reset();
            }}>
            <CancelIcon />
          </IconButton>
        ) : (
          ''
        )}
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isOpen} timeout="auto">
        <div className={styles.outlet}>
          {referencedControl}
          <Button
            className={classNames(styles.resetButton, isDefault && styles.hidden)}
            onClick={() => childRef.current?.reset()}>
            Reset
          </Button>
        </div>
      </Collapse>
    </div>
  );
};
