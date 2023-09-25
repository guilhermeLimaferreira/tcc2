import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonPage,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonMenuButton,
  IonButtons,
} from "@ionic/react";
import { getPessoas, deletePessoa } from "../../services/apiServices";

type Pessoa = {
  ID: number;
  Nome: string;
  Sobrenome: string;
  Telefone: string;
  Email: string;
};

const ListPage: React.FC = () => {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);

  useEffect(() => {
    const fetchPessoas = async () => {
      try {
        const response = await getPessoas();
        if (response.data.success) {
          setPessoas(response.data.data);
        }
      } catch (error) {
        console.log("Erro ao buscar pessoas:", error);
      }
    };
    fetchPessoas();
  }, []);

  useEffect(() => {
    pessoas.map((pessoa) => {
      console.log(pessoa);
    });
  }, [pessoas]);

  const handleDelete = async (id: number) => {
    try {
      const { data } = await deletePessoa(id);
      if (data.success) {
        setPessoas(pessoas.filter((pessoa) => pessoa.ID !== id));
      }
    } catch (error) {
      console.log("Erro ao deletar pessoa:", error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Lista de Pessoas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {pessoas.map((pessoa) => (
            <IonItem key={pessoa.ID}>
              <IonLabel>
                {pessoa.Nome} {pessoa.Sobrenome}
              </IonLabel>
              <IonButton onClick={() => handleDelete(pessoa.ID)} color="danger">
                Delete
              </IonButton>
              <IonButton routerLink={`/edit/${pessoa.ID}`} color="primary">
                Edit
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ListPage;
