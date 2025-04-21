export const attributes = [
  {
    id: "attr-storage",
    name: "Storage",
    categoryId: 101,
    options: [
      { id: "opt-storage-128", value: "128GB" },
      { id: "opt-storage-256", value: "256GB" },
      { id: "opt-storage-512", value: "512GB" },
    ],
  },
  {
    id: "attr-color",
    name: "Color",
    categoryId: 101,
    options: [
      { id: "opt-color-black", value: "Space Black" },
      { id: "opt-color-silver", value: "Silver" },
      { id: "opt-color-blue", value: "Deep Blue" },
    ],
  },
  {
    id: "attr-size",
    name: "Size",
    categoryId: 204,
    options: [
      { id: "opt-size-8", value: "US 8" },
      { id: "opt-size-9", value: "US 9" },
      { id: "opt-size-10", value: "US 10" },
    ],
  },
  {
    id: "attr-shoe-color",
    name: "Shoe Color",
    categoryId: 204,
    options: [
      { id: "opt-shoe-black", value: "Black" },
      { id: "opt-shoe-white", value: "White" },
    ],
  },
];

interface AttributeOption {
  id: string;
  value: string;
  selected: boolean;
}

interface ProductAttribute {
  id: string;
  name: string;
  options: AttributeOption[];
}

export const productAttributes: ProductAttribute[] = [
  {
    id: "attr_1",
    name: "Storage",
    options: [
      { id: "opt_1", value: "128GB", selected: false },
      { id: "opt_2", value: "256GB", selected: false },
      { id: "opt_3", value: "512GB", selected: true },
      { id: "opt_4", value: "1TB", selected: false },
    ],
  },
  {
    id: "attr_2",
    name: "RAM",
    options: [
      { id: "opt_5", value: "8GB", selected: true },
      { id: "opt_6", value: "16GB", selected: false },
      { id: "opt_7", value: "32GB", selected: true },
    ],
  },
  {
    id: "attr_3",
    name: "Color",
    options: [
      { id: "opt_8", value: "Black", selected: true },
      { id: "opt_9", value: "White", selected: false },
      { id: "opt_10", value: "Blue", selected: false },
      { id: "opt_11", value: "Red", selected: true },
    ],
  },
  {
    id: "attr_4",
    name: "Display",
    options: [
      { id: "opt_12", value: '6.1" OLED', selected: true },
      { id: "opt_13", value: '6.7" OLED', selected: false },
      { id: "opt_14", value: '6.1" LCD', selected: true },
    ],
  },
  {
    id: "attr_5",
    name: "Processor",
    options: [
      { id: "opt_15", value: "Snapdragon 8 Gen 2", selected: true },
      { id: "opt_16", value: "A16 Bionic", selected: false },
      { id: "opt_17", value: "Exynos 2200", selected: false },
    ],
  },
];
