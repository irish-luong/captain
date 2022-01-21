import { Refine } from "@pankod/refine";
import routerProvider from "@pankod/refine-react-router";

import "@pankod/refine/dist/styles.min.css";
import dataProvider from "@pankod/refine-simple-rest";


// Project modules
import authProvider from "middleware"
import { OrderList } from "pages/orders"

const App: React.FC = () => {
  return (
    <Refine
      authProvider={authProvider}
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          list: OrderList
        },
        {
          name: "drivers"
        }
      ]}
    ></Refine>
  );
};

export default App;
