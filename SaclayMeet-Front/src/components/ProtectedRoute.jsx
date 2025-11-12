import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Sert en gros à vérifier que l'on a bien un utilisateur valide connecté (userID dans la base).
// Si l'userID n'existe pas ou n'est plus valide, on redirige vers la page d'accueil.
const ProtectedRoute = ({ children }) => {
  const [isValidUser, setIsValidUser] = useState(null); // null = chargement, true/false = résultat
  
  useEffect(() => {
    const checkUserExists = async () => {
      const userId = sessionStorage.getItem('userId');
      
      if (!userId) {
        setIsValidUser(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/users/${userId}`);
        
        if (response.ok) {
          setIsValidUser(true);
        } else {
          // Utilisateur n'existe plus, nettoyer la session
          sessionStorage.clear();
          setIsValidUser(false);
        }
      } catch (error) {
        console.error('Error checking user:', error);
        // En cas d'erreur réseau, nettoyer la session
        sessionStorage.clear();
        setIsValidUser(false);
      }
    };

    // Vérifier immédiatement
    checkUserExists();

    // Vérifier toutes les 10 secondes (ajustable selon vos besoins)
    const interval = setInterval(checkUserExists, 10000);

    // Nettoyer l'intervalle quand le composant se démonte
    return () => clearInterval(interval);
  }, []);

  if (isValidUser === null) {
    return <div>Loading...</div>;
  }
  
  // Si l'utilisateur n'est pas valide, rediriger
  if (!isValidUser) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default ProtectedRoute;