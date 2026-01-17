function getChai(kind: string | number) {
    if (typeof kind === "string") {
        return `Making ${kind} of chai`;    // ---- automatically suggests methods for that data type after dot TYPE NARROW
    }
    return `Chai order: ${kind}`;
};

function serveChai(msg?: string) {
    if (msg) {
        return `Serving ${msg}`;
    }
    return `Serving default masala chai`;
};

function orderChai(size: "small" | "medium" | "large") {
    if (size === "small") {
        return `small cutting chai...`;
    }
    if (size === "medium" || size === "large") {
        return `Make extra chai...`;
    }
    return `chai order #${size}`;
};

class KulhadChai {
    serve() {
        return `serving kulhad chai`;
    };
};

class CuttingChai {
    serve() {
        return `serving cutting chai`;
    };
};

function serveChaiNew(chai: KulhadChai | CuttingChai) {
    if (chai instanceof KulhadChai) {       // ---- guard rail methods like instanceof and typeof
        return chai.serve();
    }
};


// ======================= Creating TYPES =======================
type ChaiOrder = {
    type: string;
    sugar: number;
};

function isChaiOrder(object: any): object is ChaiOrder {
    return (
        typeof object === "object" && 
        object != null && 
        typeof object.type === "string" && 
        typeof object.type === "number"
    );
};

function serveOrder(item: ChaiOrder | string) {
    if (isChaiOrder(item)) {
        return `Serving...${item.type} chai with sugar ${item.sugar}`;
    }
    return `Serving custom chai: ${item}`;
};

type MasalaChai = {
    type: "masala";
    spiceLevel: number;
};

type GingerChai = {
    type: "ginger";
    amount: number;
};

type ElaichiChai = {
    type: "elaichi";
    aroma: number;
};

type Chai = MasalaChai | GingerChai | ElaichiChai;

function makeChai(order: Chai) {
    switch (order.type) {
        case "masala":
            return `Masala Chai`;            
            break;
        
        case "elaichi":
            return `Elaichi Chai`;            
            break;
        
        case "ginger":
            return `Ginger Chai`;            
            break;

        default:
            break;
    }
}