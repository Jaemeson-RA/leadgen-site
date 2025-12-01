# ✅ GUIDE D'INSTALLATION SIMPLE

## 🎯 CE QUI A ÉTÉ MODIFIÉ

**UNIQUEMENT 2 changements dans le CSS** :

1. ✅ **Vidéo agrandie** : 600px → 700px (+17%)
2. ✅ **Flèches carrousel** : Positionnées à l'extérieur (-70px de chaque côté)

**TOUT LE RESTE EST IDENTIQUE** à ton site actuel ! 🎉

---

## 📦 FICHIERS À INSTALLER

1. **index-CORRIGE.html** → Renommer en `index.html` (identique à l'ancien)
2. **style-CORRIGE.css** → Renommer en `style.css` (2 modifications CSS seulement)

---

## 🚀 INSTALLATION (3 ÉTAPES)

### 1. Backup
```powershell
cd C:\Users\Jaeme\Desktop\leadgen-site
mkdir backup
copy index.html backup\
copy style.css backup\
```

### 2. Remplacer les fichiers
1. Télécharge `index-CORRIGE.html` et renomme-le en `index.html`
2. Télécharge `style-CORRIGE.css` et renomme-le en `style.css`
3. Copie les 2 fichiers dans `C:\Users\Jaeme\Desktop\leadgen-site\`
4. Remplace quand demandé

### 3. Déployer
```powershell
git add .
git commit -m "Video enlarged and carousel arrows positioned outside"
git push origin gh-pages
```

Attends 1-2 minutes, puis va sur https://jaemeson-ra.github.io/leadgen-site/

**Vide le cache** : Ctrl + F5

---

## ✨ RÉSULTAT ATTENDU

### Desktop :
- ✅ **Vidéo plus grande** (700px au lieu de 600px)
- ✅ **Flèches carrousel à l'extérieur** des fiches d'avis
- ✅ **Tout le reste identique** : Avant/Après, Comment ça marche, etc.

### Mobile :
- ✅ **Tout fonctionne** comme avant
- ✅ **Responsive** identique

---

## 📋 CHECKLIST

Après déploiement, vérifie :
- [ ] Vidéo visible et plus grande qu'avant
- [ ] Section "Avant FLO / Après FLO" présente avec 2 colonnes
- [ ] Section "Comment ça marche" avec 3 cartes simples (Créer, Structurer, Suivre)
- [ ] Carrousel témoignages avec flèches **à l'extérieur**
- [ ] Toutes les sections présentes (Tarifs, FAQ, Footer)
- [ ] Mobile responsive OK

---

## 🆘 SI PROBLÈME

**Vidéo pas plus grande ?**
→ Vide le cache : Ctrl + Shift + Delete → Cocher "Images et fichiers" → Effacer

**Flèches toujours à l'intérieur ?**
→ Vide le cache complet du navigateur
→ Ou essaie en mode incognito (Ctrl + Shift + N)

**Site cassé ?**
→ Restaure la backup :
```powershell
cd C:\Users\Jaeme\Desktop\leadgen-site
copy backup\index.html .
copy backup\style.css .
```

---

## 🎉 C'EST TOUT !

Seulement **2 modifications CSS**, le reste est **100% identique** ! 🚀

Bonne installation ! 😊
