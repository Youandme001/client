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
          {/* <h3>Soins de la Peau Glowy</h3> */}
          <h3>Glowy Cosmetics: L'éclat en toi </h3>
            <p>Laissez votre éclat intérieur s'exprimer.</p>
            <p>Ici commence un voyage où la beauté se réinvente.</p> 
            <p>Notre approche naturelle réveille ce que vous avez de plus précieux :</p> 
            <p> votre lumière. Chaque soin est une invitation à briller avec confiance.</p> 
            <p> Osez rayonner, naturellement.</p>
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
            <a href="https://www.facebook.com/profile.php?id=61574626418563" target="_blank" rel="noopener noreferrer" className="social-icon"><FacebookIcon /></a>
            <a href="https://www.instagram.com/glowy_by_nawres/?fbclid=IwZXh0bgNhZW0CMTEAAR02z8uMChgRaXPTNMZCQOwIFau_xuL-zWkBlJMCQGxfRsgj6oSrj-XzQng_aem_mRv9aJHdRTY89MP2nZDn1g " target="_blank" rel="noopener noreferrer" className="social-icon"><InstagramIcon /></a>
          </div>
        </div>
        <div className="footer-section contact">
          <h3>Informations de Contact</h3>
          <ul>
            <li><LocationOnIcon /> Adresse: 08 rue de l'Inde lafayette tunis 1002</li>
            <li><PhoneIcon /> Téléphone: 55036636 / 55037070</li>
            <li><EmailIcon /> Email: glowy.nawressbriki@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2024 Glowy Cosmetics. Tous droits réservés.
      </div>
    </footer>
  );
}

export default Footer;
