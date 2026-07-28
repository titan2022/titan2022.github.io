# Titan Robotics website

Production URL: <https://titanrobotics2022.com>

This repository is the static website for Titan Robotics, FRC Team #2022. GitHub
Pages serves the files directly from the `master` branch at the custom domain
`titanrobotics2022.com`.

## Architecture

The site uses directory-style HTML pages, shared CSS, browser-side JavaScript,
images, PDFs, and an MP4 archive. It has no runtime build step and does not use
PHP, WordPress, a database, server-side rendering, or a framework development
server.

The site was migrated on July 28, 2026, by rendering the supplied WordPress
backup locally, exporting every recoverable public route, removing WordPress
runtime dependencies, and copying only public assets referenced by the static
pages. The WordPress backup, database dump, configuration, logs, and temporary
runtime are not stored in this repository.

## Local preview

From the repository root:

```sh
python3 -m http.server 4173
```

Then open <http://127.0.0.1:4173/>.

The preview command serves the same files that GitHub Pages serves. No build is
required.

## Updating the site

1. Edit the HTML, CSS, JavaScript, or public assets directly.
2. Preview the repository root with a plain static HTTP server.
3. Check internal links, media, navigation, mobile layouts, and the browser
   console.
4. Confirm that `CNAME`, `.nojekyll`, `404.html`, `robots.txt`, and
   `sitemap.xml` are still present.
5. Commit the reviewed static files to `master`.

Do not delete, rename, or edit `CNAME`. Its exact contents must remain
`titanrobotics2022.com`.

GitHub Pages cannot run WordPress, PHP, MySQL, or other server-side code. Do not
copy a WordPress installation, database dump, backup archive, credentials,
cache, or logs into this repository.
