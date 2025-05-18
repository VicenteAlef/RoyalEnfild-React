import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css"; // Importe o arquivo CSS
import { HeroBanner } from "../Components";

const Home = () => {
  const [motos, setMotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMotos = async () => {
      try {
        const response = await fetch(
          "https://royalenfiledapi.onrender.com/REmotos"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMotos(data);
        console.log(response);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar motos:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMotos();
  }, []); // O array vazio significa que este efeito será executado apenas uma vez (na montagem do componente)

  if (loading) {
    return <div>Carregando motos...</div>;
  }

  if (error) {
    return <div>Erro ao carregar as motos: {error}</div>;
  }

  return (
    <>
      <HeroBanner />
      <div className="divisory">
        <h2 className="divisory__title">Escolha sua Moto</h2>
      </div>
      <section className="moto-list__container">
        {motos.map((moto) => (
          <div className="moto-list__item" key={moto.id}>
            <img
              src={moto.image_one_link}
              alt={moto.name}
              className="moto-list__img grow-hover"
            />
            <div className="moto-list__details">
              <p className="detail-name">{moto.name}</p>
              <p className="detail-price">
                R$ {moto.price.toLocaleString("pt-BR")}
              </p>
              <Link to={`/moto-detail/${moto.id}`} className="btn-primary">
                Detalhes
              </Link>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default Home;
