# Domaine : Administration

**Version :** 1.0

**Statut :** Brouillon

**Dernière mise à jour :** 01/07/2026

---

# 1. Objectif

## Présentation

Le domaine **Administration** est responsable de la configuration et du bon fonctionnement de la plateforme TMS.

Il centralise les paramètres techniques, les journaux d'audit, les notifications et les intégrations avec les systèmes externes.

Ce domaine ne contient aucune logique métier liée au transport. Il fournit les services nécessaires au fonctionnement global de l'application.

---

# 2. Responsabilités

Le domaine Administration est responsable de :

- Gérer les paramètres de l'application
- Journaliser les actions des utilisateurs
- Gérer les notifications
- Configurer les numérotations automatiques
- Gérer les intégrations externes
- Centraliser les paramètres globaux

---

# 3. Périmètre

## Inclus

- Paramètres
- Journaux d'audit
- Notifications
- Intégrations
- Numérotations

## Exclus

Le domaine Administration ne gère pas :

- les utilisateurs ;
- les rôles ;
- les clients ;
- les partenaires ;
- les ressources ;
- les missions ;
- les finances.

Ces éléments sont gérés par leurs domaines respectifs.

---

# 4. Modèle métier

```text
Administration
│
├── Paramètres
├── Journaux d'audit
├── Notifications
├── Numérotations
└── Intégrations
```

---

# 5. Collections

| Collection | Description |
|------------|-------------|
| settings | Paramètres généraux |
| auditLogs | Historique des actions |
| notifications | Notifications système |
| numberingSequences | Numérotation automatique |
| integrations | Configuration des services externes |

---

# 6. Description des collections

## settings

Contient les paramètres globaux de l'application.

Exemples :

- nom de l'entreprise ;
- langue par défaut ;
- devise ;
- format des dates ;
- fuseau horaire ;
- paramètres des missions ;
- paramètres des notifications.

---

## auditLogs

Historise toutes les actions importantes réalisées dans l'application.

Exemples :

- connexion ;
- création d'une mission ;
- modification d'une commande ;
- suppression logique d'une ressource ;
- validation d'une facture.

Chaque journal contient :

- utilisateur ;
- date ;
- action ;
- entité concernée ;
- ancienne valeur (si applicable) ;
- nouvelle valeur (si applicable).

---

## notifications

Permet d'envoyer des notifications aux utilisateurs.

Types :

- Information
- Avertissement
- Erreur
- Succès
- Rappel

Canaux futurs :

- Notification interne
- E-mail
- SMS
- Push mobile

---

## numberingSequences

Gère les séquences de numérotation automatique.

Exemples :

- CMD-2026-000001
- MIS-2026-000001
- FAC-2026-000001

Chaque type de document possède sa propre séquence.

---

## integrations

Configure les connexions avec des systèmes externes.

Exemples :

- API GPS
- ERP
- WMS
- CRM
- Messagerie
- Services de cartographie
- Plateformes partenaires

---

# 7. Relations

```text
Tous les domaines
        │
        ├── Audit Logs
        ├── Notifications
        └── Paramètres
```

Le domaine Administration est utilisé par tous les autres domaines de l'application.

---

# 8. Règles métier

- Toutes les actions critiques doivent être historisées.
- Les notifications doivent être horodatées.
- Une séquence de numérotation est unique par type de document.
- Les paramètres globaux sont modifiables uniquement par les administrateurs.
- Les journaux d'audit ne peuvent pas être supprimés.

---

# 9. Champs communs

Toutes les collections possèdent :

- _id
- createdAt
- updatedAt
- createdBy
- updatedBy
- deletedAt
- isActive

---

# 10. Évolutions futures

- Gestion des sauvegardes
- Planification des tâches automatiques
- Gestion des licences
- Monitoring système
- Tableau de bord d'administration
- Webhooks
- Journal des erreurs applicatives
- Gestion des clés API