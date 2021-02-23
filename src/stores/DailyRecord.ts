import { observable, action, makeAutoObservable } from "mobx";

interface Record {
  id: string;
  // type: "plus" | "minus";
  amount: number;
}

export default class DailyRecordStore {
  constructor() {
    makeAutoObservable(this);
  }

  @observable records: { [key: string]: Record[] } = {};

  @action addRecord({ record, date }: { record: Record; date: string }) {
    this.records[date] = [...(this.records[date] || []), record];
  }

  @action moveRecord({
    recordId,
    date,
    newDate,
  }: {
    recordId: string;
    date: string;
    newDate: string;
  }) {
    const recordIndex = this.records[date].findIndex((r) => r.id === recordId);
    const [record] = this.records[date].splice(recordIndex, 1);
    this.records[newDate] = [...(this.records[newDate] || []), record];
  }
}
