# Hong Xu — personal website

Static academic site for teaching, research, and related work. Layout follows the spirit of [svivek.com](https://svivek.com/).

## Local preview

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## GitHub Pages

This repo is set up for project Pages at:

`https://HeavenlyBerserker.github.io/website2026/`

1. Push to `main`.
2. On GitHub: **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Branch: `main`, folder: `/ (root)`.
5. Save.

## Structure

```
index.html
teaching.html
research.html / projects.html / publications.html / contact.html
courses/
  comp141-f26/     COMP 141 course site (Fall 2026)
  comp322-f26/     COMP 322 course site (Fall 2026)
css/
```

Course sites live under `courses/<code>-<term>/` (e.g. `comp141-f26`) so they
share this GitHub Pages deploy. Teaching links point there. Add materials,
syllabus PDFs, and calendar rows inside each course folder as the semester
develops.