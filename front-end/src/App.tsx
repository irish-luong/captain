import { Refine } from "@pankod/refine";
import routerProvider from "@pankod/refine-react-router";

import "@pankod/refine/dist/styles.min.css";
import simpleRestDataProvider from "@pankod/refine-simple-rest";

function App() {
  const API_URL = "https://api.fake-rest.refine.dev";
  const dataProvider = simpleRestDataProvider(API_URL);
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider}
    ></Refine>
  );
}

export default App;
