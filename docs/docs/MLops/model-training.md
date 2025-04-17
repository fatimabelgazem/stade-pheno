# 📈 2 - Entraînement du Modèle (Model Training)

L'étape suivante dans le cycle de vie MLOps consiste à **entraîner un modèle performant** à partir des données annotées.  
Dans le cadre de **PhénoRendement**, nous avons opté pour un modèle de détection d'objets basé sur **YOLOv8**, connu pour sa rapidité et sa précision.

---

## 🧠 2.1 - Choix du modèle : YOLOv8

- 📦 **Framework utilisé** : [Ultralytics YOLOv8](https://github.com/ultralytics/ultralytics)
- ⚡ **Avantages** :
  - Performant sur les appareils embarqués
  - Entraînement rapide
  - Format d'annotation compatible avec Roboflow

---

## 🛠️ 2.2 - Configuration de l'entraînement

- 🗃️ **Données** : Export YOLOv8 depuis Roboflow (dossier avec images + fichiers `.txt`)
- ⚙️ **Commandes utilisées** :

```bash
yolo task=detect mode=train model=yolov8n.pt data=dataset.yaml epochs=100 imgsz=640
```


## 📊 2.3 - Métriques attendues

Les métriques telles que **mAP**, **Recall** et **Precision** seront calculées automatiquement après l’entraînement via l’outil **YOLOv8**.  
Elles seront ajoutées ici une fois le modèle entraîné.

> 📌 Ces résultats seront essentiels pour valider la précision du modèle avant le déploiement.

---

### ✅ Résumé

| Élément              | Détail                             |
|----------------------|------------------------------------|
| Modèle prévu         | YOLOv8n                            |
| Données              | Dataset annoté Roboflow (YOLO)     |
| Environnement        | Kaggel            |
| Résolution d'image   | 640x640                            |
| Nombre d’époques     | 50                                |
| Classes              | flower 🌸, green 🍏, mature 🍊        |
| Métriques            | À venir après entraînement         |
