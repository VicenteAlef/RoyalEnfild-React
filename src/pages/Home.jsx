import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HeroBanner } from "../Components";

const Home = () => {
  const [motos, setMotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMotos = async () => {
      try {
        const response = await fetch(
          // "https://royalenfiledapi.onrender.com/REmotos" //url API Node
          "https://api-teste.vicentedeveloper.com/api-royal-enfield.php" //url API PHP
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMotos(data);
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
    return <div className="w-full min-h-screen bg-gray-800"></div>;
  }

  if (error) {
    return <div>Erro ao carregar as motos: {error}</div>;
  }

  return (
    <>
      <HeroBanner />
      <div className="flex items-center justify-center h-10 bg-black border-y-5 border-red-600 py-5">
        <h2 className="text-3xl text-white">Escolha sua Moto</h2>
      </div>
      <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-10 px-2 sm:px-[10%] pt-15 pb-50 bg-gray-800">
        {motos.map((moto) => (
          <div
            className="max-w-[450px] mx-auto flex flex-col items-center justify-end bg-gray-100 py-2 sm:py-10 rounded-lg"
            key={moto.id}
          >
            <div className="overflow-hidden mb-10">
              <img
                src={moto.image_three_link}
                alt={moto.name}
                className="scale-110 transform transition-transform duration-300 hover:scale-118"
              />
            </div>

            <div className="flex flex-col gap-2 items-center justify-center">
              <p className="text-3xl font-medium">{moto.name}</p>
              <p className="mb-5 text-lg">
                R$ {moto.price.toLocaleString("pt-BR")}
              </p>
              <Link
                to={`/moto-detail/${moto.id}`}
                className="bg-red-600 hover:bg-red-700 py-1 px-5 rounded-full text-white font-semibold"
              >
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
