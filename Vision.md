# Vision Produit – TMS Enterprise

**Version :** 1.0
**Statut :** Draft
**Date :** Juin 2026

---

# 1. Présentation

## 1.1 Nom du projet

**RouteXTMS Enterprise**

## 1.2 Description

TMS Enterprise est une plateforme web de gestion des opérations de transport (Transport Management System) destinée aux entreprises souhaitant centraliser, planifier, exécuter et suivre leurs activités de transport.

Le système permettra de gérer aussi bien les ressources internes que les ressources externes (transporteurs partenaires, véhicules loués, chauffeurs externes) afin d'offrir une solution flexible et adaptée à différents modèles d'exploitation.

---

# 2. Vision

Développer une plateforme moderne, modulaire et évolutive permettant aux entreprises de transport marchandises de gérer l'ensemble de leur chaîne de transport depuis la création d'une commande jusqu'à sa facturation, tout en offrant une visibilité complète sur les opérations, les coûts et les performances.

Le produit doit être conçu pour accompagner la croissance des entreprises et pouvoir évoluer grâce à une architecture modulaire.

---

# 3. Problématique

Aujourd'hui, de nombreuses entreprises utilisent plusieurs outils pour gérer leurs transports :

* Excel
* WhatsApp
* E-mails
* Appels téléphoniques
* Documents papier

Cette organisation entraîne plusieurs difficultés :

* manque de visibilité sur les opérations ;
* perte d'informations ;
* erreurs de communication ;
* mauvaise planification ;
* retards ;
* absence d'indicateurs de performance ;
* difficulté à calculer les coûts réels ;
* difficulté à suivre les ressources.

L'objectif du TMS est de centraliser toutes ces informations dans une seule plateforme.

---

# 4. Objectifs du produit

Le système devra permettre de :

## Gestion des opérations

* Centraliser les opérations de transport.
* Standardiser les processus métier.
* Réduire les erreurs de saisie.

## Planification

* Planifier les missions.
* Affecter les ressources.
* Optimiser l'utilisation des véhicules / chauffeurs.
* Minimiser les ressources.

## Exécution

* Suivre les missions en temps réel.
* Gérer les événements de transport.
* Gérer les incidents.

## Pilotage

* Fournir des tableaux de bord.
* Produire des indicateurs de performance.
* Générer des rapports.

## Gestion financière

* Calculer les coûts.
* Gérer la facturation.
* Suivre la rentabilité.

---

# 5. Public cible

Le produit est destiné aux entreprises qui organisent des opérations de transport (entreprises logistique, transport marchandises et les entreprises industrieles qui un volume logistique important).

Exemples :

* sociétés de transport ;
* entreprises de logistique ;
* distributeurs ;
* industriels ;
* entreprises de e-commerce.

---

# 6. Utilisateurs

Le système devra gérer plusieurs profils.

| Rôle                   | Description                            |
| ---------------------- | -------------------------------------- |
| Super Administrateur   | Administration globale                 |
| Administrateur         | Administration de l'entreprise         |
| Responsable Transport  | Supervision des opérations             |
| Dispatcher             | Planification des missions             |
| Exploitant             | Gestion quotidienne des transports     |
| Gestionnaire de flotte (chef de parc) | Gestion des véhicules                  |
| Gestionnaire RH        | Gestion des chauffeurs                 |
| Comptable              | Facturation et paiements               |
| Client                 | Consultation des expéditions           |
| Chauffeur              | Consultation et exécution des missions |
| Partenaire             | Sous-traitant ou loueur                |

---

# 7. Modes d'exploitation

Le TMS devra permettre plusieurs modes d'exécution.

## Flotte interne

L'entreprise utilise ses propres ressources.

* véhicules internes ;
* chauffeurs internes.

## Sous-traitance

Le transport est confié à un partenaire.

Le système devra gérer :

* le partenaire ;
* le contrat ;
* le coût ;
* les documents ;
* les performances.

## Véhicule loué

Le véhicule appartient à un loueur.

Le chauffeur peut être :

* interne ;
* externe.

## Chauffeur externe

L'entreprise utilise son véhicule avec un chauffeur fourni par un prestataire.

## Mode hybride

Une mission peut combiner plusieurs ressources internes et externes.

---

# 8. Valeurs du produit

Le produit devra être :

* Modulaire
* Évolutif
* Sécurisé
* Rapide
* Multi-utilisateur
* Multi-agence
* Multi-client
* Multi-partenaire
* API First
* Responsive
* Facile à utiliser

---

# 9. Principes de conception

Le développement suivra les principes suivants :

* séparation claire entre la logique métier et la présentation ;
* architecture modulaire ;
* composants réutilisables ;
* API REST documentée ;
* sécurité dès la conception ;
* journalisation des actions ;
* forte maintenabilité ;
* extensibilité.

---

# 10. Fonctionnalités principales

Le produit sera organisé autour des modules suivants :

* Authentification
* Gestion des utilisateurs
* Gestion des rôles
* Gestion des clients
* Gestion des partenaires
* Gestion des transporteurs
* Gestion de la flotte
* Gestion des véhicules
* Gestion des chauffeurs
* Gestion des remorques
* Gestion des commandes
* Planification
* Affectation des ressources
* Suivi des transports
* Gestion documentaire
* Facturation
* Rapports
* Tableau de bord
* Paramètres

Chaque module fera l'objet d'une spécification fonctionnelle détaillée.

---

# 11. Objectifs de la première version (MVP)

La première version devra permettre :

* authentification ;
* gestion des utilisateurs ;
* gestion des partenaires ;
* gestion des véhicules ;
* gestion des chauffeurs ;
* gestion des commandes de transport ;
* planification ;
* affectation des ressources ;
* suivi des missions ;
* gestion documentaire ;
* tableau de bord ;
* rapports principaux.

---

# 12. Vision à long terme

Les versions futures pourront intégrer :

* optimisation automatique des tournées ;
* intelligence artificielle pour l'aide à la planification ;
* application mobile chauffeur ;
* portail client ;
* géolocalisation temps réel ;
* intégration GPS ;
* calcul automatique des émissions de CO₂ ;
* moteur de règles métier configurable ;
* intégration ERP, WMS et CRM ;
* API publiques pour les partenaires.

---

# 13. Critères de réussite

Le projet sera considéré comme réussi si le système permet :

* de centraliser toutes les opérations de transport ;
* de réduire les tâches manuelles ;
* d'améliorer la visibilité des opérations ;
* d'optimiser l'utilisation des ressources ;
* de fournir des indicateurs fiables ;
* de faciliter la prise de décision.

---

# 14. Hors périmètre de la V1

Les fonctionnalités suivantes ne seront pas développées dans la première version :

* optimisation avancée par intelligence artificielle ;
* application mobile complète ;
* gestion des entrepôts (WMS) ;
* gestion comptable complète ;
* gestion RH complète.

Elles pourront être ajoutées dans les versions ultérieures.
