import React, { useState } from 'react';
import { IonCol, IonContent, IonGrid, IonInput, IonItem, IonPage, IonRow, IonButtons, IonButton, IonIcon, IonToolbar, IonTitle } from '@ionic/react';
import Header from '../common/Header';
// import { useQuery, gql } from '@apollo/client';
// import axios from "axios"
import { arrowBack, add, searchOutline } from 'ionicons/icons'
// import { ReactComponent as Funnel } from '../funnel.svg'
import { gql, useQuery } from '@apollo/client';

const GET_USERS = gql`
    query GetUsers {
        users {
            user_id
            active
            email
            is_email_verified
            username
            password
        }
    }
`;

const Users: React.FC = () => {

    // const { loading, error, data } = useQuery(GET_USERS);
    const [ search,  setSearch ] = useState('');
    // const [ userData,  setUserData ] = useState<any[]>([]);

    const { loading, error, data } = useQuery(GET_USERS);

    

    // console.log(data);
    /*
    useEffect( () => {
        const keycloakUrl = `${process.env.REACT_APP_KEYCLOAK_URL}`;
        let authToken = localStorage.getItem("authToken");
        // var tokenObj: any
        // if(authToken){
        //     tokenObj  = decodeToken(authToken);
        // }
        let usersArr:any = [];

        const fetchData1 =async () => {
            await axios.get(`${keycloakUrl}/admin/realms`, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `Bearer ${JSON.parse(authToken!)}`
                }
            }).then((response) => {
                // console.log(response);
                if(response.data.length){
                    response.data.forEach(async (element: any) => {
                        // console.log(element);
                        await axios.get(`${keycloakUrl}/admin/realms/${element.realm}/users`, {
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded",
                                "Authorization": `Bearer ${JSON.parse(authToken!)}`
                            }
                        }).then((res) => {
                            console.log(res);
                            res.data.forEach((user: any) => {
                                usersArr.push({
                                    id: user.id,
                                    email: user.email
                                });
                            })
                            setUserData(usersArr)
                            console.log(usersArr);
                        })
                    });
                }
            });
        }

        fetchData1().catch(console.error);
        /*
        const fetchData = async () => {
            //"http://localhost:8080/admin/realms/master/users"
            // if(checkTokenValidity(tokenObj)){
            // }
            // console.log("authToken")`
            // console.log(authToken)

            await axios.get(`${keycloakUrl}/admin/realms/master/users?search=${search}`, {
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
        * /
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])
    */

    if (loading) return null;
    if (error) return (
        <div>Error</div>
    );
    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error :</p>;

    return (
        <IonPage id="main-content">
            <Header title="Showcase" />
            
                
            <IonToolbar className="inner-toolbar" color="white">
                <IonButtons slot="start">
                    <IonButton href="/home" ><IonIcon icon={arrowBack}></IonIcon></IonButton>
                </IonButtons>
                <IonTitle>Users</IonTitle>
                <IonButtons slot="end">
                    <IonButton className='btn-dark' href="/home" >Add New<IonIcon slot="end" icon={add}></IonIcon></IonButton>
                </IonButtons>
            </IonToolbar> 
            
            <IonContent fullscreen>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonButton className='btn-filter' color="white" href="/user-filter" >
                                <img className='svg-funnel' src={require('../funnel.svg').default} alt='mySvgImage' /> Filters
                            </IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>``
                        <IonCol>
                            <IonItem>
                                <IonIcon icon={searchOutline}></IonIcon>
                                <IonInput value={search} onIonInput={(e:any) => setSearch(e.target.value)} placeholder="Find Users"></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            { data && (
                                data.users.map(( user:any) => (
                                    <IonItem key={user.id} href={`/users/${user.user_id}`}>{`${user.email}` }</IonItem>
                                ))
                            )}
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );

}

export default Users;
