import logo from './logo.svg';
import './App.css';
import Homepage from './Components/HomePage';
import Page from './Components/Page'
import Cart from './Components/Cart'
import WishList from './Components/WishList'
import { HashLink as Link } from "react-router-hash-link";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/post-details" component={Page} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/wishlist" component={WishList} />
      </Router>
    </div>
  );
}

export default App;
