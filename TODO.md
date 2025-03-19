File types:
 - Raster file: .tif. Up to 2 variables (such as ‘time’ or ‘variable’)
 - Vector: .geojson WGS84 (EPSG: 4326). Up to 2 variables (such as ‘time’ or ‘variable’)


Over praten:
    - Hetzelfde over de kleur: mag de user de kleur kiezen voor de plot? Of wordt het te moeilijk als er meerdere variabelen zijn? (Zeg dit in de form)
    - Meer boxen (hoeveel dan? dit staat hardcoded in db, maximaal 8. WH in de sidebar)
    - How to Cite: gaat dus over hoe ze de pagina moeten citeren en niet referenties? Als dat inderdaad zo is dan zouden we misschien een standaard formuleren moeten maken voor alle modellen. Of we kunnen we ook voor kiezen om in plaats daarvan wel hier te refereren naar papers. Dan zou ik de titel veranderen naar “References”. Kunnen we volgende week ook even bespreken.    (How to cite -> Reference. How should people cite this model? -> Do you want to add references? niet verplicth)
    - Promile teken niet goed weergegeven?
    - Is 100 woorden niet te veel? max 50? (100 -> 65)
    - Licence optioneel!
    - check file size
    - result en method boxen ook clickable
    - ik heb per ongeluk op de touchpad van mijn laptop naar links geswiped en toen was alles weg - misschien kan je dit voorkomen om user eerst te laten weten dat hij/zij nu op een andere site belandt en dan de hele input gaat verdwijnen
    - Zoeken & Keyword selection!
    - footer at the bottom.
    - don't allow plotting together if the unit's differ

Grote zaken:
- Geojson ook
- Strestest
- Smaller beeldscherm/telefoon dan worden (Should have, maar later)
    - max value tot helft 

FB Kaj:
- Format output: time but Region (capital letter inconsistency)
- Cite: should also format (DOI url etc)
- Licence: "<b>" still in there
- When submitted: no feedback

- How do you remove output boxes?
- Make result boxes responsive: media query if screen width < XXX px, put graph above/below text.
- Formatted text for theory etc is great, but urls are still black and invisible. For everything in the content, I would remove the:
a { color: inherit; text-decoration: inherit; } (or only apply this to the header and footer of the page, probably easier)

Kaj over praten:
- SVG icon doesn't work (Eigenlijk gedoe om ook te fixen, is alleen png ok?)
- Text homepage grey
- Keywords doorheen lopen (kan ook met oreane en stefanie)
- /model/id/ Url suggestie?
- saving before everything filled in
- Home/overview button not clear now. It's just "Atlas", which can mean many things. Maybe like "Return to model overview" or something similar
- Can someone take over the edit rights of a page, if someone leaves the university?
- Are plot colours random?

WH:
- Sorting of models based on id & approval
- improve connection for extended period to keep alive during file streaming
- specify number of input variables
- List of papers might be huge