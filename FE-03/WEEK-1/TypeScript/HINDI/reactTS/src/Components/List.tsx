import type { ListInterface } from '../Types/types';
import Card from "./Card";

interface NewList {
    items: ListInterface[];
};

const List = ({ items }: NewList) => {
  return (
    <div>
      {items.map((item) => (
        <Card 
        key={item.id}
        name={item.name}
        price={item.price}  
        isSpecial={item.price > 10}
        />
      ))}
    </div>
  );
};

export default List;
