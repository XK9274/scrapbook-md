---
sidebar_position: 5
---

# Create Workflow

**Description**: Document processes, procedures, and repeatable workflows  
**Allowed Tools**: run_in_terminal, Python CLI

## Instructions

1. **Identify the process from conversation**
2. **Structure as step-by-step workflow**
3. **Include prerequisites and tools**
4. **Add error handling and troubleshooting**
5. **Create workflow via scrap CLI**
6. **Tag for easy discovery**

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

4. Add relevant tags:
   - Technology stack
   - Frequency (daily, weekly, monthly)
   - Team/role (dev, ops, qa)
   - Complexity level

5. Create workflow entry:
   ```bash
   cd /home/mattpc/HueTesting/scrapbook-md
   ./scrap workflow "Workflow Name" "[structured workflow content]" --category="development" --tags="automation,ci-cd,deployment"
   ```

6. Suggest automation opportunities:
   ```bash
   echo "Workflow documented successfully"
   echo "Consider automation: ./scrap idea 'Automate [workflow name]' --category=improvement"
   ```

## Example Usage

Development workflow:
```bash
./scrap workflow "Code Review Process" "## Purpose
Ensure code quality and knowledge sharing through systematic peer review

## Prerequisites  
- GitHub access with branch protection enabled
- Reviewer assigned to pull request
- All CI checks passing

## Steps
1. Create feature branch from main: \`git checkout -b feature/new-feature\`
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

Deployment workflow:
```bash
./scrap workflow "Production Deployment" "## Purpose
Deploy verified code changes to production environment safely

## Prerequisites
- Code reviewed and merged to main
- All tests passing in staging
- Database migrations tested
- Deployment window scheduled

## Steps
1. Create release tag: \`git tag -a v1.2.3 -m 'Release v1.2.3'\`
2. Run pre-deployment checks: \`./scripts/pre-deploy-check.sh\`
3. Backup current production database
4. Deploy to production: \`./deploy.sh production v1.2.3\`
5. Run post-deployment verification: \`./scripts/health-check.sh\`
6. Monitor application metrics for 30 minutes
7. Update documentation with changes

## Troubleshooting
- **Issue**: Health checks failing
  **Solution**: Rollback using \`./rollback.sh\` and investigate
- **Issue**: Database migration errors
  **Solution**: Check migration logs and apply fixes manually

## Verification
- All health checks pass
- Application metrics normal
- No user-reported issues
- Rollback plan confirmed ready" --category="deployment" --tags="production,deployment,release,ops"
```

## Category Guidelines

- **development**: Coding workflows, git processes, code review
- **deployment**: Release procedures, environment setup
- **maintenance**: Regular tasks, cleanup, updates
- **debugging**: Troubleshooting procedures, incident response
- **setup**: Installation guides, configuration steps
- **testing**: QA processes, validation procedures

## Best Practices

- Include exact commands when possible
- Specify expected output or results
- Add common failure scenarios
- Include verification steps
- Reference related documentation
- Keep steps atomic and clear
- Include time estimates where helpful
