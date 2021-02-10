import './App.css';
import { Route } from 'react-router-dom';
import SearchPage from './SearchPage/SearchPage';
import ResultsPage from './ResultsPage/ResultsPage';

const App = () => (
  <>
    <Route path="/" exact component={SearchPage} />
    <Route path="/results/:query" component={ResultsPage} />
  </>
);

export default App;
