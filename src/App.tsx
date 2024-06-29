import { Suspense, lazy } from "react";
// import Header from "./Header";
const Header = lazy(() => import("microfe1/Header"));
const BodyPlaceholder = lazy(() => import("microfe1/BodyPlaceholder"));
const Footer = lazy(() => import("microfe1/Footer"));

const App = () => {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <BodyPlaceholder />
        <Footer />  
      </Suspense>
    </div>
  );
}

export default App;
