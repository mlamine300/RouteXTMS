# Domaine : Identité

**Version :** 1.0

**Statut :** Brouillon

**Dernière mise à jour :** 01/07/2026

---

# 1. Objectif

## Présentation

Le domaine **Identité** est responsable de l'authentification, de l'autorisation, de la gestion des utilisateurs et de la sécurité de l'application.

Il garantit que chaque action réalisée dans le système est effectuée par un utilisateur authentifié possédant les droits nécessaires.

Ce domaine constitue la base de sécurité de l'ensemble du TMS.

---

# 2. Responsabilités

Le domaine Identité est responsable de :

- Authentification des utilisateurs
- Gestion des utilisateurs
- Gestion des rôles
- Gestion des permissions
- Gestion des sessions
- Gestion des mots de passe
- Gestion des comptes
- Sécurisation des accès
- Journalisation des connexions

---

# 3. Périmètre

## Inclus

- Création d'un utilisateur
- Connexion
- Déconnexion
- Authentification JWT
- Refresh Token
- Gestion des rôles
- Gestion des permissions
- Sessions
- Réinitialisation du mot de passe
- Vérification de l'adresse e-mail

## Exclus

Le domaine **Identité** ne gère pas :

- les clients ;
- les chauffeurs ;
- les partenaires ;
- les véhicules ;
- les entreprises.

Ces informations sont gérées par leurs domaines respectifs.

---

# 4. Modèle du domaine

```text
                    Identité
                        │
        ┌───────────────┼───────────────┐
        │               │               │
 Utilisateurs        Rôles        Permissions
        │
        ├───────────────┐
        │               │
     Sessions     Refresh Tokens
        │
 Réinitialisation du mot de passe
```

---

# 5. Collections

Le domaine Identité comprend les collections suivantes.

| Collection | Description |
|------------|-------------|
| users | Comptes utilisateurs |
| roles | Rôles applicatifs |
| permissions | Permissions disponibles |
| sessions | Sessions actives |
| refreshTokens | Jetons de rafraîchissement |
| passwordResets | Demandes de réinitialisation |
| emailVerifications | Vérifications d'adresse e-mail |

---

# 6. Description des collections

## users

Représente une personne autorisée à accéder à l'application.

Un utilisateur :

- appartient à une entreprise ;
- possède un rôle ;
- peut créer des données ;
- peut modifier des données selon ses permissions.

---

## roles

Définit un rôle fonctionnel.

Exemples :

- Super Administrateur
- Administrateur
- Responsable Transport
- Dispatcher
- Gestionnaire de flotte
- Comptable
- Client
- Chauffeur

---

## permissions

Décrit une autorisation élémentaire.

Exemples :

- users.read
- users.create
- users.update
- vehicles.read
- orders.create
- dashboard.view

---

## sessions

Stocke les connexions actives.

Permet notamment :

- la déconnexion à distance ;
- la limitation des sessions ;
- le suivi des appareils connectés.

---

## refreshTokens

Stocke les jetons permettant de renouveler une session.

---

## passwordResets

Conserve les demandes de réinitialisation de mot de passe.

---

## emailVerifications

Conserve les demandes de validation d'adresse e-mail.

---

# 7. Relations

```text
Rôle

1

↓

N

Utilisateurs

Utilisateur

1

↓

N

Sessions

Utilisateur

1

↓

N

Refresh Tokens
```

---

# 8. Cycle de vie d'un utilisateur

```text
Création

↓

Compte inactif

↓

Validation de l'e-mail

↓

Compte actif

↓

Compte bloqué

↓

Compte archivé
```

---

# 9. Processus d'authentification

```text
Connexion

↓

Vérification des identifiants

↓

Création du JWT

↓

Création du Refresh Token

↓

Création de la session

↓

Accès à l'application
```

---

# 10. Gestion des autorisations

Le système utilise un contrôle d'accès basé sur les rôles (**RBAC**).

Chaque requête suit le processus suivant :

```text
Authentification

↓

Vérification du rôle

↓

Vérification des permissions

↓

Exécution de l'action
```

---

# 11. Règles métier

- Un utilisateur appartient à une seule entreprise.
- Un rôle peut être attribué à plusieurs utilisateurs.
- Les permissions sont attribuées uniquement aux rôles.
- Un utilisateur inactif ne peut pas se connecter.
- Un utilisateur bloqué ne peut pas se connecter.
- Les utilisateurs sont archivés par suppression logique (*Soft Delete*).

---

# 12. Exigences de sécurité

- Mot de passe chiffré avec bcrypt.
- Authentification JWT.
- Refresh Token sécurisé.
- Expiration automatique des sessions.
- Journalisation des connexions.
- Limitation des tentatives de connexion.
- Utilisation obligatoire de HTTPS en production.

---

# 13. Champs communs

Toutes les collections du domaine possèdent les champs suivants :

- _id
- createdAt
- updatedAt
- createdBy
- updatedBy
- deletedAt
- isActive

---

# 14. Évolutions prévues

- Authentification Google
- Authentification Microsoft
- Authentification LDAP
- Authentification SSO
- Authentification multifacteur (MFA)
- Clés API
- Jetons d'accès personnels