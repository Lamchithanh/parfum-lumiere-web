
import { IProduct } from '../types';

export const products: IProduct[] = [
  {
    id: "1",
    name: "Elysium Parfum",
    brand: "La Rose",
    description: "Một mùi hương gợi cảm với những nốt hương hoa và gỗ. Sự kết hợp hoàn hảo giữa hoa hồng, hoa nhài và gỗ đàn hương tạo nên một mùi hương đầy quyến rũ và tinh tế.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    category: "Women",
    scent_notes: ["Hoa hồng", "Hoa nhài", "Gỗ đàn hương"],
    variants: [
      {
        id: "1-1",
        capacity: "30ml",
        price: 1250000,
        stock: 15
      },
      {
        id: "1-2",
        capacity: "50ml",
        price: 1850000,
        stock: 10
      },
      {
        id: "1-3",
        capacity: "100ml",
        price: 2950000,
        stock: 5
      }
    ],
    rating: 4.8,
    reviews: [
      {
        id: "r1",
        userId: "u1",
        userName: "Minh Anh",
        rating: 5,
        comment: "Mùi hương rất tinh tế và lưu giữ lâu. Tôi nhận được nhiều lời khen khi sử dụng nước hoa này.",
        date: "2024-03-15"
      },
      {
        id: "r2",
        userId: "u2",
        userName: "Thanh Hà",
        rating: 4,
        comment: "Mùi hương rất đẹp, nhưng độ lưu hương có thể tốt hơn một chút.",
        date: "2024-02-28"
      }
    ],
    featured: true,
    new_arrival: false
  },
  {
    id: "2",
    name: "Azure Dreams",
    brand: "Maison Lumière",
    description: "Một mùi hương mát mẻ và sảng khoái với những nốt hương cam quýt và thảo mộc. Hoàn hảo cho những ngày hè nóng bức.",
    images: ["/placeholder.svg", "/placeholder.svg"],
    category: "Unisex",
    scent_notes: ["Cam bergamot", "Hương biển", "Xạ hương"],
    variants: [
      {
        id: "2-1",
        capacity: "50ml",
        price: 1650000,
        stock: 8
      },
      {
        id: "2-2",
        capacity: "100ml",
        price: 2750000,
        stock: 12
      }
    ],
    rating: 4.5,
    reviews: [
      {
        id: "r3",
        userId: "u3",
        userName: "Quang Minh",
        rating: 5,
        comment: "Mùi hương rất tươi mát và nam tính. Rất phù hợp với khí hậu nóng ẩm của Việt Nam.",
        date: "2024-03-10"
      }
    ],
    featured: false,
    new_arrival: true
  },
  {
    id: "3",
    name: "Noir Absolu",
    brand: "Le Prestige",
    description: "Một mùi hương mạnh mẽ và quyến rũ với những nốt hương gỗ và da thuộc. Dành cho những người đàn ông tự tin và đầy bản lĩnh.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    category: "Men",
    scent_notes: ["Hạt tiêu đen", "Da thuộc", "Gỗ tuyết tùng"],
    variants: [
      {
        id: "3-1",
        capacity: "50ml",
        price: 1950000,
        stock: 6
      },
      {
        id: "3-2",
        capacity: "100ml",
        price: 3150000,
        stock: 4
      }
    ],
    rating: 4.9,
    reviews: [
      {
        id: "r4",
        userId: "u4",
        userName: "Đức Anh",
        rating: 5,
        comment: "Mùi hương rất nam tính và lưu giữ cả ngày. Tôi đã nhận được nhiều lời khen từ đồng nghiệp.",
        date: "2024-03-20"
      },
      {
        id: "r5",
        userId: "u5",
        userName: "Hùng Mạnh",
        rating: 5,
        comment: "Đây là mùi hương yêu thích của tôi. Rất phù hợp cho các buổi hẹn quan trọng.",
        date: "2024-03-05"
      }
    ],
    featured: true,
    new_arrival: false
  },
  {
    id: "4",
    name: "Crystal Bloom",
    brand: "La Rose",
    description: "Một mùi hương ngọt ngào và nhẹ nhàng với những nốt hương hoa và trái cây. Hoàn hảo cho những cô gái trẻ và năng động.",
    images: ["/placeholder.svg", "/placeholder.svg"],
    category: "Women",
    scent_notes: ["Hoa mẫu đơn", "Lê", "Vani"],
    variants: [
      {
        id: "4-1",
        capacity: "30ml",
        price: 1150000,
        stock: 20
      },
      {
        id: "4-2",
        capacity: "50ml",
        price: 1750000,
        stock: 15
      }
    ],
    rating: 4.6,
    reviews: [
      {
        id: "r6",
        userId: "u6",
        userName: "Thùy Linh",
        rating: 5,
        comment: "Mùi hương rất dễ thương và nữ tính. Tôi sẽ mua lại sản phẩm này!",
        date: "2024-02-25"
      }
    ],
    featured: false,
    new_arrival: true
  },
  {
    id: "5",
    name: "Amber Oud",
    brand: "Le Prestige",
    description: "Một mùi hương đông phương đầy bí ẩn với những nốt hương gỗ trầm và hổ phách. Dành cho những người yêu thích sự sang trọng và đẳng cấp.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    category: "Unisex",
    scent_notes: ["Hổ phách", "Gỗ trầm hương", "Hoa hồng Thổ Nhĩ Kỳ"],
    variants: [
      {
        id: "5-1",
        capacity: "50ml",
        price: 2350000,
        stock: 5
      },
      {
        id: "5-2",
        capacity: "100ml",
        price: 3950000,
        stock: 3
      }
    ],
    rating: 4.9,
    reviews: [
      {
        id: "r7",
        userId: "u7",
        userName: "Ngọc Anh",
        rating: 5,
        comment: "Mùi hương rất đặc biệt và lưu giữ cả ngày. Đáng để đầu tư!",
        date: "2024-03-18"
      },
      {
        id: "r8",
        userId: "u8",
        userName: "Minh Tuấn",
        rating: 5,
        comment: "Mùi hương rất sang trọng và đẳng cấp. Tôi đã nhận được rất nhiều lời khen.",
        date: "2024-03-12"
      }
    ],
    featured: true,
    new_arrival: false
  },
  {
    id: "6",
    name: "Velvet Orchid",
    brand: "Maison Lumière",
    description: "Một mùi hương quyến rũ và gợi cảm với những nốt hương hoa lan và vani. Dành cho những người phụ nữ tự tin và quyến rũ.",
    images: ["/placeholder.svg", "/placeholder.svg"],
    category: "Women",
    scent_notes: ["Hoa lan", "Vani", "Xạ hương"],
    variants: [
      {
        id: "6-1",
        capacity: "30ml",
        price: 1350000,
        stock: 10
      },
      {
        id: "6-2",
        capacity: "50ml",
        price: 1950000,
        stock: 8
      },
      {
        id: "6-3",
        capacity: "100ml",
        price: 3250000,
        stock: 5
      }
    ],
    rating: 4.7,
    reviews: [
      {
        id: "r9",
        userId: "u9",
        userName: "Thanh Thảo",
        rating: 5,
        comment: "Mùi hương rất gợi cảm và lưu giữ lâu. Tôi đã nhận được nhiều lời khen khi sử dụng nước hoa này.",
        date: "2024-03-08"
      },
      {
        id: "r10",
        userId: "u10",
        userName: "Hương Giang",
        rating: 4,
        comment: "Mùi hương rất đẹp, nhưng giá hơi cao.",
        date: "2024-02-20"
      }
    ],
    featured: false,
    new_arrival: true
  }
];
