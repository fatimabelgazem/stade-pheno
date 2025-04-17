# Gestion des données

La première étape de tout projet MLOps consiste à bien gérer les données : les collecter, les nettoyer et les annoter. Voici comment cela a été réalisé pour le projet **PhénoRendement**.

---

## 📸 1.1 - Collecte des images
- 🧑‍🌾 **Terrain** :
Nous avons réalisé une collecte d’images **directement sur le terrain**, dans une ferme d’orangers :

- 📍 **Lieu** : la ferme Ain Chaaib  
- 📷 **Méthode** : Photos prises manuellement à différentes distances et angles  
- ☀️ **Conditions** : Images prises à différents moments de la journée pour capturer des variations de lumière  

<center>
<img src="/img/MLops/collecte.jpg" alt="Collecte des images dans la ferme" width="350" />
</center>

- 🗃️ **Dataset existant** : ajout d’images provenant de **Roboflow**, déjà annotées.

> Résultat : 📁 Environ 17 700 images brutes capturées

---

## 🧹 1.2 - Nettoyage des données

Après collecte, nous avons procédé à un nettoyage rigoureux :

- ❌ Suppression des images :
  - Floues
  - Trop sombres / surexposées
  - Mal cadrées  
- ✅ Sélection finale : Environ 17 400 images conservées pour annotation

---

## 🏷️ 1.3 - Annotation des données

Pour entraîner un modèle de détection, les images ont été **annotées manuellement** via **Roboflow** :

- 🎯 Outil utilisé : [Roboflow](https://roboflow.com/)
- 📌 Format : YOLOv8
- 📁 Export : `.txt` contenant `[class x_center y_center width height]` pour chaque image

### 🧠 Classes utilisées :

| Classe | Label    | Emoji | Description                         |
|--------|----------|-------|-------------------------------------|
| 0      | flower   | 🌸    | Stade de floraison                  |
| 1      | green    | 🍏    | Fruits verts                        |
| 2      | mature   | 🍊    | Fruits mûrs                         |

> 🎯 Objectif de l’annotation : Permettre à YOLOv8 de détecter les zones dominantes sur chaque arbre pour calculer le **rendement potentiel**.

<div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", flexWrap: "wrap" }}>
  <div style={{ textAlign: "center", width: "45%" }}>
    <img src="/img/MLops/avantAnnotation.jpg" alt="Image brute avant annotation" style={{ maxWidth: "100%", borderRadius: "10px" }} />
    <p><strong>Image avant annotation</strong></p>
  </div>
  <div style={{ textAlign: "center", width: "45%" }}>
    <img src="/img/MLops/apresAnnotation.jpg" alt="Image annotée dans Roboflow" style={{ maxWidth: "100%", borderRadius: "10px" }} />
    <p><strong>Image après annotation (Roboflow)</strong></p>
  </div>
</div>

<div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", flexWrap: "wrap", marginTop: "1rem" }}>
  <div style={{ textAlign: "center", width: "45%" }}>
    <img src="/img/MLops/avantAnnotation2.jpg" alt="Image brute avant annotation" style={{ maxWidth: "100%", borderRadius: "10px" }} />
    <p><strong>Image avant annotation</strong></p>
  </div>
  <div style={{ textAlign: "center", width: "45%" }}>
    <img src="/img/MLops/apres_annotation.jpg" alt="Image annotée dans Roboflow" style={{ maxWidth: "100%", borderRadius: "10px" }} />
    <p><strong>Image après annotation (Roboflow)</strong></p>
  </div>
</div>

> 🟥 *Box rouge : orange mature*  
> 🟩 *Box verte : orange verte*  
> 🟪 *Box mauve : flower*

---

## 🔁 1.4 - Augmentation des données

Pour améliorer la robustesse du modèle et compenser le faible nombre d’images dans certaines classes, nous avons appliqué plusieurs techniques d’**augmentation des données**.

### ✨ Transformations appliquées :

| Type d’augmentation | Détails                                                                 |
|---------------------|-------------------------------------------------------------------------|
| 🔄 **Flip**          | Horizontal et vertical                                                  |
| ↩️ **Rotation 90°**  | Sens horaire, antihoraire, et retournement complet                      |
| 🔁 **Rotation libre**| Aléatoire entre **-15° et +15°**                                        |
| 💡 **Luminosité**    | Ajustement aléatoire entre **-15% et +15%**                             |
| 🌫️ **Flou**          | Application de flou léger jusqu’à **1.2px**                             |

> Ces transformations ont été appliquées automatiquement via Roboflow sur les images sélectionnées.




---

## ✅ Résumé

| Étape         | Action réalisée                                  |
|---------------|--------------------------------------------------|
| Collecte      | Prise de photos sur le terrain                   |
| Nettoyage     | Suppression manuelle des images de mauvaise qualité |
| Annotation    | Roboflow, format YOLOv8, 3 classes annotées      |
| Augmentation  | Flip, rotation, flou, luminosité aléatoire       |
