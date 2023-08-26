import Tela404 from "./telas/Tela404";
import TelaCadTurma from "./telas/TelaCadTurma";
import TelaMenu from "./telas/TelaMenu";
import TelaDoacao from "./telas/TelaDoacao";
import TelaCadSugest from "./telas/TelaCadSugest";
import TelaCadVisitantes from "./telas/TelaCadVisitantes";
import TelaCadPacientes from "./telas/TelaCadPacientes";
import TelaCadMedicacoes from "./telas/TelaCadMedicacoes";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/cadastroPacientes" element={<TelaCadPacientes />} />
          <Route path="/cadastroTurma" element={<TelaCadTurma />} />
          <Route path="/cadastroDoacao" element={<TelaDoacao />} />
          <Route path="/cadastroSugestao" element={<TelaCadSugest />} />
          <Route path="/cadastroVisitantes" element={<TelaCadVisitantes />} />
          <Route path="/cadastroMedicacoes" element={<TelaCadMedicacoes/>}/>
          <Route path="/" element={<TelaMenu />} />
          <Route path="*" element={<Tela404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
