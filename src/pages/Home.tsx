import { IonCol, IonContent, IonGrid, IonItem, IonPage, IonRow } from '@ionic/react';
// import ExploreContainer from '../components/ExploreContainer';
// import './Home.css';
import Header from '../common/Header';
import Footer from '../common/Footer';

const Home: React.FC = () => {
  return (
    <>
      <IonPage id="main-content">
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
        <Footer />
      </IonPage>
    </>
  );
};

export default Home;
