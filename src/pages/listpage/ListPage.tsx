import React, { useEffect, useRef, useState } from "react";
import './ListPage.css';
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
  IonGrid,
  IonRow,
  IonCol,
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
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [noMoreData, setNoMoreData] = useState(false);
  const anchor = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isLoading && !noMoreData) {
        loadMorePessoas();
      }
    }, { threshold: 0.1 });

    if (anchor.current) {
      observer.observe(anchor.current);
    }

    return () => observer.disconnect();
  }, [isLoading, noMoreData]);

  const loadMorePessoas = async () => {
    if (isLoading || noMoreData) return;

    setIsLoading(true);
    try {
      const response = await getPessoas(offset);
      if (response && response.data.success) {
        const newPessoas: Pessoa[] = response.data.data;

        const uniqueNewPessoas = newPessoas.filter(newPessoa => 
          !pessoas.some(existingPessoa => existingPessoa.ID === newPessoa.ID)
        );

        if (uniqueNewPessoas.length === 0) {
          setNoMoreData(true);
        } else {
          setPessoas(prev => [...prev, ...uniqueNewPessoas]);
          setOffset(prevOffset => prevOffset + uniqueNewPessoas.length); // Atualiza o offset
        }
      }
    } catch (error) {
      console.log("Erro ao carregar mais pessoas:", error);
    }
    setIsLoading(false);
  };

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
      <IonContent className="ion-padding">
        <div className="contador-flutuante">
          Registros Carregados: {pessoas.length}
        </div>
        <IonGrid class="ion-align-items-center">
          <IonRow class="ion-justify-content-center">
            <IonCol size="12">
              <IonList>
                {pessoas.map((pessoa) => (
                  <IonItem key={pessoa.ID}>
                    <IonLabel>
                      {pessoa.Nome} {pessoa.Sobrenome}
                    </IonLabel>
                    <IonButton
                      onClick={() => handleDelete(pessoa.ID)}
                      color="danger"
                    >
                      Delete
                    </IonButton>
                    <IonButton
                      routerLink={`/edit/${pessoa.ID}`}
                      color="primary"
                    >
                      Edit
                    </IonButton>
                  </IonItem>
                ))}
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
        <div ref={anchor}></div> {/* Elemento de âncora para IntersectionObserver */}
      </IonContent>
    </IonPage>
  );
};

export default ListPage;
