import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>Cups ordered: {count}</p>
      <button onClick={() => setCount((count) => count + 1)}>
        Order one more
      </button>
    </div>
  );
};

export default Counter;
