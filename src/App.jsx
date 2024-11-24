import { useState } from "react";
import Input from "./components/input";
import MemoToPrint from "./components/memoToPrint";

export default function App() {
  const [memoName, setMemoName] = useState("");
  const [memoAddress, setMemoAddress] = useState("");
  const [total, setTotal] = useState();
  const [paid, setPaid] = useState();
  const [due, setDue] = useState();
  const [itemData, setItemData] = useState([
    {
      description: "",
      quantity: "",
      rate: "",
    },
  ]);

  const [isCreate, setIsCreate] = useState(false);

  function handleCreate(name, address, total, paid, due, items) {
    setMemoName(name);
    setMemoAddress(address);
    setTotal(total);
    setPaid(paid);
    setDue(due);
    setItemData(items);
    setIsCreate(true);
    setTimeout(() => window.print(), 500);
  }
  return (
    <>
      <Input onCreate={handleCreate} />
      {isCreate && (
        <MemoToPrint
          name={memoName}
          address={memoAddress}
          total={total}
          paid={paid}
          due={due}
          items={itemData}
        />
      )}
    </>
  );
}
