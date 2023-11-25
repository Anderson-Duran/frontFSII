import Tela404 from "./telas/Tela404";
import TelaLogin from "./telas/TelaLogin";
import TelaCadTurma from "./telas/TelaCadTurma";
import TelaMenu from "./telas/TelaMenu";
import TelaDoacao from "./telas/TelaDoacao";
import TelaCadSugest from "./telas/TelaCadSugest";
import TelaCadVisitantes from "./telas/TelaCadVisitantes";
import TelaCadPacientes from "./telas/TelaCadPacientes";
import TelaCadMedicacoes from "./telas/TelaCadMedicacoes";
import TelaCadUser from "./telas/TelaCadUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./contextos/authContext";


function App() {

  const { user, setUser } = useContext(AuthContext);

  const Private = ({ children }) => {

    console.log(user);

    return !!user ? children : <TelaLogin />
  }


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<TelaLogin />} />
          <Route path="/cadastroPacientes" element={<Private><TelaCadPacientes /></Private>} />
          <Route path="/cadastroTurma" element={<TelaCadTurma />} />
          <Route path="/cadastroDoacao" element={<TelaDoacao />} />
          <Route path="/cadastroSugestao" element={<TelaCadSugest />} />
          <Route path="/cadastroVisitantes" element={<TelaCadVisitantes />} />
          <Route path="/cadastroMedicacoes" element={<TelaCadMedicacoes />} />
          <Route path="/cadastroUsuario" element={<Private><TelaCadUser/></Private>} />
          <Route path="/home" element={<TelaMenu />} />
          <Route path="*" element={<Tela404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
