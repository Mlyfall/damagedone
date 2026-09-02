/* ==========================================================================
   GALERIE-LISTE - die einzige Datei, die du zum Aktualisieren der
   Bilder anfassen musst.

   So fügst du ein Bild hinzu:
     1. Bilddatei in den Ordner  images/gallery/  legen
        (vorher auf Webgröße bringen: lange Kante ca. 1600 px, JPG)
     2. Unten eine neue Zeile ergänzen:
          { src: "images/gallery/DATEINAME.jpg", alt: "Kurze Bildbeschreibung",
            altEn: "Short image description" },
        (Komma am Zeilenende nicht vergessen!)
     3. Speichern, Datei zu GitHub hochladen - fertig.

   alt    = Bildbeschreibung auf Deutsch (für Screenreader und Google)
   altEn  = dieselbe Beschreibung auf Englisch; lässt du sie weg, wird
            auch in der englischen Fassung der deutsche Text benutzt.
   home   = mit  home: true  erscheint das Bild zusätzlich in der Vorschau
            auf der Startseite. Aktuell sind die ersten sechs markiert.

   REIHENFOLGE: bewusst so sortiert, dass im dreispaltigen Raster nie zwei
   Fotos derselben Körperstelle nebeneinander oder direkt übereinander liegen.
   Die Körperstelle steht als Kommentar hinter jeder Zeile - beim Einfügen
   neuer Bilder hilft das beim Einsortieren.

   So entfernst du ein Bild: die passende Zeile löschen (und die Bilddatei).
   ========================================================================== */

const galleryImages = [
  { src: "images/gallery/img_6065.jpg", home: true,   // Rücken
    alt: "Schwarze Balken und Rechtecke über den Rücken verteilt",
    altEn: "Black bars and rectangles spread across the back" },

  { src: "images/gallery/img_6162.jpg", home: true,   // Nacken
    alt: "Geometrische Komposition aus Kreis und Halbkreisen im Nacken",
    altEn: "Geometric composition of circle and half circles on the nape" },

  { src: "images/gallery/img_6218.jpg", home: true,   // Unterarm
    alt: "Schwarzer Kreis mit geschwungenen Linien auf dem Unterarm",
    altEn: "Solid black circle with flowing lines on the forearm" },

  { src: "images/gallery/img_6324.jpg", home: true,   // Arm
    alt: "Großflächiges Blackwork-Sleeve am Arm",
    altEn: "Large-scale blackwork sleeve on the arm" },

  { src: "images/gallery/img_5923.jpg", home: true,   // Oberarm
    alt: "Feiner Zweig mit Blättern am Oberarm",
    altEn: "Delicate leafy branch on the upper arm" },

  { src: "images/gallery/img_4830.jpg", home: true,   // Rücken
    alt: "Großer vierstrahliger Stern zwischen den Schulterblättern",
    altEn: "Large four-pointed star between the shoulder blades" },

  { src: "images/gallery/img_6574.jpg",   // Unterarm
    alt: "Rechteckiger Rahmen mit Quadraten am Unterarm",
    altEn: "Rectangular frame with squares on the forearm" },

  { src: "images/gallery/img_4827.jpg",   // Hand
    alt: "Feine Punkte und kleine Quadrate auf dem Handrücken",
    altEn: "Fine dots and small squares on the back of the hand" },

  { src: "images/gallery/img_6536.jpg",   // Unterarm
    alt: "Zweig mit schwarzem Kreis am Unterarm",
    altEn: "Branch with a solid black circle on the forearm" },

  { src: "images/gallery/img_6389.jpg",   // Oberarm
    alt: "Feine Ellipse mit schwarzen Punkten am Oberarm",
    altEn: "Fine ellipse with black dots on the upper arm" },

  { src: "images/gallery/img_6504.jpg",   // Unterarm
    alt: "Vier Blattformen am Unterarm",
    altEn: "Four leaf shapes on the forearm" },

  { src: "images/gallery/img_5899.jpg",   // Hand
    alt: "Vier Punkte auf dem Handrücken",
    altEn: "Four dots on the back of the hand" },

  { src: "images/gallery/img_5447.jpg",   // Unterarm
    alt: "Feine Ellipse mit Wellenlinie auf dem Unterarm",
    altEn: "Fine ellipse with a wavy line on the forearm" },

  { src: "images/gallery/img_6508.jpg",   // Bein
    alt: "Kreis und Linienform am Oberschenkel",
    altEn: "Circle and line shape on the thigh" },

  { src: "images/gallery/img_5234.jpg",   // Unterarm
    alt: "Schwarze Balken auf dem Unterarm",
    altEn: "Black bars on the forearm" },

  { src: "images/gallery/img_6352.jpg",   // Oberarm
    alt: "Schwarze Kreise am Oberarm",
    altEn: "Solid black circles on the upper arm" },

  { src: "images/gallery/img_5463.jpg",   // Unterarm
    alt: "Reihe schwarzer Kreise auf dem Unterarm",
    altEn: "Row of solid black circles on the forearm" },

  { src: "images/gallery/img_6195.jpg",   // Hand
    alt: "Stern auf dem Handrücken mit feiner Linie zum Arm",
    altEn: "Star on the back of the hand with a fine line up the arm" },

  { src: "images/gallery/img_5964.jpg",   // Schulter
    alt: "Schwarzer Kreis mit feiner Linie an der Schulter",
    altEn: "Solid black circle with a fine line on the shoulder" },

  { src: "images/gallery/img_6106.jpg",   // Bein
    alt: "Sterne auf beiden Knien",
    altEn: "Stars on both knees" },

  { src: "images/gallery/img_6008.jpg",   // Oberarm
    alt: "Abstraktes schwarzes Zeichen am Oberarm",
    altEn: "Abstract black symbol on the upper arm" },

  { src: "images/gallery/img_5321.jpg",   // Unterarm
    alt: "Konzentrische Kreise mit Punkten auf dem Unterarm",
    altEn: "Concentric circles with dots on the forearm" },

  { src: "images/gallery/img_6420.jpg",   // Schulter
    alt: "Zweig mit Blättern über der Schulter",
    altEn: "Leafy branch across the shoulder" },

  { src: "images/gallery/img_6155.jpg",   // Hand
    alt: "Tätowierte Hände mit vielen kleinen Motiven",
    altEn: "Tattooed hands covered in many small motifs" },

  { src: "images/gallery/img_6038.jpg",   // Oberarm
    alt: "Abstraktes schwarzes Zeichen, Seitenansicht",
    altEn: "Abstract black symbol, side view" },

  { src: "images/gallery/img_4940.jpg",   // Unterarm
    alt: "Kleine quadratische Motive auf beiden Unterarmen",
    altEn: "Small square motifs on both forearms" },

  { src: "images/gallery/img_6084.jpg",   // Bein
    alt: "Botanische Motive an der Wade",
    altEn: "Botanical designs on the calf" },

  { src: "images/gallery/img_5523.jpg",   // Schulter
    alt: "Drei kleine Sterne an Hals und Schulter",
    altEn: "Three small stars on neck and shoulder" },

  { src: "images/gallery/img_5553.jpg",   // Oberarm
    alt: "Schwarzer Stern am Oberarm",
    altEn: "Black star on the upper arm" },

  { src: "images/gallery/img_6178.jpg",   // Brust
    alt: "Symmetrisches Ornament auf dem Brustbein",
    altEn: "Symmetrical ornament on the sternum" },

  { src: "images/gallery/img_6136.jpg",   // Bein
    alt: "Großes abstraktes Zeichen am Oberschenkel",
    altEn: "Large abstract symbol on the thigh" },

  { src: "images/gallery/img_6480.jpg",   // Unterarm
    alt: "Kleine Punkte und feine Linie am Unterarm",
    altEn: "Small dots and a fine line on the forearm" },

  { src: "images/gallery/img_6224.jpg",   // Hand
    alt: "Feine Linien und kleine Quadrate auf Hand und Unterarm",
    altEn: "Fine lines and small squares on hand and forearm" },

  { src: "images/gallery/img_5930.jpg",   // Brust
    alt: "Kleine Sterne auf Brust und Schlüsselbein",
    altEn: "Small stars on chest and collarbone" },

  { src: "images/gallery/img_6267.jpg",   // Schulter
    alt: "Zweig in Grautönen auf der Schulter",
    altEn: "Branch in soft greys on the shoulder" },

  { src: "images/gallery/img_6457.jpg",   // Oberarm
    alt: "Feiner Zweig am Oberarm",
    altEn: "Delicate branch on the upper arm" },

  { src: "images/gallery/img_6367.jpg",   // Unterarm
    alt: "Zwei quadratische Ornamente auf dem Unterarm",
    altEn: "Two square ornaments on the forearm" },

  { src: "images/gallery/img_3026.jpg",   // Hand
    alt: "Schwarzer Stern auf dem Handrücken, kleine Quadrate am Unterarm",
    altEn: "Black star on the back of the hand, small squares on the forearm" },

  { src: "images/gallery/img_4861.jpg",   // Bein
    alt: "Vierstrahliger Stern auf der Wade",
    altEn: "Four-pointed star on the calf" }
];

/* Falls oben kein Bild mit  home: true  markiert ist, zeigt die Startseite
   ersatzweise die obersten Bilder der Liste - so viele wie hier angegeben. */
const homePreviewCount = 6;
