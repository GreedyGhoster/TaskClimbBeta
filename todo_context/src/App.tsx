import "./Style.css";
import { useContext, createContext } from "react";

export default function App() {
  // значение по умолчанию
  const MyContext = createContext("I'm not the boss");
  const Greeting = () => {
    // использование MyContext
    const user = useContext(MyContext);
    return `Hello, ${user}`;
  };
  return (
    <>
      {/* value нужен для добавления нового значения */}
      {/* Если закоментировать MyContext, то мы получим значение по умолчанию */}
      {/* <MyContext.Provider value="I'm the boss"> */}
      <Greeting />
      {/* </MyContext.Provider> */}
    </>
  );
}
