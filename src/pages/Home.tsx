import { IonCol, IonContent, IonGrid, IonHeader, IonItem, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
// import ExploreContainer from '../components/ExploreContainer';
// import './Home.css';
import Header from '../common/Header';

const Home: React.FC = () => {
  return (
    <IonPage>
      <Header title='Home' />
      <IonContent fullscreen>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer /> */}
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem href='/users'>Users</IonItem>
              <IonItem href='/organizations'>Organizations</IonItem>
              <IonItem href='/applications'>Applications</IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
