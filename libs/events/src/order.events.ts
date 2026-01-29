export const ORDER_EVENTS = {
  ORDER_CREATED: 'ORDER_CREATED',
} as const;

export type OrderCreatedEvent = {
  orderId: string;
  userId: string;
  amount: number;
  createdAt: string;
};
