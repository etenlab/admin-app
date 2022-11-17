import React, { useEffect } from 'react';
import { IonCol, IonContent, IonGrid, IonHeader, IonButtons, IonBackButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import Header from '../common/Header';

const Applications: React.FC = () => {

    return (
        <IonPage>
            <Header title="Applications" />
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
                            <h1>Applications Page</h1>
                        {/* <IonItem href='/login'>Users</IonItem>
                        <IonItem href='/login'>Organizations</IonItem>
                        <IonItem href='/login'>Applications</IonItem> */}
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default Applications;