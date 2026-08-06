# Input Asset Index

This folder holds raw source inputs used by the document pipeline.

## Current Contents

- Numbered intake families under `01-*` through `10-*` for canonical document ingestion
- `README.md` for intake structure guidance

## Tracking Tips

- Treat files here as upstream inputs, not generated outputs.
- Keep source documents inside the numbered intake families instead of the intake root.
- Keep filenames stable so generator references and validation scripts remain predictable.
- Move any newly standardized asset into a more specific source folder if it starts to grow into its own family.
