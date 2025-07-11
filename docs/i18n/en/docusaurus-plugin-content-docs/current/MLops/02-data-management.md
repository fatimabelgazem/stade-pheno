
---
id: data-management
title: Data Management
slug: /mlops/data-management
---

# 📸 2 - Data Management
The first step in any MLOps project is proper data management: collecting, cleaning, and annotating data. Here's how it was done for the PhénoRendement project.
---
## 📸 1.1 - Image Collection
- 🧑‍🌾 **On-site** :
Images were collected directly in the field, at an orange farm:
- 📍 ** Location** : a farm 
- 📷 **Method** : Photos manually taken at various distances and angles.
- ☀️ **Conditions** : Images taken at different times of the day to capture light variations.


<p align="center">
  <img src={require('/static/img/MLops/collecte.jpg').default} alt="Image before annotation" width="400px" />
</p>
- 🗃️ **Existing Dataset :**  Additional images were imported from Roboflow, already annotated.
> Result: 📁 Around 11,700 raw images collected.

---

## 🧹 1.2 -  Data Cleaning

After collection, a thorough cleaning process was carried out:

- ❌ Removed images that were:
  - Blurry
  - Too dark / overexposed
  - Poorly framed 
- ✅ Final selection: Around 9,823 images retained for annotation.

---

## 🏷️ 1.3 - Data Annotation

To train a detection model, the selected images were **manually annotated** using **Roboflow** :

- 🎯 Tool used : [Roboflow](https://roboflow.com/)
- 📌 Format : YOLOv8
- 📁 Export : `.txt` files with`[class x_center y_center width height]` per image.

### 🧠 Classes Used :

| Class  | Label    | Emoji | Description                         |
|--------|----------|-------|-------------------------------------|
| 0      | flower   | 🌸    | Flowering stage                     |
| 1      | green    | 🍏    | Green (unripe) fruits               |
| 2      | mature   | 🍊    | Ripe (mature) oranges               |

> 🎯 Annotation goal: Enable YOLOv8 to detect dominant zones on each tree to calculate **potential yield**.



<div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", flexWrap: "wrap", marginTop: "1rem" }}>
  <div style={{ textAlign: "center", width: "45%" }}>

    <img  src={require('/static/img/MLops/AvantAnnotation3.jpg').default} alt="Image brute avant annotation" style={{ maxWidth: "100%", borderRadius: "10px" }} />
    <p><strong>Image before annotation</strong></p>
  </div>
  <div style={{ textAlign: "center", width: "45%" }}>
    <img  src={require('/static/img/MLops/ApresAnnotation3.jpg').default} alt="Image annotée dans Roboflow" style={{ maxWidth: "100%", borderRadius: "10px" }} />

    <img  src={require('/static/img/MLops/avantAnnotation2.jpg').default} alt="Image brute avant annotation" style={{ maxWidth: "100%", borderRadius: "10px" }} />
    <p><strong>Image before annotation</strong></p>
  </div>
  <div style={{ textAlign: "center", width: "45%" }}>
    <img  src={require('/static/img/MLops/apres_annotation.jpg').default} alt="Image after annotation" style={{ maxWidth: "100%", borderRadius: "10px" }} />

    <p><strong>Image after annotation (Roboflow)</strong></p>
  </div>
</div>

> 🟥 *Red box : ripe orange*  
> 🟩 *Green box : green orange*  
> 🟪 *Purple box : flower*

---

## 🔁 1.4 - Data Augmentation

To improve the model's robustness and compensate for the low number of images in some classes, various **data augmentation** techniques were applied.

### ✨ Applied Transformations :

|   Augmentation Type         |    Détails                                                    |
|-----------------------------|---------------------------------------------------------------|
|    🔄 **Flip**              |    Horizontal and vertical                                    |
|    ↩️ **Rotate 90°**         |    Clockwise, counter-clockwise, full inversion               |
|    🔁 ** Free Rotation**    |    Random angle between **-15°** and +15°**                   |
|    💡 **Brightness**         |    Random adjustment between **-15% and +15%**                |
|    🌫️ **Blur**              |    Light blur up to **1.2px**                                  |

> These transformations were applied automatically via Roboflow on the selected imagesa.




---

## ✅ Summary

| Step          |                Action Taken                      |
|---------------|--------------------------------------------------|
| Collection    | Field photo collection                           |
| Cleaning      | Manual removal of poor-quality images            |
| Annotation    | Roboflow, YOLOv8 format, 3 labeled classes       |
| Augmentation  | Flip, rotation, blur, brightness adjustments     |
