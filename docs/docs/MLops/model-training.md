# Entraînement du modèle
Cette section détaille le processus d'entraînement du modèle de détection pour le projet **PhénoRendement**. Nous avons adopté une approche en deux étapes pour maximiser la précision tout en optimisant l'utilisation des ressources.

## 🧠 2.1 - Stratégie d'entraînement
Notre stratégie d'entraînement repose sur le transfer learning (apprentissage par transfert) :

- **🥇 Étape 1 :**  Pré-entraînement sur un dataset générique de plantes
- **🥈 Étape 2 :**  Fine-tuning sur notre dataset spécifique d'orangers

Cette approche nous permet de bénéficier des connaissances générales sur la détection d'éléments de plantes, tout en spécialisant notre modèle pour notre cas d'usage précis.

# 🧠 2.2 - Architecture YOLOv8
YOLOv8 est basé sur une architecture de réseau neuronal avancée qui se compose de trois composants principaux :

🔹 **Backbone (Réseau dorsal) :**

Le backbone est le réseau neuronal convolutif **(CNN)** responsable de l'extraction des caractéristiques à partir de l'image d'entrée. **YOLOv8** utilise un backbone **CSPDarknet53** personnalisé, qui emploie des connexions partielles entre étapes **(cross-stage partial connections)** pour améliorer la circulation de l'information entre les couches et augmenter la précision.

🔹 **Neck (Cou) :**

Le neck, également connu sous le nom d'extracteur de caractéristiques, fusionne les cartes de caractéristiques provenant de différentes étapes du backbone pour capturer des informations à diverses échelles. L'architecture **YOLOv8** utilise un module **C2f** innovant au lieu du traditionnel **Feature Pyramid Network (FPN)**. Ce module combine des caractéristiques sémantiques de haut niveau avec des informations spatiales de bas niveau, ce qui conduit à une meilleure précision de détection, en particulier pour les petits objets.

🔹 **Head (Tête) :**
La tête est responsable des prédictions. **YOLOv8** emploie plusieurs modules de détection qui prédisent les boîtes englobantes (bounding boxes), les scores d'objectivité (objectness scores) et les probabilités de classe pour chaque cellule de la grille dans la carte de caractéristiques. Ces prédictions sont ensuite agrégées pour obtenir les détections finales.

<p align="center">
  <img src={require('/static/img/MLops/yolov8-architecture-detail.png').default} alt="Architecture détaillée de YOLOv8" width="600px" />
</p>

### 🔹 Avantages de cette architecture

 - **Efficacité** : Traitement rapide des images, permettant une détection en temps réel
 - **Précision** : Très bonne performance sur les objets de différentes tailles
 - **Flexibilité** : Plusieurs variantes (nano, small, medium, large, x-large) adaptées à différents contextes

### 🔹 Fonctionnalités clés

- **Détection multi-échelle** : Capacité à détecter des objets de tailles variées
- **Mécanisme d'attention** : Pour se concentrer sur les régions importantes de l'image
- **Augmentation d'ancrage** : Pour améliorer la stabilité de l'entraînement

Cette architecture sophistiquée fait de YOLOv8 un excellent choix pour notre tâche de détection des stades phénologiques des orangers, offrant un bon équilibre entre vitesse et précision.








# 🔍 2.3 - Modèle de base

-  **📊 Architecture :**  YOLOv8m (medium)
- **🌱 Pré-entraînement initial :**  Sur le dataset "Nature3: Leaf, Flower, and Fruit Detection"
- **📈 Avantages :** 
    - Architecture efficace pour la détection d'objets en temps réel.
    - Version "medium" offrant un bon équilibre entre précision et vitesse d'inférence.
    - Capacité prouvée sur les tâches de détection d'éléments naturels.

## ⚙️ 2.4 - Configuration d'entraînement
Nous avons utilisé MLflow pour suivre l'évolution de notre entraînement et gérer les expériences :
``` bash
pythonimport mlflow
import os
import pandas as pd

# Initialisation de MLflow
mlflow.set_tracking_uri("file:///kaggle/working/mlruns")
mlflow.set_experiment("YOLOv8_StadePheno1")
```
### 🔧 Hyperparamètres principaux :

| Paramètre    | Valeur                                                   | 
|--------------|----------------------------------------------------------|
| model_path   |/kaggle/input/modellast43/tensorflow2/default/1/last.pt   |
| epochs       | 100                                                      |
| imgsz        | 800                                                      |
| task         | detect                                                   |
| data         | /kaggle/working/datasets/Stade_Pheno_Dataset-3/data.yaml |
| resume       | True 

## 🚀 2.5 - Processus d'entraînement
L'entraînement a été exécuté dans un environnement Kaggle pour bénéficier de l'accélération GPU :
``` bash
with mlflow.start_run(run_name="yolov8m_custom_pretrained") as run:
    # Log des hyperparamètres
    mlflow.log_param("model_path", "/kaggle/input/modellast43/tensorflow2/default/1/last.pt")
    mlflow.log_param("epochs", 100)
    mlflow.log_param("imgsz", 800)
    
    # Lancement de l'entraînement YOLOv8
    !yolo task=detect mode=train \
        model=/kaggle/input/modellast43/tensorflow2/default/1/last.pt \
        data=/kaggle/working/datasets/Stade_Pheno_Dataset-3/data.yaml \
        epochs=100 imgsz=800 resume=True

```
### 📊 Suivi des performances :
Pour assurer une traçabilité complète, nous avons capturé les métriques clés à la fin de l'entraînement :
``` bash 
# Extraction et log des métriques
result_file = '/kaggle/working/datasets/runs/detect/train/results.csv'
if os.path.exists(result_file):
    df = pd.read_csv(result_file)
    last_row = df.iloc[-1]
    for metric_name, value in last_row.items():
        cleaned_metric_name = metric_name.replace("(", "_").replace(")", "_")
        mlflow.log_metric(cleaned_metric_name, value)

# Log des artifacts (modèles, courbes, etc.)
mlflow.log_artifacts('/kaggle/working/datasets/runs/detect/train')

```
