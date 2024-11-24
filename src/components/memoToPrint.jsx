/* eslint-disable react/prop-types */
export default function MemoToPrint({
  name,
  address,
  total,
  paid,
  due,
  items,
}) {
  const dateObj = new Date();
  const date = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  return (
    <div className="hidden print:flex items-center">
      <div className="h-[790px] w-[610px] border-2 bg-memo bg-cover bg-center">
        <div className="h-full w-full relative">
          <div className="absolute right-[27px] top-[162px] h-7 w-[120px] flex items-center p-2">
            <p className="text-base">{`${date < 10 ? "0" + date : date}/${
              month < 10 ? "0" + month : month
            }/${year}`}</p>
          </div>
          <div className="absolute left-[90px] top-[193px] h-12 flex items-center p-2">
            <p className="text-base font-medium">{name}</p>
          </div>
          <div className="absolute left-[100px] top-[228px] h-12 flex items-center p-2">
            <p className="text-base font-medium">{address}</p>
          </div>
          {/* Data Table */}
          <div className="absolute left-[40px] top-[302px] flex items-center p-2 text-md">
            <table>
              <tbody className="flex flex-col gap-1">
                {items.map((item, index) => (
                  <tr key={index} className="flex gap-[2px]">
                    <td className="w-6 text-center">{index + 1}</td>
                    <td className="w-[183px] p-[2px]">{item.description}</td>
                    <td className="w-[75px] ml-1 text-center">
                      {item.quantity}
                    </td>
                    <td className="w-[70px] ml-1 text-center">{item.rate}</td>
                    <td className="w-[88px] ml-1 text-center">{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="absolute right-[52px] bottom-[186px] h-8 w-20 flex items-center justify-center p-2">
            <p className="text-base font-semibold">{total}&#2547;</p>
          </div>
          <div className="absolute right-[52px] bottom-[150px] h-8 w-20 flex items-center justify-center p-2">
            <p className="text-base font-semibold">
              {due < 0 ? total : paid}&#2547;
            </p>
          </div>
          <div className="absolute right-[52px] bottom-[111px] h-8 w-20 flex items-center justify-center p-2">
            <p className="text-base font-semibold">
              {due < 0 ? "00" : due}&#2547;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
