import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('loads successfully and displays key elements', async ({ page }) => {
    await page.goto('/')

    // Check that the page loads
    await expect(page).toHaveTitle(/MH Construction/i)

    // Check navigation elements
    await expect(page.getByRole('navigation')).toBeVisible()
    await expect(page.getByRole('link', { name: /services/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /projects/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /estimator/i })).toBeVisible()

    // Check hero section
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

    // Check call-to-action buttons
    await expect(
      page.getByRole('link', { name: /get estimate/i })
    ).toBeVisible()
    await expect(
      page.getByRole('link', { name: /view projects/i })
    ).toBeVisible()
  })

  test('mobile navigation works correctly', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Mobile menu should be hidden initially
    const mobileMenu = page.getByRole('button', { name: /menu/i })
    await expect(mobileMenu).toBeVisible()

    // Click to open mobile menu
    await mobileMenu.click()

    // Check that navigation links are visible in mobile menu
    await expect(page.getByRole('link', { name: /services/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /projects/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /estimator/i })).toBeVisible()
  })
})

test.describe('Estimator Flow', () => {
  test('completes basic estimation process', async ({ page }) => {
    await page.goto('/estimator')

    // Check estimator page loads
    await expect(
      page.getByRole('heading', { name: /project estimator/i })
    ).toBeVisible()

    // Fill out basic project information
    await page.getByLabel(/project type/i).selectOption('Kitchen Remodel')
    await page.getByLabel(/square footage/i).fill('150')
    await page.getByLabel(/budget range/i).selectOption('$15,000 - $30,000')

    // Progress to next section
    await page.getByRole('button', { name: /continue/i }).click()

    // Check that we moved to next step
    await expect(page.getByText(/project details/i)).toBeVisible()

    // Complete additional details
    await page.getByLabel(/timeline/i).selectOption('3-6 months')
    await page.getByLabel(/priority/i).selectOption('Quality')

    // Submit estimation
    await page.getByRole('button', { name: /get estimate/i }).click()

    // Check that results are displayed
    await expect(page.getByText(/estimated cost/i)).toBeVisible()
    await expect(page.getByText(/recommended timeline/i)).toBeVisible()
  })

  test('displays veteran benefits for eligible users', async ({ page }) => {
    await page.goto('/estimator')

    // Indicate veteran status
    await page.getByLabel(/veteran status/i).check()
    await page.getByLabel(/branch of service/i).selectOption('Army')
    await page.getByLabel(/combat veteran/i).check()

    // Complete basic project info
    await page.getByLabel(/project type/i).selectOption('Bathroom Remodel')
    await page.getByLabel(/square footage/i).fill('80')

    // Continue to see veteran benefits
    await page.getByRole('button', { name: /continue/i }).click()

    // Check for veteran benefits section
    await expect(page.getByText(/veteran benefits available/i)).toBeVisible()
    await expect(page.getByText(/special benefits/i)).toBeVisible()

    // Check for veteran specialist contact
    await expect(page.getByText(/veteran specialist/i)).toBeVisible()
  })
})

test.describe('Contact Forms', () => {
  test('submits contact form successfully', async ({ page }) => {
    await page.goto('/contact')

    // Fill out contact form
    await page.getByLabel(/first name/i).fill('John')
    await page.getByLabel(/last name/i).fill('Doe')
    await page.getByLabel(/email/i).fill('john.doe@example.com')
    await page.getByLabel(/phone/i).fill('(555) 123-4567')
    await page.getByLabel(/project type/i).selectOption('New Construction')
    await page
      .getByLabel(/message/i)
      .fill('I would like to discuss a new construction project.')

    // Submit form
    await page.getByRole('button', { name: /send message/i }).click()

    // Check for success message
    await expect(page.getByText(/thank you/i)).toBeVisible()
    await expect(page.getByText(/we'll be in touch/i)).toBeVisible()
  })

  test('validates required fields', async ({ page }) => {
    await page.goto('/contact')

    // Try to submit empty form
    await page.getByRole('button', { name: /send message/i }).click()

    // Check for validation errors
    await expect(page.getByText(/first name is required/i)).toBeVisible()
    await expect(page.getByText(/last name is required/i)).toBeVisible()
    await expect(page.getByText(/email is required/i)).toBeVisible()
    await expect(page.getByText(/message is required/i)).toBeVisible()
  })
})

test.describe('Project Gallery', () => {
  test('displays projects and filtering works', async ({ page }) => {
    await page.goto('/projects')

    // Check that projects are displayed
    await expect(
      page.getByRole('heading', { name: /our projects/i })
    ).toBeVisible()
    const projectCards = page.getByTestId('project-card')
    await expect(projectCards).toHaveCount(1)

    // Test filtering
    await page.getByRole('button', { name: /residential/i }).click()
    await expect(projectCards).toHaveCount(1)

    await page.getByRole('button', { name: /commercial/i }).click()
    await expect(projectCards).toHaveCount(1)

    // Test project detail view
    await page.getByTestId('project-card').first().click()
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByText(/project details/i)).toBeVisible()
  })
})

test.describe('Team Page', () => {
  test('displays team members with baseball card design', async ({ page }) => {
    await page.goto('/team')

    // Check team page loads
    await expect(page.getByRole('heading', { name: /our team/i })).toBeVisible()

    // Check team member cards
    const teamCards = page.getByTestId('team-card')
    await expect(teamCards).toHaveCount(1)

    // Test hovering on team card for flip effect
    const firstCard = page.getByTestId('team-card').first()
    await firstCard.hover()

    // Check that card shows additional info on hover/flip
    await expect(firstCard.getByText(/experience/i)).toBeVisible()
    await expect(firstCard.getByText(/specialties/i)).toBeVisible()
  })

  test('veteran team members display veteran badges', async ({ page }) => {
    await page.goto('/team')

    // Look for veteran badges on team member cards
    const veteranBadges = page.getByTestId('veteran-badge')

    if ((await veteranBadges.count()) > 0) {
      await expect(veteranBadges.first()).toBeVisible()

      // Check that veteran badge shows branch information
      await veteranBadges.first().hover()
      await expect(page.getByText(/veteran/i)).toBeVisible()
    }
  })
})
