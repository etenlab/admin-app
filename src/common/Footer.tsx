import React from "react";
import { IonFooter, IonToolbar, IonButtons, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom'

const Footer: React.FC = () => {

    const history = useHistory();

    const logout = () => {
        localStorage.clear();
        history.push('/login');
    };

    return (
        <>
            <IonFooter>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={logout} >Logout</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonFooter>
        </>
    );

}

export default Footer;