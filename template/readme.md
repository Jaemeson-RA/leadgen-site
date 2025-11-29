# 📦 Template Master - Système de Génération de Sites Statiques

Ce template est un système complet pour générer rapidement des sites statiques HTML/CSS/JS professionnels.

## 📁 Structure du Template

```
template/
├── base.html          # Structure HTML de base avec placeholders
├── components.html    # Bibliothèque de composants réutilisables
├── layout.css         # Système de layout et utilities CSS
├── theme.css          # Styles visuels (couleurs, boutons, etc.)
├── utils.js           # Fonctions JavaScript utiles
└── readme.md          # Ce fichier
```

---

## 🚀 Comment Utiliser ce Template

### Étape 1 : Créer un Nouveau Site

1. **Copie `base.html`** et renomme-le (ex: `landing-produit.html`)
2. **Remplace les placeholders** par le contenu réel
3. **Assemble les composants** depuis `components.html`
4. **Personnalise les styles** si nécessaire

### Étape 2 : Remplacer les Placeholders

Les placeholders dans `base.html` :

```html
{{title}}              → Titre de la page
{{meta_description}}   → Description meta
{{meta_keywords}}      → Mots-clés
{{og_image}}          → Image Open Graph
{{favicon}}           → Icône du site
{{hero_section}}      → Section hero
{{content_sections}}  → Sections de contenu
{{faq_section}}       → Section FAQ (optionnelle)
{{footer}}            → Pied de page
{{custom_css}}        → CSS personnalisé (optionnel)
{{custom_js}}         → JS personnalisé (optionnel)
```

### Étape 3 : Assembler les Composants

Choisis dans `components.html` et copie les composants dont tu as besoin :

**Pour un Hero :**
- Hero Standard (avec image)
- Hero Centered (centré)
- Hero with Background (avec fond)

**Pour le Contenu :**
- Sections (standard, avec background)
- Cards (simple, avec image, hover effect)
- Grids (2, 3, 4 colonnes, auto-fit)

**Pour l'Interactivité :**
- FAQ
- Testimonials
- Forms (contact, newsletter)
- CTA banners

**Pour le Footer :**
- Footer complet avec liens

---

## 📋 Exemples d'Utilisation

### Exemple 1 : Landing Page Simple

**Structure recommandée :**
1. Hero Centered
2. Section avec Grid de 3 Cards
3. Section testimonials
4. CTA Banner
5. Footer

**Code :**

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Découvrez notre solution innovante">
    <title>Mon Produit - Landing Page</title>
    <link rel="stylesheet" href="template/layout.css">
    <link rel="stylesheet" href="template/theme.css">
</head>
<body>
    <!-- Hero Centered -->
    <section class="hero hero--centered">
        <div class="container container--narrow">
            <h1 class="hero__title hero__title--center">Transformez Votre Business</h1>
            <p class="hero__subtitle hero__subtitle--center">Une solution simple et efficace pour développer votre activité</p>
            <div class="hero__cta hero__cta--center">
                <a href="#contact" class="btn btn--primary btn--large">Commencer Gratuitement</a>
            </div>
        </div>
    </section>

    <!-- Section Features -->
    <section class="section">
        <div class="container">
            <h2 class="section__title section__title--center">Nos Fonctionnalités</h2>
            <div class="grid grid--3">
                <div class="card">
                    <div class="card__icon">
                        <img src="icon1.svg" alt="Rapide">
                    </div>
                    <h3 class="card__title">Ultra Rapide</h3>
                    <p class="card__text">Des performances optimales pour une expérience utilisateur exceptionnelle</p>
                </div>
                <!-- Plus de cards... -->
            </div>
        </div>
    </section>

    <!-- CTA -->
    <section class="cta cta--centered">
        <div class="container container--narrow">
            <h2 class="cta__title">Prêt à Commencer ?</h2>
            <p class="cta__text">Rejoignez des milliers d'utilisateurs satisfaits</p>
            <a href="#contact" class="btn btn--primary btn--large">Essayer Maintenant</a>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <!-- Footer content -->
    </footer>

    <script src="template/utils.js"></script>
</body>
</html>
```

### Exemple 2 : Page Produit avec FAQ

**Structure recommandée :**
1. Hero Standard (avec image produit)
2. Section caractéristiques (Grid 4 cards)
3. Section testimonials
4. FAQ Section
5. CTA Banner
6. Footer

### Exemple 3 : Mini-Site Multi-Pages

**Pages à créer :**
- `index.html` (accueil avec hero + features)
- `about.html` (à propos)
- `pricing.html` (tarifs)
- `contact.html` (formulaire de contact)

**Navigation commune :**
```html
<nav class="nav">
    <div class="container flex-between">
        <a href="index.html" class="nav__logo">MonBrand</a>
        <ul class="nav__menu">
            <li><a href="index.html">Accueil</a></li>
            <li><a href="about.html">À propos</a></li>
            <li><a href="pricing.html">Tarifs</a></li>
            <li><a href="contact.html">Contact</a></li>
        </ul>
    </div>
</nav>
```

---

## 🎨 Personnalisation des Couleurs

Modifier les variables CSS dans `theme.css` :

```css
:root {
    --color-primary: #3b82f6;      /* Couleur principale */
    --color-secondary: #10b981;     /* Couleur secondaire */
    --color-dark: #1f2937;          /* Texte foncé */
    --color-light: #f3f4f6;         /* Fond clair */
}
```

---

## 📱 Responsive Design

Tous les composants sont **responsive par défaut** :
- Desktop : 1200px+
- Tablet : 768px - 1199px
- Mobile : < 768px

Les grids s'adaptent automatiquement :
- Grid 4 → 2 colonnes sur tablet → 1 colonne sur mobile
- Grid 3 → 2 colonnes sur tablet → 1 colonne sur mobile

---

## 🔧 Fonctionnalités JavaScript

`utils.js` inclut :

### ✅ Fonctionnalités Automatiques
- **Smooth scroll** sur les ancres
- **FAQ toggle** (cliquer pour ouvrir/fermer)
- **Scroll animations** (fade-in, slide-up)
- **Form handler** pour Netlify

### 📦 Fonctions Utilitaires
- `copyToClipboard(text)` - Copier du texte
- `throttle(func, delay)` - Limiter la fréquence d'exécution
- `debounce(func, delay)` - Retarder l'exécution

### Ajouter une Animation

```html
<div class="card slide-up">
    <!-- Contenu -->
</div>
```

Classes disponibles :
- `.slide-up` - Glisse vers le haut à l'apparition
- `.fade-in` - Apparaît en fondu

---

## 📝 Formulaires Netlify

Pour activer les formulaires sur Netlify, ajoute `data-netlify="true"` :

```html
<form name="contact" method="POST" data-netlify="true">
    <input type="text" name="name" required>
    <input type="email" name="email" required>
    <textarea name="message" required></textarea>
    <button type="submit" class="btn btn--primary">Envoyer</button>
</form>
```

---

## 🎯 Checklist Avant Déploiement

- [ ] Remplacer tous les `{{placeholders}}`
- [ ] Vérifier les liens (internes et externes)
- [ ] Optimiser les images (compression)
- [ ] Tester sur mobile
- [ ] Vérifier les meta tags (SEO)
- [ ] Tester les formulaires
- [ ] Valider le HTML/CSS

---

## 🚀 Workflow Recommandé

1. **Créer** la structure HTML avec `base.html`
2. **Assembler** les composants depuis `components.html`
3. **Tester** localement avec Live Server (VS Code)
4. **Commit** et **push** sur GitHub
5. **Netlify** déploie automatiquement

---

## 💡 Astuces Pro

### Combiner Plusieurs Styles
```html
<a href="#" class="btn btn--primary btn--large">Mon Bouton</a>
```

### Utiliser les Utilities CSS
```html
<div class="mt-5 mb-3 text-center">Contenu</div>
```

### Créer des Variantes de Composants
Ajoute des classes modificatrices :
```html
<div class="card card--featured"></div>
```

Puis style dans ton CSS personnalisé :
```css
.card--featured {
    border: 2px solid var(--color-primary);
}
```

---

## 📚 Ressources

- **Icons** : [Heroicons](https://heroicons.com/), [Feather Icons](https://feathericons.com/)
- **Images** : [Unsplash](https://unsplash.com/), [Pexels](https://pexels.com/)
- **Fonts** : [Google Fonts](https://fonts.google.com/)
- **Colors** : [Coolors](https://coolors.co/)

---

## 🆘 Problèmes Courants

**Le CSS ne se charge pas :**
- Vérifie le chemin relatif : `href="template/layout.css"`

**Les animations ne fonctionnent pas :**
- Vérifie que `utils.js` est bien chargé
- Ajoute la classe `.slide-up` ou `.fade-in` à tes éléments

**Le formulaire ne s'envoie pas :**
- Vérifie l'attribut `data-netlify="true"`
- Le formulaire doit avoir un attribut `name`

---

## 📞 Support

Pour toute question, contacte-moi via Claude Desktop avec le MCP filesystem activé !

---

**Version 1.0** - Template Master System
Créé pour une génération rapide et professionnelle de sites statiques.
