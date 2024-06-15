import React, { FC } from 'react';
import { Box, TextField, Button } from '@mui/material';
import * as styles from './cart-promocode-form.module.scss';

interface PromoCodeFormProps {
  promoCode: string;
  promoCodeState: boolean;
  promoError: string;
  handlePromoCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePromoCodeApply: () => void;
  handlePromoCodeDeleteItems: () => void;
  handlePromoCodePressEnter: (e: React.KeyboardEvent) => void;
}

export const PromoCodeForm: FC<PromoCodeFormProps> = ({
  promoCode,
  promoCodeState,
  promoError,
  handlePromoCodeChange,
  handlePromoCodeApply,
  handlePromoCodeDeleteItems,
  handlePromoCodePressEnter,
}) => (
  <Box className={styles.content} marginTop={2} marginBottom={2}>
    <TextField
      className={styles.textField}
      label="Promo Code"
      variant="outlined"
      size="small"
      value={promoCode}
      onChange={handlePromoCodeChange}
      onKeyDown={handlePromoCodePressEnter}
      error={!!promoError}
      FormHelperTextProps={{
        className: styles.helperText,
      }}
      helperText={promoError}
      disabled={promoCodeState}
    />
    {promoCodeState ? (
      <Button
        className={styles.button}
        variant="contained"
        color="error"
        onClick={handlePromoCodeDeleteItems}>
        Delete
      </Button>
    ) : (
      <Button
        className={styles.button}
        variant="contained"
        color="primary"
        onClick={handlePromoCodeApply}
        disabled={!promoCode.length}>
        Apply
      </Button>
    )}
  </Box>
);
