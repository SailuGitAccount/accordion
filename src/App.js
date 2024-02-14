import "./App.css";
import Accordion from "./components/accordion";
import fetchData from "./components/accordion/data";

function App() {
  return (
    <div className="App">
      <Accordion fetchData={fetchData} />
    </div>
  );
}

export default App;
