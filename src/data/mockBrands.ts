export interface IBrand {
  id: number;
  name: string;
  image: string;
  description: string;
  productCount: number;
}

export const mockBrands: IBrand[] = [
  {
    id: 1,
    name: 'Chanel',
    image: 'https://i.pinimg.com/736x/72/36/0e/72360ec43a3bb6a73fab60dbdaa95001.jpg',
    description: 'Biểu tượng của sự sang trọng và đẳng cấp trong thế giới nước hoa',
    productCount: 12
  },
  {
    id: 2,
    name: 'Dior',
    image: 'https://i.pinimg.com/736x/c2/0a/75/c20a754fb03962252ce94d6fa7e78be1.jpg',
    description: 'Những mùi hương độc đáo và quyến rũ từ nhà mốt lừng danh',
    productCount: 15
  },
  {
    id: 3,
    name: 'Gucci',
    image: 'https://i.pinimg.com/736x/90/df/df/90dfdf3b288b0ca381adc89613d04882.jpg',
    description: 'Sự kết hợp hoàn hảo giữa phong cách hiện đại và cổ điển',
    productCount: 10
  },
  {
    id: 4,
    name: 'Yves Saint Laurent',
    image: 'https://i.pinimg.com/736x/72/05/f5/7205f5648a3ecda9cc325a83442180cc.jpg',
    description: 'Nước hoa mang đậm dấu ấn của sự quyến rũ và sang trọng',
    productCount: 8
  },
  {
    id: 5,
    name: 'Tom Ford',
    image: 'https://i.pinimg.com/736x/3c/9f/51/3c9f51ae9aa0daa34a01e3373b3a6971.jpg',
    description: 'Những mùi hương đẳng cấp và độc đáo cho người yêu nước hoa',
    productCount: 14
  },
  {
    id: 6,
    name: 'Jo Malone',
    image: 'https://i.pinimg.com/736x/01/fd/8d/01fd8dc733176214a6bed4b9605f2aa2.jpg',
    description: 'Nghệ thuật pha trộn hương thơm tinh tế và sang trọng',
    productCount: 9
  }
]; 