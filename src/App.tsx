import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonMenuToggle,
  setupIonicReact,
  IonSplitPane
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { addCircle, triangle } from "ionicons/icons";

import "./theme/variables.css";
import ListPage from "./pages/listpage/ListPage";
import EditPage from "./pages/editpage/EditPage";
import CreatePage from "./pages/createpage/CreatePage";
import Teste from "./pages/teste/Teste";


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <IonMenu side="start" menuId="first" content-id="main">
            <IonHeader>
              <IonToolbar>
                <IonTitle>Menu</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonList>
                <IonMenuToggle autoHide={false}>
                  <IonItem button href="/list">
                    <IonIcon slot="start" icon={triangle} />
                    <IonLabel>Lista de Pessoas</IonLabel>
                  </IonItem>
                  <IonItem button href="/create">
                    <IonIcon slot="start" icon={addCircle} />
                    <IonLabel>Novo Cadastro</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              </IonList>
            </IonContent>
          </IonMenu>
          <IonRouterOutlet id="main">
            <Route path="/list" component={ListPage} exact />
            <Route path="/teste" component={Teste} exact />
            <Route path="/edit/:id" component={EditPage} exact />
            <Route path="/create" component={CreatePage} exact />
            <Redirect from="/" to="/list" exact />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};


export default App;
