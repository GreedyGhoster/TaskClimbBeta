import "./Style.css";
import Learning from "./Learning";

export default function App() {
  const UserName: string = "Ivan";
  interface Informations {
    color: string;
    age: number;
    activity: boolean | string;
  }
  const MyInformation: Informations = {
    color: "Purple",
    age: 16,
    activity: false,
  };
  MyInformation.activity === true
    ? (MyInformation.activity = "Programmer")
    : (MyInformation.activity = "Pre-programmer");
  const Car = (age: number) => (age >= 18 ? "OK" : "No");
  return (
    <>
      <h1>{UserName}</h1>
      <h2>
        {` Color: ${MyInformation.color}, Age:  ${MyInformation.age}, Activity: ${MyInformation.activity}`}
      </h2>
      <h3>{`License: ${Car(MyInformation.age)}`}</h3>
      <Learning />
    </>
  );
}
