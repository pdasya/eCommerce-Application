# Git Flow :octocat:

## Branching

### Main branches

- `main` - production release branch
- `develop` - development branch

### Sprint branches

For each sprint separate branch should be created from `develop` branch in format `sprint-n` where `n` is sprint number: `sprint-1`

### Feature branches

For each feature separate branch should be created from `sprint-n` branch in format:

- **RSS predefined:** `RSS-ECOMM`-`${sprintNumber}`\_`${issueNumber}`-`${issueName}`

  _Example:_ `RSS-ECOMM-1_01-addSomethingToProject`

- **Custom:** `CUSTOM-ECOMM`-`${issueNumber}`-`${issueName}`

  _Example:_ `CUSTOM-ECOMM-1-addSomethingToProject`

# Approving

:warning: Performing a merge without at least one approval from any team member or any mentor is prohibited

:information_source: Please use only `Approve` or `Request changes`, but not `Comment` review type

- If you leave only recommendations that it is advisable to take into account and it is not necessary to make corrections right now, or the changes are so insignificant that they do not require re-approval - use `Approve` type
- If there are significant comments or issues that require consideration and discussion with re-checking, use `Request changes` type

:information_source: If the task does not block other tasks and does not create potential merge conflicts that are difficult to resolve, it is recommended to wait for approval from all team members. This approach will help us to be up to date with the project's code base, learn from each other, and pass on best practices.

# Merging

:warning: Direct pushes into `main`, `develop` or `sprint-n` branches are prohibited. All merging operations must be performed only via `Pull requests`

**To keep commit history clean:**

- feature branches should be merged into current sprint-branch via `Squash and merge`
- merge commit from feature to sprint branch should be named the same as PR name + auto-added pr-link `(#n)`, for example: `Install and configure Jest (chore: RSS-ECOMM-1_13) (#55)
`
- sprint branches should be rebased onto `develop` branch via `Rebase and merge`
- develop branch should be rebased onto `main` branch via `Rebase and merge`
