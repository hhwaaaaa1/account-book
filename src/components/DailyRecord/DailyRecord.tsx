import { useRef, useMemo, useState } from "react";
import { DragObjectWithType, useDrop } from "react-dnd";
import DailyRecordItem, {
  DAILY_RECORD_ITEM,
  DailyRecordItemData,
} from "./DailyRecordItem";
import { observer } from "mobx-react";
import useStores from "@/stores/useStores";
import DailyRecorItem from "./DailyRecordItem";
import { v4 as uuid } from "uuid";

type DragItem = DailyRecordItemData &
  DragObjectWithType & {
    date: string;
    onDrop(): void;
  };

interface DailyRecordProps {
  day: number;
  month: number;
  year: number;
}

function DailyRecord({ day, month, year }: DailyRecordProps) {
  const date = useMemo(() => `${year}-${month}-${day}`, [year, month, day]);
  const ref = useRef<HTMLDivElement>(null);

  const { store } = useStores();
  const { dailyRecord } = store;
  const records = dailyRecord.records[date];

  // const [, drop] = useDrop({
  //   accept: DAILY_RECORD_ITEM,
  //   collect: (monitor) => ({ isOver: monitor.isOver() }),
  //   canDrop: (item: DragItem) => item.date !== date,
  //   drop: (item: DragItem) => {
  //     item.onDrop();
  //     item.date = date;
  //     setItems((items) => {
  //       const newItems = [...items, item];
  //       item.onDrop = () => {
  //         const index = newItems.findIndex(({ id }) => item.id === id);
  //         setItems([...newItems.slice(0, index), ...newItems.slice(index + 1)]);
  //       };
  //       return newItems;
  //     });
  //   },
  // });

  // function deleteItem(id: string) {
  //   return function () {
  //     const index = items.findIndex((item) => item.id === id);
  //     setItems([...items.slice(0, index), ...items.slice(index + 1)]);
  //   };
  // }

  // drop(ref);

  const [adding, setAdding] = useState(false);
  function addCard() {
    setAdding(true);
  }

  function addRecord(amount: number) {
    if (amount) dailyRecord.addRecord({ id: uuid(), amount }, date);
    setAdding(false);
  }

  return (
    <div ref={ref} onClick={addCard}>
      {records?.map((record) => (
        <DailyRecordItem
          key={record.id}
          amount={record.amount}
          onSave={() => console.log("save")}
          // onDrop={deleteItem(item.id)}
        />
      ))}
      {adding && <DailyRecordItem onSave={addRecord} focusOnMount />}
    </div>
  );
}

export default observer(DailyRecord);
