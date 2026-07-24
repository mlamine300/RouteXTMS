# Domaine : Ressources

**Version :** 1.0

**Statut :** Brouillon

---

# 1. Objectif

Le domaine Ressources regroupe tous les éléments matériels et humains nécessaires à l'exécution des opérations de transport.

Il permet de gérer les ressources appartenant à l'entreprise ainsi que les ressources externes (louées ou mises à disposition par des partenaires).

Toutes les ressources pouvant être affectées à une mission sont gérées dans ce domaine.

---

# 2. Responsabilités

Le domaine Ressources est responsable de :

- la gestion des véhicules ;
- la gestion des chauffeurs ;
- la gestion des remorques ;
- la gestion des équipements ;
- le suivi de la disponibilité ;
- le suivi de la maintenance ;
- le suivi documentaire ;
- la gestion des affectations.

---

# 3. Périmètre

## Inclus

- véhicules ;
- chauffeurs ;
- remorques ;
- équipements ;
- disponibilité ;
- maintenance ;
- affectations.

## Exclus

Ne sont pas gérés ici :

- les commandes ;
- les missions ;
- les clients ;
- les partenaires ;
- la facturation.

---

# 4. Modèle métier

```text
Ressources

│

├── Véhicules

├── Chauffeurs

├── Remorques

├── Equipements

└── Affectations
```

---

# 5. Collections

| tables | Description |
|------------|-------------|
| vehicles | Parc véhicules |
| drivers | Chauffeurs |
| trailers | Remorques |
| equipments | Équipements |
| maintenanceRecords | Historique des maintenances |
| resourceDocuments | Documents des ressources |

---

# 6. Description

## vehicles

Représente tous les véhicules pouvant être utilisés.

Ils peuvent être :

- internes ;
- loués ;
- appartenant à un partenaire.

---

## drivers

Représente les conducteurs.

Ils peuvent être :

- salariés ;
- intérimaires ;
- chauffeurs partenaires.

---

## trailers

Toutes les remorques utilisées.

---

## equipments

Équipements pouvant être affectés à une mission.

Exemples :

- conteneurs ;
- groupes frigorifiques ;
- chariots embarqués ;
- grues auxiliaires.

---

## maintenanceRecords

Historique des opérations de maintenance.

---

## resourceDocuments

Documents liés aux ressources.

Exemples :

- assurance ;
- carte grise ;
- contrôle technique ;
- permis ;
- certificat ADR.

---

# 7. Relations

Entreprise

↓

Véhicules

↓

Documents

↓

Maintenance

Entreprise

↓

Chauffeurs

↓

Documents

↓

Permis

---

# 8. Règles métier

- Une ressource possède un état.
- Une ressource peut être indisponible.
- Une ressource peut être affectée à plusieurs missions à des dates différentes.
- Une ressource ne peut pas être affectée à deux missions qui se chevauchent.
- Une ressource archivée ne peut plus être affectée.
- Les documents expirés génèrent une alerte.

---

# 9. États

Disponible

Réservée

En mission

En maintenance

Indisponible

Archivée

---

# 10. Évolutions futures

- GPS
- IoT
- Carburant
- Consommation
- Pneumatiques
- Télépéage
- Géolocalisation