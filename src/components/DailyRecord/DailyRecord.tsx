import { useState, useRef, useMemo } from "react";
import { DragObjectWithType, useDrop } from "react-dnd";
import DailyRecordItem, {
  DAILY_RECORD_ITEM,
  DailyRecordItemData,
} from "./DailyRecordItem";
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

export default function DailyRecord({ day, month, year }: DailyRecordProps) {
  const date = useMemo(() => `${year}-${month}-${day}`, [year, month, day]);
  const ref = useRef<HTMLDivElement>(null);
  // TOOD: store로 이동;
  const [items, setItems] = useState([
    {
      id: uuid(),
      text: "A",
    },
    {
      id: uuid(),
      text: "B",
    },
  ]);

  const [, drop] = useDrop({
    accept: DAILY_RECORD_ITEM,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    canDrop: (item: DragItem) => item.date !== date,
    drop: (item: DragItem) => {
      item.onDrop();
      item.date = date;
      setItems((items) => {
        const newItems = [...items, item];
        item.onDrop = () => {
          const index = newItems.findIndex(({ id }) => item.id === id);
          setItems([...newItems.slice(0, index), ...newItems.slice(index + 1)]);
        };
        return newItems;
      });
    },
  });

  function deleteItem(id: string) {
    return function () {
      const index = items.findIndex((item) => item.id === id);
      setItems([...items.slice(0, index), ...items.slice(index + 1)]);
    };
  }

  drop(ref);
  return (
    <div ref={ref}>
      {items.map((item) => (
        <DailyRecordItem
          key={item.id}
          data={item}
          date={date}
          onDrop={deleteItem(item.id)}
        />
      ))}
    </div>
  );
}
