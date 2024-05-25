import React, { FC, useState } from 'react';
import { Attribute } from '@commercetools/platform-sdk';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { List, ListItemButton, ListItemText, Collapse } from '@mui/material';
import styles from './product-attribute-collapse.module.scss';

export const AttributeCollapse: FC<Attribute> = (attribute: Attribute) => {
  const existAttribute = (item: string, name: string) => item.includes(name);
  const { name, value } = attribute;
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  if (
    !(
      existAttribute(name, 'volume') ||
      existAttribute(name, 'size') ||
      existAttribute(name, 'maker')
    )
  ) {
    return (
      <List
        sx={{ bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader">
        <ListItemButton onClick={handleClick}>
          <ListItemText className={styles.listItemText} primary={name} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemText sx={{ pl: 2, pr: 2 }} primary={value} />
          </List>
        </Collapse>
      </List>
    );
  }
  return '';
};
