import React, { useState } from 'react';
import { useParams } from 'react-router';
import { IonCol, IonContent, IonGrid, IonPage, IonRow, IonItem, IonLabel, IonSelect, IonSelectOption, IonButton, SelectChangeEventDetail, useIonToast } from '@ionic/react';
import Header from '../common/Header';
import { ParamTypes } from '../utils/utils';
import { gql, useQuery, useMutation } from '@apollo/client';
import { IonSelectCustomEvent } from '@ionic/core';
import { useHistory } from "react-router-dom";

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
    }
`;

const POST_ROLE = gql`
    mutation createUserRole ($userId: Int!, $app: Int!, $org: Int!, $role: Int!) {
        createUserRole (newUserRoleData: {
            user_id: $userId,
            app: $app,
            org: $org,
            role: $role
        }) {
            id
        }
    }
`;



const AssignRole: React.FC = () => {
    const history = useHistory();
    // const [presentAlert] = useIonAlert();
    const [toast] = useIonToast();
    let { userid } = useParams<ParamTypes>();
    const { loading, error, data } = useQuery(GET_DATA);
    // const client = useApolloClient();
    const [createUserRole, createRes] = useMutation(POST_ROLE, {
        onCompleted(){
            console.log("Success");
            presentToast('bottom', "User Role Assigned successfully");
            history.push(`/users/${userid}`);
        },
        onError(){
            console.log("Failed");
            presentToast('bottom',"User role Assigning failed" );
        }
    });
    const [organization, setOrganization] = useState(0);
    const [application, setApplication] = useState();
    const [role, setRole] = useState();
    const presentToast = (position: 'top' | 'middle' | 'bottom', message: string) => {
        toast({
          message: message,
          duration: 1500,
          position: position
        });
    };
    // console.log(props.client); 

    // const [
    //     handleAdd, 
    //     { resLoading, result }
    //   ] = useLazyQuery(POST_ROLE);
    const setOrganizationValue = (event: IonSelectCustomEvent<SelectChangeEventDetail<any>>) => {
        setOrganization(event.target.value);
    }

    const setAppllicationValue = (event: IonSelectCustomEvent<SelectChangeEventDetail<any>>) => {
        setApplication(event.target.value);
    }
    
    const setRoleValue = (event: IonSelectCustomEvent<SelectChangeEventDetail<any>>) => {
        setRole(event.target.value);
    }

    const handleAdd = () => {
        // console.log(organization);
        createUserRole({variables: {userId: 1, app: application, org: organization, role: role}});

        if(createRes.data){
            console.log("Success");
            presentToast('bottom', "User Role deleted successfully");
            history.push(`/users/${userid}`);
        }

        if(createRes.error){
            console.log("Failed");
            presentToast('bottom',"User role delete failed" );
        }
    }

    if (loading) return null;

    return (
        <IonPage id="main-content">
            <Header title="Showcase" />
            <IonContent fullscreen>
                {/* <IonHeader collapse="condense">
                <IonToolbar>
                    <IonTitle size="large">Blank</IonTitle>
                </IonToolbar>
                </IonHeader>
                <ExploreContainer /> */}
                <IonGrid>
                    {loading && (
                        <IonItem>Loading..</IonItem>
                    )}
                    {error && (
                        <IonItem>{error.message}</IonItem>
                    )}
                    <IonRow>
                        <IonCol>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel className='user-title'>Assign New Role</IonLabel>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                {/* <IonLabel position="floating">Email</IonLabel> */}
                                <IonSelect onIonChange={(event) => setOrganizationValue(event)} placeholder="Choose Organization Name" class="input-select">
                                    {data.organizations.map((item: any) => {
                                        return (
                                            <IonSelectOption key={item.id} value={item.id}>{item.name}</IonSelectOption>
                                        )
                                    })}
                                </IonSelect>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                {/* <IonLabel position="floating">Email</IonLabel> */}
                                <IonSelect onIonChange={(event) => setAppllicationValue(event)} placeholder="Choose Application Name" class="input-select">
                                    {data.applications.map((item: any) => {
                                        return (
                                            <IonSelectOption key={item.id} value={item.id}>{item.app_name}</IonSelectOption>
                                        )
                                    })}
                                </IonSelect>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                {/* <IonLabel position="floating">Email</IonLabel> */}
                                <IonSelect onIonChange={(event) => setRoleValue(event)} placeholder="Choose Role" class="input-select">
                                    {data.roles.map((item: any) => {
                                        return (
                                            <IonSelectOption key={item.id} value={item.id}>{item.name}</IonSelectOption>
                                        )
                                    })}
                                </IonSelect>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol className='ion-text-center' >
                                <IonButton href={`/users/${userid}`} fill='clear' size="default">Cancel</IonButton>
                                <IonButton onClick={handleAdd} color="dark" size="default">+ Add New</IonButton>
                            </IonCol>
                        </IonRow>
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

export default AssignRole;