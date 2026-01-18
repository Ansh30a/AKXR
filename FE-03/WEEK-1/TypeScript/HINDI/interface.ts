// type TeaRecipe = {
//     water: number;
//     milk: number;
// };

// class MasalaChai implements TeaRecipe {     // ---- allowed to a certain limit
//     water = 10;
//     milk = 10;
// };

// type CupSize = "small" | "large";

// class Chai implements CupSize {     // ---- not allowed. Allowed only when the type is a basic object, for custom use interface
    
// };

interface CupSize {
    size: "small" | "large";
};

class Chai implements CupSize {
    size: "small" | "large" = "large";
};

// type MyResponse = { ok: true } | { ok: false };

// class MyRes implements MyResponse {     // ---- not allowed
//     ok: boolean = true;
// };