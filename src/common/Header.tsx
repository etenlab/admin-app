
import { IonHeader, IonButtons, IonBackButton, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom'

interface Props {
    title: string;
}

const  Header: React.FC<Props> = (props) => {
    const history = useHistory();

    const logout = () => {
        localStorage.clear();
        history.push('/login');
    };


    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/home" />
                </IonButtons>
                <IonTitle>{props.title}</IonTitle>
                <IonButtons slot="end">
                    <IonButton onClick={logout} >Logout</IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
    );
}

export default Header;