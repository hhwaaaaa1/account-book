import { useMemo, useState } from "react";
import { DragObjectWithType, useDrop } from "react-dnd";
import DailyRecordItem, {
  DAILY_RECORD_ITEM,
  DailyRecordItemForDrag,
} from "./DailyRecordItem";
import { observer } from "mobx-react";
import useStores from "@/stores/useStores";
import { v4 as uuid } from "uuid";

type DragItem = DailyRecordItemForDrag & DragObjectWithType;

interface DailyRecordProps {
  day: number;
  month: number;
  year: number;
}

function DailyRecord({ day, month, year }: DailyRecordProps) {
  const date = useMemo(() => `${year}-${month}-${day}`, [year, month, day]);

  const { store } = useStores();
  const { dailyRecord } = store;
  const records = dailyRecord.records[date];

  const [, drop] = useDrop({
    accept: DAILY_RECORD_ITEM,
    collect: (monitor) => ({ isOver: monitor.isOver() }),
    canDrop: (item: DragItem) => item.date !== date,
    drop: (item: DragItem) => {
      dailyRecord.moveRecord({
        recordId: item.id,
        date: item.date,
        newDate: date,
      });
      item.date = date;
    },
  });

  const [adding, setAdding] = useState(false);
  function addCard() {
    setAdding(true);
  }

  function addRecord(amount: number) {
    if (amount) dailyRecord.addRecord({ record: { id: uuid(), amount }, date });
    setAdding(false);
  }

  return (
    <div ref={drop} onClick={addCard}>
      {records?.map(
        (record) =>
          record && (
            <DailyRecordItem
              id={record.id}
              key={record.id}
              date={date}
              amount={record.amount}
              onSave={() => console.log("save")}
            />
          )
      )}
      {adding && (
        <DailyRecordItem
          id={uuid()}
          date={date}
          onSave={addRecord}
          focusOnMount
        />
      )}
    </div>
  );
}

export default observer(DailyRecord);
