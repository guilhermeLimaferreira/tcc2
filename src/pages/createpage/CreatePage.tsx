import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonItem,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
} from "@ionic/react";
import { createPessoa } from "../../services/apiService";

const CreatePage: React.FC = () => {
  const [nome, setNome] = useState<string>("");
  const [sobrenome, setSobrenome] = useState<string>("");
  const [idade, setIdade] = useState<number | null>(null);
  const [email, setEmail] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");

  const handleCreate = async () => {
    if (nome && sobrenome && idade !== null) {
      const data = {
        Nome: nome,
        Sobrenome: sobrenome,
        Idade: idade,
        Email: email,
        Telefone: telefone,
      };

      try {
        const response = await createPessoa(data);
        if (response.data.success) {
          console.log("Pessoa criada com sucesso!");
        } else {
          console.error("Falha ao criar pessoa");
        }
      } catch (error) {
        console.error("Erro ao criar pessoa:", error);
      }
    } else {
      console.warn("Todos os campos são obrigatórios");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Criar Pessoa</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonInput
            label="Nome"
            value={nome}
            onIonChange={(e) => setNome(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="Sobrenome"
            value={sobrenome}
            onIonChange={(e) => setSobrenome(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="Idade"
            type="number"
            value={idade}
            onIonChange={(e) => setIdade(Number(e.detail.value))}
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="Email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="Telefone"
            value={telefone}
            onIonChange={(e) => setTelefone(e.detail.value!)}
          />
        </IonItem>
        <IonButton expand="block" onClick={handleCreate}>
          Criar Pessoa
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default CreatePage;
