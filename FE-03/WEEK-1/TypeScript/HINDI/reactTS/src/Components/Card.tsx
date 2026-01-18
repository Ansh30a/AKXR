interface CardProp {
    name: string;
    price: number;
    isSpecial: boolean;
};

const Card = ({ name, price, isSpecial = false }: CardProp) => {
  return (
    <article>
        <h2>
            {name} {isSpecial && <span>Star</span>}
        </h2>
        <p>{price}</p>
    </article>
  );
};

export default Card;
