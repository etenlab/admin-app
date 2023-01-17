// import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { IonCol, IonContent, IonGrid, IonLabel, IonPage, IonRow , IonItem, IonButtons, IonButton, IonIcon} from '@ionic/react';
import Header from '../common/Header';
// import { useQuery, gql } from '@apollo/client';
import { ParamTypes } from '../utils/utils';
// import axios from "axios"
import { gql, useQuery } from '@apollo/client';
import { createOutline } from 'ionicons/icons'


const UserDetails: React.FC = () => {

    // const { loading, error, data } = useQuery(GET_USER);
    let { userid } = useParams<ParamTypes>();
    // const [ userData, setUserData ] = useState<any>()

    const GET_USER = gql`
        query GetUser {
            user (user_id: ${userid}){
                user_id
                active
                email
                is_email_verified
                password
                username
            }
            userRoles (user_id: ${userid}){
                id
                user_id
                user {
                    email
                }
                organization {
                    id
                    name
                }
                application {
                    id
                    app_name
                }
                userRole {
                    id
                    name
                }

            }
        }
    `;

    const {loading, error, data} = useQuery(GET_USER);

    if (loading) return null;
    if (data) {
        console.log(data.userRoles)
    }
    /*
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
    */

    return (
        <IonPage id="main-content">
            <Header title="Showcase" />
            <IonContent fullscreen>
                {/* <IonHeader collapse="condense">-
                <IonToolbar>
                    <IonTitle size="large">Blank</IonTitle>
                </IonToolbar>
                </IonHeader>
                <ExploreContainer /> */}
                
                <IonGrid>
                    { error && (
                        <IonRow>
                            <IonCol>
                                <h6>Error</h6>
                            </IonCol>
                        </IonRow>
                    )}
                    { data && (
                        <>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel className='user-title'>{ data.user.email }</IonLabel>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem lines='none'>
                                    <h3 className='roles-title'>Roles</h3>
                                    <IonButtons slot='end'>
                                        <IonButton href={`/assign-role/${userid}`} className='btn-dark'>Assign New Role</IonButton>
                                    </IonButtons>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>

                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                { data.userRoles.map((item: any) => {
                                    return (<IonItem>
                                        <div>
                                            <h4 className='application'>{ item.application.app_name }</h4>
                                            <h5 className='organization'>{ item.organization.name }</h5>
                                            <h5 className='user-role'>{ item.userRole.name }</h5>
                                        </div>
                                        <IonButtons slot='end'>
                                            <IonButton href={`/edit-role/${item.id}`}>
                                                <IonIcon className='user-role-edit' icon={ createOutline } />
                                            </IonButton>
                                        </IonButtons>
                                    </IonItem>)
                                }) 
                                }
                                
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