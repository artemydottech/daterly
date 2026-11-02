# Contributing

**English** | [Русский](CONTRIBUTING.ru.md)

Thank you for your interest in contributing! Bug reports, suggestions, and pull requests are all welcome.

### Setup

```bash
git clone https://github.com/artemydottech/daterly.git
cd daterly
npm install
```

The repository is an npm workspace: the root (library) and `docs/` (the Next.js documentation site).

### Scripts

```bash
npm run dev            # library watch build → dist/
npm run test           # run tests (vitest)
npm run test:watch     # tests in watch mode
npm run test:coverage  # tests with coverage
npm run test:e2e       # component e2e tests (playwright)
npm run build          # production build → dist/
npm run typecheck      # TypeScript checks
npm run test:package   # built package checks; run after build
npm run size           # bundle size check (size-limit)
npm -w docs run dev    # documentation site locally
npm -w docs run build  # production documentation build
```

### Submitting a PR

1. Fork the repository and create a branch from `main`:
   ```bash
   git checkout -b fix/my-bug-fix
   ```
2. Make your changes. Cover new features with tests; update the docs in `docs/` when the API changes.
3. Make sure tests pass: `npm run test` (and `npm run test:e2e` if components are affected).
4. Open a Pull Request describing what changed and why.

### Commit style

Write commit messages in English using [Conventional Commits](https://www.conventionalcommits.org/) and the relevant issue number:

```
feat(#<issue>): add a custom input renderer
fix(#<issue>): handle backspace at separator positions
tech(#<issue>): update bilingual documentation
```

### Releases

Releases are managed by the maintainer. If your PR warrants a version bump, describe the nature of the change in the PR body — the maintainer will create the changeset.

### Documentation languages

English is the primary language. Keep the English and Russian versions in separate files, with links between them:

- `README.md` and `README.ru.md`.
- `CONTRIBUTING.md` and `CONTRIBUTING.ru.md`.
- `CHANGELOG.md` and `CHANGELOG.ru.md`, with matching version sections.
- Documentation pages: `docs/content/docs/**/*.mdx` for English and `*.ru.mdx` for Russian. Navigation uses `meta.json` and `meta.ru.json`.

Update both languages when behavior changes. The documentation site opens in English and keeps Russian pages available under `/ru/`.

Write changesets in English and update the Russian changelog for the same version before publishing. Use one version tag, such as `v2.2.1`, for both languages. GitHub Release titles use English; release descriptions contain an `English` section followed by a `Русский` section, with matching changes and migration instructions. Wait for CI to pass on the release commit before publishing its tag and GitHub Release. Do not move an existing release tag for documentation updates.
