// Product types
export interface IProductVariant {
  id: string;
  capacity: string; // e.g. "50ml", "100ml"
  price: number;
  stock: number;
}

export interface IProductReview {
  id: string;
  userId: string;
  userName: string;
  rating: number; // 1-5 stars
  comment: string;
  date: string;
}

export interface IProduct {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  description: string;
  details: string[];
  ingredients: string;
  images: string[];
  rating?: number;
  reviews?: any[];
  featured?: boolean;
  new_arrival?: boolean;
}

// User types
export interface IUser {
  id: string;
  email: string;
  password: string;
  name: string;
  phone?: string;
  address?: string;
  createdAt: string;
}

// Cart types
export interface ICartItem {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface ICart {
  items: ICartItem[];
  total: number;
}

// Order types
export interface IOrder {
  id: string;
  userId: string;
  items: ICartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

// Contact form
export interface IContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface IReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}
