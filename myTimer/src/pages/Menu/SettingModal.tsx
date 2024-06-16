import { IonButton, IonButtons, IonCheckbox, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonList, IonModal, IonPage, IonRange, IonSelect, IonSelectOption, IonText, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { arrowBackOutline, settingsOutline, shareOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { Share } from '@capacitor/share';
import { Haptics } from '@capacitor/haptics';

interface dataProps {
    setVibration: React.Dispatch<React.SetStateAction<boolean>>;
    setSound: React.Dispatch<React.SetStateAction<boolean>>;
    setColor: React.Dispatch<React.SetStateAction<string>>;
    setSoundStrenght: React.Dispatch<React.SetStateAction<number>>;
}
export const SettingModal: React.FC<dataProps> = ({ setVibration, setColor, setSound, setSoundStrenght }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [checked, setChecked] = useState(true);
    const [soundChecked, setSoundChecked] = useState(true);
    const [soundStrenght, setSoundStrength] = useState<number>(1);
    const [colorChecked, setColorChecked] = useState<string>("Favorite color");
    const [soundTone, setSoundTone] = useState<string>("Favorite tone");
    const [showColor, setShowColor] = useState<string>(colorChecked);
    const [showTone, setShowTone] = useState<string>(soundTone);

    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);

    function runVibration(){
        const duration = 100;
        console.log("reset clicked");
        Haptics.vibrate({ duration });
    }

    const handleVibrationCheckboxChange = (event: { detail: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        runVibration()
        setChecked(event.detail.checked);
        console.log('Vibration Checkbox value:', event.detail.checked);
        setVibration(event.detail.checked);
    };

    const handleSoundCheckboxChange = (event: { detail: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        runVibration()
        setSoundChecked(event.detail.checked);
        console.log('Sound checkbox value:', event.detail.checked);
        setSound(event.detail.checked);
    };

    const handleColorCheckboxChange = (event: CustomEvent) => {
        runVibration()
        const value = event.detail.value as string;
        setShowColor(value === "danger" ? "Red" : value === "Dark" ? "Black" : value === "success" ? "Green" : value === "dark" ? "White" : "Favorite color")
        setColorChecked(value)
        console.log('color value:', value);
        setColor(value);
    };

    const handleToneCheckboxChange = (event: CustomEvent) => {
        runVibration()
        const value = event.detail.value as string;
        setShowTone(value === "Tone1" ? "Tone 1" : value === "Tone2" ? "Tone 2" : value === "Tone3" ? "Tone 3" : "Favorite tone")
        setSoundTone(value)
        console.log('tone value:', value);
    };

    const handleSoundStrenghtCheckboxChange = (event: CustomEvent) => {
        runVibration()
        const value = event.detail.value as number;
        setSoundStrength(value);
        console.log('Sound checkbox value:', value);
        setSoundStrenght(value);
    };

    async function shareURL() {
        runVibration()
        try {
          await Share.share({
            url: 'https://mytimer-ab4a6.web.app',
          });
        } catch (error) {
          console.error('Error sharing:', error);
        }
      }

    useEffect(() => {
        //updation show color
    }, [showColor, handleColorCheckboxChange])
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>My Timer</IonTitle>
                    <IonButtons class='header-setting' slot="end">
                        <IonButton size='large' onClick={() => setShowModal(true)}>
                            <IonIcon icon={settingsOutline}></IonIcon>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Setting</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={() => setShowModal(false)}>
                                    <IonIcon size='large' icon={arrowBackOutline}></IonIcon>
                                </IonButton>

                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">

                        <IonList>
                            <IonItem>
                                <IonSelect label="Color" placeholder={showColor}
                                    onIonChange={handleColorCheckboxChange}>
                                    <IonSelectOption value="danger">Red</IonSelectOption>
                                    <IonSelectOption value="Dark">Black</IonSelectOption>
                                    <IonSelectOption value="success">Green</IonSelectOption>
                                    <IonSelectOption value="dark">White</IonSelectOption>
                                </IonSelect>
                            </IonItem>

                            <IonItem>
                                <IonCheckbox id='checkBox'
                                    checked={soundChecked}
                                    onIonChange={handleSoundCheckboxChange}
                                    style={{ marginLeft: 'auto' }}>Enable sound</IonCheckbox>
                            </IonItem>

                            <IonItem>
                                <IonSelect value={soundTone} onIonChange={handleToneCheckboxChange} label="Sound tone" labelPlacement="fixed" placeholder={showTone}>
                                    <IonSelectOption value="Tone1">Tone 1</IonSelectOption>
                                    <IonSelectOption value="Tone2">Tone 2</IonSelectOption>
                                    <IonSelectOption value="Tone3">Tone 3</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonList>

                        <IonRange value={soundStrenght} onIonChange={handleSoundStrenghtCheckboxChange}>
                            <div slot="label">
                                <IonText color="primary">Sound strength</IonText>
                            </div>
                        </IonRange>

                        <IonItem>
                            <IonCheckbox id='checkBox'
                                checked={checked}
                                onIonChange={handleVibrationCheckboxChange}
                                style={{ marginLeft: 'auto' }}>Enable vibration</IonCheckbox>
                        </IonItem>
                    </IonContent>

                    <IonFab vertical="bottom" horizontal="start" slot="fixed">
                        <IonFabButton onClick={shareURL}>
                            <IonIcon icon={shareOutline} />
                        </IonFabButton>
                    </IonFab>
                </IonModal>
                
                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message="Link copied to clipboard"
                    duration={2000}
                />
            </IonContent>
        </IonPage>
    );
}

export default SettingModal;
