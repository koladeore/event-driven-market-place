export const PAYMENT_EVENTS = {
  PAYMENT_SUCCESSFUL: 'PAYMENT_SUCCESSFUL',
  PAYMENT_FAILED: 'PAYMENT_FAILED',
} as const;

export type PaymentSuccessfulEvent = {
  paymentId: string;
  orderId: string;
  userId: string;
  amount: number;
  paidAt: string;
};
export type PaymentFailedEvent = {
  orderId: string;
  userId: string;
  amount: number;
  reason: string;
  failedAt: string;
};
