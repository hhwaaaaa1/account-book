import { observable, action } from "mobx";

interface Record {
  id: string;
  // type: "plus" | "minus";
  amount: number;
}

export default class DailyRecordStore {
  @observable records: { [date: string]: Record[] } = {};

  @action addRecord(record: Record, date: string) {
    this.records = {
      ...this.records,
      [date]: [...(this.records[date] || []), record],
    };
  }
}
