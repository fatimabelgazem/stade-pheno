# 🧪 3 - Évaluation du Modèle

Une fois le modèle YOLOv8 entraîné, nous procédons à son évaluation afin de mesurer sa performance sur les images de validation/test. Cette étape est cruciale avant toute mise en production.

---

## 📂 3.1 - Données d'évaluation

- 🔄 **Split** : Les données ont été automatiquement divisées via Roboflow (80% entraînement / 20% validation)
- 🧪 **Type d’évaluation** : Détection d’objets avec classification par bounding box
- 🧾 **Format de labels** : YOLO format `[classe, x_center, y_center, width, height]`

---

## 📈 3.2 - Métriques évaluées

Les métriques standard de détection d’objets seront utilisées :

| Métrique       | Description                                         |
|----------------|-----------------------------------------------------|
| **mAP@0.5**     | Moyenne des précisions à IoU > 0.5 (standard YOLO) |
| **Recall**      | Taux de bonnes détections parmi toutes possibles   |
| **Precision**   | Taux de bonnes détections parmi toutes prédites    |
| **F1-score**    | Harmonie entre Recall et Precision                 |
| **Confusion Matrix** | Pour visualiser les erreurs par classe      |



---

## 🖼️ 3.3 - Résultats visuels

Une visualisation qualitative des prédictions sur des images de test sera ajoutée ici. Cela permettra de vérifier :

- 📌 La qualité des boxes (dimensions, positions)
- 📌 L’exactitude des classes prédictes
- 📌 Les éventuelles erreurs (faux positifs / faux négatifs)


---

## ✅ 3.4 - Résumé

| Élément                  | Détail                                      |
|--------------------------|---------------------------------------------|
| Métriques principales    | mAP, Precision, Recall, F1-score            |
| Échantillons visuels     | Oui (à venir)                               |
| Validité du modèle       | En attente d’analyse post-entraînement      |

