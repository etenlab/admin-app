import React, { useEffect, useState } from 'react';
import { IonCol, IonContent, IonGrid, IonInput, IonItem, IonPage, IonRow } from '@ionic/react';
import Header from '../common/Header';
// import { useQuery, gql } from '@apollo/client';
import axios from "axios"

const Users: React.FC = () => {

    // const { loading, error, data } = useQuery(GET_USERS);
    const [ search,  setSearch ] = useState('');
    const [ userData,  setUserData ] = useState<any[]>([]);

    // console.log(data);

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
        */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])


    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error :</p>;

    return (
        <IonPage>
            <Header title="Users" />
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
                            <IonInput value={search} onIonInput={(e:any) => setSearch(e.target.value)} placeholder="Search"></IonInput>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            { userData && (
                                userData.map(( user:any) => (
                                    <IonItem key={user.id} href={`/users/${user.id}`}>{`${user.email}` }</IonItem>
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
