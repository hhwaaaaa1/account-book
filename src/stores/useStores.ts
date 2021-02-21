import { MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import Store from "./index";

export default function useStores() {
  return useContext<Record<string, Store>>(MobXProviderContext);
}
