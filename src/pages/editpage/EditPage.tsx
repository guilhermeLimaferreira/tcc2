import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonItem,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonBackButton,
  IonButtons,
  IonAlert,
} from "@ionic/react";
import { updatePessoa, getPessoaById } from "../../services/apiService";
import { RouteComponentProps, useHistory } from "react-router";

const EditPage: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const [nome, setNome] = useState<string>("");
  const [sobrenome, setSobrenome] = useState<string>("");
  const [idade, setIdade] = useState<number | null>(null);
  const [email, setEmail] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const id = match.params.id;
      const { data } = await getPessoaById(id);
      if (data.success) {
        setNome(data.data.Nome);
        setSobrenome(data.data.Sobrenome);
        setIdade(data.data.Idade);
        setEmail(data.data.Email);
        setTelefone(data.data.Telefone);
      }
    };
    fetchData();
  }, []);

  const [showAlert, setShowAlert] = useState(false); // novo estado para controlar o alerta
  const history = useHistory(); // instanciando o useHistory

  const handleUpdate = async () => {
    const id = match.params.id;
    const data: object = {
      Nome: nome,
      Sobrenome: sobrenome,
      Idade: idade,
      Email: email,
      Telefone: telefone,
    };
    const { data: responseData } = await updatePessoa(id, data);
    if (responseData.success) {
      console.log(data);      
      setShowAlert(true); // mostrar o alerta
    }
  };

  const handleOkClick = () => {
    history.push("/list"); // redirecionar para a tela ListPage
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Editar Pessoa</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
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
            onIonChange={(e) => setIdade(Number(e.detail.value!))}
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="Email"
            type="email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="Telefone"
            value={telefone}
            onIonChange={e => {
              const value = e.detail.value!;
              console.log("Valor em tempo real:", value);
              if (value !== null) {
                setTelefone(value);
              }
            }}
          />
        </IonItem>
        <IonButton onClick={handleUpdate}>Atualizar</IonButton>
      </IonContent>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={"Atualização"}
        message={"Dados atualizados com sucesso!"}
        buttons={[
          {
            text: "Ok",
            handler: handleOkClick,
          },
        ]}
      />
    </IonPage>
  );
};

export default EditPage;
