import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import './AboutUs.css'; // Assume your CSS file is named AboutUs.css

const AboutUs1 = () => {
  

  return (
    

    <section id="about" class="about-section1">
    <div class="container">
        <div class="about-header">
            <h2>QUI SOMMES-NOUS ?</h2>
            <p>Bienvenue chez You & Me Skin Care - là où les parfums délicieux rencontrent l'excellence des soins de la peau.</p>
        </div>
        <div class="about-content">
            <p>Chez You & Me, nous croyons en l'essence des fragrances exquises et des produits de beauté de qualité supérieure. Notre mission est de vous offrir une expérience sensorielle inoubliable à travers notre luxueuse collection de produits cosmétiques unisexe.</p>
            <h3>Notre Engagement</h3>
            <p>Nous sommes fiers de présenter notre toute nouvelle collection de produits cosmétiques unisexe, une gamme somptueuse de parfums OUD conçus pour elle et lui. Notre engagement envers votre bien-être est au cœur de tout ce que nous faisons :</p>
            <ul>
                <li>0% Paraben</li>
                <li>0% Alcool</li>
                <li>0% Sulfate</li>
            </ul>
            <p>Chez You & Me, nous nous engageons à créer des produits qui respectent votre peau et l'environnement. Notre formulation sans compromis garantit une expérience de beauté saine et durable.</p>
            <p>Rejoignez-nous sur nos plateformes sociales pour rester informé des dernières tendances, offres spéciales et événements exclusifs. Chez You & Me, nous vous invitons à découvrir le monde envoûtant des parfums exquis et des soins de la peau raffinés.</p>
            <p>Bienvenue dans notre univers olfactif, où chaque instant est une célébration de la beauté et de l'élégance. You & Me - où les parfums envoûtants rencontrent l'excellence des soins de la peau.</p>
        </div>
    </div>
</section>

  
  );
};

export default AboutUs1;
