import React from 'react';
import {
  ListItem,
  ListItemIcon,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
} from '@mui/material';
import { EditableInfoItemProps } from '@modules/user-profile/interfaces/user-profile.interfaces';

const EditableInfoItem: React.FC<EditableInfoItemProps> = ({
  icon: Icon,
  label,
  value,
  editMode,
  onChange,
  type = 'text',
  options = [],
  error,
}) => (
  <ListItem>
    <ListItemIcon>
      <Icon />
    </ListItemIcon>
    <Grid container alignItems="center">
      <Grid item xs>
        <Typography variant="subtitle1">{label}</Typography>
      </Grid>
      <Grid item xs>
        {editMode ? (
          type === 'select' ? (
            <Select
              value={value}
              onChange={e => onChange(e.target.value)}
              fullWidth
              variant="outlined">
              {options.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <TextField
              fullWidth
              variant="outlined"
              value={value}
              onChange={e => onChange(e.target.value)}
              type={type}
              error={!!error}
              helperText={error}
            />
          )
        ) : (
          <Typography variant="subtitle1">{value}</Typography>
        )}
      </Grid>
    </Grid>
  </ListItem>
);

export default EditableInfoItem;
