import Allroutes from "./Routes/Allroutes";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Allroutes />
    </>
  );
}

export default App;
