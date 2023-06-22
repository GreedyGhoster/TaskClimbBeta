import { useState } from "react";
export default function Learning() {
  const [count, setCount] = useState(0);
  // -----------
  // let arr: number[] = [1, 2, 3, 4, 5];
  //
  // arr.forEach((num: number) => {
  //   console.log(num);
  // });
  //
  // arr.map((num: number) => {
  //   console.warn(num);
  // });
  // -----------
  // const small: number = 1;
  // const medium: number = 2;
  // const large: number = 3;
  // \/ better \/
  const enum Size {
    Small = 1,
    Medium,
    Large,
  }
  const size: Size = Size.Large;
  console.log(size);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Click {count}</button>
    </div>
  );
}
