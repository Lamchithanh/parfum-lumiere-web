export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  description: string;
  details: string[];
  ingredients: string;
  images: string[];
}

export interface BrandData {
  banner: string;
  featured: string;
  collections: {
    name: string;
    image: string;
    description: string;
  }[];
  story: {
    title: string;
    description: string;
    image: string;
  };
}

export const brandData: Record<string, BrandData> = {
  "Chanel": {
    banner: "https://images.unsplash.com/photo-1541643600914-78b084683601",
    featured: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539",
    collections: [
      {
        name: "CHANCE EAU SPLENDIDE",
        image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f",
        description: "Bộ sưu tập mới nhất với hương thơm tinh tế"
      },
      {
        name: "COCO MADEMOISELLE",
        image: "https://images.unsplash.com/photo-1563170352-ba3186d42c8b",
        description: "Hương thơm quyến rũ cho người phụ nữ hiện đại"
      },
      {
        name: "N°5",
        image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6f",
        description: "Biểu tượng của sự sang trọng và đẳng cấp"
      }
    ],
    story: {
      title: "CHÚ TRÌNH LƯU GIỮ HƯƠNG THƠM",
      description: "Khám phá quy trình sáng tạo độc đáo của CHANEL, nơi mỗi giọt nước hoa là một tác phẩm nghệ thuật được chế tác tỉ mỉ từ những nguyên liệu tốt nhất thế giới.",
      image: "https://images.unsplash.com/photo-1595425970378-c9703cf48b7f"
    }
  },
  "Dior": {
    banner: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc",
    featured: "https://images.unsplash.com/photo-1563170351-be82bc888aa4",
    collections: [
      {
        name: "J'ADORE",
        image: "https://images.unsplash.com/photo-1557170334-a9632e77c6e4",
        description: "Biểu tượng của sự nữ tính và sang trọng"
      },
      {
        name: "MISS DIOR",
        image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770",
        description: "Hương thơm của tình yêu và sự lãng mạn"
      },
      {
        name: "SAUVAGE",
        image: "https://images.unsplash.com/photo-1590736704729-f4730bb30771",
        description: "Mùi hương nam tính đầy cuốn hút"
      }
    ],
    story: {
      title: "NGHỆ THUẬT NƯỚC HOA DIOR",
      description: "Khám phá di sản của Dior trong nghệ thuật chế tác nước hoa, nơi sự sang trọng gặp gỡ đổi mới.",
      image: "https://images.unsplash.com/photo-1590736704730-f4730bb30772"
    }
  },
  "Yves Saint Laurent": {
    banner: "https://images.unsplash.com/photo-1512777576244-b846ac3d816f",
    featured: "https://images.unsplash.com/photo-1515377905703-c4788e51af15",
    collections: [
      {
        name: "BLACK OPIUM",
        image: "https://i.pinimg.com/736x/65/a7/62/65a7629156c130b10a219db87ea54965.jpg",
        description: "Hương thơm gây nghiện với cà phê đen và vanilla"
      },
      {
        name: "LIBRE",
        image: "https://images.unsplash.com/photo-1527903789995-dc8ad2ad6de0",
        description: "Biểu tượng của sự tự do và quyến rũ"
      },
      {
        name: "MON PARIS",
        image: "https://i.pinimg.com/736x/6f/65/53/6f65530d61084c7eae5d400554fe0f21.jpg",
        description: "Tình yêu lãng mạn của Paris"
      }
    ],
    story: {
      title: "NGHỆ THUẬT CỦA TỰ DO",
      description: "YSL Beauty - nơi nghệ thuật gặp gỡ sự táo bạo, nơi phong cách là một tuyên ngôn của sự tự do.",
      image: "https://i.pinimg.com/736x/b2/eb/88/b2eb880e24d7f45d5e81b5878798ca0c.jpg"
    }
  },
  "Carolina Herrera": {
    banner: "https://i.pinimg.com/736x/76/ba/c5/76bac51f2c7a622f058721c78d685d82.jpg",
    featured: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    collections: [
      {
        name: "GOOD GIRL",
        image: "https://i.pinimg.com/736x/9f/bb/23/9fbb239e8c7981b6069af64c9913b027.jpg",
        description: "Sự tương phản hoàn hảo giữa sáng và tối"
      },
      {
        name: "VERY GOOD GIRL",
        image: "https://i.pinimg.com/736x/b4/fa/46/b4fa4669166f0b584d38a2a92a42f876.jpg",
        description: "Phiên bản táo bạo hơn của một biểu tượng"
      },
      {
        name: "BAD BOY",
        image: "https://i.pinimg.com/736x/db/d3/f7/dbd3f782e30e5eaaf92e8cd3517acdbf.jpg",
        description: "Mùi hương nam tính đầy bí ẩn"
      }
    ],
    story: {
      title: "HƯƠNG THƠM CỦA SỰ TỰ TIN",
      description: "Carolina Herrera - Nơi sự thanh lịch gặp gỡ sự hiện đại, tạo nên những mùi hương độc đáo và đầy cá tính.",
      image: "https://i.pinimg.com/736x/28/be/4b/28be4b5875f979cce16c46c45cccb354.jpg"
    }
  },
  "Lancôme": {
    banner: "https://i.pinimg.com/736x/a0/a0/ee/a0a0ee7db4cbcc9cfdc8150f3f579b80.jpg",
    featured: "https://images.unsplash.com/photo-1527086983597-b04da9777c4e",
    collections: [
      {
        name: "LA VIE EST BELLE",
        image: "https://i.pinimg.com/736x/10/d1/b6/10d1b64d942bfc7b93615f7f2abd392c.jpg",
        description: "Hạnh phúc trong từng khoảnh khắc"
      },
      {
        name: "IDÔLE",
        image: "https://i.pinimg.com/736x/27/76/42/277642a79273f4a57f775510ba14209e.jpg",
        description: "Dành cho thế hệ dẫn đầu"
      },
      {
        name: "TRÉSOR",
        image: "https://i.pinimg.com/736x/2c/80/94/2c80941720a681f1192bd26fb30c9625.jpg",
        description: "Báu vật của tình yêu vĩnh cửu"
      }
    ],
    story: {
      title: "VẺ ĐẸP PHÁP",
      description: "Lancôme - Thương hiệu mỹ phẩm cao cấp với hơn 85 năm kinh nghiệm trong việc tạo ra những mùi hương độc đáo.",
      image: "https://i.pinimg.com/736x/75/19/6d/75196d670b41484f17a5a955c4f71f6a.jpg"
    }
  },
  "Dolce & Gabbana": {
    banner: "https://i.pinimg.com/736x/86/30/ab/8630ab164347ce1c282e9ab8b5b63e9e.jpg",
    featured: "https://i.pinimg.com/736x/3f/c0/62/3fc062f1f460d159468fc9f4e4991e4c.jpg",
    collections: [
      {
        name: "LIGHT BLUE",
        image: "https://i.pinimg.com/736x/99/30/b0/9930b092a11bd7817de09369edc9db28.jpg",
        description: "Hương thơm của mùa hè Địa Trung Hải"
      },
      {
        name: "THE ONE",
        image: "https://i.pinimg.com/736x/e6/6f/9d/e66f9d994c871162d9c13f463bcc0c8d.jpg",
        description: "Biểu tượng của sự quyến rũ"
      },
      {
        name: "K BY D&G",
        image: "https://i.pinimg.com/736x/95/4e/49/954e4933ece128393f319c15a7588b04.jpg",
        description: "Dành cho vị vua hiện đại"
      }
    ],
    story: {
      title: "TINH THẦN Ý",
      description: "Dolce & Gabbana - Nơi văn hóa Ý và sự sang trọng hòa quyện, tạo nên những mùi hương đặc trưng của vùng Địa Trung Hải.",
      image: "https://i.pinimg.com/736x/b8/ae/23/b8ae23ef231d9084d64a3b43b1a446f3.jpg"
    }
  },
  "Gucci": {
    banner: "https://i.pinimg.com/736x/d5/b1/6a/d5b16a01b97e23b0e3f0f06c2c147a98.jpg",
    featured: "https://i.pinimg.com/736x/8c/e4/7d/8ce47d0144e0d73f78f05dd21dab7e10.jpg",
    collections: [
      {
        name: "GUCCI BLOOM",
        image: "https://i.pinimg.com/736x/1c/8a/e9/1c8ae9f8e9d4b9f9c9f9c9f9c9f9c9f9.jpg",
        description: "Vườn hoa trắng tinh khôi"
      },
      {
        name: "GUILTY",
        image: "https://i.pinimg.com/736x/2c/8a/e9/2c8ae9f8e9d4b9f9c9f9c9f9c9f9c9f9.jpg",
        description: "Hương thơm của sự tự do và đam mê"
      },
      {
        name: "FLORA",
        image: "https://i.pinimg.com/736x/3c/8a/e9/3c8ae9f8e9d4b9f9c9f9c9f9c9f9c9f9.jpg",
        description: "Sự nữ tính và thanh lịch"
      }
    ],
    story: {
      title: "DI SẢN GUCCI",
      description: "Gucci - Thương hiệu xa xỉ của Ý với lịch sử gần 100 năm, nơi sự sang trọng và đổi mới hòa quyện tạo nên những mùi hương độc đáo.",
      image: "https://i.pinimg.com/736x/4c/8a/e9/4c8ae9f8e9d4b9f9c9f9c9f9c9f9c9f9.jpg"
    }
  },
  "Tom Ford": {
    banner: "https://i.pinimg.com/736x/e5/b1/6a/e5b16a01b97e23b0e3f0f06c2c147a98.jpg",
    featured: "https://i.pinimg.com/736x/9c/e4/7d/9ce47d0144e0d73f78f05dd21dab7e10.jpg",
    collections: [
      {
        name: "BLACK ORCHID",
        image: "https://i.pinimg.com/736x/5c/8a/e9/5c8ae9f8e9d4b9f9c9f9c9f9c9f9c9f9.jpg",
        description: "Hương thơm sang trọng và bí ẩn"
      },
      {
        name: "TOBACCO VANILLE",
        image: "https://i.pinimg.com/736x/6c/8a/e9/6c8ae9f8e9d4b9f9c9f9c9f9c9f9c9f9.jpg",
        description: "Sự ấm áp của thuốc lá và vanilla"
      },
      {
        name: "LOST CHERRY",
        image: "https://i.pinimg.com/736x/7c/8a/e9/7c8ae9f8e9d4b9f9c9f9c9f9c9f9c9f9.jpg",
        description: "Hương thơm ngọt ngào và gợi cảm"
      }
    ],
    story: {
      title: "NGHỆ THUẬT CỦA SỰ SANG TRỌNG",
      description: "Tom Ford - Thương hiệu nước hoa cao cấp với những mùi hương độc đáo và táo bạo, định nghĩa lại sự sang trọng hiện đại.",
      image: "https://i.pinimg.com/736x/8c/8a/e9/8c8ae9f8e9d4b9f9c9f9c9f9c9f9c9f9.jpg"
    }
  },
  "Jo Malone": {
    banner: "https://i.pinimg.com/736x/f5/b1/6a/f5b16a01b97e23b0e3f0f06c2c147a98.jpg",
    featured: "https://i.pinimg.com/736x/ac/e4/7d/ace47d0144e0d73f78f05dd21dab7e10.jpg",
    collections: [
      {
        name: "ENGLISH PEAR & FREESIA",
        image: "https://i.pinimg.com/736x/9c/8a/e9/9c8ae9f8e9d4b9f9c9f9c9f9c9f9c9f9.jpg",
        description: "Hương thơm tinh tế của lê và hoa phong lữ"
      },
      {
        name: "WOOD SAGE & SEA SALT",
        image: "https://i.pinimg.com/736x/ac/8a/e9/ac8ae9f8e9d4b9f9c9f9c9f9c9f9c9f9.jpg",
        description: "Hương thơm của biển và cây xô thơm"
      },
      {
        name: "PEONY & BLUSH SUEDE",
        image: "https://i.pinimg.com/736x/bc/8a/e9/bc8ae9f8e9d4b9f9c9f9c9f9c9f9c9f9.jpg",
        description: "Sự kết hợp của hoa mẫu đơn và da lộn"
      }
    ],
    story: {
      title: "NGHỆ THUẬT PHA TRỘN HƯƠNG THƠM",
      description: "Jo Malone London - Thương hiệu nước hoa Anh Quốc nổi tiếng với nghệ thuật pha trộn hương thơm độc đáo và tinh tế.",
      image: "https://i.pinimg.com/736x/cc/8a/e9/cc8ae9f8e9d4b9f9c9f9c9f9c9f9c9f9.jpg"
    }
  }
};

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Chanel N°5",
    brand: "Chanel",
    category: "Nước Hoa Nữ",
    price: 3450000,
    description: "Chanel N°5 là một trong những loại nước hoa nổi tiếng nhất thế giới, được tạo ra bởi Ernest Beaux vào năm 1921. Hương thơm hoa cỏ sang trọng với sự kết hợp tinh tế của hoa nhài, hoa hồng và vanilla.",
    details: [
      "Nhóm hương: Hoa cỏ - Aldehyde",
      "Độ lưu hương: 7-12 giờ",
      "Độ tỏa hương: Xa - Trong vòng 2m",
      "Thời điểm khuyên dùng: Ngày, Đêm, Thu, Đông"
    ],
    ingredients: "Aldehydes, May Rose, Jasmine, Iris, Vetiver",
    images: [
      "https://i.pinimg.com/736x/55/08/1e/55081e2b49a6af596a133c7e6b1086be.jpg",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f"
    ]
  },
  {
    id: 2,
    name: "Coco Mademoiselle",
    brand: "Chanel",
    category: "Nước Hoa Nữ",
    price: 3250000,
    description: "Coco Mademoiselle là một hương thơm hiện đại và quyến rũ, kết hợp giữa sự tươi mát của cam quýt và sự ấm áp của xạ hương.",
    details: [
      "Nhóm hương: Hoa cỏ Phương Đông",
      "Độ lưu hương: 6-8 giờ",
      "Độ tỏa hương: Gần - Trong vòng 1m",
      "Thời điểm khuyên dùng: Ngày, Xuân, Hè"
    ],
    ingredients: "Orange, Bergamot, Jasmine, Rose, Patchouli, White Musk",
    images: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f",
      "https://images.unsplash.com/photo-1563170352-ba3186d42c8b",
      "https://images.unsplash.com/photo-1595425970377-c9703cf48b6f"
    ]
  },
  {
    id: 3,
    name: "J'adore",
    brand: "Dior",
    category: "Nước Hoa Nữ",
    price: 2950000,
    description: "J'adore là một hương thơm hoa cỏ sang trọng, tinh tế và quyến rũ. Sự pha trộn độc đáo của hoa nhài Grasse, hoa hồng Damascus, và hoa cam tạo nên một mùi hương đầy nữ tính và cuốn hút.",
    details: [
      "Nhóm hương: Hoa cỏ",
      "Độ lưu hương: 8-12 giờ",
      "Độ tỏa hương: Gần - Trong vòng 1m",
      "Thời điểm khuyên dùng: Ngày, Đêm, Thu, Đông"
    ],
    ingredients: "Ylang-ylang, Damascus Rose, Jasmine, Orange Blossom",
    images: [
      "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc",
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4",
      "https://images.unsplash.com/photo-1557170334-a9632e77c6e4"
    ]
  },
  {
    id: 4,
    name: "Miss Dior",
    brand: "Dior",
    category: "Nước Hoa Nữ",
    price: 2850000,
    description: "Miss Dior là một hương thơm tinh tế và nữ tính, kết hợp giữa sự tươi mát của cam quýt và sự ngọt ngào của vanilla.",
    details: [
      "Nhóm hương: Hoa cỏ - Gỗ",
      "Độ lưu hương: 6-8 giờ",
      "Độ tỏa hương: Trung bình",
      "Thời điểm khuyên dùng: Ngày, Đêm, Xuân, Hè"
    ],
    ingredients: "Calabrian Bergamot, Grasse Rose, Rosewood, Patchouli",
    images: [
      "https://images.unsplash.com/photo-1590736704728-f4730bb30770",
      "https://images.unsplash.com/photo-1590736704729-f4730bb30771",
      "https://images.unsplash.com/photo-1590736704730-f4730bb30772"
    ]
  },
  {
    id: 5,
    name: "Black Opium",
    brand: "Yves Saint Laurent",
    category: "Nước Hoa Nữ",
    price: 2750000,
    description: "Black Opium là một mùi hương gây nghiện với sự kết hợp độc đáo giữa cà phê đen và vanilla ngọt ngào.",
    details: [
      "Nhóm hương: Phương Đông - Vanilla",
      "Độ lưu hương: 8-10 giờ",
      "Độ tỏa hương: Xa - Trong vòng 2m",
      "Thời điểm khuyên dùng: Đêm, Thu, Đông"
    ],
    ingredients: "Black Coffee, White Flowers, Vanilla, Cedar, Patchouli",
    images: [
      "https://images.unsplash.com/photo-1512777576244-b846ac3d816f",
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15",
      "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab"
    ]
  },
  {
    id: 6,
    name: "Good Girl",
    brand: "Carolina Herrera",
    category: "Nước Hoa Nữ",
    price: 2650000,
    description: "Good Girl là sự tương phản quyến rũ giữa hoa nhài sáng sủa và hạt ca cao đậm đà, tạo nên một mùi hương đầy bí ẩn và gợi cảm.",
    details: [
      "Nhóm hương: Hoa cỏ Phương Đông",
      "Độ lưu hương: 7-9 giờ",
      "Độ tỏa hương: Trung bình - Trong vòng 1.5m",
      "Thời điểm khuyên dùng: Đêm, Thu, Đông"
    ],
    ingredients: "Jasmine Sambac, Tuberose, Tonka Bean, Cocoa, Almond",
    images: [
      "https://i.pinimg.com/736x/42/c9/5f/42c95facca4840ca13c313c94a47705c.jpg",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
      "https://images.unsplash.com/photo-1527633412983-d80af308e660"
    ]
  },
  {
    id: 7,
    name: "La Vie Est Belle",
    brand: "Lancôme",
    category: "Nước Hoa Nữ",
    price: 2550000,
    description: "La Vie Est Belle là một bản hòa ca của niềm hạnh phúc và vẻ đẹp tự nhiên, với hương thơm ngọt ngào của hoa diên vĩ và vanilla.",
    details: [
      "Nhóm hương: Hoa cỏ - Trái cây",
      "Độ lưu hương: 6-8 giờ",
      "Độ tỏa hương: Gần - Trong vòng 1m",
      "Thời điểm khuyên dùng: Ngày, Xuân, Thu"
    ],
    ingredients: "Iris, Patchouli, Praline, Vanilla, Jasmine Sambac",
    images: [
      "https://i.pinimg.com/736x/c1/9a/48/c19a4853a92c4e613fd5f62abd5c5db3.jpg",
      "https://images.unsplash.com/photo-1527086983597-b04da9777c4e",
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15"
    ]
  },
  {
    id: 8,
    name: "Light Blue",
    brand: "Dolce & Gabbana",
    category: "Nước Hoa Nữ",
    price: 2450000,
    description: "Light Blue gợi nhớ đến một ngày hè Địa Trung Hải với hương thơm tươi mát của chanh Sicily và táo xanh Granny Smith.",
    details: [
      "Nhóm hương: Hoa cỏ - Trái cây",
      "Độ lưu hương: 4-6 giờ",
      "Độ tỏa hương: Gần - Trong vòng 1m",
      "Thời điểm khuyên dùng: Ngày, Xuân, Hè"
    ],
    ingredients: "Sicilian Lemon, Granny Smith Apple, Bamboo, Cedar",
    images: [
      "https://images.unsplash.com/photo-1527633412983-d80af308e660",
      "https://images.unsplash.com/photo-1527631746610-bca00a040d60",
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937"
    ]
  },
  {
    id: 15,
    name: "Gucci Bloom",
    brand: "Gucci",
    category: "Nước Hoa Nữ",
    price: 2850000,
    description: "Gucci Bloom là một hương thơm floral được ra mắt vào năm 2017. Mùi hương được lấy cảm hứng từ khu vườn đầy hoa với sự kết hợp của hoa nhài Sambac, hoa huệ và rễ cây diên vĩ.",
    details: [
      "Nhóm hương: Hương hoa cỏ",
      "Độ lưu hương: 7-12 giờ",
      "Độ tỏa hương: Gần - Trong vòng 1m",
      "Thời điểm khuyên dùng: Ngày, Xuân, Thu"
    ],
    ingredients: "Hoa nhài Sambac, Hoa huệ trắng, Rễ cây diên vĩ",
    images: [
      "https://i.pinimg.com/736x/1c/8a/e9/1c8ae9f8e9d4b9f9c9f9c9f9c9f9c9f9.jpg",
      "https://i.pinimg.com/736x/2c/8a/e9/2c8ae9f8e9d4b9f9c9f9c9f9c9f9c9f9.jpg"
    ]
  },
  {
    id: 16,
    name: "Black Orchid",
    brand: "Tom Ford",
    category: "Nước Hoa Unisex",
    price: 3950000,
    description: "Black Orchid là một hương thơm Oriental Floral được ra mắt vào năm 2006. Đây là một mùi hương sang trọng và bí ẩn với sự kết hợp của hoa lan đen, gia vị và chocolate đen.",
    details: [
      "Nhóm hương: Oriental Floral",
      "Độ lưu hương: Trên 12 giờ",
      "Độ tỏa hương: Xa - Trong vòng 2m",
      "Thời điểm khuyên dùng: Đêm, Thu, Đông"
    ],
    ingredients: "Hoa lan đen, Gia vị, Chocolate đen, Hoắc hương, Nhục đậu khấu",
    images: [
      "https://i.pinimg.com/736x/5c/8a/e9/5c8ae9f8e9d4b9f9c9f9c9f9c9f9c9f9.jpg",
      "https://i.pinimg.com/736x/6c/8a/e9/6c8ae9f8e9d4b9f9c9f9c9f9c9f9c9f9.jpg"
    ]
  },
  {
    id: 17,
    name: "English Pear & Freesia",
    brand: "Jo Malone",
    category: "Nước Hoa Unisex",
    price: 2950000,
    description: "English Pear & Freesia là một hương thơm Floral Fruity được ra mắt vào năm 2010. Mùi hương tươi mát và tinh tế với sự kết hợp của lê chín mọng, hoa phong lữ trắng và hoắc hương.",
    details: [
      "Nhóm hương: Floral Fruity",
      "Độ lưu hương: 4-6 giờ",
      "Độ tỏa hương: Gần - Trong vòng 1m",
      "Thời điểm khuyên dùng: Ngày, Xuân, Thu"
    ],
    ingredients: "Lê chín, Hoa phong lữ trắng, Hoắc hương, Hổ phách",
    images: [
      "https://i.pinimg.com/736x/9c/8a/e9/9c8ae9f8e9d4b9f9c9f9c9f9c9f9c9f9.jpg",
      "https://i.pinimg.com/736x/ac/8a/e9/ac8ae9f8e9d4b9f9c9f9c9f9c9f9c9f9.jpg"
    ]
  }
]; 