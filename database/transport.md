# Domaine : Transport

**Version :** 1.0

**Statut :** Brouillon

**Dernière mise à jour :** 01/07/2026

---

# 1. Objectif

## Présentation

Le domaine **Transport** constitue le cœur fonctionnel du TMS.

Il permet de gérer l'ensemble du cycle de vie d'une opération de transport, depuis la création d'une commande jusqu'à la clôture de la mission.

Il orchestre les différents domaines de l'application afin de garantir une exécution efficace et traçable des opérations.

---

# 2. Responsabilités

Le domaine Transport est responsable de :

- gérer les commandes de transport ;
- gérer les expéditions ;
- planifier les missions ;
- affecter les ressources ;
- gérer les étapes de transport ;
- suivre l'avancement des missions ;
- enregistrer les événements ;
- gérer les incidents ;
- clôturer les missions.

---

# 3. Périmètre

## Inclus

- commandes ;
- expéditions ;
- missions ;
- affectations ;
- étapes ;
- événements ;
- incidents.

## Exclus

Le domaine ne gère pas :

- les utilisateurs ;
- les clients ;
- les partenaires ;
- les véhicules ;
- la facturation.

Ces éléments sont référencés mais appartiennent à leurs domaines respectifs.

---

# 4. Processus métier

```text
Commande client
        │
        ▼
Création de l'expédition
        │
        ▼
Planification
        │
        ▼
Création de la mission
        │
        ▼
Affectation des ressources
        │
        ▼
Exécution
        │
        ▼
Suivi des événements
        │
        ▼
Livraison
        │
        ▼
Clôture de la mission
```

---

# 5. Collections

| Collection | Description |
|------------|-------------|
| transportOrders | Commandes de transport |
| shipments | Expéditions |
| transportMissions | Missions |
| missionAssignments | Affectation des ressources |
| missionStops | Étapes de la mission |
| trackingEvents | Historique des événements |
| transportIncidents | Incidents |

---

# 6. Description des collections

## transportOrders

Représente une demande de transport formulée par un client.

Une commande peut générer une ou plusieurs expéditions.

---

## shipments

Représente la marchandise à transporter.

Une expédition peut être réalisée par une ou plusieurs missions.

---

## transportMissions

Représente l'exécution opérationnelle d'un transport.

Une mission possède :

- un planning ;
- des ressources ;
- des étapes ;
- un statut.

---

## missionAssignments

Décrit les ressources affectées à une mission.

Exemples :

- véhicule ;
- chauffeur ;
- remorque ;
- équipement.

---

## missionStops

Liste chronologique des étapes.

Types d'étapes :

- chargement ;
- déchargement ;
- dépôt ;
- relais ;
- pause.

---

## trackingEvents

Historique des événements.

Exemples :

- départ ;
- arrivée ;
- chargement terminé ;
- retard ;
- livraison effectuée.

---

## transportIncidents

Historique des incidents.

Exemples :

- panne ;
- accident ;
- refus de livraison ;
- marchandise endommagée ;
- retard important.

---

# 7. Relations

```text
Commande
    │
    ├── 1 → N Expéditions
    │
    └── 1 → N Missions

Mission
    │
    ├── 1 → N Affectations
    ├── 1 → N Étapes
    ├── 1 → N Événements
    └── 1 → N Incidents
```

---

# 8. États d'une mission

- Brouillon
- Planifiée
- Affectée
- En attente
- En cours
- Suspendue
- Terminée
- Annulée

---

# 9. Règles métier

- Une mission doit être rattachée à une commande.
- Une mission doit posséder au moins une étape.
- Une mission doit posséder au moins une ressource avant son démarrage.
- Une mission ne peut être clôturée que lorsque toutes les livraisons sont terminées.
- Toute modification importante est historisée.
- Les événements sont horodatés.

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

- Optimisation automatique des tournées
- Géolocalisation en temps réel
- Calcul automatique des ETA
- Intégration GPS
- Gestion des tournées multi-véhicules
- Gestion des convois
- Intelligence artificielle pour la planification