export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: 'news' | 'inspiration' | 'guide' | 'story';
  author: {
    name: string;
    avatar: string;
  };
  publishDate: string;
  readTime: number;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Khám phá bí mật đằng sau những chai nước hoa xa xỉ',
    slug: 'kham-pha-bi-mat-dang-sau-nhung-chai-nuoc-hoa-xa-xi',
    excerpt: 'Hành trình tìm hiểu về quy trình sáng tạo và sản xuất những chai nước hoa cao cấp từ các thương hiệu nổi tiếng thế giới.',
    content: `Nước hoa xa xỉ không chỉ đơn thuần là một sản phẩm làm đẹp, mà còn là tác phẩm nghệ thuật kết tinh từ tài năng, đam mê và sự tỉ mỉ của các nghệ nhân chế tác nước hoa hàng đầu thế giới.

Từ việc lựa chọn nguyên liệu đến quá trình chưng cất, pha chế, mỗi bước đều được thực hiện với sự cẩn trọng và tâm huyết tuyệt đối. Các loại hoa, tinh dầu quý hiếm được thu hoạch từ những vùng đất có điều kiện khí hậu và thổ nhưỡng đặc biệt.

Không chỉ vậy, thiết kế chai nước hoa cũng là một công đoạn đòi hỏi sự sáng tạo và kỹ thuật cao. Mỗi chai nước hoa đều mang trong mình một câu chuyện riêng, từ hình dáng, màu sắc đến chất liệu đều được chọn lọc kỹ càng để truyền tải thông điệp và giá trị của thương hiệu.`,
    image: '/images/products/chanel-n5.jpg',
    category: 'story',
    author: {
      name: 'Hương Giang',
      avatar: '/images/avatars/author-1.jpg'
    },
    publishDate: '2024-03-15',
    readTime: 5,
    tags: ['luxury', 'perfume', 'craftsmanship', 'design']
  },
  {
    id: '2',
    title: 'Xu hướng nước hoa 2024: Sự trở lại của hương gỗ và vanilla',
    slug: 'xu-huong-nuoc-hoa-2024',
    excerpt: 'Khám phá những xu hướng nước hoa mới nhất trong năm 2024, với sự lên ngôi của các note hương gỗ ấm áp và vanilla ngọt ngào.',
    content: `Năm 2024 chứng kiến sự trở lại mạnh mẽ của các mùi hương cổ điển được tái hiện dưới góc nhìn hiện đại. Đặc biệt, các note hương gỗ và vanilla đang dẫn đầu xu hướng với sự kết hợp độc đáo và tinh tế.

Các thương hiệu nước hoa lớn đều cho ra mắt những dòng sản phẩm mới với note hương chủ đạo là gỗ đàn hương, gỗ tuyết tùng kết hợp cùng vanilla ngọt ngào. Sự kết hợp này tạo nên một mùi hương ấm áp, sang trọng nhưng không kém phần hiện đại.

Xu hướng này phản ánh nhu cầu của người tiêu dùng về những mùi hương mang tính an ủi, trấn an trong thời đại số hóa và nhịp sống nhanh hiện nay.`,
    image: '/images/products/dior-sauvage.jpg',
    category: 'news',
    author: {
      name: 'Minh Anh',
      avatar: '/images/avatars/author-2.jpg'
    },
    publishDate: '2024-03-10',
    readTime: 4,
    tags: ['trends', '2024', 'woody', 'vanilla']
  },
  {
    id: '3',
    title: 'Cách chọn nước hoa phù hợp với từng mùa trong năm',
    slug: 'cach-chon-nuoc-hoa-phu-hop-voi-tung-mua',
    excerpt: 'Hướng dẫn chi tiết cách lựa chọn nước hoa phù hợp với thời tiết và không khí của từng mùa trong năm.',
    content: `Việc chọn nước hoa phù hợp với từng mùa không chỉ giúp tối ưu hóa trải nghiệm mùi hương mà còn thể hiện sự tinh tế trong phong cách cá nhân.

Mùa xuân: Lựa chọn các mùi hương tươi mát, hoa cỏ nhẹ nhàng như hoa nhài, hoa hồng, cam bergamot.

Mùa hè: Ưu tiên các mùi hương citrus sảng khoái, biển mát như chanh, bưởi, hương biển.

Mùa thu: Thích hợp với các mùi hương ấm áp, gỗ nhẹ như gỗ đàn hương, hổ phách, vani.

Mùa đông: Phù hợp với các mùi hương nồng ấm, đậm đà như gỗ trầm, xạ hương, caramel.`,
    image: '/images/products/ysl-libre.jpg',
    category: 'guide',
    author: {
      name: 'Thu Hà',
      avatar: '/images/avatars/author-3.jpg'
    },
    publishDate: '2024-03-05',
    readTime: 6,
    tags: ['guide', 'seasons', 'tips']
  },
  {
    id: '4',
    title: 'Nghệ thuật của mùi hương trong văn hóa các nước',
    slug: 'nghe-thuat-cua-mui-huong-trong-van-hoa-cac-nuoc',
    excerpt: 'Khám phá vai trò và ý nghĩa của mùi hương trong văn hóa và đời sống tinh thần của các nền văn hóa khác nhau.',
    content: `Mùi hương từ lâu đã đóng vai trò quan trọng trong văn hóa và tâm linh của nhiều quốc gia. Từ việc sử dụng trong các nghi lễ tôn giáo đến đời sống hàng ngày, mỗi nền văn hóa đều có cách tiếp cận riêng với nghệ thuật của mùi hương.

Ở phương Đông, mùi hương được xem như một phương tiện kết nối giữa con người với thiên nhiên và tâm linh. Trầm hương, nhang thơm không chỉ là vật phẩm dâng cúng mà còn là cách để thanh lọc tâm hồn và không gian sống.

Trong khi đó, phương Tây lại có truyền thống sử dụng nước hoa như một biểu tượng của địa vị xã hội và cá tính. Từ triều đình Pháp thế kỷ 17 đến những thương hiệu xa xỉ hiện đại, nước hoa luôn là một phần không thể thiếu trong văn hóa thẩm mỹ phương Tây.`,
    image: '/images/products/gucci-bloom.jpg',
    category: 'inspiration',
    author: {
      name: 'Đức Anh',
      avatar: '/images/avatars/author-4.jpg'
    },
    publishDate: '2024-03-01',
    readTime: 7,
    tags: ['culture', 'history', 'fragrance']
  },
  {
    id: '5',
    title: 'Top 5 nước hoa được yêu thích nhất mùa xuân 2024',
    slug: 'top-5-nuoc-hoa-duoc-yeu-thich-nhat-mua-xuan-2024',
    excerpt: 'Điểm danh những chai nước hoa đang được săn đón nhiều nhất trong mùa xuân năm nay.',
    content: `Mùa xuân 2024 chứng kiến sự lên ngôi của những mùi hương tươi mới, phóng khoáng nhưng không kém phần tinh tế. Dưới đây là top 5 nước hoa được yêu thích nhất:

1. Chanel Chance Eau Fraîche: Mùi hương tươi mát với note hương citrus và xạ hương.

2. Dior J'adore In Joy: Sự kết hợp độc đáo giữa hoa nhài và muối biển.

3. Gucci Flora Gorgeous Gardenia: Hương hoa gardenia ngọt ngào quyến rũ.

4. YSL Libre: Lavender và cam bergamot tạo nên mùi hương tự do, phóng khoáng.

5. Jo Malone Wild Bluebell: Mùi hương trong trẻo của những cánh đồng hoa chuông xanh.`,
    image: '/images/products/chance.jpg',
    category: 'news',
    author: {
      name: 'Thanh Mai',
      avatar: '/images/avatars/author-5.jpg'
    },
    publishDate: '2024-02-28',
    readTime: 5,
    tags: ['top-list', 'spring', '2024']
  }
];

export const categories = [
  {
    id: 'news',
    name: 'Tin tức',
    description: 'Cập nhật những tin tức mới nhất về thế giới nước hoa'
  },
  {
    id: 'inspiration',
    name: 'Cảm hứng',
    description: 'Những câu chuyện thú vị và cảm hứng về mùi hương'
  },
  {
    id: 'guide',
    name: 'Hướng dẫn',
    description: 'Các tips và hướng dẫn về cách chọn và sử dụng nước hoa'
  },
  {
    id: 'story',
    name: 'Câu chuyện',
    description: 'Những câu chuyện đặc biệt về nước hoa và nghệ thuật mùi hương'
  }
]; 