import React from 'react';
import { useToast } from './ToastContext';
import "../../Style/spinnerLoader.css";

const SpinnerLoader = () => {
  const { spinnerLoader } = useToast();
  if (!spinnerLoader) return null;
  return (
    <div className='spinner-loader'>
    </div>
  )
}

export default SpinnerLoader