# Domaine : Finance

**Version :** 1.0

**Statut :** Brouillon

**Dernière mise à jour :** 01/07/2026

---

# 1. Objectif

## Présentation

Le domaine **Finance** est responsable de la gestion financière des opérations de transport.

Il permet de calculer les coûts, gérer les tarifs, préparer la facturation, suivre les dépenses et analyser la rentabilité des missions.

Ce domaine ne remplace pas un logiciel de comptabilité. Il fournit les informations financières nécessaires à l'exploitation du transport.

---

# 2. Responsabilités

Le domaine Finance est responsable de :

- Gérer les grilles tarifaires
- Calculer les coûts de transport
- Gérer les devis
- Préparer la facturation client
- Gérer les dépenses
- Suivre les paiements
- Calculer la rentabilité
- Produire des indicateurs financiers

---

# 3. Périmètre

## Inclus

- Tarifs
- Devis
- Factures
- Dépenses
- Paiements
- Rentabilité

## Exclus

Le domaine Finance ne gère pas :

- la comptabilité générale ;
- la paie ;
- les déclarations fiscales ;
- les immobilisations ;
- les écritures comptables.

Ces fonctions relèvent d'un ERP ou d'un logiciel comptable.

---

# 4. Modèle métier

```text
Tarifs
    │
    ▼
Calcul du coût
    │
    ▼
Devis
    │
    ▼
Mission de transport
    │
    ▼
Facture
    │
    ▼
Paiement
```

---

# 5. Collections

| Collection | Description |
|------------|-------------|
| tariffs | Tarifs de transport |
| quotations | Devis |
| invoices | Factures |
| expenses | Dépenses |
| payments | Paiements |

---

# 6. Description des collections

## tariffs

Contient les règles de tarification appliquées par l'entreprise.

Exemples :

- prix fixe ;
- prix au kilomètre ;
- prix par tonne ;
- prix par palette ;
- prix par conteneur ;
- prix par zone géographique ;
- prix selon le type de véhicule.

---

## quotations

Représente un devis envoyé à un client avant la réalisation du transport.

Un devis peut être accepté, refusé ou expiré.

---

## invoices

Représente une facture générée après la réalisation du transport.

Une facture peut regrouper plusieurs missions.

---

## expenses

Historique des dépenses liées aux opérations.

Exemples :

- carburant ;
- péages ;
- location ;
- maintenance ;
- frais de sous-traitance ;
- frais divers.

---

## payments

Historique des paiements.

Le paiement peut concerner :

- un client ;
- un partenaire ;
- une facture.

---

# 7. Relations

```text
Client
    │
    ├── Tarifs
    │
    ├── Devis
    │
    └── Factures

Mission
    │
    ├── Dépenses
    │
    └── Facturation
```

---

# 8. Règles métier

- Une mission peut générer une ou plusieurs dépenses.
- Une facture peut regrouper plusieurs missions.
- Un devis accepté peut être converti en commande.
- Une dépense est toujours liée à une mission ou à une ressource.
- Une facture ne peut être modifiée après validation.
- Les paiements partiels sont autorisés.

---

# 9. États

## Devis

- Brouillon
- Envoyé
- Accepté
- Refusé
- Expiré

## Facture

- Brouillon
- Validée
- Envoyée
- Partiellement payée
- Payée
- Annulée

## Paiement

- En attente
- Confirmé
- Annulé

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

# 11. Indicateurs financiers

Le domaine Finance devra permettre de calculer :

- Chiffre d'affaires
- Coût total des missions
- Marge brute
- Marge nette
- Coût moyen par kilomètre
- Coût moyen par véhicule
- Coût moyen par chauffeur
- Chiffre d'affaires par client
- Chiffre d'affaires par transporteur
- Dépenses par catégorie
- Taux de rentabilité des missions

---

# 12. Évolutions futures

- Facturation électronique
- Intégration ERP
- Intégration comptable
- Gestion multi-devise
- Calcul automatique des taxes
- Budgets
- Centres de coûts
- Prévisions financières