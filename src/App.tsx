import Header from "./components/Header";
import AddTask from "./components/AddTask";

import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.body.style.backgroundColor = "#282c34";
  }, []);

  return (
    <div>
      <div className="mt-0 pb-3">
        <Header />
      </div>

      <div className="mt-3 pb-5">
        <AddTask />
      </div>
    </div>
  );
}

//https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component

export default App;
