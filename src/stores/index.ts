import { observable } from "mobx";
import DailyRecord from "./DailyRecord";

export default class Store {
  @observable dailyRecord: DailyRecord = new DailyRecord();
}
