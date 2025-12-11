# Projet - API de Référencement

## Contexte du projet

Vous allez créer une **API RESTful de référencement** sur un thème libre de votre choix. Ce projet est à réaliser en **équipe de 2 personnes** (une équipe de 3 sera autorisée avec une notation plus stricte et des exigences supérieures).

### Exemples de thèmes possibles :
- Annuaire de restaurants
- Catalogue de films/séries
- Répertoire de livres
- Liste de recettes de cuisine
- Annuaire d'artistes/musiciens
- Catalogue de produits technologiques
- Répertoire de lieux touristiques
- Base de données de plantes
- Collection de jeux vidéo
- Annuaire d'événements

**Vous devez choisir un thème qui n'est pas celui des tâches (tasks) vu en cours.**

---

## ⚠️ RÈGLES IMPÉRATIVES CONCERNANT GIT ⚠️

### Utilisation obligatoire de Git

- **Git est OBLIGATOIRE** pour ce projet
- Votre dépôt Git doit être accessible pour évaluation
- **CHAQUE étudiant DOIT avoir des commits personnels sur le projet**
- Les commits doivent être répartis tout au long du projet (pas tous le dernier jour)
- Les messages de commit doivent être explicites et en français ou anglais

### ⛔ RÈGLE DE LA NOTE ZÉRO ⛔

**Un étudiant sans commits = 0/20 pour le projet**

Aucune excuse ne sera tolérée :
- ❌ "On a travaillé à deux sur le même ordinateur"
- ❌ "On s'est partagé le code par mail"
- ❌ "On s'est envoyé le code sur Discord"
- ❌ "Mon binôme a tout commit de son côté"
- ❌ "J'ai oublié de push"
- ❌ "Mon ordinateur est tombé en panne"

**Si vous ne savez pas comment utiliser Git correctement, demandez de l'aide AVANT la deadline.**

### Bonnes pratiques Git attendues

1. Commits réguliers et atomiques (une fonctionnalité = un commit)
2. Messages de commit clairs et descriptifs
3. Utilisation de branches (feature branches recommandées)
4. Pas de fichiers `node_modules/` ou fichiers de configuration personnels dans le dépôt
5. Fichier `.gitignore` approprié
6. README.md complet avec instructions de démarrage et mapping username => nom réel

---

## Contraintes techniques obligatoires

Votre API **DOIT** implémenter **TOUTES** les notions vues en cours :

### 1. Architecture et Structure du projet

- ✅ **Architecture MVC** (Models, Views/Controllers, Routes)
  - Dossier `models/` : modèles Sequelize
  - Dossier `controllers/` : logique métier
  - Dossier `routes/` : définition des routes
  - Dossier `middlewares/` : middlewares personnalisés
  
### 2. Serveur Express

- ✅ Serveur **Express.js** version 5+
- ✅ Middleware `express.json()` pour parser le JSON
- ✅ Gestion des routes modulaires avec `Router()`
- ✅ Écoute sur un port défini par variable d'environnement

### 3. Base de données PostgreSQL

- ✅ **PostgreSQL** comme SGBD
- ✅ **Sequelize** comme ORM
- ✅ Connection via variable d'environnement `DATABASE_URL`
- ✅ Au moins **3 modèles** avec :
- ✅ Script de migration (`migrate.js`) utilisant `sync()`

### 4. API RESTful complète

Implémenter les **5 opérations CRUD** pour au moins une ressource principale :

| Méthode | Route             | Action                 | Code HTTP |
| ------- | ----------------- | ---------------------- | --------- |
| GET     | `/ressources`     | Liste (collection)     | 200       |
| POST    | `/ressources`     | Création               | 201       |
| GET     | `/ressources/:id` | Lecture (item)         | 200, 404  |
| PATCH   | `/ressources/:id` | Modification partielle | 200, 404  |
| DELETE  | `/ressources/:id` | Suppression            | 204, 404  |

### 5. Modules supplémentaires

- ✅ **Internationalisation (i18n)**
- ✅ **Gestion des formats (json, xml, yaml)**
- ✅ **Versioning d'API**
- ✅ **HATEOAS**

### 6. Fichier de requêtes HTTP

- ✅ Fichiers `*.http` avec des exemples de toutes les requêtes possibles
- ✅ Tests de tous les endpoints
- ✅ Exemples avec différents modules (format, hateoas, versions, i18n)

---

## Livrables attendus

### Code source
1. Dépôt Git accessible (GitHub, GitLab, etc.)
2. Code source complet
3. Architecture respectée (dossiers models, controllers, routes, middlewares, locales)
4. Architecture propre (pas de code dupliqué, fonctions réutilisables, pas de node_modules, pas de code mort, etc.)

---

## Critères d'évaluation

### Notation sur 20

La note est divisée en **deux parties** :
- **Partie obligatoire : /15** - Implémentation des fonctionnalités de base
- **Partie avancée : /5** - Fonctionnalités supplémentaires pour aller plus loin

⚠️ **Respecter toutes les exigences obligatoires ne donne que 15/20 maximum**

---

### PARTIE OBLIGATOIRE (/15)

⚠️ **Note importante** : La gestion Git reste **OBLIGATOIRE** (0/20 sans commits personnels) mais n'est plus notée. Les points sont redistribués sur les fonctionnalités techniques.

| Critère                                                                              | Points  |
| ------------------------------------------------------------------------------------ | ------- |
| **Fonctionnalités API obligatoires**                                                 | **/12** |
| - API RESTful complète (5 routes CRUD, code retours, format des routes, verbes HTTP) | /3      |
| - Link HATEOAS (pagination, lien de création, ...)                                   | /3      |
| - Internationalisation (i18n) avec Accept-Language                                   | /2      |
| - Versioning d'API (au moins 2 versions)                                             | /2      |
| - Gestion des formats (json, xml, csv)                                               | /2      |
| **Architecture et qualité technique**                                                | **/3**  |
| - Architecture MVC propre et respectée                                               | /1      |
| - Modèles Sequelize avec relations (au moins 3 modèles)                              | /2      |

---

### PARTIE AVANCÉE (/5) - Pour aller plus loin

**Choisissez au moins 2 modules parmi les suivants et implémentez les fonctionnalités avancées.**
Chaque module avancé correctement implémenté rapporte **2 points**.

#### 🚀 Module 1 : Gestion des formats avancée (/2)

**Objectif : Rendre le système de formats complètement générique et automatique**

Fonctionnalités attendues :
- ✅ **Métadonnées automatiques pour XML** :
  - Le rootNode XML doit porter automatiquement le nom de la ressource (singulier pour item, pluriel pour collection)
  - Exemple : GET `/restaurants` → `<restaurants>`, GET `/restaurants/5` → `<restaurant>`
  - Détection automatique depuis le nom de la route ou du modèle

- ✅ **Format par défaut configurable** :
  - Configuration globale du format par défaut si non spécifié
  - Possibilité de surcharger par route
  - Support de paramètres pour personnaliser certains formats (ex: indentation XML, séparateur CSV)

**Critères d'évaluation :**
- RootNode XML automatique et intelligent : /1
- Format par défaut configurable : /1

---

#### 🚀 Module 2 : HATEOAS avancé (/2.5)

**Objectif : Génération automatique des liens HATEOAS à partir de la configuration des routes**

Fonctionnalités attendues :
- ✅ **Génération automatique depuis le Router** :
  - Parser automatiquement le Router Express pour extraire les routes disponibles
  - Générer les liens dans les réponses sans code manuel dans chaque controller
  - Liens vers : self, collection, related resources
  - Pouvoir filtrer les liens générés (ex: exclure certaines routes) directement dans le middleware lorsqu'il est appliqué à une route

- ✅ **Relations entre ressources** :
  - Si un restaurant a des avis, générer automatiquement le lien `reviews` vers `/reviews?restaurantId=:id`
  - Détection automatique des relations depuis les modèles Sequelize (hasMany, belongsTo)

**Critères d'évaluation :**
- Extraction automatique des routes du Router : /1
- Génération des liens de relations depuis Sequelize : /1
- Filtrage des liens générés : /0.5

---

#### 🚀 Module 3 : Internationalisation avancée (/1.5)

**Objectif : Système i18n intelligent et automatique**

Fonctionnalités attendues :
- ✅ **Traduction automatique des champs de modèle** :
  - Système de déclaration dans le modèle des champs traduisibles
  - Traduction automatique sans code dans les controllers
  - Support des clés dynamiques (ex: `status.pending`, `status.completed`)

**Critères d'évaluation :**
- Système de déclaration de champs traduisibles : /1.5

---

#### 🚀 Module 4 : Versioning avancé (/1.5)

**Objectif : Système de versioning générique et automatisé**

Fonctionnalités attendues :
- ✅ **Middleware de versioning générique** :
  - Support de plusieurs stratégies : header, URL (`/v2/ressources`), subdomain

- ✅ **Gestion de la dépréciation** :
  - Header `Deprecation: true` pour les versions obsolètes
  - Header `Sunset` avec date de fin de support
  - Header `Link` pointant vers la nouvelle version

**Critères d'évaluation :**
- Middleware générique multiversion : /1
- Headers de dépréciation automatiques : /0.5

---

#### 🚀 Module 6 : Middlewares et architecture avancés (/0.5)

**Objectif : Architecture robuste et réutilisable**

Fonctionnalités attendues :
- ✅ **Gestion d'erreurs centralisée** :
  - Middleware error handler global
  - Réponses d'erreur standardisées selon les formats
    - JSON + RESTFULL
      - Code erreur: 422
      - format: `{"title": ["title is required"], "completed": ["completed must be boolean", "completed is required"]}`

**Critères d'évaluation :**
- Gestion d'erreurs centralisée et standardisée : /0.5

---

### Équipe de 3 personnes - Exigences modifiées

Pour une équipe de 3 personnes :

**Partie obligatoire (/15) :**
- Mêmes critères mais **4 modèles minimum** avec relations Sequelize
- Au moins **1 endpoint avec jointure** entre tables (sous-collections)
- **3 versions d'API** minimum (au lieu de 2)

**Partie avancée (/5) :**
- **1 module avancé obligatoire** au moins
- Attentes qualitatives plus élevées sur chaque module

---

### Barème récapitulatif

| Total      | Appréciation                                             |
| ---------- | -------------------------------------------------------- |
| /15        | Toutes les exigences obligatoires respectées - Bien      |
| 15-17/20   | + 1 module avancé excellemment implémenté - Très bien    |
| 17.5-20/20 | + 2 modules avancés excellemment implémentés - Excellent |

---

## Date de rendu

**Date limite : 9 janvier 2026 23H42**

- ⏰ Aucun retard ne sera accepté
- 📧 Envoi du lien Git par email
  - mail: donné en cours
  - sujet: WSF API Avancée - Nom de l'équipe
  - contenu: Lien vers le dépôt Git
- 🔍 Le dernier commit avant la deadline sera évalué

---

## Ressources

- Documentation Express : https://expressjs.com/
- Documentation Sequelize : https://sequelize.org/
- Documentation i18next : https://www.i18next.com/
- Documentation Docker Compose : https://docs.docker.com/compose/

---

## ⚠️ RAPPEL FINAL

**PAS DE COMMITS PERSONNELS = 0/20**

Votre travail individuel doit être visible dans l'historique Git. C'est une compétence professionnelle essentielle.

**Bon courage ! 🚀**

