import { Router, Route, Switch } from 'wouter';
import Navbar from './Navbar';
import DashboardSection from './DashboardSection';
import HeroesSection from './HeroesSection';
import HeroDetails from './HeroDetails';
function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <div className="content">
        <Switch>
          <Route  path='/'>
            <DashboardSection />
          </Route>
          <Route  path='/hero-section'>
           <HeroesSection />
          </Route>
          <Route  path='/hero/:id'>
           {(params) => <HeroDetails id={params.id} />}
          </Route>
        </Switch>
      </div>
    </div>
  </Router>
  );
}

export default App;
