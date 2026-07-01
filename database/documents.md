# Domaine : Documents

**Version :** 1.0

**Statut :** Brouillon

**Dernière mise à jour :** 01/07/2026

---

# 1. Objectif

## Présentation

Le domaine **Documents** est responsable de la gestion documentaire de l'ensemble de l'application.

Il permet de centraliser les fichiers, documents administratifs, pièces justificatives et preuves liés aux différentes entités du TMS.

Un document peut être associé à n'importe quel domaine de l'application.

---

# 2. Responsabilités

Le domaine Documents est responsable de :

- Stocker les fichiers
- Gérer les métadonnées
- Associer un document à une entité
- Gérer les versions
- Gérer les dates d'expiration
- Gérer les téléchargements
- Gérer les droits d'accès

---

# 3. Périmètre

## Inclus

- fichiers
- documents administratifs
- contrats
- photos
- signatures
- preuves de livraison

## Exclus

Le domaine Documents ne gère pas :

- le stockage physique des fichiers (S3, Azure, disque, etc.) ;
- la logique métier des autres domaines.

---

# 4. Modèle métier

```text
Document
│
├── Version
├── Catégorie
├── Entité liée
├── Historique
└── Pièces jointes
```

---

# 5. Collections

| Collection | Description |
|------------|-------------|
| documents | Métadonnées des documents |
| documentVersions | Historique des versions |
| documentCategories | Catégories de documents |
| documentAccessLogs | Historique des consultations |

---

# 6. Description des collections

## documents

Collection principale contenant les informations du document.

Chaque document est lié à une entité métier grâce à :

- entityType
- entityId

Exemples d'entités :

- Company
- Branch
- Customer
- Partner
- Vehicle
- Driver
- Trailer
- Mission
- Invoice

Informations principales :

- nom du fichier ;
- type MIME ;
- taille ;
- emplacement de stockage ;
- catégorie ;
- date d'expiration ;
- statut.

---

## documentVersions

Historique des modifications d'un document.

Permet de conserver plusieurs versions d'un même fichier.

---

## documentCategories

Référentiel des catégories de documents.

Exemples :

- Assurance
- Contrat
- Carte grise
- Permis
- Contrôle technique
- Facture
- Bon de livraison
- Photo
- Certificat ADR

---

## documentAccessLogs

Historique des consultations et téléchargements.

Chaque enregistrement contient :

- utilisateur ;
- document ;
- action ;
- date ;
- adresse IP.

---

# 7. Relations

```text
Tous les domaines
        │
        ▼
     Documents
        │
        ├── Versions
        ├── Catégories
        └── Historique d'accès
```

Le domaine Documents est partagé par tous les autres domaines.

---

# 8. Règles métier

- Un document est toujours rattaché à une entité.
- Un document appartient à une seule catégorie.
- Plusieurs documents peuvent être associés à une même entité.
- Les documents peuvent avoir une date d'expiration.
- Les documents expirés génèrent une alerte.
- Les suppressions sont logiques (Soft Delete).
- Les anciennes versions sont conservées.

---

# 9. États

Un document peut être :

- En attente
- Valide
- Expiré
- Archivé

---

# 10. Champs communs

Toutes les collections possèdent :

- _id
- createdAt
- updatedAt
- createdBy
- updatedBy
- deletedAt
- isActive

---

# 11. Évolutions futures

- Signature électronique
- OCR
- Lecture automatique des documents
- Génération PDF
- Compression automatique
- Chiffrement des fichiers
- Antivirus
- Gestion des droits avancée
- Stockage Cloud
- Versionning avancé