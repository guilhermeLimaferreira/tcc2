import React, { useState } from "react";
import { IonContent, IonPage, IonInput, IonItem, IonButton } from "@ionic/react";

const Teste: React.FC = () => {
const [teste, setTeste] = useState<string>();



  return (
    <IonPage>
      <IonContent>
        <IonItem>
          <IonInput
            aria-label="Teste"
            onIonChange={(e) => setTeste(e.detail.value!)}
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
