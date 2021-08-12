import { lazy, Suspense } from "react";
import "./App.css";
import { DataProvider } from "./utils/DataProvider";
const Header = lazy(() => import("./components/Header/index"));
const DateData = lazy(() => import("./components/DateData/index"));
const Table = lazy(() => import("./components/Table/index"));

function App() {
  const date = new Date()
  document.title = date.toDateString();

  return (
    <DataProvider>
      <Suspense fallback={<Loader />}>
        <div className="main-container">
          <Header />
          <DateData />
          <Table />
        </div>
      </Suspense>
    </DataProvider>
  );
}

export default App;

function Loader() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Loading...</h1>
    </div>
  );
}
