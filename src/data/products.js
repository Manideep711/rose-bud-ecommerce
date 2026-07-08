/**
 * data.js
 * Static product catalog + lookup tables for Rose Bud.
 */

export const products = [
    { id: 1, name: "Velvet Elegance Bouquet", price: 145, category: "Bouquets", color: "Red", image: "https://images.unsplash.com/photo-1563241598-1e428df8fcf0?q=80&w=800&auto=format&fit=crop", hoverImage: "https://images.unsplash.com/photo-1596438459194-f3a3f5ee92b1?q=80&w=800&auto=format&fit=crop", isNew: true },
    { id: 2, name: "Blush Peony Arrangement", price: 165, category: "Bouquets", color: "Pink", image: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?q=80&w=800&auto=format&fit=crop", hoverImage: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=800&auto=format&fit=crop", isNew: false },
    { id: 3, name: "Artisan Ceramic Vase", price: 48, category: "Vases", color: "White", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop", hoverImage: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?q=80&w=800&auto=format&fit=crop", isNew: false },
    { id: 4, name: "Midnight Orchid Potted", price: 210, category: "Plants", color: "Purple", image: "https://images.unsplash.com/photo-1597055181300-d86ea53eb635?q=80&w=800&auto=format&fit=crop", hoverImage: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?q=80&w=800&auto=format&fit=crop", isNew: true },
    { id: 5, name: "Dried Pampas Grass", price: 85, category: "Dried", color: "Beige", image: "https://images.unsplash.com/photo-1595079361623-e1898bd03126?q=80&w=800&auto=format&fit=crop", hoverImage: "https://images.unsplash.com/photo-1599596668700-14eaf4e6b26b?q=80&w=800&auto=format&fit=crop", isNew: false },
    { id: 6, name: "Classic White Rose Box", price: 189, category: "Bouquets", color: "White", image: "https://images.unsplash.com/photo-1613554477793-7da9f874f67c?q=80&w=800&auto=format&fit=crop", hoverImage: "https://images.unsplash.com/photo-1555307221-da3a41b714b1?q=80&w=800&auto=format&fit=crop", isNew: false },
    { id: 7, name: "Golden Bloom Stand", price: 120, category: "Accessories", color: "Gold", image: "https://images.unsplash.com/photo-1582967673995-1f6e21b7776b?q=80&w=800&auto=format&fit=crop", hoverImage: "https://images.unsplash.com/photo-1563241598-4c919d6517a2?q=80&w=800&auto=format&fit=crop", isNew: false },
    { id: 8, name: "Wildflower Medley", price: 150, category: "Bouquets", color: "Yellow", image: "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?q=80&w=800&auto=format&fit=crop", hoverImage: "https://images.unsplash.com/photo-1508784411316-02b8cd4d3a3a?q=80&w=800&auto=format&fit=crop", isNew: true },
    { id: 9, name: "Monstera Deliciosa", price: 250, category: "Plants", color: "Green", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=800&auto=format&fit=crop", hoverImage: "https://images.unsplash.com/photo-1595514535098-b807bce2725e?q=80&w=800&auto=format&fit=crop", isNew: false }
];

export const colorMap = {
    'Red': 'bg-red-600', 'Pink': 'bg-pink-300', 'White': 'bg-white border border-gray-200',
    'Purple': 'bg-purple-800', 'Beige': 'bg-[#E5DCC5]', 'Gold': 'bg-yellow-500',
    'Yellow': 'bg-yellow-300', 'Green': 'bg-green-600'
};
