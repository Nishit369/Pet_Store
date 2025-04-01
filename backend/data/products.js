const products = [
    {
      name: "Organic Dog Shampoo",
      description:
        "A gentle, organic shampoo for dogs that soothes and nourishes the skin. Made with natural ingredients like aloe vera and oatmeal.",
      price: 14.99,
      countInStock: 50,
      brand: "PawCare",
      collections: "Grooming Essentials",
      animal: "Dogs",
      images: [
        { url: "https://picsum.photos/500/500?random=1", altText: "Organic Dog Shampoo" }
      ],
      isFeatured: true,
      isPublished: true,
      tags: ["shampoo", "organic", "dog grooming"],
      sku: "SH-DG-001",
    },
    {
      name: "Cat Fur Detangler Spray",
      description:
        "A leave-in conditioner spray for cats that helps to remove tangles and keep fur soft and shiny.",
      price: 12.99,
      countInStock: 30,
      brand: "Feline Fresh",
      collections: "Grooming Essentials",
      animal: "Cats",
      images: [
        { url: "https://picsum.photos/500/500?random=2", altText: "Cat Fur Detangler Spray" }
      ],
      isFeatured: false,
      isPublished: true,
      tags: ["detangler", "fur care", "cat grooming"],
      sku: "SP-CT-002",
    },
    {
      name: "Premium Leather Dog Collar",
      description:
        "A stylish and durable leather collar for dogs, available in multiple sizes and colors.",
      price: 24.99,
      countInStock: 40,
      brand: "PawStyle",
      collections: "Accessories",
      animal: "Dogs",
      images: [
        { url: "https://picsum.photos/500/500?random=3", altText: "Premium Leather Dog Collar" }
      ],
      isFeatured: true,
      isPublished: true,
      tags: ["collar", "dog accessories", "leather"],
      sku: "CL-DG-003",
    },
    {
      name: "Gourmet Salmon Cat Food",
      description:
        "A high-protein, grain-free gourmet cat food made with fresh salmon and vegetables.",
      price: 19.99,
      countInStock: 60,
      brand: "Whisker Delights",
      collections: "Food & Treats",
      animal: "Cats",
      images: [
        { url: "https://picsum.photos/500/500?random=4", altText: "Gourmet Salmon Cat Food" }
      ],
      isFeatured: true,
      isPublished: true,
      tags: ["cat food", "salmon", "grain-free"],
      sku: "FD-CT-004",
    },
    {
      name: "Adjustable Dog Harness",
      description:
        "A comfortable and adjustable harness for dogs, designed for safety and ease of movement.",
      price: 29.99,
      countInStock: 35,
      brand: "PawFit",
      collections: "Accessories",
      animal: "Dogs",
      images: [
        { url: "https://picsum.photos/500/500?random=5", altText: "Adjustable Dog Harness" }
      ],
      isFeatured: false,
      isPublished: true,
      tags: ["harness", "dog safety", "adjustable"],
      sku: "HR-DG-005",
    },
    // 35 additional products
    {
      name: "Mini Cat Scratcher",
      description: "A small and durable scratching post for cats that helps prevent damage to furniture.",
      price: 9.99,
      countInStock: 50,
      brand: "ScratchMate",
      collections: "Toys & Furniture",
      animal: "Cats",
      images: [
        { url: "https://picsum.photos/500/500?random=6", altText: "Mini Cat Scratcher" }
      ],
      isFeatured: true,
      isPublished: true,
      tags: ["scratcher", "cat furniture", "cat toy"],
      sku: "SF-CT-006",
    },
    {
      name: "Interactive Dog Ball",
      description: "An interactive dog toy that dispenses treats as your dog plays.",
      price: 15.99,
      countInStock: 70,
      brand: "PawPlay",
      collections: "Toys & Games",
      animal: "Dogs",
      images: [
        { url: "https://picsum.photos/500/500?random=7", altText: "Interactive Dog Ball" }
      ],
      isFeatured: true,
      isPublished: true,
      tags: ["dog toy", "interactive", "treat dispenser"],
      sku: "TY-DG-007",
    },
    {
      name: "Luxury Cat Bed",
      description: "A plush, cozy bed for cats, designed to provide comfort and warmth.",
      price: 39.99,
      countInStock: 25,
      brand: "Feline Comfort",
      collections: "Furniture",
      animal: "Cats",
      images: [
        { url: "https://picsum.photos/500/500?random=8", altText: "Luxury Cat Bed" }
      ],
      isFeatured: false,
      isPublished: true,
      tags: ["cat bed", "luxury", "furniture"],
      sku: "FB-CT-008",
    },
    {
      name: "Dog Travel Bowl",
      description: "A portable, collapsible travel bowl for dogs, perfect for outdoor adventures.",
      price: 9.99,
      countInStock: 80,
      brand: "PawPack",
      collections: "Accessories",
      animal: "Dogs",
      images: [
        { url: "https://picsum.photos/500/500?random=9", altText: "Dog Travel Bowl" }
      ],
      isFeatured: true,
      isPublished: true,
      tags: ["dog bowl", "travel", "portable"],
      sku: "TB-DG-009",
    },
    {
      name: "Chicken Flavored Dog Treats",
      description: "Tasty chicken-flavored treats for dogs, made with natural ingredients.",
      price: 5.99,
      countInStock: 100,
      brand: "PawDelights",
      collections: "Food & Treats",
      animal: "Dogs",
      images: [
        { url: "https://picsum.photos/500/500?random=10", altText: "Chicken Flavored Dog Treats" }
      ],
      isFeatured: true,
      isPublished: true,
      tags: ["dog treats", "chicken flavor", "snack"],
      sku: "DT-DG-010",
    },
    {
      name: "Catnip Cat Toy",
      description: "A fun catnip-infused toy that provides hours of entertainment for your cat.",
      price: 7.99,
      countInStock: 150,
      brand: "FelinePlay",
      collections: "Toys & Games",
      animal: "Cats",
      images: [
        { url: "https://picsum.photos/500/500?random=11", altText: "Catnip Cat Toy" }
      ],
      isFeatured: false,
      isPublished: true,
      tags: ["cat toy", "catnip", "playtime"],
      sku: "TY-CT-011",
    },
    {
      name: "Natural Dog Bone",
      description: "A natural, long-lasting dog bone made from real beef bone.",
      price: 8.99,
      countInStock: 60,
      brand: "PawBites",
      collections: "Food & Treats",
      animal: "Dogs",
      images: [
        { url: "https://picsum.photos/500/500?random=12", altText: "Natural Dog Bone" }
      ],
      isFeatured: true,
      isPublished: true,
      tags: ["dog bone", "natural", "beef"],
      sku: "FB-DG-012",
    },
    {
      name: "Large Dog Crate",
      description: "A spacious and secure dog crate for larger dogs.",
      price: 79.99,
      countInStock: 20,
      brand: "PawHouse",
      collections: "Furniture",
      animal: "Dogs",
      images: [
        { url: "https://picsum.photos/500/500?random=13", altText: "Large Dog Crate" }
      ],
      isFeatured: false,
      isPublished: true,
      tags: ["dog crate", "large", "furniture"],
      sku: "CR-DG-013",
    },
    {
      name: "Soft Plush Cat Toy",
      description: "A soft and cuddly plush toy for cats, great for snuggling.",
      price: 11.99,
      countInStock: 90,
      brand: "PurrfectToys",
      collections: "Toys & Games",
      animal: "Cats",
      images: [
        { url: "https://picsum.photos/500/500?random=14", altText: "Soft Plush Cat Toy" }
      ],
      isFeatured: false,
      isPublished: true,
      tags: ["cat toy", "plush", "snuggle"],
      sku: "TY-CT-014",
    },
    {
      name: "Dog Nail Clippers",
      description: "A sturdy pair of nail clippers designed for dog paws.",
      price: 10.99,
      countInStock: 75,
      brand: "PawCare",
      collections: "Grooming Essentials",
      animal: "Dogs",
      images: [
        { url: "https://picsum.photos/500/500?random=15", altText: "Dog Nail Clippers" }
      ],
      isFeatured: false,
      isPublished: true,
      tags: ["nail clippers", "dog grooming"],
      sku: "GC-DG-015",
    },
    {
      name: "Interactive Cat Laser Toy",
      description: "A laser toy that will keep your cat entertained for hours.",
      price: 13.99,
      countInStock: 40,
      brand: "LaserPaws",
      collections: "Toys & Games",
      animal: "Cats",
      images: [
        { url: "https://picsum.photos/500/500?random=16", altText: "Interactive Cat Laser Toy" }
      ],
      isFeatured: true,
      isPublished: true,
      tags: ["cat toy", "laser", "interactive"],
      sku: "TY-CT-016",
    },
    {
      name: "High-Quality Dog Leash",
      description: "A strong, durable leash perfect for daily walks with your dog.",
      price: 12.99,
      countInStock: 65,
      brand: "PawStyle",
      collections: "Accessories",
      animal: "Dogs",
      images: [
        { url: "https://picsum.photos/500/500?random=17", altText: "High-Quality Dog Leash" }
      ],
      isFeatured: false,
      isPublished: true,
      tags: ["dog leash", "quality", "accessories"],
      sku: "DL-DG-017",
    },
    {
      name: "Natural Salmon Cat Treats",
      description: "Healthy salmon treats for cats, made with natural ingredients.",
      price: 7.99,
      countInStock: 120,
      brand: "WhiskerBites",
      collections: "Food & Treats",
      animal: "Cats",
      images: [
        { url: "https://picsum.photos/500/500?random=18", altText: "Natural Salmon Cat Treats" }
      ],
      isFeatured: true,
      isPublished: true,
      tags: ["cat treats", "salmon", "natural"],
      sku: "DT-CT-018",
    },
    {
      name: "Automatic Pet Feeder",
      description: "A smart pet feeder that dispenses food on a schedule for your pet.",
      price: 59.99,
      countInStock: 30,
      brand: "SmartPet",
      collections: "Accessories",
      animal: "Dogs",
      images: [
        { url: "https://picsum.photos/500/500?random=19", altText: "Automatic Pet Feeder" }
      ],
      isFeatured: true,
      isPublished: true,
      tags: ["pet feeder", "automatic", "smart"],
      sku: "AF-DG-019",
    },
    {
      name: "Cat Collar with Bell",
      description: "A stylish collar for cats with a bell, available in different colors.",
      price: 7.99,
      countInStock: 110,
      brand: "MeowStyle",
      collections: "Accessories",
      animal: "Cats",
      images: [
        { url: "https://picsum.photos/500/500?random=20", altText: "Cat Collar with Bell" }
      ],
      isFeatured: false,
      isPublished: true,
      tags: ["cat collar", "bell", "accessories"],
      sku: "CL-CT-020",
    },
    {
      name: "Pet Carrier Bag",
      description: "A portable pet carrier bag for small to medium-sized pets, ideal for travel.",
      price: 29.99,
      countInStock: 50,
      brand: "TravelPet",
      collections: "Accessories",
      animal: "Dogs",
      images: [
        { url: "https://picsum.photos/500/500?random=21", altText: "Pet Carrier Bag" }
      ],
      isFeatured: true,
      isPublished: true,
      tags: ["pet carrier", "travel", "accessories"],
      sku: "CB-DG-021",
    },
    {
      name: "Dog Paw Balm",
      description: "A soothing balm for your dog's paws, helps to heal cracked or dry paws.",
      price: 12.99,
      countInStock: 40,
      brand: "PawCare",
      collections: "Grooming Essentials",
      animal: "Dogs",
      images: [
        { url: "https://picsum.photos/500/500?random=22", altText: "Dog Paw Balm" }
      ],
      isFeatured: false,
      isPublished: true,
      tags: ["paw balm", "dog care", "grooming"],
      sku: "PB-DG-022",
    },
    {
      name: "Portable Dog Water Bottle",
      description: "A travel-friendly water bottle for dogs with a built-in drinking cup.",
      price: 15.99,
      countInStock: 55,
      brand: "PawHydrate",
      collections: "Accessories",
      animal: "Dogs",
      images: [
        { url: "https://picsum.photos/500/500?random=23", altText: "Portable Dog Water Bottle" }
      ],
      isFeatured: false,
      isPublished: true,
      tags: ["dog water bottle", "portable", "travel"],
      sku: "WB-DG-023",
    },
    {
      name: "Bird Feather Toy",
      description: "A colorful bird feather toy that encourages exercise and play for your pet bird.",
      price: 4.99,
      countInStock: 200,
      brand: "FeatherPlay",
      collections: "Bird Toys",
      animal: "Bird",
      images: [
        { url: "https://picsum.photos/500/500?random=24", altText: "Bird Feather Toy" }
      ],
      isFeatured: true,
      isPublished: true,
      tags: ["bird toy", "feather", "interactive"],
      sku: "TY-BD-024",
    },
    {
      name: "Bird Cage Perch",
      description: "A comfortable perch for birds to rest and play on.",
      price: 6.99,
      countInStock: 180,
      brand: "FeatherHome",
      collections: "Bird Furniture",
      animal: "Bird",
      images: [
        { url: "https://picsum.photos/500/500?random=25", altText: "Bird Cage Perch" }
      ],
      isFeatured: false,
      isPublished: true,
      tags: ["bird perch", "bird furniture"],
      sku: "PC-BD-025",
    },
    {
      name: "Fish Tank Filter",
      description: "A reliable and efficient filter for small to medium-sized fish tanks.",
      price: 18.99,
      countInStock: 65,
      brand: "AquaCare",
      collections: "Fish Care",
      animal: "Fish",
      images: [
        { url: "https://picsum.photos/500/500?random=26", altText: "Fish Tank Filter" }
      ],
      isFeatured: true,
      isPublished: true,
      tags: ["fish filter", "aquarium", "fish care"],
      sku: "FT-FS-026",
    },
    {
      name: "Bird Seed Mix",
      description: "A nutritious mix of seeds for pet birds.",
      price: 8.99,
      countInStock: 150,
      brand: "FeatherFood",
      collections: "Bird Care",
      animal: "Bird",
      images: [
        { url: "https://picsum.photos/500/500?random=27", altText: "Bird Seed Mix" }
      ],
      isFeatured: true,
      isPublished: true,
      tags: ["bird seed", "bird food", "nutrition"],
      sku: "BS-BD-027",
    },
    {
      name: "Aquarium Decoration Set",
      description: "A set of colorful and realistic decorations for your aquarium.",
      price: 24.99,
      countInStock: 40,
      brand: "AquaStyle",
      collections: "Fish Care",
      animal: "Fish",
      images: [
        { url: "https://picsum.photos/500/500?random=28", altText: "Aquarium Decoration Set" }
      ],
      isFeatured: false,
      isPublished: true,
      tags: ["aquarium decor", "fish tank", "decoration"],
      sku: "AD-FS-028",
    },
    {
      name: "Fish Tank Gravel",
      description: "Decorative gravel for your fish tank, perfect for creating a beautiful substrate.",
      price: 10.99,
      countInStock: 85,
      brand: "AquaCare",
      collections: "Fish Care",
      animal: "Fish",
      images: [
        { url: "https://picsum.photos/500/500?random=29", altText: "Fish Tank Gravel" }
      ],
      isFeatured: true,
      isPublished: true,
      tags: ["fish gravel", "aquarium", "substrate"],
      sku: "TG-FS-029",
    },
    {
      name: "Pet Carrier Backpack",
      description: "A backpack designed for safely carrying your small pet around.",
      price: 29.99,
      countInStock: 50,
      brand: "PetPack",
      collections: "Accessories",
      animal: "Dogs",
      images: [
        { url: "https://picsum.photos/500/500?random=30", altText: "Pet Carrier Backpack" }
      ],
      isFeatured: false,
      isPublished: true,
      tags: ["pet carrier", "backpack", "travel"],
      sku: "PB-DG-030",
    },
    // Add more items as required
  ];
  module.exports = products;
  