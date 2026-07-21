# Mendl Sans Dusk Font Loading

Website typography currently loads directly from OTF files in:

- `/public/fonts/Mendl Fonts/fonnts.com-Mendl_Sans_Dusk_Regular.otf`
- `/public/fonts/Mendl Fonts/fonnts.com-Mendl_Sans_Dusk_Medium.otf`
- `/public/fonts/Mendl Fonts/fonnts.com-Mendl_Sans_Dusk_Bold.otf`

These are wired through `next/font/local` in `apps/website/src/lib/fonts.ts`.

Variant mapping:

- Regular (400): body
- Medium (500): subheadings
- Bold (700): headings
