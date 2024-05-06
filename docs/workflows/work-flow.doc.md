# Work Flow :traffic_light:

## Issues

### Where do issues come from :question:

1. **Predefined RSS issues**

   Issues of this type are created by the team lead or any other team member by agreement. Tasks should be added before starting a new sprint and scrum planning.

1. **Custom issues**

   These issues are created by all team members at any time when the need arises. Any idea can be Feel free to create issues. An issue can even be created for the future, even if it will never be taken on - there is a priority system for this, it is no problem.

### Issues naming

- **RSS predefined:** `RSS-ECOMM`-`${sprintNumber}`\_`${issueNumber}`: `${issueName}`

  _Example:_ `RSS-ECOMM-1_01: Set up GitHub repository`

- **Custom:** `CUSTOM-ECOMM`-`${issueNumber}`: `${issueName}`

  _Example:_ `CUSTOM-ECOMM-1: Add github notifications to team discord server`

### How to create a new issue

1. Go to the `Issues` tab of the repository
1. (_in case of custom issue only_) Use `is:issue CUSTOM` search request to find out last custom issue number
1. Press `New issue` to create issue
1. Create issue using the corresponding template. New issue will be auto-attached to the project due to configured "Auto-add to project" workflow
1. Set issue `type`
1. Set issue `priority`:
   - If it is not an urgent task or a task for a future sprint: `P0 - Not discussed`. The actual priority will be assigned at the next nearest Scrum planning.
   - Assign a priority yourself in the range `P0` - `P5` if (at least one of):
     - this is an urgent task
     - task for the current sprint
     - the task will soon be taken on by you or your colleague
     - you are confident in your assessment of priority
1. Set issue `size`
   - leave blank if you are creating this issue not for yourself
   - Assign size by yourself in the range `XS` - `XL` if you are creating a task for yourself or you are confident in assessing its complexity
1. Set issue iteration:
   - leave blank if issue is for a future sprint
   - set current sprint iteration if issue for a current sprint

**A new issue has been created! You are awesome! :tada:**

## Pull requests

Pull requests are created from your feature branch into the current sprint branch when you have finished working on an issue and are ready to submit the result for code review and testing.

### PR's naming

- **RSS predefined:** `${issueName}` (`{type}`:`RSS-ECOMM`-`${sprintNumber}`\_`${issueNumber}`)

  _Example:_ `Setup GitHub Repository (feat: RSS-ECOMM-1_01)`

- **Custom:** `${issueName}` (`{type}`:`CUSTOM-ECOMM`-`${issueNumber}`)

  _Example:_ `Add React on project (feat: CUSTOM-ECOMM-2)`

### How to create a new PR

1. Give the pull request an appropriate name based on the name of the task you are running
1. Fill out the description in accordance with the proposed template
1. Press `Create`. New PR will be auto-attached to the project due to configured "Auto-add to project" workflow
1. Request reviews from all team members
1. Request a review from mentors if you think it is necessary
1. Self-assign PR on yourself
1. Set current iteration
1. Attach corresponding issue/issues to the PR. Successfully merging this pull request may auto-close these issues.

**Perfect! A new Pull Request has been created! :confetti_ball:**
