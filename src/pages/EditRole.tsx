import React, {  useState } from 'react';
import { 
    IonCol, 
    IonContent, 
    IonGrid, 
    IonPage, 
    IonRow, 
    IonSelect, 
    IonSelectOption, 
    IonToolbar, 
    IonButtons, 
    IonButton, 
    IonIcon, 
    IonTitle,
    SelectChangeEventDetail,
    useIonAlert,
    useIonToast
} from '@ionic/react';
import Header from '../common/Header';
import { useParams } from 'react-router';
import { gql, useQuery, useApolloClient, useMutation } from '@apollo/client';
import { ParamTypes } from '../utils/utils';
import { arrowBack } from 'ionicons/icons'
import { IonSelectCustomEvent } from '@ionic/core';
import { useHistory } from "react-router-dom";

const EditRole: React.FC = () => {
    const history = useHistory();
    const [presentAlert] = useIonAlert();
    const [toast] = useIonToast();
    let { id } = useParams<ParamTypes>();
    const presentToast = (position: 'top' | 'middle' | 'bottom', message: string) => {
        toast({
          message: message,
          duration: 1500,
          position: position
        });
    };
    const GET_DATA = gql`
        query GetData {
            applications {
                app_name
                id
            }
            organizations {
                id
                name
            }
            roles {
                organization
                name
                id
            }
            userRole (id: ${id}) {
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
    const DEL_USERROLE = gql`
        mutation deleteUserRole($id: Int!) {
            deleteUserRole(id: $id)
        }
    `;
    const pageData = useQuery(GET_DATA);
    const [deleteUserRole] = useMutation(DEL_USERROLE, {
        onCompleted(){
            presentToast('bottom', "User Role deleted successfully");
            history.push(`/users/${pageData.data.userRole.user_id}`);
        },
        onError(){
            presentToast('bottom',"User role delete failed" );
        }
    });
    const client = useApolloClient();
    const [organization, setOrganization] = useState(0);
    const [application, setApplication] = useState();
    const [role, setRole] = useState();
    

    const setOrganizationValue = (event: IonSelectCustomEvent<SelectChangeEventDetail<any>>) => {
        setOrganization(event.target.value);
    }

    const setAppllicationValue = (event: IonSelectCustomEvent<SelectChangeEventDetail<any>>) => {
        setApplication(event.target.value);
    }
    
    const setRoleValue = (event: IonSelectCustomEvent<SelectChangeEventDetail<any>>) => {
        setRole(event.target.value);
    }

    // const deleteRole = () => {
    //     const res = client.watchQuery({
    //         query: ,
    //         data: {
    //             delete: {
    //                 __typename: 'UserRole',
    //                 id: id,
    //             }
    //         }
    //     });
    //     if ( res ) {

    //     }
    // }

    const handleDelete = () => {
        presentAlert({
            header: 'Confirm',
            message: 'Are you sure to delete?',
            buttons: [{text: 'No'}, {text: 'Yes', handler: () => {
                deleteUserRole({variables: {id: parseInt(id!)}})
            }}],
        })

    }

    const handleUpdate = () => {
        // console.log(organization);
        const res = client.writeQuery({
            query: gql`
                query updateUserRole($id: Int!, $userId: Int!, $app: Int!, $org: Int!, $role: Int!) {
                    createUserRole(
                        id: $id,
                        newUserRoleData: {
                            user_id: $userId,
                            app: $app,
                            org: $org,
                            role: $role
                        }
                    ) {
                        id
                    }
                }`,
            data: {
                createUserRole: {
                    __typename: 'UserRole',
                    id: id,
                    userId: 1,
                    app: application,
                    org: organization,
                    role: role
                }
            }
        });
        console.log(res);
    }

    if (pageData.loading) return null;

    return (
        <IonPage id="main-content">
            <Header title="Showcase" />
            { pageData.data && pageData.data.userRole.user_id && (
                <>
                    <IonToolbar className="inner-toolbar" color="white">
                        <IonButtons slot="start">
                            <IonButton href={`/users/${pageData.data.userRole.user_id}`} ><IonIcon icon={arrowBack}></IonIcon></IonButton>
                        </IonButtons>
                        <IonTitle>Edit Role</IonTitle>
                        <IonButtons slot="end">
                            <IonButton className='btn-delete' onClick={handleDelete} >Delete</IonButton>
                        </IonButtons>
                    </IonToolbar>
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
                                <IonRow>
                                    <IonCol>
                                        {/* <IonLabel position="floating">Email</IonLabel> */}
                                        <IonSelect onIonChange={(event) => setOrganizationValue(event)} value={pageData.data.userRole.organization.id} placeholder="Choose Organization Name" class="input-select">
                                            {pageData.data.organizations.map((item: any) => {
                                                return (
                                                    <IonSelectOption value={item.id}>{item.name}</IonSelectOption>
                                                )
                                            })}
                                        </IonSelect>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        {/* <IonLabel position="floating">Email</IonLabel> */}
                                        <IonSelect onIonChange={(event) => setAppllicationValue(event)} value={pageData.data.userRole.application.id} placeholder="Choose Application Name" class="input-select">
                                            {pageData.data.applications.map((item: any) => {
                                                return (
                                                    <IonSelectOption value={item.id}>{item.app_name}</IonSelectOption>
                                                )
                                            })}
                                        </IonSelect>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        {/* <IonLabel position="floating">Email</IonLabel> */}
                                        <IonSelect onIonChange={(event) => setRoleValue(event)}  value={pageData.data.userRole.userRole.id} placeholder="Choose Role" class="input-select">
                                            {pageData.data.roles.map((item: any) => {
                                                return (
                                                    <IonSelectOption value={item.id}>{item.name}</IonSelectOption>
                                                )
                                            })}
                                        </IonSelect>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol className='ion-text-center' >
                                        <IonButton href={`/users/${pageData.data.userRole.user_id}`} fill='clear' size="default">Cancel</IonButton>
                                        <IonButton onClick={handleUpdate} color="dark" size="default">Save</IonButton>
                                    </IonCol>
                                </IonRow>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonContent>
                </>
            )}
        </IonPage>
    )
}

export default EditRole;