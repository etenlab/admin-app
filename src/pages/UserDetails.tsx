import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { IonCol, IonContent, IonGrid, IonLabel, IonPage, IonRow, IonToggle , IonItem} from '@ionic/react';
import Header from '../common/Header';
// import { useQuery, gql } from '@apollo/client';

import axios from "axios"

interface ParamTypes {
    userid: string
  }

const UserDetails: React.FC = () => {

    // const { loading, error, data } = useQuery(GET_USER);
    let { userid } = useParams<ParamTypes>();
    const [ userData, setUserData ] = useState<any>()

    useEffect( () => {
        const keycloakUrl = `${process.env.REACT_APP_KEYCLOAK_URL}`;
        let authToken = localStorage.getItem("authToken");
        const fetchData = async () => {
            await axios.get(`${keycloakUrl}/admin/realms/master/users/${userid}`, {
                headers: { 
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `Bearer ${JSON.parse(authToken!)}`
                }
            }).then( async (response) => {
                console.log(response)
                setUserData(response.data)
                console.log(userData)
            });
        }
        fetchData().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userid]);

    console.log(userData)

    return (
        <IonPage>
            <Header title="Users" />
            <IonContent fullscreen>
                {/* <IonHeader collapse="condense">-
                <IonToolbar>
                    <IonTitle size="large">Blank</IonTitle>
                </IonToolbar>
                </IonHeader>
                <ExploreContainer /> */}
                
                <IonGrid>
                    { userData && (
                        <>
                        <IonRow>
                            <IonCol style={{textAlign: 'center'}}>
                                <IonLabel >{ userData.email }</IonLabel>
                            </IonCol>
                        </IonRow>
                        <IonItem lines='none'>
                            <IonLabel>Site Admin</IonLabel>
                            <IonToggle slot="end"></IonToggle>
                        </IonItem>
                        <IonRow>
                            <IonCol>
                                
                                
                                
                            </IonCol>

                        </IonRow>
                        </>
                    )}
                    
                </IonGrid>
            </IonContent>
        </IonPage>
    )

}

export default UserDetails;