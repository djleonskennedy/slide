import "./App.css";
import { forwardRef, useRef, useState } from "react";
import { faker } from "@faker-js/faker";

const LIMIT = 6;

const DropsItem = forwardRef(({ name, price }, ref) => {
  return (
    <div ref={ref} className="item">
      <div className="content">
        <strong>{name}</strong>
        <span>{price}</span>
      </div>
    </div>
  );
});

const Drops = () => {
  const [stack, setStack] = useState([]);
  const ref = useRef();

  const add = (newItem) => {
    let newStack = [];
    if (stack.length === LIMIT) {
      const [, ...rest] = stack;
      newStack = rest;
    } else {
      newStack = stack;
    }

    setStack([...newStack, newItem]);
  };

  return (
    <>
      <div className="container">
        {stack.map(({ name, id, price }) => (
          <DropsItem ref={ref} key={id} name={name} price={price} />
        ))}
      </div>
      <button
        className="add"
        type="button"
        onClick={() =>
          add({
            name: faker.name.findName(),
            price: faker.datatype.number(),
            id: faker.datatype.uuid(),
          })
        }
      >
        ADD
      </button>
    </>
  );
};

export default function App() {
  return (
    <div>
      <Drops />
    </div>
  );
}
