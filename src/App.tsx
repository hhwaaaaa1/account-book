import Calendar from "@/components/Calendar";
import { useEffect, useState } from "react";
import DailyRecord from "./components/DailyRecord";

function App() {
  const [response, setResponse] = useState<unknown>(null);

  useEffect(() => {
    testAPI().then((res) => setResponse(res));
  }, []);

  async function testAPI() {
    const res = await fetch("/api");
    const body = await res.json();
    return body;
  }

  return (
    <div>
      {JSON.stringify(response)}
      <Calendar dayContents={DailyRecord} />
    </div>
  );
}

export default App;
