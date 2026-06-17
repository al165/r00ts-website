# Tools to manage database and server

## `remove_old_images.ts`

Run with:

```bash
node tools/remove_old_images.ts
```

This removes all image files that are no longer referenced in the database.
Requires `AERIAL_DIR` to be defined in `.env.local` or environment;
