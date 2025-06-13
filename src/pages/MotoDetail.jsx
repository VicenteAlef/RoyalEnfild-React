import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Importe useParams para acessar os parâmetros da URL

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
      <div className="grid lg:grid-cols-2" id="moto-presentation">
        <div className="flex items-center bg-gray-950">
          <img src={moto.image_two_link} alt={moto.name} className="w-full" />
        </div>
        <div className="flex flex-col bg-black text-white p-10 md:p-30 md:py-25">
          <h1 className="text-3xl text-red-600 font-semibold mb-5 sm:mb-10">
            {moto.name}
          </h1>
          <p className="mb-5 sm:mb-10 md:text-xl">{moto.description}</p>
          <div className="w-full flex justify-center itens-center gap-20">
            <p className="text-xl">R$ {moto.price.toLocaleString("pt-BR")}</p>
            <button
              id="comprar"
              className="py-1 px-7 bg-red-600 hover:bg-red-700 rounded-full cursor-pointer"
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

      <div className="w-full flex items-center justify-center bg-black border-t-5 pb-1 border-red-600">
        <h2 className="text-3xl text-white">Detalhes</h2>
      </div>

      <div className="detail" id="detail">
        <img
          src={moto.image_three_link}
          alt={moto.name}
          className="mx-auto"
        />
      </div>
    </section>
  );
};

export default MotoDetail;
