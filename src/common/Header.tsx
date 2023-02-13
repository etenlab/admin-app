import { IonHeader, IonButtons, IonMenuButton, IonTitle, IonToolbar } from '@ionic/react';
import Menu  from './Menu'

interface Props {
    title: string;
}

const  Header: React.FC<Props> = (props) => {
    


    return (
        <>
            <Menu />
            <IonHeader>
                <IonToolbar>
                    <IonTitle >{props.title}</IonTitle>
                    <IonButtons slot="end">
                        <IonMenuButton color='dark'></IonMenuButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
        </>
        
    );
}

export default Header;