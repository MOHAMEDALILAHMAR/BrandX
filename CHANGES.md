# CHANGES — BrandX Site

## TÂCHE 1 — Corrections Figma pixel-perfect

### HOME (`src/pages/Home.tsx` + `Home.module.css`)
| Écart | Correction |
|-------|-----------|
| Section "À propos" : image droite = photo handshake (`IMG_0098`) | → remplacée par dashboard BrandX "SOLD OUT" (`dashboardImg`) |
| Hero : fond trop sombre, logo neon peu visible | → fond noir pur `#050208`, logo centré comme `<img>` absolue |
| Hero : formes cristal/prisme des deux côtés absentes | → ajoutées via CSS `::before`/`::after` (clip-path + dégradé blanc→violet) |
| Overlay trop opaque cachait le logo | → réduit de `rgba(0,0,0,0.45)` à `rgba(5,2,8,0.30)` |

### ABOUT (`src/pages/About.tsx`)
| Écart | Correction |
|-------|-----------|
| Titre "À propos de **BrandX**" | → "À propos de **Nous**" |
| Portrait : photo équipe bureau | → `566.jpeg` (femme avec interface Swipe purple) |
| Process : "Consultation / Création / Livraison" | → "Recherche & découverte / Design & prototypage / Tournage & montage" |
| Titre process : "Notre Processus" | → "Processus de Travail" |
| 3 témoignages sans étoiles | → 2 témoignages avec ★★★★★ (Léa Picheau + Khaled Bengaraa) |
| Heading témoignages : "Ce que disent nos clients" | → "Avis Clients" |

### RÉALISATIONS (`src/pages/Portfolio.tsx`)
| Écart | Correction |
|-------|-----------|
| Projets 6 & 7 : Zayna Bijoux + Monogramme | → Food Express app + Fashion & Store F\|S |
| Ordre projets 3 & 4 : L'Arca avant Flygi | → Flygi (id:3) avant L'Arca (id:4) |
| Logos clients : Fashion & Store en logo | → retiré des logos (devenu projet) ; ZAYNA + Monogramme ajoutés |

---

## TÂCHE 2 — Formulaire Contact → Email Brevo SMTP

### Fichiers créés
| Fichier | Rôle |
|---------|------|
| `backend/server.js` | Serveur Express — endpoint `POST /contact` → nodemailer → Brevo SMTP |
| `backend/package.json` | Dépendances : express, cors, dotenv, nodemailer |
| `backend/.env` | Credentials Brevo SMTP (non versionné) |
| `backend/.env.example` | Template sans credentials (versionné) |

### Fichiers modifiés
| Fichier | Changement |
|---------|-----------|
| `src/pages/Contact.tsx` | `handleSubmit` → `async fetch('/api/contact')` + état `sending` + `apiError` |
| `src/pages/Contact.module.css` | Ajout `.errorMsg` + `.submitBtn:disabled` |
| `vite.config.ts` | Proxy `/api` → `http://localhost:3001` |
| `package.json` | Script `dev` → `concurrently` (front + back) ; `concurrently` ajouté en devDep |
| `.gitignore` | Ligne `backend/.env` ajoutée |

### Comportement du formulaire
- **Validation** : prénom, nom, email (format), message — tous requis
- **Envoi** : bouton désactivé + texte "Envoi..." pendant la requête
- **Succès** : bannière verte "✓ Message envoyé ! Nous vous répondrons dans les 24h." (8s), formulaire réinitialisé
- **Erreur** : bannière rouge avec le message d'erreur serveur

---

## Comment tester

### Démarrage
```bash
# Terminal unique — lance frontend (5173) + backend (3001) simultanément
npm run dev
```
Ou séparément :
```bash
npm run dev:front   # React/Vite sur http://localhost:5173
npm run dev:back    # Express sur http://localhost:3001
```

### Test du formulaire
1. Ouvrir `http://localhost:5173/contact`
2. Remplir : Prénom, Nom, Email valide, Téléphone, Sujet, Message
3. Cliquer **Envoyez**
4. Vérifier la bannière verte sur le site
5. Vérifier la réception sur **dalilahmer1212@gmail.com**

### Test de validation
- Laisser un champ vide → message d'erreur sous le champ
- Email invalide → "Email invalide" sous le champ email

---

## Actions manuelles restantes
Aucune — tout est configuré et prêt à l'emploi.
