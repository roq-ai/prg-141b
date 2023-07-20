import * as yup from 'yup';

export const stakingValidationSchema = yup.object().shape({
  reward: yup.number().integer().required(),
  crypto_asset_id: yup.string().nullable(),
});
