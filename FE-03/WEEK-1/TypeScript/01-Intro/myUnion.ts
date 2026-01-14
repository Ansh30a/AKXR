let score: number | string = 33;

score = 44;

score = '55';


type User = {
    name: string;
    id: number
}

type Admin = {
    username: string;
    id: number
}

let ansh: User | Admin = {
    name: 'ansh',
    id: 1
}

ansh = {
    username: 'ansher',
    id: 1
}

function getDbId(id: number | string) {
    // suppose you are making some API calls here ---
    console.log(`DB ID is: ${id}`);

    if (typeof id === 'string') {
        id.toLowerCase();
    } else {
        Math.floor(id);
    }
}

getDbId(3);
getDbId('3');

const data: number[] = [1, 2, 3, 4];
const info: string[] = ['1', '2', '3', '4'];
const knowledge: (number | string)[] = ['1', 2, 3, 4];

// let pi: 3.14 = 3.14;

// pi = 2; ---------------- not useful

// let seatAllotment: 'aisle' | 'middle' | 'window';
// seatAllotment = 'crew'; ------------------- useful case