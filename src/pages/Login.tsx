import { useState } from "react";
// import { useIonToast } from '@ionic/react';
import { useHistory } from 'react-router-dom'
import axios from "axios"
import { 
    IonPage, 
    IonContent, 
    IonHeader,
    IonToolbar, 
    IonTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonItem,
    IonLabel,
    IonInput
    
} from "@ionic/react";



const querystring = require("query-string");

const Login: React.FC = () => {
    const history = useHistory();
    // const [present] = useIonToast();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState("");
    // const [token, setToken] = useState("");

    // const presentToast = (position: 'top' | 'middle' | 'bottom', message: string) => {
    //     present({
    //       message: message,
    //       duration: 3000,
    //       position: position
    //     });
    // };
    

    const handleLogin =  async () => {

        // console.log(process.env.REACT_APP_KEYCLOAK_URL);
        // console.log(username)
        // console.log(password)
        // var querystring = require('querystring');
        const keycloakUrl = "http://localhost:8080/realms/master/protocol/openid-connect";
        // const keycloakUrl = `${process.env.REACT_APP_KEYCLOAK_URL}/realms/${process.env.REACT_APP_KEYCLOAK_REALM}/protocol/openid-connect`;

        await axios.post(`${keycloakUrl}/token`, querystring.stringify({
            client_id: 'admin-app', // process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
            // client_secret: process.env.REACT_APP_KEYCLOAK_CLIENT_SECRET,
            username: username,
            password: password,
            grant_type: 'password' //'client_credentials'
        }),{
            headers: { 
              "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then( async (response) => {
            console.log("response.data.access_token");
            console.log(response.data.access_token)
            // setToken(response.data.access_token)
            localStorage.setItem('authToken', JSON.stringify(response.data.access_token))
            // return <Navigate to='/home' />
            history.push('/home');
            // const headers = {
            //     "Content-Type": "application/x-www-form-urlencoded",
            //     'Authorization': `Bearer ${response.data.access_token}`
            // };
            // await axios.get(`${keycloakUrl}/userinfo`, {headers}).then((resp) => {
            //     console.log(resp.data)
            //     localStorage.clear();
            //     let userData = {
            //         token: token,
            //         profile: resp.data
            //     };
            //     localStorage.setItem('userAuth', JSON.stringify(userData))
            //     console.log("saved to local storage")
                
            // }).catch((e) => {
            //     console.log(e)
            //     presentToast('bottom', e.response.dadta.error_description)
            // });

        }).catch(er => {
            if(er.message){
                setLoginMessage(er.response?.data.error_description)
            }
        });
    }

    return (
        <IonPage className="login-page">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent  class="auth-form" fullscreen>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            {loginMessage!=="" && (
                                <IonItem lines="none"><span className="error">{loginMessage}</span></IonItem>
                            )}
                            <IonItem lines="none">
                                <IonLabel position="floating">Email</IonLabel>
                                <IonInput onIonInput={(e: any) => setUsername(e.target.value)} type="email" required></IonInput>
                            </IonItem>
                            <IonItem lines="none">
                                <IonLabel position="floating">Password</IonLabel>
                                <IonInput onIonInput={(e: any) => setPassword(e.target.value)} type="password" required></IonInput>
                            </IonItem>
                            <IonItem lines="none">
                                <IonButton onClick={handleLogin} expand="block" color="primary">Login</IonButton>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );

}

export default Login;