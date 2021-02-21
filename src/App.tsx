import Calendar from "@/components/Calendar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect, useState } from "react";
import DailyRecord from "./components/DailyRecord";
import { Provider } from "mobx-react";
import Store from "@/stores/index";

const store = new Store();

function App() {
  // const [response, setResponse] = useState<unknown>(null);

  // useEffect(() => {
  //   testAPI().then((res) => setResponse(res));
  // }, []);

  // async function testAPI() {
  //   const res = await fetch("/api");
  //   const body = await res.json();
  //   return body;
  // }

  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        {/* {JSON.stringify(response)} */}
        <Calendar dayContents={DailyRecord} />
      </DndProvider>
    </Provider>
  );
}

export default App;
