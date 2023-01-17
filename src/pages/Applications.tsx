import React from 'react';
import { IonCol, IonContent, IonGrid, IonPage, IonRow, IonItem } from '@ionic/react';
import Header from '../common/Header';
import { gql, useQuery } from '@apollo/client';

const GET_APPLOICATIONS = gql`
    query GetApps {
        applications {
            app_name
            id
        }
    }
`;

const Applications: React.FC = () => {

    const { loading, error, data } = useQuery(GET_APPLOICATIONS);
    if (loading) return null;

    return (
        <IonPage id="main-content">
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
                            {loading && (
                                <IonItem>Loading..</IonItem>
                            )}
                            {error && (
                                <IonItem>{error.message}</IonItem>
                            )}
                            {data.applications.map((item: any) => {
                                return (
                                    <IonItem >{item.app_name}</IonItem>
                                )
                            })}
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default Applications;