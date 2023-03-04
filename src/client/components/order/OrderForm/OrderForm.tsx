import { useFormik } from 'formik';
import { type ChangeEventHandler, type FC, useEffect, useState } from 'react';

import { useAddress } from '../../../hooks/useAddress'
import { PrimaryButton } from '../../foundation/PrimaryButton';
import { TextInput } from '../../foundation/TextInput';


import * as styles from './OrderForm.styles';

type OrderFormValue = {
  zipCode: string;
  prefecture: string;
  city: string;
  streetAddress: string;
};

type Props = {
  onSubmit: (orderFormValue: OrderFormValue) => void;
};

const ZIPCODE_LENGTH_THRESHOLD = 7

export const OrderForm: FC<Props> = ({ onSubmit }) => {
  const { loadAddress } = useAddress()

  const { handleChange, handleSubmit, setFieldValue, values } = useFormik<OrderFormValue>({
    initialValues: {
      city: '',
      prefecture: '',
      streetAddress: '',
      zipCode: '',
    },
    onSubmit,
  });

  const [enteredZipCode, setEnteredZipCode] = useState('')

  useEffect(() => {
    if (enteredZipCode.length >= ZIPCODE_LENGTH_THRESHOLD) {
      loadAddress({ variables: { zipCode: enteredZipCode }}).then(({ data, error, loading }) => {
        if (loading || error) {
          return
        }
        const address = data?.address
        if (!!address && address.prefecture && address.city) {
          setFieldValue('prefecture', address.prefecture);
          setFieldValue('city', address.city);
        }
      })
    }
  }, [enteredZipCode, setFieldValue, loadAddress])


  const handleZipCodeChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const zipCode = String(event.target.value);
    setFieldValue('zipCode', zipCode)
    setEnteredZipCode(zipCode)
    // formik.handleChange(event);
  };

  return (
    <div className={styles.container()}>
      <form className={styles.form()} data-testid="order-form" onSubmit={handleSubmit}>
        <div className={styles.inputList()}>
          <TextInput
            required
            id="zipCode"
            label="郵便番号"
            onChange={handleZipCodeChange}
            placeholder="例: 1500042"
            value={values.zipCode}
          />
          <TextInput
            required
            id="prefecture"
            label="都道府県"
            onChange={handleChange}
            placeholder="例: 東京都"
            value={values.prefecture}
          />
          <TextInput
            required
            id="city"
            label="市区町村"
            onChange={handleChange}
            placeholder="例: 渋谷区宇田川町"
            value={values.city}
          />
          <TextInput
            required
            id="streetAddress"
            label="番地・建物名など"
            onChange={handleChange}
            placeholder="例: 40番1号 Abema Towers"
            value={values.streetAddress}
          />
        </div>
        <div className={styles.purchaseButton()}>
          <PrimaryButton size="lg" type="submit">
            購入
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};
