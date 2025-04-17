# 📡 5 - Monitoring du Modèle

Une fois le modèle déployé, il est essentiel de **surveiller son comportement en production** pour s'assurer de sa performance continue et détecter d’éventuels dérèglements ou dérives.

---

## 🎯 5.1 - Objectifs du Monitoring

- 📉 **Détection de dérive** : Comparer les performances du modèle en production avec celles lors de l'entraînement.
- 🧪 **Suivi des prédictions** : Stocker les résultats du modèle sur les nouvelles données.
- ⚠️ **Alertes en cas d’erreurs** : Notifier en cas de taux d’erreur élevé ou de comportement inattendu.

---

## 🧰 5.2 - Outils envisagés

| Outil       | Rôle                                                       |
|-------------|------------------------------------------------------------|
| **MLflow**  | Suivi des versions du modèle et des performances historiques |
| **Prometheus** | Collecte de métriques système / application (optionnel)     |
| **Grafana** | Visualisation des métriques en dashboard                    |
| **Logs API Flask** | Logs simples (requêtes, classes détectées, erreurs)      |

---

## 🧪 5.3 - Exemples de métriques à surveiller

| Métrique                  | Description                                     |
|---------------------------|-------------------------------------------------|
| Nombre de requêtes / jour | Activité de l’API                              |
| Temps de réponse moyen    | Performance de l’inférence                     |
| Distribution des classes  | Analyse de la répartition des stades détectés |
| % d’images sans détection | Indice d’une possible dégradation du modèle   |

---

## ✅ 5.4 - Résumé

| Élément                 | Détail                                              |
|-------------------------|-----------------------------------------------------|
| Monitoring système      | Logs API, temps de réponse, volume de requêtes     |
| Monitoring modèle       | % par classe, taux de détection, drift éventuel    |
| Outils prévus           | Logs Flask, MLflow, (Prometheus + Grafana, optionnel) |

> 🛠️ **Prochaine étape** : Automatiser l’envoi de rapports hebdomadaires et intégrer un dashboard de monitoring.
