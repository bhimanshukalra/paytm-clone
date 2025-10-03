import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignIn, Dashboard, SendMoney, SignUp } from "./pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes location={"/signup"}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
