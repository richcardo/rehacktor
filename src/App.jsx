import "./App.css";
import { RouterProvider } from "react-router";
import router from "./Router/router";
import { UserContextProvider } from "./Context/UserContext";
function App() {
  return (
    <>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </>
  );
}

export default App;
