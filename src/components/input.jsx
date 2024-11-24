/* eslint-disable react/prop-types */
import { useState } from "react";
export default function Input({ onCreate }) {
  const [memoName, setMemoName] = useState("");
  const [memoAddress, setMemoAddress] = useState("");
  const [total, setTotal] = useState();
  const [paid, setPaid] = useState(0);
  const [due, setDue] = useState();
  const [itemData, setItemData] = useState([
    { id: crypto.randomUUID(), description: "", quantity: "", rate: "" },
  ]);

  //const lastIndex = itemData.length - 1;
  function dueCalculate(t, p) {
    const totalAmount = t ? t : total;
    const paidAmount = p ? p : paid;
    const due = totalAmount - paidAmount;
    setDue(due);
  }
  function paidCalculate(e) {
    setPaid(e.target.value);
    dueCalculate(null, e.target.value);
  }
  function totalCalculate(items = itemData) {
    const itemArr = items.slice();
    const total = itemArr.reduce((prev, pre) => {
      return pre.price + prev;
    }, 0);
    setTotal(total);
    dueCalculate(total, null);
    console.log("called");
  }
  function priceCalculate(i) {
    const newArr = itemData.slice();
    newArr[i].price = newArr[i].rate * newArr[i].quantity;
    setItemData(newArr);
    totalCalculate();
  }
  function handleNamechange(e) {
    const value = e.target.value;
    setMemoName(value);
  }
  function handleAddresschange(e) {
    const value = e.target.value;
    setMemoAddress(value);
  }

  function handleChange(e, i) {
    const name = e.target.name;
    const value = e.target.value;
    const newArr = itemData.slice();
    newArr[i][name] = value;
    setItemData(newArr);
    if (name === "quantity" || name === "rate") {
      priceCalculate(i);
    }
  }
  function handleAdd(e) {
    e.preventDefault();
    itemData.length < 6 &&
      setItemData([
        ...itemData,
        { id: crypto.randomUUID(), description: "", quantity: "", rate: "" },
      ]);
  }
  function handleRemove(e, id) {
    e.preventDefault();
    const newItems = itemData.slice().filter((item) => item.id !== id);
    setItemData(newItems);
    totalCalculate(newItems);
  }

  return (
    <div className="print:hidden max-w-[1280px] flex flex-col items-center mx-auto">
      <div className="mt-12 ml-16">
        <h1 className="text-5xl font-bold">Royal Computer</h1>
        <p className="text-center text-xl font-semibold">
          Rajghat, Abhaynagar, Jashore.
        </p>
      </div>
      <div
        className={`mx-16 mt-2 border-2 border-blue-400 rounded-lg p-3 relative`}
      >
        <form>
          {/*Unique in a memo*/}
          <div className="flex flex-col gap-1 text-xl">
            <label>
              Name:
              <input
                type="text"
                placeholder="Type name here..."
                className="border h-9 p-1 w-full"
                value={memoName}
                onChange={handleNamechange}
              />
            </label>
            <label>
              Address:
              <input
                type="text"
                placeholder="Type address here..."
                className="border w-full h-9 p-1"
                value={memoAddress}
                onChange={handleAddresschange}
              />
            </label>
          </div>
          {/*Can multiple in a memo*/}
          {itemData.map((item, index) => {
            return (
              <div
                key={item.id}
                className="flex gap-1 mt-5 py-3 px-1 border border-blue-400 rounded-md text-xl relative group"
              >
                <label className="w-96">
                  Description:
                  <input
                    type="text"
                    placeholder="Description..."
                    className="border h-9 p-1 w-full"
                    name="description"
                    value={item.description}
                    onChange={(e) => handleChange(e, index)}
                  />
                </label>
                <label className="w-32">
                  Quantity:
                  <input
                    type="number"
                    placeholder="Quantity..."
                    className="border h-9 p-1 w-full"
                    value={item.quantity}
                    name="quantity"
                    onChange={(e) => handleChange(e, index)}
                  />
                </label>
                <label className="w-28">
                  Rate:
                  <input
                    type="number"
                    placeholder="Rate..."
                    className="border h-9 p-1 w-full"
                    value={item.rate}
                    name="rate"
                    onChange={(e) => handleChange(e, index)}
                  />
                </label>
                <label className="w-32">
                  Price:
                  <input
                    type="text"
                    className="border w-full h-9 p-1 bg-white"
                    disabled
                    value={item.price && item.price}
                  />
                </label>
                <div className="absolute hidden group-hover:block -top-1 right-[1px]">
                  <button
                    onClick={(e) => {
                      handleRemove(e, item.id);
                    }}
                    className="px-2 py-[2px] text-sm bg-red-500 text-white rounded-md"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}

          {/*Unique in a memo*/}
          <div className="mt-10 flex gap-2 font-semibold">
            <label className="">
              Total:
              <input
                type="text"
                className="border h-9 p-1 bg-white"
                disabled
                value={total}
              />
            </label>
            <label className="">
              Paid Amount:
              <input
                type="text"
                className="border h-9 p-1 bg-white"
                placeholder="Paid Amount..."
                value={paid}
                onChange={paidCalculate}
              />
            </label>
            <div className="w-[300px] flex flex-col gap-5">
              <label className="">
                Due:
                <input
                  type="text"
                  className="border h-9 p-1 bg-white"
                  disabled
                  value={due > 0 ? due : "00"}
                />
              </label>
              <label className="">
                Refund:
                <input
                  type="text"
                  className="border h-9 p-1 bg-white"
                  disabled
                  value={due < 0 ? Math.abs(due) : "00"}
                />
              </label>
            </div>
          </div>
          <div className="mt-7 px-10 *:border *:border-gray-400 grid grid-flow-col  *:rounded-md *:py-1 *:px-2 text-xl">
            <button
              onClick={handleAdd}
              className={`justify-self-start ${
                itemData.length > 5 && "text-slate-400"
              } ${itemData.length > 5 || "hover:bg-slate-300"}`}
              disabled={itemData.length > 5 && true}
            >
              Add Item
            </button>
            <button
              className={`justify-self-end ${
                (memoName &&
                  itemData[0].description &&
                  itemData[0].quantity &&
                  itemData[0].rate) ||
                "text-slate-400"
              } ${
                memoName &&
                itemData[0].description &&
                itemData[0].quantity &&
                itemData[0].rate &&
                "hover:bg-slate-300"
              }`}
              disabled={
                memoName &&
                itemData[0].description &&
                itemData[0].quantity &&
                itemData[0].rate
                  ? false
                  : true
              }
              onClick={(e) => {
                e.preventDefault();
                onCreate(memoName, memoAddress, total, paid, due, itemData);
              }}
            >
              Create Memo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
