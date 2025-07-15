export type OrderStatus = 'pending' | 'completed' | 'cancelled';

export interface Order {
  id: number;
  customerName: string;
  product: string;
  quantity: number;
  price: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
}

export interface NewOrderInput {
  customerName: string;
  product: string;
  quantity: number;
  price: number;
  status: OrderStatus;
}
