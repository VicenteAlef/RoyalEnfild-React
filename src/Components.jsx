// Components.jsx
import React, { useState, useEffect, useRef } from "react";
import "./components.css"; // Importe o arquivo CSS

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header-container">
      <div className="header-first-bar">
        <button className="hamburger-menu" onClick={toggleMenu}>
          ☰
        </button>
        <a href="/" className="none">
          <img
            src="Assets/Royal_Enfield_logo_letters.png"
            alt=""
            className="header-logo1 grow-hover"
          />
        </a>
        <a href="/" className="none">
          <img
            src="Assets/Royal_Enfield-Logo_R.png"
            alt=""
            className="header-logo2"
          />
        </a>
      </div>

      <nav className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
        <ul>
          <li className="grow-hover">
            <a className="nav-links" href="/">
              Home
            </a>
          </li>
          <li className="grow-hover">
            <a className="nav-links" href="#">
              Test-Drive
            </a>
          </li>
          <li className="grow-hover">
            <a className="nav-links" href="#">
              Acessórios
            </a>
          </li>
          <li className="grow-hover">
            <a className="nav-links" href="#">
              Assistência
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export const HeroBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = [
    {
      mobile: "Assets/shotgun-mobile-link.png",
      web: "Assets/shotgun-web-link.png",
      alt: "Imagem 1",
    },
    {
      mobile: "Assets/fev-continental-mobile-2.png",
      web: "Assets/fev-continental-web-2.png",
      alt: "Imagem 2",
    },
    {
      mobile: "Assets/fev-fireball-mobile.png",
      web: "Assets/fev-fireball-web.png",
      alt: "Imagem 3",
    },
  ];
  const totalItems = items.length;
  const intervalTime = 5000; // Tempo em milissegundos para mudar de slide (opcional)
  const timerRef = useRef(null);

  const goToSlide = (index) => {
    setCurrentIndex(index % totalItems);
  };

  const nextSlide = () => {
    goToSlide(currentIndex + 1);
  };

  const prevSlide = () => {
    goToSlide(currentIndex - 1 + totalItems);
  };

  useEffect(() => {
    timerRef.current = setInterval(nextSlide, intervalTime);

    return () => clearInterval(timerRef.current); // Limpa o intervalo ao desmontar o componente
  }, [currentIndex]); // Dependência no currentIndex para reiniciar o timer ao mudar de slide (opcional)

  return (
    <div className="hero-container">
      <div className="carousel">
        <div
          className="carousel-inner"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div
              className={`carousel-item ${
                index === currentIndex ? "active" : ""
              }`}
              key={index}
            >
              <picture>
                <source media="(max-width: 768px)" srcSet={item.mobile} />
                <source media="(min-width: 769px)" srcSet={item.web} />
                <img src={item.web} alt={item.alt} className="carousel-image" />
              </picture>
            </div>
          ))}
        </div>

        {/* Indicadores (dots) */}
        <div className="carousel-indicators">
          {items.map((_, index) => (
            <button
              key={index}
              className={index === currentIndex ? "active" : ""}
              onClick={() => goToSlide(index)}
            ></button>
          ))}
        </div>

        {/* Botões de navegação */}
        <button className="carousel-control-prev" onClick={prevSlide}>
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" onClick={nextSlide}>
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
  );
};

export const BannerFooter = () => {
  return (
    <div className="banner-bottom-container">
      <div className="divisory">
        <h2 className="divisory__title">#royalenfield</h2>
      </div>
      <img
        src="Assets/Banner_Store.jpg"
        alt="Banner Store"
        className="banner-bottom"
      />
    </div>
  );
};