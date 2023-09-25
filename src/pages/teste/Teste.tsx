import React from "react";
import { IonContent, IonPage, IonInput, IonItem, IonButton } from "@ionic/react";

const Teste: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonItem>
          <IonInput
            aria-label="Teste"
            onIonChange={(e) => console.log(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
            <IonButton>
                TEste
            </IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Teste;
