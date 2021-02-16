import { observable, action } from "mobx";

export default class GlobalStore {
  @observable test = "test";

  @action changeTest = () => {
    this.test = "tested";
  };
}
