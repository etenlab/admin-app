import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Login from './pages/Login';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './styles.css'
import Users from './pages/Users';
import Organizations from './pages/Organizations';
import Applications from './pages/Applications';
import UserDetails from './pages/UserDetails';
import { PrivateRoute } from './utils/PrivateRoute'

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <PrivateRoute exact path="/home" roles={['admin']} component={Home}>
        </PrivateRoute>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <PrivateRoute exact path="/users" roles={['admin']} component={Users} />
        <PrivateRoute exact path="/users/:userid" roles={['admin']} component={UserDetails} />
        <PrivateRoute exact path="/organizations" roles={['admin']} component={Organizations} />
        <PrivateRoute exact path="/applications" roles={['admin']} component={Applications} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
