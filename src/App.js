import './App.css';
import List from './List'
import data from "./items.json";

function App() {
  return (
    <div className="App">
        <List items= {data}/>
    </div>
  );
}

export default App;
