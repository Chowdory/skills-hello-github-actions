# GitHub Actions Lab 🧪

**A living showcase of real-world GitHub Actions automation** — this repo started life as the
[GitHub Skills "Hello GitHub Actions"](https://github.com/skills/hello-github-actions) course and was
rebuilt into a portfolio of workflows you'd actually run in production.

[![CI](https://github.com/Chowdory/skills-hello-github-actions/actions/workflows/ci.yml/badge.svg)](https://github.com/Chowdory/skills-hello-github-actions/actions/workflows/ci.yml)
[![Release](https://github.com/Chowdory/skills-hello-github-actions/actions/workflows/release.yml/badge.svg)](https://github.com/Chowdory/skills-hello-github-actions/actions/workflows/release.yml)
[![Repo Doctor](https://github.com/Chowdory/skills-hello-github-actions/actions/workflows/repo-doctor.yml/badge.svg)](https://github.com/Chowdory/skills-hello-github-actions/actions/workflows/repo-doctor.yml)

## The workflows

| Workflow | Trigger | What it demonstrates |
|---|---|---|
| **[CI](.github/workflows/ci.yml)** | every push & PR | Node 20/22 test matrix, dependency install, live smoke test of the HTTP server, packaged artifact upload |
| **[PR Butler](.github/workflows/pr-butler.yml)** | every pull request | Welcome comments with a review checklist, automatic `size: S/M/L/XL` labels, warm welcome for first-time contributors |
| **[Release](.github/workflows/release.yml)** | push to `main` | Conventional commits → automatic versioning, `CHANGELOG.md`, tags, and GitHub Releases via [release-please](https://github.com/googleapis/release-please) |
| **[Repo Doctor](.github/workflows/repo-doctor.yml)** | every Monday 09:00 UTC | Scheduled health check: failed runs, stale branches, outdated action versions → files a tidy report issue |

## The demo app

`app/` is a tiny zero-dependency Node.js HTTP API (no framework) so the CI pipeline has something
real to test:

```bash
cd app
npm install
npm test        # 8 tests: unit + live HTTP integration
npm start       # serves http://localhost:3000
```

```bash
curl http://localhost:3000/health
# {"status":"ok",...}

curl "http://localhost:3000/api/v1/greet?name=Ada"
# {"message":"Hello, Ada! Welcome to the Actions Lab. 🚀",...}
```

## Try it yourself

The best way to learn Actions is to trigger one and watch it run:

1. **Watch PR Butler greet you** — open any pull request and refresh. Within seconds you get a
   checklist comment and a size label; push another commit and watch the label update.
2. **Trigger Repo Doctor on demand** — Actions tab → *Repo Doctor* → *Run workflow*. It files a
   report issue within a minute.
3. **Cut a release** — merge a PR with a conventional-commit title (`feat: ...`, `fix: ...`).
   Release-please opens a release PR; merge that and a GitHub Release appears.
4. **Download a CI artifact** — any CI run has a downloadable `actions-lab-api` tarball under
   *Artifacts*.

## Local development

```bash
git clone https://github.com/Chowdory/skills-hello-github-actions.git
cd skills-hello-github-actions/app
npm install && npm test
```

Validate workflows locally before pushing with
[actionlint](https://github.com/rhysd/actionlint):

```bash
brew install actionlint   # or: go install github.com/rhysd/actionlint/cmd/actionlint@latest
actionlint
```

## Credits

Built on top of the [GitHub Skills "Hello GitHub Actions"](https://github.com/skills/hello-github-actions)
course (MIT). Course scaffolding was retired in favor of the automation suite above.

## License

[MIT](LICENSE)
