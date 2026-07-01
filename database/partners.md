# Domaine : Partenaires

**Version :** 1.0

**Statut :** Brouillon

**Dernière mise à jour :** 01/07/2026

---

# 1. Objectif

## Présentation

Le domaine **Partenaires** regroupe toutes les entités externes avec lesquelles l'entreprise collabore dans le cadre de ses activités.

Il permet de centraliser les informations commerciales, contractuelles et opérationnelles relatives aux partenaires.

Un partenaire peut exercer un ou plusieurs rôles.

---

# 2. Responsabilités

Le domaine Partenaires est responsable de :

- gérer les partenaires ;
- gérer les contacts ;
- gérer les rôles des partenaires ;
- gérer les contrats ;
- gérer les documents ;
- gérer les évaluations de performance ;
- gérer les informations administratives.

---

# 3. Périmètre

## Inclus

- partenaires ;
- contacts ;
- contrats ;
- documents ;
- catégories de partenaires.

## Exclus

Le domaine ne gère pas :

- les missions ;
- les commandes ;
- les véhicules ;
- les chauffeurs ;
- les paiements.

Ces éléments appartiennent à d'autres domaines.

---

# 4. Modèle métier

```text
Partenaire
│
├── Contacts
├── Contrats
├── Documents
├── Évaluations
└── Rôles
```

---

# 5. Collections

| Collection | Description |
|------------|-------------|
| partners | Fiche principale des partenaires |
| partnerContacts | Contacts associés |
| partnerContracts | Contrats |
| partnerDocuments | Documents |
| partnerEvaluations | Historique des évaluations |

---

# 6. Description des collections

## partners

Contient la fiche principale d'un partenaire.

Informations principales :

- raison sociale ;
- nom commercial ;
- type juridique ;
- numéro RC ;
- NIF ;
- NIS ;
- AI ;
- adresse ;
- téléphone ;
- email ;
- site web ;
- statut.

Un partenaire peut posséder plusieurs rôles.

---

## partnerContacts

Liste des personnes de contact.

Exemples :

- Directeur
- Responsable exploitation
- Comptable
- Commercial

---

## partnerContracts

Contrats signés avec le partenaire.

Exemples :

- contrat de transport ;
- contrat de location ;
- contrat de maintenance.

---

## partnerDocuments

Documents administratifs.

Exemples :

- registre de commerce ;
- assurance ;
- agréments ;
- licences.

---

## partnerEvaluations

Historique des évaluations.

Exemples :

- ponctualité ;
- qualité de service ;
- respect des délais ;
- incidents.

---

# 7. Types de partenaires

Le système devra permettre de gérer plusieurs catégories.

Exemples :

- Client
- Transporteur
- Loueur de véhicules
- Loueur de remorques
- Atelier de maintenance
- Fournisseur de carburant
- Assureur
- Transitaire
- Prestataire logistique
- Fournisseur

Un partenaire peut appartenir à plusieurs catégories.

---

# 8. Relations

```text
Partenaire
│
├── Contacts
├── Contrats
├── Documents
└── Évaluations
```

Les autres domaines référencent le partenaire lorsque nécessaire.

---

# 9. Règles métier

- Un partenaire possède au moins un rôle.
- Un partenaire peut posséder plusieurs rôles.
- Un partenaire peut avoir plusieurs contacts.
- Un partenaire peut avoir plusieurs contrats.
- Les documents possèdent une date d'expiration.
- Les partenaires sont archivés par suppression logique.

---

# 10. États

- Prospect
- Actif
- Suspendu
- Archivé

---

# 11. Champs communs

Toutes les collections possèdent :

- _id
- createdAt
- updatedAt
- createdBy
- updatedBy
- deletedAt
- isActive

---

# 12. Évolutions futures

- Portail partenaire
- Signature électronique des contrats
- Évaluation automatique des performances
- Intégration EDI
- API partenaires