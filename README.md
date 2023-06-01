# Tech Club - Microservices

## Prérequis
Assurez-vous d'avoir installé :

- Node.js
- Nest CLI (`npm i -g @nestjs/cli`)

## Introduction

Le projet se compose actuellement des éléments suivants :

- Un backend qui interagit avec des microservices.
- Un frontend qui présente les données boursières sous forme graphique.

Le but du tech club est d'ajouter deux microservices au projet existant:

- SMP et SMS, qui fournissent les données et les paramètres pour les graphiques.

## Configuration du projet

Pour débuter, suivez les étapes suivantes pour installer et démarrer le projet :

1. Exécutez `make install` pour installer les dépendances du projet.
2. Exécutez `make start` pour lancer les services nécessaires (bases de données, RabbitMQ).
3. Dans le dossier `frontend`, exécutez `npm run start:dev` pour lancer l'application frontend.
4. Dans le dossier `backend`, exécutez `npm run start:dev` pour démarrer le backend.

## Accès aux services

Une fois le projet démarré, vous pouvez accéder aux différents services et interfaces utilisateur :

- Frontend : `localhost:3000`
- Backend : `localhost:8000`
- PgAdmin : `localhost:5000` (login : `postgres@localhost.com`, mot de passe : `postgres`)
- RabbitMQ Management : `localhost:15672` (login : `rabbitmq`, mot de passe : `rabbitmq`)

## Objectif de l'atelier

Votre mission est de créer les microservices SMP et SMS, puis de connecter ces derniers au backend existant. Vous devrez configurer et utiliser les clients TCP et RabbitMQ dans le backend pour interagir avec ces microservices.

## Avant de commencer
Dans le dossier backend créez un nouveau module avec la commande:

`nest g module hello`

Regardez ensuite le contenu du fichier module dans le dossier `src/hello`.

Créez ensuite un controller et un service avec les commandes.

`nest g controller hello`

`nest g service hello`

Vous pouvez voir que le controller et le service ont été ajoutés dans les dépendences du module.

## Tâches à réaliser

Pour mener à bien votre mission, voici les tâches que vous devrez accomplir :

1. ~Créez un microservice SMP qui publie des données boursières en temps réel.~

2. Générez un projet nestjs pour créer le projet SMP (stock-market-data-ms).
    - Pour cela, utilisez la commande CLI `nest new stock-market-data-ms`. Cette commande génère un nouveau projet NestJS avec une structure de fichiers standard.
    - Installez la dépendance `npm i --save @nestjs/microservices`

3. Modifiez le fichier `main.ts` pour créer une application microservice comme nécessaire.
    - Dans `main.ts`, au lieu d'utiliser `NestFactory.create(...)`, utilisez la méthode `NestFactory.createMicroservice(...)`, qui prend en argument la configuration du microservice. Par exemple :
      ```typescript
      const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
          options: {
            host: 'localhost',
            port: 8001,
          },
        },
      );
      app.listen();
      ```

4. Récupérez le code du data provider du backend (`stock.service.ts`) sans la partie gateway pour l'implémenter dans le SMP dans le fichier `app.service.ts`.
    - Copiez les fichiers correspondants du backend dans le dossier `stock-market-data-ms` et assurez-vous de les adapter au contexte du microservice si nécessaire.

5. Créez un module RabbitMQ pour publier les stock data en temps réel à partir du SMP.
    - Installez le package `@golevelup/nestjs-rabbitmq` en utilisant `npm install @golevelup/nestjs-rabbitmq`.
    - Créez une configuration RabbitMQ dans le fichier `app.module.ts`, comme suit :
      ```typescript
      RabbitMQModule.forRoot(RabbitMQModule, {
        exchanges: [
          {
            name: 'stocks',
            type: 'topic',
          },
        ],
        uri: 'amqp://rabbitmq:rabbitmq@localhost:5672',
      }),
      ```
    - Modifiez le constructeur:
      ```typescript
        constructor(private readonly amqpConnection: AmqpConnection) {
            this.generateMarketData();
        }
      ```
    - Publiez les data :
      ```typescript
        publishStockUpdate(stock: StockUpdate): void {
            this.amqpConnection.publish<StockUpdate>('stocks', 'stock.update', stock);
        }
      ```

6. Créez un module RabbitMQ dans le backend pour communiquer avec le microservice SMP.
    - De la même manière que vous avez créé le client RabbitMQ dans le SMP, vous devez le faire dans le backend. Assurez-vous que la configuration de RabbitMQ correspond à celle du SMP.

7. Injectez et utilisez le module RabbitMQ dans les services du backend pour s'abonner aux données boursières en temps réel publiées par le SMP.
    - Dans `stock.service.ts` du backend enlevez toutes les méthodes sauf `publishStockUpdate`
    - Utilisez le décorateur `@RabbitSubscribe(...)` sur la méthode `publishStockUpdate` pour vous abonner à la queue. Assurez-vous d'injecter le service RabbitMQ dans le service qui nécessite les data.

8. (Optionnel) Configurez le client TCP dans le backend pour communiquer avec le microservice SMS.
    - Si vous décidez de créer un microservice SMS, vous devrez configurer un client TCP de la même manière que vous avez configuré le client RabbitMQ.

9. (Optionnel) Injectez et utilisez le client TCP dans les services du backend pour récupérer et mettre à jour les paramètres des graphiques.
    - De la même manière que vous avez utilisé le client RabbitMQ, vous pouvez utiliser le client TCP pour communiquer avec le microservice SMS.

10. Modifiez le client RabbitMQ dans le SMP pour publier dans le RabbitMQ du tech club, afin de pouvoir visualiser vos données sur le tableau.
    - Modifier le service pour envoyer une seule data
    - Modifiez la configuration de RabbitMQ dans le SMP pour qu'elle pointe vers le RabbitMQ du tech club.
   

## Avantages et inconvénients

### Avantages

1. **Indépendance** : Chaque microservice peut être développé, déployé, mis à jour et mis à l'échelle de manière indépendante. Cette indépendance favorise la livraison continue et l'intégration continue (CI/CD).

2. **Décentralisation** : Les microservices favorisent l'approche décentralisée pour la construction d'applications, ce qui permet aux équipes de choisir les technologies les mieux adaptées à leurs services spécifiques.

3. **Résilience** : Si un microservice tombe en panne, il n'affectera pas les autres services de l'application. Cette isolation améliore la fiabilité de l'application dans son ensemble.

4. **Évolutivité** : Les microservices peuvent être mis à l'échelle individuellement en fonction de la demande pour ce service particulier, ce qui peut conduire à une utilisation plus efficace des ressources.

### Inconvénients

1. **Complexité** : La gestion des microservices peut être complexe. Elle peut nécessiter des outils spécialisés pour gérer les déploiements, la surveillance et la communication entre services.

2. **Dépendances** : Il peut être délicat de gérer les dépendances entre les microservices, notamment lors des mises à jour des services.

3. **Données distribuées** : Avec les microservices, les données sont souvent distribuées, ce qui peut rendre la gestion des transactions et la cohérence des données plus difficile.

4. **Latence de réseau** : Lorsque les services sont déployés sur plusieurs machines, les appels réseau peuvent avoir une latence plus élevée, ce qui peut avoir un impact sur les performances.

5. **Déploiement et tests** : Le déploiement et les tests peuvent être plus compliqués avec les microservices, car il faut s'assurer que tous les services fonctionnent correctement ensemble.
