# Damage Done Tattoo - Website

Statische Website (HTML/CSS/JS, kein Build-Schritt, kein Server) für GitHub Pages.
Standardsprache ist Deutsch, über den Umschalter `DE / EN` lässt sich die Seite auf Englisch stellen.

## Dateien

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite mit Split-Screen (links fix: Titel + Eck-Links, rechts scrollbar: Bildvorschau + About) |
| `gallery.html` | Vollständiges Portfolio als Raster mit Lightbox |
| `request.html` | Anfrageformular (FormSubmit) |
| `faq.html` | FAQ mit aufklappbaren Antworten |
| `thank-you.html` | Bestätigungsseite nach dem Absenden des Formulars |
| `impressum.html` | Impressum - **muss vor dem Livegang ausgefüllt werden** |
| `datenschutz.html` | Datenschutzerklärung - **muss vor dem Livegang geprüft werden** |
| `styles.css` | Alle Styles, ganz oben die Farb- und Schrift-Variablen |
| `script.js` | Galerie, Lightbox, FAQ-Akkordeon, Scroll-Verhalten, Sprachumschaltung |
| `gallery-data.js` | **Die Bilderliste** - die einzige Datei zum Aktualisieren der Galerie |
| `favicon.ico`, `favicon-32.png`, `apple-touch-icon.png`, `icon-512.png` | Favicon-Satz aus dem Logo (helles Zeichen auf dunklem Grund) |
| `assets/cursor.svg` | Eigener Mauszeiger (kleines schwarzes Quadrat) |
| `assets/fonts/` | Schriften: Autre Display (Titel) und IBM Plex Sans (Fließtext), beide lokal - **müssen mit hochgeladen werden** |
| `images/gallery/` | Die 39 Portfoliofotos (weboptimiert) |
| `images/portrait.jpg` | Porträtfoto im About-Abschnitt |
| `images/liege.jpg` | Studiofoto in der rechten Spalte der FAQ-Seite |
| `CNAME` | Eigene Domain für GitHub Pages |
| `.nojekyll` | Verhindert Jekyll-Verarbeitung auf GitHub Pages |

## 1. GitHub Pages aktivieren

1. Neues Repository auf github.com anlegen (öffentlich).
2. Alle Dateien aus diesem Ordner ins Repository hochladen (Drag & Drop im Browser reicht, Ordnerstruktur beibehalten).
3. Im Repository: **Settings → Pages**.
4. Bei *Source* **Deploy from a branch** wählen, Branch `main`, Ordner `/ (root)`, **Save**.
5. Nach ein bis zwei Minuten ist die Seite unter `https://BENUTZERNAME.github.io/REPO-NAME/` erreichbar.

## 2. Eigene Domain verbinden

1. Die Datei `CNAME` im Repository öffnen und den Platzhalter durch die echte Domain ersetzen - **nur** die Domain, ohne `https://` und ohne Schrägstrich, z. B.:
   ```
   damagedonetattoo.de
   ```
2. Beim Domain-Anbieter (Registrar) die DNS-Einträge setzen:

   **Für die Apex-Domain** (`damagedonetattoo.de`) vier A-Einträge:
   ```
   A   @   185.199.108.153
   A   @   185.199.109.153
   A   @   185.199.110.153
   A   @   185.199.111.153
   ```
   (optional zusätzlich die AAAA-Einträge `2606:50c0:8000::153`, `…8001::153`, `…8002::153`, `…8003::153`)

   **Für die www-Variante** ein CNAME-Eintrag:
   ```
   CNAME   www   BENUTZERNAME.github.io
   ```
3. Zurück in **Settings → Pages → Custom domain**: Domain eintragen, speichern.
4. Wenn GitHub „DNS check successful“ meldet, **Enforce HTTPS** aktivieren (kann bis zu 24 Stunden dauern, bis das Zertifikat bereit ist).

## 3. Formular scharf schalten (FormSubmit)

In `request.html` gibt es oben im `<form>` einen Kommentarblock. Dort:

1. In `action="https://formsubmit.co/your-email@example.com"` die Adresse durch die echte E-Mail ersetzen.
2. Im versteckten Feld `_next` `https://DEINE-DOMAIN.de/thank-you.html` auf die echte Domain ändern (FormSubmit braucht dort eine vollständige URL - sonst landet man nach dem Absenden auf der Standardseite von FormSubmit).
3. Die Seite hochladen, das Formular **einmal selbst abschicken**. FormSubmit schickt daraufhin eine Bestätigungsmail an die eingetragene Adresse - den Link darin anklicken. Erst danach kommen Anfragen wirklich an.

Bereits gesetzte Einstellungen: `_subject` (Betreff der Mail), `_captcha=false` (kein Captcha-Zwischenschritt), `_template=table` (übersichtliche Darstellung in der Mail) und ein unsichtbares Honeypot-Feld gegen Spam-Bots.

Die `name="…"`-Attribute der Felder sind bewusst immer deutsch - daraus werden die Beschriftungen in der E-Mail, die bei dir ankommt, egal in welcher Sprache jemand das Formular ausgefüllt hat.

**Uploadgrenze:** FormSubmit erlaubt maximal 10 MB für alle angehängten Dateien zusammen. Ein entsprechender Hinweis steht direkt unter dem Upload-Feld.

## 4. Galerie-Bilder pflegen

Die Galerie liest ihre Bilder aus **`gallery-data.js`**. Nur diese eine Datei anfassen:

1. Bilddatei in den Ordner `images/gallery/` legen. **Vorher verkleinern** - die Fotos direkt aus der Kamera sind viel zu groß für eine Website. Die vorhandenen Bilder sind auf 1600 px lange Kante und JPG-Qualität 82 gerechnet (aus 149 MB wurden so 3,4 MB, ohne sichtbaren Verlust). Das geht mit jedem Bildprogramm oder mit diesem Zweizeiler im Projektordner:
   ```bash
   python -c "from PIL import Image, ImageOps; im=ImageOps.exif_transpose(Image.open('NEU.jpg')).convert('RGB'); im.thumbnail((1600,1600)); im.save('images/gallery/neu.jpg','JPEG',quality=82,optimize=True,progressive=True)"
   ```
2. In `gallery-data.js` eine Zeile ergänzen:
   ```js
   { src: "images/gallery/mein-neues-bild.jpg", alt: "Kurze Beschreibung", altEn: "Short description" },
   ```
   Auf das Komma am Zeilenende achten - nur die letzte Zeile der Liste hat keines. `altEn` ist optional; fehlt es, wird auch auf Englisch der deutsche Text benutzt.
3. Bild entfernen: die zugehörige Zeile löschen (und die Bilddatei, wenn sie nicht mehr gebraucht wird).

Die Reihenfolge in der Liste ist die Reihenfolge auf der Galerie-Seite. Welche Bilder zusätzlich in der **Vorschau auf der Startseite** erscheinen, steuert das Kennzeichen `home: true` in der jeweiligen Zeile - aktuell fünf Stück. Ein Bild dort aufnehmen oder herausnehmen heißt: `home: true` ergänzen oder löschen.

## 5. Zweisprachigkeit (Deutsch / Englisch)

Deutsch ist die Standardsprache: Wer die Seite zum ersten Mal öffnet, sieht Deutsch. Klickt jemand auf **EN**, merkt sich der Browser diese Wahl für den nächsten Besuch (localStorage).

Im HTML gibt es zwei Bauweisen - beide stehen direkt nebeneinander, es gibt **keine** getrennte Übersetzungsdatei:

**a) Kurze Beschriftungen** - der deutsche Text steht normal da, der englische im Attribut `data-en`:

```html
<a class="nav-link" href="gallery.html" data-en="Gallery">Galerie</a>
<h2 class="sub" data-en="Selected Work">Ausgewählte Arbeiten</h2>
```

Für Attribute gibt es die gleiche Schreibweise: `data-en-alt` (Bildbeschreibung), `data-en-aria-label`, `data-en-placeholder` und `data-en-title` (steht auf `<body>` und ändert den Text im Browser-Tab).

**b) Längere Texte** - zwei Blöcke untereinander, einer pro Sprache. Sichtbar ist immer nur einer:

```html
<p data-lang="de">Deutscher Absatz …</p>
<p data-lang="en" hidden>English paragraph …</p>
```

Das `hidden` beim englischen Block einfach stehen lassen - die Umschaltung setzt es automatisch richtig.

**Neuen Text ergänzen:** immer beide Sprachen pflegen. Fehlt bei einem kurzen Text das `data-en`, bleibt dort auch auf Englisch der deutsche Text stehen - das ist kein Fehler, fällt aber auf.

Der Umschalter selbst steht auf der Startseite oben mittig zwischen den beiden oberen Eck-Links und auf den anderen Seiten am Ende der Navigation.

## 6. Platzhalter ersetzen

Fotos, Porträt und Favicon sind eingesetzt. Offen sind noch:

- **Instagram-Link**: in `index.html` im unteren Streifen steht `https://www.instagram.com/dein-account/` - durch den echten Account ersetzen
- **E-Mail im Formular** (siehe Abschnitt 3) und **Domain** in `CNAME` (Abschnitt 2)
- **Impressum und Datenschutz**: in `impressum.html` und `datenschutz.html` alles in eckigen
  Klammern `[ ]` ersetzen (Name, Anschrift, Telefon; USt-IdNr. nur falls vorhanden). Beide
  Seiten sind mit `noindex` markiert und aus dem Fußbereich jeder Seite verlinkt. Die Texte
  beschreiben genau das, was die Seite technisch tut - wenn du später etwas einbaust
  (Karte, Instagram-Feed, Statistik), muss die Datenschutzerklärung ergänzt werden.
  Das ersetzt keine Rechtsberatung; zum Gegenlesen eignen sich die Generatoren von
  eRecht24 oder der IHK.

About-Text und die neun FAQ-Einträge sind echt. Lorem Ipsum steht nur noch in **einem** Satz: dem Einleitungstext auf `request.html`.

Neue FAQ-Frage: einen `.faq-item`-Block in `faq.html` kopieren und die IDs (`q10`/`a10` …) auf eine noch freie Nummer setzen - jeweils deutsche und englische Fassung pflegen.

## 7. Farben, Schriften, Cursor, Layout ändern

Ganz oben in `styles.css` unter `:root` stehen alle Werte an einer Stelle:

```css
--bg:     #232322;   /* Hintergrund */
--text:   #ECE9E1;   /* Textfarbe */
--accent: #C9E870;   /* Limettengrün für Links & Hover */
```

Ein paar Stellen, die man erfahrungsgemäß nachjustieren will - alle mit Kommentar im CSS:

- **Vorschaubilder auf der Startseite**: läuft jetzt in **zwei Spalten** (`.preview-list`, `grid-template-columns: 1fr 1fr`); unter 620 px eine Spalte. Welche Bilder dort erscheinen, steuert `home: true` in `gallery-data.js` - aktuell sechs, damit die Spalten aufgehen.
- **Porträt im About-Abschnitt** (`.about-photo`): Größe über `max-width` (aktuell 15rem); es steht immer mittig zum Text daneben.
- **Studiofoto im FAQ** (`.faq-photo`): Größe über `width` (aktuell 11rem). Die FAQ-Seite ist zweispaltig (`.faq-layout`): oben die Einleitung, darunter das Akkordeon, rechts daneben das Foto - vertikal mittig zum Akkordeon; unter 620 px steht alles untereinander.
- **Bildformat beider Galerien**: alle Kacheln haben dasselbe Seitenverhältnis (`--tile-ratio`, aktuell `2 / 3`) und werden mittig zugeschnitten (`object-fit: cover`). Dadurch steht das Raster gleichmäßig. Ein anderes Format, z. B. quadratisch, ist eine Zeile: `--tile-ratio: 1 / 1`. Wer lieber unbeschnittene Bilder will, entfernt bei `.gallery-grid img` und `.preview-list img` die Zeilen `aspect-ratio` und `object-fit`.
- **Spaltenzahl der Galerie-Seite**: über `--gallery-col` (Mindestbreite einer Kachel, aktuell 17rem) - kleinerer Wert = mehr Spalten.
- **Bildstreifen auf der FAQ-Seite** (`.faq-photo`): Breite über `--faq-strip` (9rem), Höhe automatisch so hoch wie das Akkordeon. Welcher Ausschnitt sichtbar ist, steuert `object-position` (aktuell `35% center`: Ringlicht oben, darunter die Liege).
- **Trennlinien auf der Startseite** (`.rule`): laufen aktuell bis an den Rand der linken Spalte. Etwas eingerückt: den negativen Außenabstand verkleinern, z. B. `calc(var(--pad) * -0.5)`.
- **Titel** (`.title-block`): steht linksbündig am linken Rand (`justify-content: flex-start`). Mittig wäre `center`.
- **Laufweite des Titels** (`.site-title`): `letter-spacing`, aktuell `0.06em`.
- **About-Bereich** (`.about-grid`): Text links, Foto rechts, sobald die rechte Spalte breit genug ist. Das Verhältnis der beiden Spalten steht bei `grid-template-columns: 1.15fr 0.85fr`.
- **Titelschrift**: aktuell **Autre Display**, eine lokale Schriftdatei aus `assets/fonts/`
  (eingebunden über die beiden `@font-face`-Blöcke oben in `styles.css`). Diese vier Dateien müssen
  mit ins Repository - fehlen sie, zeigt der Browser stattdessen Georgia. Zurück zu einer
  Google-Schrift: bei `--font-title` den Namen eintragen und die Familie wieder in die
  `fonts.googleapis.com`-Zeile im `<head>` jeder HTML-Datei aufnehmen (siehe `font-lab.html`).
- **Fließtextschrift**: IBM Plex Sans, ebenfalls lokal aus `assets/fonts/` (SIL Open Font
  License). Bewusst **nicht** über fonts.googleapis.com eingebunden - dabei würde bei jedem
  Seitenaufruf die IP-Adresse der Besucher an Google übertragen, was in Deutschland
  abmahnfähig ist. Die Seite lädt dadurch von keinem fremden Server etwas nach.
- **Cursor**: schwarzes Quadrat (`assets/cursor.svg`) mit einem sehr dünnen hellen Rand - ohne diesen Rand wäre er auf dem dunkelgrauen Hintergrund praktisch unsichtbar. Wer ihn rein schwarz möchte, entfernt im SVG die beiden `stroke`-Attribute.

## 8. Vor dem Livegang - kurze Checkliste

**Noch offen (persönliche Angaben):**

1. In `impressum.html` und `datenschutz.html`: `[DEIN VOLLER NAME]`, `[STRASSE UND HAUSNUMMER]`
   und `[PLZ]` ersetzen - in beiden Dateien identisch
2. In `impressum.html` zusätzlich: `[TELEFONNUMMER]`
3. `font-lab.html` löschen - die Hilfsseite lädt Schriften von Google und gehört nicht auf
   die fertige Website

**Nach dem Hochladen:**

4. Das Formular einmal selbst abschicken und die Bestätigungsmail von FormSubmit anklicken
   (Abschnitt 3) - vorher kommen keine Anfragen an
5. DNS-Einträge beim Domain-Anbieter setzen und die Domain in GitHub Pages eintragen
   (Abschnitt 2)

**Bereits eingetragen:** Domain `damagedone.de` in `CNAME` und in der Formular-Weiterleitung,
FormSubmit-Empfänger `tattoo@damagedone.de`, Instagram-Link `damagedonetattoo`, Impressum ohne
USt-IdNr. (Kleinunternehmerin nach § 19 UStG).

## 9. Wenn Änderungen im Browser nicht ankommen

Browser merken sich `styles.css` und `script.js` und zeigen nach einer Änderung manchmal noch die alte Fassung. Deshalb stehen in allen HTML-Dateien Versionsnummern an den Verweisen:

```html
<link rel="stylesheet" href="styles.css?v=2">
<script src="script.js?v=2"></script>
```

**Wenn du CSS oder JS änderst, zähl die Zahl in allen HTML-Dateien um eins hoch** (`?v=3`, `?v=4` …) - dann laden alle Besucher garantiert die neue Fassung. Für einen schnellen Blick zwischendurch reicht auch Strg+F5 im eigenen Browser.

## 10. Lokal ansehen

Im Projektordner ein Terminal öffnen und starten:

```bash
python -m http.server 8000
```

Dann `http://localhost:8000` im Browser öffnen. (Direktes Öffnen der HTML-Dateien per Doppelklick funktioniert auch, aber ein lokaler Server entspricht eher der späteren Situation auf GitHub Pages.)
