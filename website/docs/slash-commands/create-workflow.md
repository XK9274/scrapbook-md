# Create Workflow

**Description**: Document processes, procedures, and repeatable workflows  
**Allowed Tools**: Bash, Python CLI

## Instructions

1. **Identify the process from conversation**
2. **Structure as step-by-step workflow**
3. **Include prerequisites and tools**
4. **Add error handling and troubleshooting**
5. **Create workflow via scrap CLI**

## Implementation Steps

1. Extract workflow information:
   - Process name and purpose
   - Required tools and prerequisites
   - Step-by-step procedure
   - Common issues and solutions
   - Expected outcomes

2. Structure workflow content:
   ```markdown
   ## Purpose
   [Brief description of what this workflow accomplishes]
   
   ## Prerequisites
   - [Required tools, access, knowledge]
   
   ## Steps
   1. [First step with specific commands/actions]
   2. [Second step with expected outcomes]
   3. [Continue with detailed instructions]
   
   ## Troubleshooting
   - **Issue**: [Common problem]
     **Solution**: [How to resolve]
   
   ## Verification
   [How to confirm the workflow completed successfully]
   ```

3. Choose appropriate category:
   - **development**: Code-related processes
   - **deployment**: Release and deployment procedures
   - **maintenance**: Regular upkeep tasks
   - **debugging**: Problem-solving workflows
   - **setup**: Installation and configuration
   - **testing**: QA and validation processes

4. Create workflow entry:
   ```bash
   scrap workflow "Workflow Name" "[structured workflow content]" --category="development" --tags="automation,process,documentation"
   ```

5. Confirm creation:
   ```bash
   echo "Workflow documented successfully"
   echo "Consider automation opportunities for repetitive steps"
   ```

## Example Usage

Development workflow:
```bash
scrap workflow "Code Review Process" "## Purpose
Ensure code quality and knowledge sharing through systematic peer review

## Prerequisites  
- Repository access with branch protection enabled
- Reviewer assigned to pull request
- All CI checks passing

## Steps
1. Create feature branch from main
2. Make changes and commit with descriptive messages
3. Push branch and create pull request
4. Request review from team member
5. Address feedback and update PR
6. Ensure all CI checks pass
7. Merge after approval using squash merge
8. Delete feature branch

## Troubleshooting
- **Issue**: CI checks failing
  **Solution**: Check build logs, fix issues, and push updates
- **Issue**: Merge conflicts
  **Solution**: Rebase on main and resolve conflicts locally

## Verification
- Code is merged to main branch
- Feature branch is deleted
- No merge conflicts remain" --category="development" --tags="git,review,collaboration,process"
```