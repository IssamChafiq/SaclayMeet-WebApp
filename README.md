# SaclayMeet

Instructions pour le lancement du site web en local
--------------
Tout d'abord, il va vous falloir installer sur votre ordinateur node.js, si vous ne l'avez pas déjà : https://nodejs.org/en/download

Ensuite, vous devrez ouvrir un conteneur docker avec les même propriétés que définies dans le fichier application.properties, situé à SaclayMeet-Back/src/main/resources/application.properties.

Voici la commande que j'utilise pour initiliaser le conteneur nécessaire : docker run -d --name my-postgres -e POSTGRES_USER=issam -e POSTGRES_PASSWORD=issam -e POSTGRES_DB=First_DB -p 5433:5432 postgres:15


Ensuite, allumez votre conteneur et faites tourner le fichier BackendApplication.java sous intellij, ou sous n'importe quel IDE qui peut faire tourner ce code. Cela initialisera la base de données.

Vous pouvez trouver ce fichier à l'adresse suivante dans le projet : SaclayMeet-Back\src\main\java\com\et4\app\BackendApplication.java


Ensuite, positionnez-vous à l'aide d'un invite de commande quelconque dans le répertoire SaclayMeet-Front, puis rentrez la commande "npm install". Cela installera les dépendances de node.js nécessaires au bon fonctionnement du code du Front.

Une fois les dépendances téléchargées sans soucis, vous pouvez taper "npm run dev" dans l'invite de commande. Cela va lancer l'hébergement en local du site, et vous donnera un lien localhost pour y accéder.

Control + clic sur ce lien pour l'ouvrir dans votre navigateur, et c'est bon ! Vous pouvez désormais utiliser le site comme bon vous semble.
