import React from 'react';
import { IonCol, IonContent, IonGrid, IonItem, IonPage, IonRow } from '@ionic/react';
import Header from '../common/Header';
import { gql, useQuery } from '@apollo/client';

const GET_ORGANIZATIONS = gql`
    query GetOrgs {
        admin_organizations {
            id
            name
        }
    }
`;

const Organizations: React.FC = () => {

    const { loading, error, data } = useQuery(GET_ORGANIZATIONS);
    console.log("data")
    console.log(loading)
    console.log(error)
    console.log(data)

    // if (loading) return 'Loading...';
    // if (error) return `Error! ${error.message}`;
    if (loading) return null;


    return (
        <IonPage>
            <Header title="Organizations" />
            <IonContent fullscreen>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            {loading && (
                                <IonItem>Loading..</IonItem>
                            )}
                            {error && (
                                <IonItem>{error.message}</IonItem>
                            )}
                            {data.admin_organizations.map((item: any) => {
                                return (
                                    <IonItem >{item.name}</IonItem>
                                )
                            })}
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )

}

export default Organizations;