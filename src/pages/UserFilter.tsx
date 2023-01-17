import React from 'react';
import { IonCol, IonContent, IonGrid, IonItem, IonPage, IonRow, IonCheckbox, IonLabel, IonToolbar, IonTitle } from '@ionic/react';
import Header from '../common/Header';
// import { useQuery, gql } from '@apollo/client';
// import axios from "axios"
// import { arrowBack, add } from 'ionicons/icons'
// import { ReactComponent as Funnel } from '../funnel.svg'

const UserFilter: React.FC = () => {

    return (
        <IonPage id="main-content">
            <Header title="Showcase" />
            <IonToolbar className="inner-toolbar" color="white">
                <IonTitle>Choose Filters</IonTitle>
            </IonToolbar> 

            <IonContent fullscreen>

                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <h3 className='title-light'>Organization</h3>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol>
                            <IonItem lines='none'>
                                <IonCheckbox slot="start"></IonCheckbox>
                                <IonLabel>All</IonLabel>
                            </IonItem>
                            <IonItem lines='none'>
                                <IonCheckbox slot="start"></IonCheckbox>
                                <IonLabel>Organization Name 1</IonLabel>
                            </IonItem>
                            <IonItem lines='none'>
                                <IonCheckbox slot="start"></IonCheckbox>
                                <IonLabel>Organization Name 2</IonLabel>
                            </IonItem>
                            <IonItem lines='none'>
                                <IonCheckbox slot="start"></IonCheckbox>
                                <IonLabel>Organization Name 3</IonLabel>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <h3 className='title-light'>Application</h3>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem lines='none'>
                                <IonCheckbox slot="start"></IonCheckbox>
                                <IonLabel>All</IonLabel>
                            </IonItem>
                            <IonItem lines='none'>
                                <IonCheckbox slot="start"></IonCheckbox>
                                <IonLabel>Application Name 1</IonLabel>
                            </IonItem>
                            <IonItem lines='none'>
                                <IonCheckbox slot="start"></IonCheckbox>
                                <IonLabel>Application Name 2</IonLabel>
                            </IonItem>
                            <IonItem lines='none'>
                                <IonCheckbox slot="start"></IonCheckbox>
                                <IonLabel>Application Name 3</IonLabel>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                </IonGrid>


            </IonContent>
        </IonPage>
    );
}

export default UserFilter;