import React, { useState } from "react";
import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./components/Inicio";
import CrearEncuesta from "./components/CrearEncuesta";
import Encuesta from "./components/Encuesta";
import Menu from './components/Menu';
import NotFound from './components/NotFound';
import encuestasIniciales from './data/encuestas.json';

function App() {
  const [listaEncuestas, setListaEncuestas] = useState(encuestasIniciales);

  const agregarEncuesta = (nuevaEncuesta) => {
    nuevaEncuesta.id = listaEncuestas.length + 1;
    nuevaEncuesta.preguntas = []; // Se inicializa vacío ya que el form básico solo maneja título y descripción
    setListaEncuestas([...listaEncuestas, nuevaEncuesta]);
  };

  const responderEncuesta = (id, respuestas) => {
    const nuevasEncuestas = listaEncuestas.map(enc => {
      if (enc.id === parseInt(id)) {
        return { ...enc, respuestas: [respuestas] };
      }
      return enc;
    });
    setListaEncuestas(nuevasEncuestas);
  };

  return (
    <BrowserRouter>
      <Menu />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Inicio listaEncuestas={listaEncuestas} />} />
          <Route path="/encuesta/crear" element={<CrearEncuesta agregarEncuesta={agregarEncuesta} />} />
          <Route path="/encuesta/:id" element={<Encuesta listaEncuestas={listaEncuestas} responderEncuesta={responderEncuesta} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
