# 🚀 4 - Déploiement du Modèle

Le déploiement consiste à rendre le modèle accessible à d’autres applications ou utilisateurs via une API REST. Pour **PhénoRendement**, nous avons utilisé **Flask** pour exposer le modèle YOLOv8.

---

## ⚙️ 4.1 - Architecture du déploiement

📸 Image → 🌐 API Flask → 🧠 YOLOv8 Inference → 📊 Prédiction Rendement

## 🔧 4.2 - API Flask

### 🔄 Fonctionnalité :
- Upload d’une image via une requête POST
- Détection du stade dominant de l’oranger
- Estimation du rendement par pourcentage des classes détectées
