# Database Design – TMS Enterprise

**Version :** 1.0
**Statut :** Draft
**Dernière mise à jour :** 2026-06-29

---

# 1. Objectif

Ce document décrit la conception de la base de données du projet **TMS Enterprise**.

Il définit :

- le modèle de données ;
- les Tables SQL ;
- les relations entre les entités ;
- les règles de conception ;
- les conventions de nommage ;
- les index ;
- les stratégies de stockage.

Ce document servira de référence pendant tout le développement du backend.

---

# 2. Choix technologique

## SGBD

PostgreSQL

## ODM

Prisma


---

# 3. Principes de conception

La base de données sera conçue selon les principes suivants :

- séparation des domaines métier ;
- faible couplage ;
- forte cohésion ;
- ligne de table de taille raisonnable ;
- utilisation des références (`ObjectId`) pour les relations importantes ;

---

# 4. Domaines métier

Le modèle de données est organisé en plusieurs domaines.

- Identity
- Organization
- Partners
- Resources
- Transport
- Documents
- Finance
- Analytics
- Administration

---

# 5. Conventions de nommage

## Collections

Pluralisées en anglais.

Exemples :

- users
- customers
- vehicles
- trips

---

## Champs

camelCase

Exemple :

createdAt

updatedAt

plannedDeparture

---

## Identifiants

Id UUID

---

# 6. Champs communs

Toutes les collections possèdent les champs suivants :

- _id
- createdAt
- updatedAt
- createdBy
- updatedBy
- deletedAt (soft delete)
- isActive

---

# 7. Tables

Cette section détaillera chaque collection.

## Identity

- Users
- Roles
- Permissions
- Sessions

---

## Organization

- Companies
- Branches
- Departments

---

## Partners

- Customers
- Carriers
- RentalCompanies
- Suppliers

---

## Resources

- Vehicles
- Drivers
- Trailers
- Equipments

---

## Transport

- Orders
- Shipments
- Trips
- Assignments
- Stops
- TrackingEvents
- Incidents

---

## Documents

- Files
- Attachments
- Contracts

---

## Finance

- Tariffs
- Quotes
- Invoices
- Expenses
- Payments

---

## Administration

- Notifications
- AuditLogs
- Settings

---

# 8. Relations

Cette section décrira les relations entre les tables.

(À compléter)

---

# 9. Index

Cette section présentera tous les index PostgreSQL

(À compléter)

---

# 10. Politique de suppression

Soft Delete

Les données ne seront jamais supprimées physiquement.

Le champ :

deletedAt

sera utilisé pour marquer un enregistrement comme supprimé.

---

# 11. Historisation

Les opérations importantes seront historisées.

Exemples :

- changement de statut
- affectation
- modification d'une commande
- suppression logique

---

# 12. Versionnement

Toute modification du modèle devra être documentée dans ce fichier avant d'être implémentée.