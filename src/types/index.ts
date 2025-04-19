
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
  id: string;
  name: string;
  brand: string;
  description: string;
  images: string[];
  category: string; // e.g. "Men", "Women", "Unisex"
  scent_notes: string[]; // Top, middle, base notes
  variants: IProductVariant[];
  rating: number; // Average rating
  reviews: IProductReview[];
  featured: boolean;
  new_arrival: boolean;
}

// User types
export interface IUser {
  id: string;
  name: string;
  email: string;
  favorites: string[]; // Array of product IDs
}

// Cart types
export interface ICartItem {
  productId: string;
  variantId: string;
  quantity: number;
  product?: IProduct;
  variant?: IProductVariant;
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
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  date: string;
  shipping_address: {
    name: string;
    address: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    phone: string;
  };
}

// Contact form
export interface IContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}
