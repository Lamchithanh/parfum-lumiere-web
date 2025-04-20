export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: {
    name: string;
    avatar: string;
    bio?: string;
  };
  category: string;
  tags: string[];
  date: string;
  readTime: number;
  likes?: number;
  comments?: { id: number; content: string; }[];
  images?: string[];
}

export const mockBlogs: BlogPost[] = [
  {
    id: 1,
    title: "Xu hướng nước hoa 2024: Sự trở lại của hương gỗ tự nhiên",
    slug: "xu-huong-nuoc-hoa-2024",
    excerpt: "Khám phá những xu hướng nước hoa mới nhất trong năm 2024, với sự lên ngôi của các note hương gỗ tự nhiên...",
    content: `
      Năm 2024 chứng kiến sự trở lại mạnh mẽ của các mùi hương gỗ tự nhiên trong ngành công nghiệp nước hoa. Xu hướng này phản ánh mong muốn của người tiêu dùng về sự gần gũi với thiên nhiên và tính bền vững trong sản phẩm.

      ## Sự trỗi dậy của hương gỗ
      
      Các note hương như gỗ đàn hương, gỗ tuyết tùng và gỗ đàn hương Mysore đang dần chiếm lĩnh thị trường nước hoa cao cấp. Những hương thơm này mang đến cảm giác ấm áp, sang trọng và bền lâu.

      ## Kết hợp độc đáo
      
      Các nhà sáng tạo hương thơm đang thử nghiệm những sự kết hợp mới lạ giữa hương gỗ với các note hương khác:
      - Gỗ đàn hương + Hoa hồng Bulgaria
      - Gỗ tuyết tùng + Quả mọng rừng
      - Gỗ trầm hương + Vanilla Madagascar

      ## Xu hướng bền vững
      
      Người tiêu dùng ngày càng quan tâm đến nguồn gốc và tính bền vững của nguyên liệu. Các thương hiệu nước hoa đang chuyển hướng sang sử dụng nguyên liệu tự nhiên và có chứng nhận bền vững.
    `,
    image: "https://images.pexels.com/photos/3059609/pexels-photo-3059609.jpeg",
    author: {
      name: "Hương Giang",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    category: "Xu hướng",
    tags: ["xu hướng", "nước hoa 2024", "hương gỗ", "bền vững"],
    date: "15/03/2024",
    readTime: 5
  },
  {
    id: 2,
    title: "Cách chọn nước hoa phù hợp với từng mùa trong năm",
    slug: "cach-chon-nuoc-hoa-theo-mua",
    excerpt: "Hướng dẫn chi tiết cách lựa chọn nước hoa phù hợp với thời tiết và không khí của từng mùa trong năm...",
    content: `Việc chọn nước hoa phù hợp với từng mùa không chỉ giúp tối ưu hóa mùi hương mà còn thể hiện sự tinh tế trong phong cách cá nhân.

# Mùa Xuân

Mùa xuân là thời điểm thích hợp cho các mùi hương:

![Nước hoa mùa xuân](https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg)

- Hoa cỏ nhẹ nhàng
- Citrus tươi mát
- Hương trái cây thanh nhã

Một số gợi ý cho mùa xuân:
1. Jo Malone Wild Bluebell
2. Chanel Chance Eau Fraîche
3. Marc Jacobs Daisy

# Mùa Hè

![Nước hoa mùa hè](https://images.pexels.com/photos/4041393/pexels-photo-4041393.jpeg)

Những ngày nắng nóng nên chọn:
- Hương biển mát mẻ
- Cam quýt sảng khoái
- Hương thảo mộc nhẹ nhàng

# Mùa Thu

![Nước hoa mùa thu](https://images.pexels.com/photos/4041394/pexels-photo-4041394.jpeg)

Không khí se lạnh phù hợp với:
- Hương gỗ ấm áp
- Vanilla ngọt ngào
- Hương da thuộc sang trọng

# Mùa Đông

![Nước hoa mùa đông](https://images.pexels.com/photos/4041395/pexels-photo-4041395.jpeg)

Thời tiết lạnh cần những mùi hương:
- Hổ phách đậm đà
- Xạ hương nồng ấm
- Hương gia vị ấm áp

# Lời khuyên khi chọn nước hoa theo mùa

![Tips chọn nước hoa](https://images.pexels.com/photos/4041396/pexels-photo-4041396.jpeg)

1. Luôn test nước hoa trên da trước khi mua
2. Chú ý đến độ bám toả của mùi hương
3. Cân nhắc thời điểm sử dụng trong ngày
4. Kết hợp với phong cách trang phục

# Cách bảo quản nước hoa

![Bảo quản nước hoa](https://images.pexels.com/photos/4041397/pexels-photo-4041397.jpeg)

- Tránh ánh nắng trực tiếp
- Bảo quản ở nhiệt độ phòng
- Đậy nắp kín sau khi sử dụng
- Tránh nơi ẩm ướt`,
    image: "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg",
    author: {
      name: "Minh Anh",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      bio: "Chuyên gia nước hoa với hơn 10 năm kinh nghiệm. Người sáng lập cộng đồng Perfume Lovers Vietnam."
    },
    category: "Hướng dẫn",
    tags: ["hướng dẫn", "nước hoa theo mùa", "lựa chọn nước hoa", "mẹo hay"],
    date: "10/03/2024",
    readTime: 7,
    likes: 128,
    comments: [
      { id: 1, content: "Bài viết rất hữu ích!" },
      { id: 2, content: "Cảm ơn tác giả đã chia sẻ" }
    ],
    images: [
      "/images/spring-perfumes.jpg",
      "/images/summer-perfumes.jpg",
      "/images/autumn-perfumes.jpg",
      "/images/winter-perfumes.jpg",
      "/images/perfume-tips.jpg",
      "/images/perfume-storage.jpg"
    ]
  },
  {
    id: 3,
    title: "Top 5 nước hoa được yêu thích nhất mùa xuân 2024",
    slug: "top-5-nuoc-hoa-mua-xuan-2024",
    excerpt: "Điểm qua những mùi hương đang được ưa chuộng nhất trong mùa xuân năm nay...",
    content: `
      Mùa xuân 2024 chứng kiến sự lên ngôi của những mùi hương độc đáo và tinh tế. Hãy cùng điểm qua 5 chai nước hoa được yêu thích nhất.

      ## 1. Chanel N°5 L'Eau
      
      Phiên bản mới của huyền thoại với:
      - Hương đầu: Quýt và Cam Bergamot
      - Hương giữa: Hoa hồng May và Hoa nhài
      - Hương cuối: Gỗ tuyết tùng trắng

      ## 2. Dior J'adore Parfum d'eau
      
      Sự kết hợp hoàn hảo của:
      - Hoa nhài Sambac
      - Hoa cam Neroli
      - Hương muối biển

      ## 3. Gucci Flora Gorgeous Gardenia
      
      Mùi hương ngọt ngào với:
      - Hoa dành dành trắng
      - Hoa nhài
      - Quả lê đỏ

      ## 4. YSL Libre Le Parfum
      
      Hương thơm quyến rũ của:
      - Hoa oải hương
      - Hoa cam
      - Vanilla Madagascar

      ## 5. Hermès Un Jardin sur la Lagune
      
      Không gian vườn hoa với:
      - Hoa mộc lan
      - Hoa nhài Madonna
      - Gỗ đàn hương
    `,
    image: "https://images.pexels.com/photos/965990/pexels-photo-965990.jpeg",
    author: {
      name: "Thanh Trúc",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg"
    },
    category: "Đánh giá",
    tags: ["top 5", "nước hoa mùa xuân", "2024", "đánh giá"],
    date: "05/03/2024",
    readTime: 6
  }
];

export const getRelatedPosts = (currentPost: BlogPost, limit: number = 3): BlogPost[] => {
  return mockBlogs
    .filter(post => post.id !== currentPost.id)
    .filter(post => 
      post.category === currentPost.category ||
      post.tags.some(tag => currentPost.tags.includes(tag))
    )
    .slice(0, limit);
}; 