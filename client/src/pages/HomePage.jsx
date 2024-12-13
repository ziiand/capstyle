import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Homepage.scss";

function HomePage() {
  const [caps, setCaps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const imageMapping = {
    1: "/images/casquette1.webp",
    2: "/images/casquette2.webp",
    3: "/images/casquette3.webp",
  };

  useEffect(() => {
    const fetchCaps = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/caps");
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des casquettes");
        }
        const data = await response.json();
        setCaps(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaps();
  }, []);

  if (isLoading) {
    return <p>Chargement des casquettes...</p>;
  }

  if (error) {
    return <p>Erreur : {error.message}</p>;
  }

  const generateRoute = (name) => {
    if (name.toLowerCase().includes("fitted")) {
      return "/fitted";
    } else if (name.toLowerCase().includes("trucker")) {
      return "/trucker";
    } else if (name.toLowerCase().includes("snapback")) {
      return "/snapback";
    }
    return "/"; 
  };

  return (
    <>
      <div className="banner-image">
        <img
          src="/images/banner.jpg"
          alt="Bannière de casquettes"
          id="banner"
        />
      </div>
      <div className="container">
        <h1>CAPSTYLE</h1>
        <section className="card-section">
          {caps.map((cap) => {
            const imageSrc = imageMapping[cap.id];
            const route = generateRoute(cap.name);

            return (
              <Link
                to={route}
                key={cap.id}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <article className="card-item">
                  <img src={imageSrc} alt={cap.name} />
                  <h2>{cap.name}</h2>
                  <p>{cap.description}</p>
                  <p>{cap.price} €</p>
                </article>
              </Link>
            );
          })}
        </section>
        <h3>CATÉGORIES POPULAIRES</h3>
      <p>
        Nous sommes engagés dans la qualité. Chaque produit de notre gamme est
        sous licence et authentique, vous garantissant la tranquillité d'esprit
        lorsque vous faites vos achats avec nous. Notre quête constante de
        développement et d'expansion de notre gamme signifie que nous proposons
        constamment de nouveaux produits excitants pour tous les goûts et toutes
        les occasions. Nous connaissons la mode et pensons que vous devriez
        acheter votre prochaine casquette chez nous.
      </p>
      </div>
      
    </>
  );
}

export default HomePage;
