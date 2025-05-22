import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Importe useParams para acessar os parâmetros da URL
import "../styles/MotoDetail.css"; // Importe o arquivo CSS
import "../Components.css";

const MotoDetail = () => {
  const { id } = useParams(); // Obtém o ID da moto da URL
  const [moto, setMoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMotoDetail = async () => {
      try {
        const response = await fetch(
          // "https://royalenfiledapi.onrender.com/REmotos" //url API
          "https://api-teste.vicentedeveloper.com/api.php" //url raw github
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const motos = await response.json();
        const selectedMoto = motos.find((m) => m.id === parseInt(id));

        if (selectedMoto) {
          setMoto(selectedMoto);
          setLoading(false);
        } else {
          setError("Moto não encontrada :(");
          setLoading(false);
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes da moto:", error);
        setError("Erro ao carregar os detalhes");
        setLoading(false);
      }
    };

    fetchMotoDetail();
  }, [id]); // Executa o efeito sempre que o ID da URL mudar

  if (loading) {
    return <div>Carregando detalhes da moto...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!moto) {
    return null; // Ou outra mensagem se a moto não for encontrada após o carregamento
  }

  return (
    <section className="moto-detail" id="moto-detail">
      <div className="moto-presentation" id="moto-presentation">
        <div className="moto-presentation__img">
          <img src={moto.image_two_link} alt={moto.name} />
        </div>
        <div className="moto-presentation__description">
          <h1>{moto.name}</h1>
          <p>{moto.description}</p>
          <div className="comprar-container">
            <p>R$ {moto.price.toLocaleString("pt-BR")}</p>
            <button
              id="comprar"
              className="btn-primary"
              onClick={() => {
                // Aqui você implementaria a lógica de compra
                window.location.href = "#"; // Mantendo o comportamento original por enquanto
              }}
            >
              Comprar
            </button>
          </div>
        </div>
      </div>

      <div className="divisory">
        <h2 className="divisory__title">Detalhes</h2>
      </div>

      <div className="detail" id="detail">
        <img
          src={moto.image_three_link}
          alt={moto.name}
          className="image-detail"
        />
      </div>
    </section>
  );
};

export default MotoDetail;
