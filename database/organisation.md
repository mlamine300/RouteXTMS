# Domaine : Organisation

**Version :** 1.0

**Statut :** Brouillon

**Dernière mise à jour :** 01/07/2026

---

# 1. Objectif

## Présentation

Le domaine **Organisation** est responsable de la représentation de la structure interne de l'entreprise utilisant le TMS.

Il permet de modéliser les différentes entités organisationnelles telles que les agences, les départements, les équipes et les informations générales de l'entreprise.

Ce domaine constitue la base organisationnelle sur laquelle reposent les autres domaines de l'application.

---

# 2. Responsabilités

Le domaine Organisation est responsable de :

- Gérer les informations de l'entreprise
- Gérer les agences
- Gérer les départements
- Gérer les équipes
- Définir la hiérarchie organisationnelle
- Fournir les informations utilisées par les autres modules

---

# 3. Périmètre

## Inclus

- Informations de l'entreprise
- Agences
- Départements
- Équipes

## Exclus

Le domaine Organisation ne gère pas :

- les utilisateurs ;
- les clients ;
- les partenaires ;
- les véhicules ;
- les chauffeurs ;
- les commandes ;
- les missions.

Ces éléments appartiennent à leurs domaines respectifs.

---

# 4. Modèle métier

```text
Entreprise
│
├── Agences
│
├── Départements
│
└── Équipes
```

---

# 5. Collections

Le domaine Organisation contient les collections suivantes.

| Collection | Description |
|------------|-------------|
| company | Informations de l'entreprise |
| branches | Agences de l'entreprise |
| departments | Départements |
| teams | Équipes |

---

# 6. Description des collections

## company

Cette collection contient les informations générales de l'entreprise utilisant le TMS.

Une seule entreprise est gérée par instance de l'application.

Cette collection ne contient qu'un seul document.

Informations principales :

- Nom
- Logo
- Adresse
- Téléphone
- Email
- Site Web
- RC
- NIF
- NIS
- AI
- Devise
- Langue
- Fuseau horaire

---

## branches

Une agence représente un site physique de l'entreprise.

Exemples :

- Alger
- Oran
- Constantine

Une agence peut disposer :

- d'utilisateurs ;
- de véhicules ;
- de chauffeurs ;
- de partenaires locaux.

---

## departments

Les départements représentent les services de l'entreprise.

Exemples :

- Transport
- Exploitation
- Comptabilité
- Ressources Humaines
- Informatique

---

## teams

Les équipes représentent un regroupement opérationnel au sein d'un département.

Exemples :

- Dispatch National
- Livraison Nord
- Exploitation Sud

---

# 7. Relations

```text
Entreprise
    │
    ├── 1 → N Agences
    │
    ├── 1 → N Départements
    │
    └── 1 → N Équipes
```

---

# 8. Règles métier

- Une seule entreprise est autorisée par instance.
- Une entreprise peut posséder plusieurs agences.
- Une agence appartient à une seule entreprise.
- Un département appartient à une seule entreprise.
- Une équipe appartient à un seul département.
- Une agence peut être désactivée sans être supprimée.
- Toutes les suppressions sont logiques (Soft Delete).

---

# 9. Champs communs

Toutes les collections possèdent les champs suivants :

- _id
- createdAt
- updatedAt
- createdBy
- updatedBy
- deletedAt
- isActive

---

# 10. Évolutions futures

Le domaine Organisation pourra évoluer afin de gérer :

- plusieurs filiales ;
- plusieurs pays ;
- plusieurs devises ;
- plusieurs langues ;
- une architecture multi-entreprise.

Ces fonctionnalités ne sont pas prévues pour la première version du projet.