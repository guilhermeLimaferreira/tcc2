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
  IonLabel,
} from "@ionic/react";
import { createPessoa } from "../../services/apiService";

const CreatePage: React.FC = () => {
  const [nome, setNome] = useState<string>("");
  const [sobrenome, setSobrenome] = useState<string>("");
  const [idade, setIdade] = useState<number | null>(null);
  const [email, setEmail] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");

  const [message, setMessage] = useState<string>("");

  const generateRandomData = () => {
    const name = `Nome${Math.floor(Math.random() * 1000)}`;
    const surname = `Sobrenome${Math.floor(Math.random() * 1000)}`;
    const age = Math.floor(Math.random() * 80) + 1; // Garantir que a idade seja pelo menos 1
    const email = `${name}@example.com`;
    const phone = `${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`;
    // Garantir que o telefone não seja "000-000-0000"
  
    return {
      Nome: name,
      Sobrenome: surname,
      Idade: age,
      Email: email,
      Telefone: phone,
    };
  }
  

  const handleMassInsertion = async () => {
    const inputCount = prompt("Digite a quantidade de registros para inserção massiva:", "10");
  
    // Verificar se o inputCount não é null
    if (inputCount === null) {
      alert("Inserção cancelada pelo usuário.");
      return;
    }
  
    const count = parseInt(inputCount, 10);
  
    // Verificar se a contagem é um número válido
    if (isNaN(count) || count <= 0) {
      alert("Por favor, insira um número válido.");
      return;
    }
  
    setMessage("Iniciando inserção...");
    const startTime = new Date().getTime();
  
    for(let i = 0; i < count; i++) {
      const randomData = generateRandomData();
      console.log(randomData);      
      await createPessoa(randomData);
    }
  
    const endTime = new Date().getTime();
    const timeTaken = endTime - startTime;
    setMessage(`Inserção concluída em ${timeTaken} milissegundos.`);
  }

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
            onIonInput={(e: any) => setNome(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="Sobrenome"
            value={sobrenome}
            onIonInput={(e: any) => setSobrenome(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="Idade"
            type="number"
            value={idade}
            onIonInput={(e: any) => setIdade(Number(e.detail.value))}
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="Email"
            value={email}
            onIonInput={(e: any) => setEmail(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="Telefone"
            value={telefone}
            onIonInput={(e: any) => setTelefone(e.detail.value!)}
          />
        </IonItem>
        <IonButton expand="block" onClick={handleCreate}>
          Criar Pessoa
        </IonButton>
        <IonButton onClick={() => handleMassInsertion()}>Inserir registros em massa</IonButton>
        <p>
        <IonLabel>{message}</IonLabel>
        </p>
      </IonContent>
    </IonPage>
  );
};

export default CreatePage;
