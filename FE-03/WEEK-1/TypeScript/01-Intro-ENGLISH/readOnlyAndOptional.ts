type User = {
    readonly _id:  string;
    name: string;
    email: string;
    isActive: boolean;
    creditCardDetails?: number   // === OPTIONAL
}

let myUser: User = {
    _id: '123',
    name: 'a',
    email: 'ansh@ansh.com',
    isActive: false
}

myUser.email = 'ansh@ansh30.com';

// myUser._id = '1234'; ==== READ-ONLY

type cardNumber = {
    cardNumber: string;
}

type cardDate = {
    cardDate: string;
}

type cardDetails = cardNumber & cardDate & {
    cvv: number;
}