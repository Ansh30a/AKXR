// const chai = {
//     name
// }

let tea: {
    name: string;
    price: number;
    isHot: boolean;
};

tea = {
    name: "ginger tea",
    price: 10,
    isHot: true
};

type Tea = {
    name: string;
    price: number;
    ingredients: string[];
};

const adrakChai: Tea = {
    name: "Adarak chai",
    price: 10,
    ingredients: ["milk", "sugar", "tea leaves", "water", "adrak"]
};

// console.log(typeof tea, typeof adrakChai);

type Cup = {
    size: string;
};

let smallCup: Cup = {
    size: "200ml"
};

let bigCup = {
    size: "500ml",
    material: "steel"
};

smallCup = bigCup;

type Brew = {
    brewTime: number;
};