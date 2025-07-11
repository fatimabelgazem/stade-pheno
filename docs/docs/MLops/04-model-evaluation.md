# 🧪 4 - Évaluation du Modèle

Cette section détaille le processus d'évaluation de notre modèle entraîné pour la détection des stades phénologiques des orangers. L'évaluation est une étape critique du cycle MLOps qui permet de valider les performances et la fiabilité du modèle avant son déploiement.

## 3.1 - Méthodologie d'évaluation

Notre évaluation suit une approche rigoureuse basée sur plusieurs métriques complémentaires :

- **📊 Dataset de test :** 10% de notre jeu de données total, réservé spécifiquement pour l'évaluation
- **🎯 Métriques principales :** mAP (mean Average Precision), Précision, Rappel, F1-Score
- **🔄 Validation croisée :** Pour garantir la robustesse des résultats.
L'évaluation est réalisée de manière indépendante de l'entraînement, conformément aux bonnes pratiques MLOps, assurant ainsi l'intégrité des résultats.

## ⚙️ 3.2 - Configuration de l'évaluation

Pour évaluer notre modèle, nous avons utilisé le mode val de YOLOv8 avec suivi via MLflow :
```bash
import mlflow
import os
import pandas as pd

# Initialisation de MLflow pour l'évaluation
mlflow.set_tracking_uri("file:///kaggle/working/mlruns")
mlflow.set_experiment("YOLOv8_StadePheno1_Evaluation")

with mlflow.start_run(run_name="evaluation_final_model") as run:
    # Log des paramètres d'évaluation
    mlflow.log_param("model_path", "/kaggle/working/datasets/runs/detect/train/weights/best.pt")
    mlflow.log_param("imgsz", 800)
    
    # Lancement de l'évaluation
    !yolo task=detect mode=val \
        model=/kaggle/working/datasets/runs/detect/train/weights/best.pt \
        data=/kaggle/working/datasets/Stade_Pheno_Dataset-3/data.yaml \
        imgsz=800

```

## 📊 3.3 - Résultats de l'évaluation
L'évaluation de notre modèle a donné d'excellents résultats sur le jeu de données de test :
### 📉 Métriques globales :

| Métrique     | Valeur      | Description                                       |
|--------------|-------------|---------------------------------------------------|
|   mAP50      |  0.877      |  Précision moyenne à 50% IoU                      |
|  mAP50-95    |  0.618      |  Précision moyenne entre 50% et 95% IoU           |
|  Precision   |  0.87       |  Précision globale du modèle                      |
|  Recall      |  0.81       |  Rappel global du modèle                          |
|  F1-Score    |  0.84       |  Moyenne harmonique de la précision et du rappel  |

###  Performance par classe :
 
|   Classe        |  Label  |  mAP50  |  Precision  |  Recall           |
|-----------------|---------|---------|-------------|-------------------|
|   Flower        |    0    |  0.872  |    0.897    |       0.751       |
|   Flower Fermee |    1    |  0.877  |    0.814    |       0.816       |
|   Green         |    2    |  0.929  |    0.896    |       0.877       |
|   Mature        |    3    |  0.886  |   0.952     |       0.83        |
|   Noisant       |    4    |  0.823  |    0.79     |       0.778       |         




### 🔄 Matrice de confusion :
<p align="center">
  <img src={require('/static/img/MLops/Confusion Matrix.png').default} alt="Matrice de confusion" width="600px" />
</p>

La matrice de confusion montre une bonne classification pour toutes les classes, avec peu de confusions entre les différentes catégories.


## 🖼️ 3.4 - Visualisation des prédictions

Pour une évaluation qualitative, nous avons observé les prédictions du modèle sur des images de test :

<div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", flexWrap: "wrap" }}>
  <div style={{ textAlign: "center", width: "65%" }}>
    <img src={require('/static/img/MLops/merged_resul2.jpg').default} alt="Exemple de prédiction 1" style={{ maxWidth: "95%", borderRadius: "10px" }} />
    <p><strong>Détection des fruits fruits matures,flower et flower fermee</strong></p>
  </div>
 
</div>

 ### 🧪 Analyse des erreurs :
Nous avons également identifié les cas typiques d'erreurs du modèle :

|   Type d'erreur                                 |    Fréquence    |    Cause probable               |
|-------------------------------------------------|-----------------|---------------------------------|
|   Faux négatifs (fruits non détectés)           |      12%        |    Occlusion par les feuilles   |
|   Confusion entre fruits verts et le backgound  |       8%        |    Variations de luminosité     |
|   Détections multiples du même fruit            |       5%        |    Seuil IoU trop bas           |

## ✅ 3.6 - Résumé de l'évaluation

|      Étape               |        Action réalisée                                   |
|--------------------------|---------------------------------------------------|
|  Modèle de base          |  YOLOv8m pré-entraîné sur "Nature3: Leaf, Flower, and Fruit Detection"                   |
|  Fine-tuning             |  Entraînement sur notre dataset d'orangers pendant 100 epochs                            |
|  Suivi                   |  MLflow pour la traçabilité des expériences et des métriques                             |
|  Résultat                |  Modèle entraîné sauvegardé sous format PyTorch (.pt) prêt pour évaluation               |


