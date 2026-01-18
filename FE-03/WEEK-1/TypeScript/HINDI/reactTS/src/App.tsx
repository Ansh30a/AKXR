import { useState } from 'react';
import Card from './Components/Card';
import Counter from './Components/Counter';
import List from './Components/List';
import OrderForm from './Components/OrderForm';

import type { ListInterface } from './Types/types';

import './App.css'

const menu: ListInterface[] = [
  { id: 1, name: "Masala", price: 25},
  { id: 2, name: "Ginger", price: 20},
  { id: 3, name: "Elaichi", price: 15},
];

function App() {

  return (
    <>
      <Card name="ansh" price={10} isSpecial={true} />
      <Card name="anshu" price={100} isSpecial={false} />
      <Counter />
      <div>
        <List items={menu}/>
      </div>
      <div>
        <OrderForm onSubmit={(order) => {
          console.log(`Placed Order: `, order.name, order.cups);          
        }}/>
      </div>
    </>
  );
};

export default App;
