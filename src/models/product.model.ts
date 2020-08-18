export class Product {
    id: number;
    colour: Colour;
    brand: string;
    discount: number;
    rating: number;
    image: string;
    price: Price;
    title: string;
}

class Colour {
    color: string;
    title: string;
}

class Price {
    final_price: number;
    mrp: number;
}