import React from "react";
import "../styles/Apropos.scss"

const APropos = () => (
  <section className="a-propos">
      <h1>À propos de CapStyle</h1>
      <p>
        Bienvenue sur CapStyle, votre boutique en ligne dédiée aux casquettes ! Nous
        proposons une large sélection de casquettes de qualité, adaptées à tous les
        styles, que vous soyez amateur de streetwear, sportif ou adepte du look casual.
      </p>

    <article>
      
      <h2>Notre Mission</h2>
      <div className="article-container">
      <img src="../../public/images/mission.jpg" alt="homme avec une casquette rouge" className="picture-article-container" />
      <p>
        Chez CapStyle, notre mission est de vous offrir des casquettes tendance, confortables
        et accessibles, tout en vous assurant une expérience de shopping fluide et agréable.
      </p>
      </div>
    </article>

    <article >
      
      <h2>Notre Engagement</h2>
      <div className="article-container">
      <img src="../../public/images/engagement.jpg" alt="enfant et femme portant des casquettes" className="picture-article-container"/>
      <p>
        Nous nous engageons à vous fournir des produits de haute qualité, à respecter les délais
        de livraison et à offrir un service client réactif. Votre satisfaction est notre priorité.
      </p>
      </div>
    </article>

    <article>
      
      <h2>Notre Équipe</h2>
      <div className="article-container">
      <img src="../../public/images/equipe.png" alt="équipe autour d'une table" className="picture-article-container"/>
      <p>
        L'équipe de CapStyle est composée de passionnés de mode, de casquettes et de service client.
        Nous sommes constamment à l'écoute de vos besoins pour vous offrir une expérience optimale.
      </p>
      </div>
    </article>
  </section>
);

export default APropos;
