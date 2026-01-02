# Conventional Commit Messages

[Conventional Commits](https://www.conventionalcommits.org/) to ensure consistency in commit messages and enable automated changelog generation.

## Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semi-colons, etc; no code change)
- **refactor**: Code changes that neither fix a bug nor add a feature
- **test**: Adding or updating tests
- **chore**: Changes to the build process, auxiliary tools, libraries, etc.
- **perf**: Performance improvements
- **ci**: Changes to CI/CD configuration
- **build**: Changes that affect the build system
- **revert**: Reverting a previous commit

### Scope

The scope is optional and represents the module, component, or area of the codebase that is affected.

Examples:
- `feat(auth): add login validation`
- `fix(src): resolve crash on rendering`
- `docs(readme): update installation instructions`

### Subject

The subject is a short description of the change:
- Use imperative, present tense (e.g., "change", not "changed" or "changes")
- Don't capitalize the first letter
- No period at the end

### Body

The body is optional and should include the motivation for the change and contrasts with previous behavior.

### Footer

The footer is optional and contains information about breaking changes and references to GitHub issues.

For breaking changes, start with "BREAKING CHANGE:" followed by a description.

## Examples

```
feat(login): add password validation

Add client-side validation for password strength requirements.   //body
```

```
fix(app): resolve crash when accessing on mobile

Fixes #123  //footer
```

```
refactor(utils): simplify date formatting methods

BREAKING CHANGE: The dateFormat() method now requires an explicit locale parameter.  //body
```

## Using with Git

When committing, use the `-m` flag with a properly formatted message:

```bash
git commit -m "feat(auth): implement biometric authentication"
```

## Enforcing Convention

This repository uses a git hook to enforce conventional commit messages. If your commit message doesn't follow the convention, the commit will be rejected with an error message explaining the issue.

## Benefits

- Automatic changelog generation
- Semantic versioning based on commit types
- Clear project history
- Easier for new contributors to understand commit expectations 