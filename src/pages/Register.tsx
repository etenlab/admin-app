import React, { useState } from "react";
// import { useHistory } from 'react-router-dom'
// import axios from "axios"
import { 
    IonPage, 
    IonContent, 
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonItem,
    IonInput
    
} from "@ionic/react";

const Register: React.FC = () => {

    const [loginMessage] = useState("");
    const [, setUsername] = useState("");
    const [, setPassword] = useState("");
    const [, setConfirmPassword] = useState("");

    const handleLogin = () =>{

    }

    return (
        <>
            <IonPage className="login-page" id="main-content">

                <IonContent  class="auth-form" fullscreen>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <h2>Register</h2>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                {loginMessage!=="" && (
                                    <IonItem lines="none"><span className="error">{loginMessage}</span></IonItem>
                                )}
                            </IonCol>
                        </IonRow>
                        
                        <IonRow>
                            <IonCol>
                                {/* <IonLabel position="floating">Email</IonLabel> */}
                                <IonInput onIonInput={(e: any) => setUsername(e.target.value)} type="email" class="input-text" required></IonInput>
                            </IonCol>
                        </IonRow>

                        <IonRow>
                            <IonCol>
                                {/* <IonLabel position="floating">Password</IonLabel> */}
                                <IonInput onIonInput={(e: any) => setPassword(e.target.value)} type="password" class="input-text" required></IonInput>
                            </IonCol>
                        </IonRow>

                        <IonRow>
                            <IonCol>
                                {/* <IonLabel position="floating">Password</IonLabel> */}
                                <IonInput onIonInput={(e: any) => setConfirmPassword(e.target.value)} type="password" class="input-text" required></IonInput>
                            </IonCol>
                        </IonRow>

                        <IonRow>
                            <IonCol>
                            <IonButton onClick={handleLogin} expand="block" color="dark" size="default">Login</IonButton>
                            </IonCol>
                        </IonRow>

                        <IonRow>
                            <IonCol>
                            <h3 className="text-center">Do you have an account?</h3>
                            </IonCol>
                        </IonRow>

                    </IonGrid>
                </IonContent>

            </IonPage>
        </>
    )

}

export default Register;