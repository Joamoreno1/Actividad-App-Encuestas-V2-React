import React from "react";
import { useParams, Link } from "react-router-dom";

const Encuesta = ({ listaEncuestas, responderEncuesta }) => {
  const { id } = useParams();

  const encuesta = listaEncuestas.find((enc) => enc.id === parseInt(id));

  if (!encuesta) {
    return (
      <div>
        <h2>Encuesta no encontrada</h2>
        <Link to="/">Volver</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="encuesta-item-container">
        <div className="encuesta-item">
          <h2>{encuesta.titulo}</h2>
          <p>{encuesta.descripcion}</p>
          <br />
        </div>
      </div>

      <div className="encuesta-item-container">
        <div className="encuesta-item">
          <h2>Preguntas</h2>
          {!encuesta.preguntas || encuesta.preguntas.length === 0 ? (
            <p>Sin preguntas definidas.</p>
          ) : (
            encuesta.preguntas.map((pregunta) => (
              <div key={pregunta.id} style={{ marginBottom: '20px' }}>
                <p><strong>{pregunta.pregunta}</strong></p>
                <ol>
                  {pregunta.opciones.map((opcion) => (
                    <div key={opcion.id}>
                      <label>
                        <li>{opcion.texto}</li>
                      </label>
                    </div>
                  ))}
                </ol>
              </div>
            ))
          )}
          <br />
        </div>
      </div>
      <Link to="/">Volver</Link>
    </div>
  );
};

export default Encuesta;
