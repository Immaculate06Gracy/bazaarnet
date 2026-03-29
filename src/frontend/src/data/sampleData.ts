export interface Product {
  id: string;
  name: string;
  category: string;
  pricePerKg: number;
  stock: number;
  wholesalerName: string;
  wholesalerContact: string;
  wholesalerId: string;
  image: string;
}

export const sampleProducts: Product[] = [
  // Spices
  {
    id: "p1",
    name: "Turmeric",
    category: "Spices",
    pricePerKg: 120,
    stock: 500,
    wholesalerName: "Sundar Wholesale Co.",
    wholesalerContact: "9876500000",
    wholesalerId: "w1",
    image: "https://placehold.co/300x200/0A3D91/white?text=Turmeric",
  },
  {
    id: "p2",
    name: "Pepper",
    category: "Spices",
    pricePerKg: 450,
    stock: 200,
    wholesalerName: "Sundar Wholesale Co.",
    wholesalerContact: "9876500000",
    wholesalerId: "w1",
    image: "https://placehold.co/300x200/1a4fa8/white?text=Pepper",
  },
  {
    id: "p3",
    name: "Chili Powder",
    category: "Spices",
    pricePerKg: 180,
    stock: 350,
    wholesalerName: "Sundar Wholesale Co.",
    wholesalerContact: "9876500000",
    wholesalerId: "w1",
    image: "https://placehold.co/300x200/0A3D91/white?text=Chili+Powder",
  },
  // Vegetables
  {
    id: "p4",
    name: "Tomato",
    category: "Vegetables",
    pricePerKg: 40,
    stock: 1000,
    wholesalerName: "Sundar Wholesale Co.",
    wholesalerContact: "9876500000",
    wholesalerId: "w1",
    image: "https://placehold.co/300x200/1a4fa8/white?text=Tomato",
  },
  {
    id: "p5",
    name: "Potato",
    category: "Vegetables",
    pricePerKg: 35,
    stock: 800,
    wholesalerName: "Sundar Wholesale Co.",
    wholesalerContact: "9876500000",
    wholesalerId: "w1",
    image: "https://placehold.co/300x200/0A3D91/white?text=Potato",
  },
  {
    id: "p6",
    name: "Onion",
    category: "Vegetables",
    pricePerKg: 55,
    stock: 0,
    wholesalerName: "Sundar Wholesale Co.",
    wholesalerContact: "9876500000",
    wholesalerId: "w1",
    image: "https://placehold.co/300x200/1a4fa8/white?text=Onion",
  },
  // Fruits
  {
    id: "p7",
    name: "Banana",
    category: "Fruits",
    pricePerKg: 60,
    stock: 600,
    wholesalerName: "Sundar Wholesale Co.",
    wholesalerContact: "9876500000",
    wholesalerId: "w1",
    image: "https://placehold.co/300x200/0A3D91/white?text=Banana",
  },
  {
    id: "p8",
    name: "Apple",
    category: "Fruits",
    pricePerKg: 220,
    stock: 400,
    wholesalerName: "Sundar Wholesale Co.",
    wholesalerContact: "9876500000",
    wholesalerId: "w1",
    image: "https://placehold.co/300x200/1a4fa8/white?text=Apple",
  },
  {
    id: "p9",
    name: "Orange",
    category: "Fruits",
    pricePerKg: 90,
    stock: 300,
    wholesalerName: "Sundar Wholesale Co.",
    wholesalerContact: "9876500000",
    wholesalerId: "w1",
    image: "https://placehold.co/300x200/0A3D91/white?text=Orange",
  },
  // Groceries
  {
    id: "p10",
    name: "Rice",
    category: "Groceries",
    pricePerKg: 65,
    stock: 2000,
    wholesalerName: "Sundar Wholesale Co.",
    wholesalerContact: "9876500000",
    wholesalerId: "w1",
    image: "https://placehold.co/300x200/1a4fa8/white?text=Rice",
  },
  {
    id: "p11",
    name: "Sugar",
    category: "Groceries",
    pricePerKg: 48,
    stock: 1500,
    wholesalerName: "Sundar Wholesale Co.",
    wholesalerContact: "9876500000",
    wholesalerId: "w1",
    image: "https://placehold.co/300x200/0A3D91/white?text=Sugar",
  },
  {
    id: "p12",
    name: "Oil",
    category: "Groceries",
    pricePerKg: 140,
    stock: 500,
    wholesalerName: "Sundar Wholesale Co.",
    wholesalerContact: "9876500000",
    wholesalerId: "w1",
    image: "https://placehold.co/300x200/1a4fa8/white?text=Oil",
  },
  {
    id: "p13",
    name: "Dal",
    category: "Groceries",
    pricePerKg: 110,
    stock: 700,
    wholesalerName: "Sundar Wholesale Co.",
    wholesalerContact: "9876500000",
    wholesalerId: "w1",
    image: "https://placehold.co/300x200/0A3D91/white?text=Dal",
  },
];

export const categories = [
  "All",
  "Spices",
  "Vegetables",
  "Fruits",
  "Groceries",
  "Others",
];
