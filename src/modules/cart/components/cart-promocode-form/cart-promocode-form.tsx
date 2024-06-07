import React, { FC } from 'react';
import { Box, TextField, Button } from '@mui/material';

interface PromoCodeFormProps {
  promoCode: string;
  promoError: string;
  handlePromoCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePromoCodeApply: () => void;
}

export const PromoCodeForm: FC<PromoCodeFormProps> = ({
  promoCode,
  promoError,
  handlePromoCodeChange,
  handlePromoCodeApply,
}) => (
  <Box display="flex" justifyContent="flex-end" alignItems="center" marginTop={2}>
    <TextField
      label="Promo Code"
      variant="outlined"
      size="small"
      value={promoCode}
      onChange={handlePromoCodeChange}
      error={!!promoError}
      helperText={promoError}
    />
    <Button
      variant="contained"
      color="primary"
      onClick={handlePromoCodeApply}
      style={{ marginLeft: 8 }}>
      Apply
    </Button>
  </Box>
);
