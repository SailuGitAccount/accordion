import "./App.css";
import Accordion from "./components/accordion";
import data from "./components/accordion/data";

function App() {
  return (
    <div className="App">
      <Accordion data={data} />
    </div>
  );
}

export default App;
