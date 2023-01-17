import React from "react"
import { 
    IonContent,
    IonHeader,
    IonMenu,
    IonTitle,
    IonToolbar
  } from '@ionic/react';

interface Props {
    title?: string;
}

const Menu: React.FC<Props> = (props) => {
    
    return (
        <>
            <IonMenu contentId="main-content">
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Menu Content</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">This is the menu content.</IonContent>
            </IonMenu>
        </>
    )

}

export default Menu