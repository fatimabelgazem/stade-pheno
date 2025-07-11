# 📸 2 - Gestion des données
La première étape de tout projet MLOps consiste à bien gérer les données : les collecter, les nettoyer et les annoter. Voici comment cela a été réalisé pour le projet **PhénoRendement**.

---

## 📸 1.1 - Collecte des images

La constitution du jeu de données a reposé sur une **stratégie de collecte multi-sources** afin d’assurer une **représentativité optimale** des différents stades phénologiques des orangers.

### 🌿 Sources de collecte :

1. 📱 **Acquisition automatisée par smartphone fixe**  
   - Smartphone installé **de manière fixe** devant un arbre de la ferme partenaire  
   - Capture **automatique de 3 photos/jour à heures fixes**  
   - ✅ Suivi longitudinal régulier des stades phénologiques en conditions réelles

2. 🧑‍🌾 **Collecte terrain manuelle**  
   - Images capturées sur le terrain avec un téléphone portable  
   - Variété des **angles, distances et moments de la journée**  
   - Permet une **diversité visuelle accrue**

3. 🌐 **Enrichissement par sources web**  
   - Sélection d’images depuis **bases de données agricoles**, **publications scientifiques**, etc.  
   - 🧠 Cible : objets ou stades **sous-représentés** (ex. fleurs fermées, fruits en maturation)

4. 🗃️ **Dataset existant**  
   - Intégration d’images annotées via **Roboflow**

> 📈 **Résultat** : Environ **8206 images brutes** collectées

---

## 🧹 1.2 - Nettoyage des données

Après collecte, nous avons procédé à un nettoyage rigoureux :

- ❌ Suppression des images :
  - Floues
  - Trop sombres / surexposées
  - Mal cadrées  
- ✅ Sélection finale : Environ 9823 images conservées pour annotation

---

## 🏷️ 1.3 - Annotation des données

Pour entraîner un modèle de détection, les images ont été **annotées manuellement** via **Roboflow** :

- 🎯 Outil utilisé : [Roboflow](https://roboflow.com/)
- 📌 Format : YOLOv8
- 📁 Export : `.txt` contenant `[class x_center y_center width height]` pour chaque image

### 🧠 Classes utilisées :

| Classe | Label           | Emoji | Description                         |
|--------|-----------------|-------|-------------------------------------|
| 0      | flower          | 🌸    | Stade de floraison                  |
| 1      | flowerFermee    | 🌸    | Sous-Stade de floraison             |
| 2      | green           | 🍏    | Stade de Grossissement              |
| 3      | mature          | 🍊    | Stade de Maturation                 |
| 4      | noisant         | 🍏    | Stade de Noisant                    |

> 🎯 Objectif de l’annotation : Permettre à YOLOv8 de détecter les zones dominantes sur chaque arbre pour calculer le **rendement potentiel**.



<table>
  <tr>
    <td align="center">
      <img    src={require('/static/img/MLops/SansAnnotation.jpg').default} alt="Image avant annotation" width="300px" height="400px" />
      
    </td>
    <td align="center">
      <img src={require('/static/img/MLops/AvecAnnotation.jpg').default} alt="Image après annotation"  width="300px" height="400px" />
      
    </td>
  </tr>
<tr>
<td align="center"><strong>Avant annotation</strong></td>
<td align="center"><strong>Après annotation</strong></td>
</tr>
  <tr>
    <td align="center">
      <img src={require('/static/img/MLops/image7702.jpg').default}  alt="Image brute" width="300px"/>
      
    </td>
    <td align="center">
      <img  src={require('/static/img/MLops/Screenshot 2025-07-05 091419.jpg').default} alt="Image annotée" width="300px"/>
     
    </td>
  </tr>
<tr>
<td align="center"><strong>Avant annotation</strong></td>
<td align="center"><strong>Après annotation</strong></td>
</tr>
</table>


> 🟥 *Box verte  : orange mature*  
> 🟩 *Box verte : orange verte*  
> 🟪 *Box mauve : flower*

---

## 🔁 1.4 - Augmentation des données

Pour améliorer la robustesse du modèle et compenser le faible nombre d’images dans certaines classes, nous avons appliqué plusieurs techniques d’**augmentation des données**.

### ✨ Transformations appliquées :

| Type d’augmentation   | Détails                                                                 |
|-----------------------|-------------------------------------------------------------------------|
| 🔄 **Flip**           | Horizontal et vertical                                                  |
| ↩️ **Rotation 90°**    | Sens horaire, antihoraire, et retournement complet                      |
| 🔁 **Rotation libre** | Aléatoire entre **-15° et +15°**                                        |
| 🌫️ **Flou**           | Application de flou léger jusqu’à **1.2px**                             |

> Ces transformations ont été appliquées automatiquement via Roboflow sur les images sélectionnées.




---

## ✅ Résumé

| Étape         | Action réalisée                                     |
|---------------|-----------------------------------------------------|
| Collecte      | Prise de photos sur le terrain                      |
| Nettoyage     | Suppression manuelle des images de mauvaise qualité |
| Annotation    | Roboflow, format YOLOv8, 5 classes annotées         |
| Augmentation  | Flip, rotation, flou, luminosité aléatoire          |
