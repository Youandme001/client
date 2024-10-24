import React from 'react';
import './footer.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-section about">
          <h3>Soins de la Peau You & Me</h3>
          <p>Votre parcours vers une peau plus saine et plus heureuse commence ici.</p>
          <p> Faites confiance à notre approche naturelle de la beauté.</p>
        </div>
        <div className="footer-section links">
          <h3>Liens Rapides</h3>
          <ul>
            <li><a href="#home">Accueil</a></li>
            <li><a href="#about">À Propos de Nous</a></li>
            <li><a href="#shop">Boutique</a></li>
            <li><a href="#contact">Contactez-Nous</a></li>
          </ul>
        </div>
        <div className="footer-section social">
          <h3>Suivez-Nous</h3>
          <p>Connectez-vous avec nous sur les réseaux sociaux</p><p>
                 pour les dernières mises à jour.</p>
          <div className="social-icons">
            <a href="https://www.facebook.com/youandmetunisia" target="_blank" rel="noopener noreferrer" className="social-icon"><FacebookIcon /></a>
            <a href="https://www.instagram.com/youandme_skincare" target="_blank" rel="noopener noreferrer" className="social-icon"><InstagramIcon /></a>
          </div>
        </div>
        <div className="footer-section contact">
          <h3>Informations de Contact</h3>
          <ul>
            <li><LocationOnIcon /> Adresse: Rue bouraoui zaanouni Jawhara sousse 4000</li>
            <li><PhoneIcon /> Téléphone: 52 949 949</li>
            <li><EmailIcon /> Email: youandme.tunisia@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2024 Soins de la Peau You & Me. Tous droits réservés.
      </div>
    </footer>
  );
}

export default Footer;
