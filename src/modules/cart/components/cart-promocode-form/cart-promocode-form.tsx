import React, { FC } from 'react';
import { Box, TextField, Button } from '@mui/material';

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
  <Box display="flex" justifyContent="flex-end" alignItems="center" marginTop={2}>
    <TextField
      label="Promo Code"
      variant="outlined"
      size="small"
      value={promoCode}
      onChange={handlePromoCodeChange}
      onKeyDown={handlePromoCodePressEnter}
      error={!!promoError}
      helperText={promoError}
      disabled={promoCodeState}
    />
    {promoCodeState ? (
      <Button
        variant="contained"
        color="error"
        onClick={handlePromoCodeDeleteItems}
        style={{ marginLeft: 8 }}>
        Delete
      </Button>
    ) : (
      <Button
        variant="contained"
        color="primary"
        onClick={handlePromoCodeApply}
        disabled={!promoCode.length}
        style={{ marginLeft: 8 }}>
        Apply
      </Button>
    )}
  </Box>
);
