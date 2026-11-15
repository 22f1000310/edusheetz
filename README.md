# MathsMagic – Grade 3 Maths Worksheets

Static website (no server needed). Open `index.html`, or upload this whole folder to any web host
(Netlify, GitHub Pages, Cloudflare Pages, a school server...).

Structure:  Home > Grade 3 > Math > Topic > Worksheet
- grade-3/math/multiplication/<worksheet>/   interactive worksheet page
- assets/pdfs/                               downloadable PDFs (worksheet + answer key)
- assets/themes.js                           all worksheet content (questions, answers, characters)
- assets/pictures.js, engine.js, engine.css  the shared worksheet engine
- assets/site.css, site.js, catalog.js       website pages, filters and search

Add a worksheet: add a theme in assets/themes.js (fun quests) or assets/book-themes.js (core-concept worksheets), add it to tools/build_site.py, rebuild, regenerate PDFs.
