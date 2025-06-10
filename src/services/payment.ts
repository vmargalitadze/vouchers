import axios from 'axios';
import { API } from '../baseAPI';

const PAYMENT_URLS = {
  SUCCESS: 'http://offerscard.ge/#/PaymentSuccess',
  FAILED: 'http://offerscard.ge/#/PaymentFailed'
};

interface PaymentPayload {
  userId: number;
  discount: number;
}

export const handlePayment = async (payload: PaymentPayload) => {
  try {
    if (!payload.userId) {
      throw new Error('User information is not available');
    }

    const requestPayload = {
      ...payload,
      successUrl: PAYMENT_URLS.SUCCESS,
      failUrl: PAYMENT_URLS.FAILED,
    };

    const response = await axios.post(`${API}/users/bog-token`, requestPayload, {
      withCredentials: true,
    });

    if (!response.data?.redirect?.href) {
      throw new Error('Redirect URL not found in response');
    }

    const redirectUrl = response.data.redirect.href;
    const urlParams = new URLSearchParams(new URL(redirectUrl).search);
    const orderId = urlParams.get('order_id');

    if (!orderId) {
      throw new Error('Order ID not found in redirect URL');
    }

    return { redirectUrl, orderId };
  } catch (error: any) {
    console.error('Payment initialization failed:', error);
    throw new Error(error.response?.data?.message || 'გადახდის ინიციალიზაცია ვერ მოხერხდა');
  }
};

export const verifyPayment = async (orderId: string) => {
  try {
    const response = await axios.post(`${API}/users/verify-bog-payment`, { orderId });
    return response.data;
  } catch (error: any) {
    console.error('Payment verification failed:', error);
    throw new Error('გადახდის ვერიფიკაცია ვერ მოხერხდა');
  }
}; 