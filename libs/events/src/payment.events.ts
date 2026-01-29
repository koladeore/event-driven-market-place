export const PAYMENT_EVENTS = {
  PAYMENT_SUCCESSFUL: 'PAYMENT_SUCCESSFUL',
} as const;

export type PaymentSuccessfulEvent = {
  paymentId: string;
  orderId: string;
  userId: string;
  amount: number;
  paidAt: string;
};
