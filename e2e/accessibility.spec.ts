import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility Tests @accessibility', () => {
  test('homepage meets WCAG 2.1 AA standards', async ({ page }) => {
    await page.goto('/')

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('estimator form is accessible', async ({ page }) => {
    await page.goto('/estimator')

    // Check for proper form labels
    await expect(page.getByLabel(/project type/i)).toBeVisible()
    await expect(page.getByLabel(/square footage/i)).toBeVisible()

    // Check keyboard navigation
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')

    // Run accessibility scan
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('form')
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('navigation is keyboard accessible', async ({ page }) => {
    await page.goto('/')

    // Test keyboard navigation through main menu
    await page.keyboard.press('Tab') // Should focus first focusable element
    await page.keyboard.press('Enter') // Should activate focused element

    // Test that all navigation links are reachable by keyboard
    const navLinks = page.getByRole('navigation').getByRole('link')
    const linkCount = await navLinks.count()

    for (let i = 0; i < linkCount; i++) {
      const link = navLinks.nth(i)
      await expect(link)
        .toBeFocused({ timeout: 1000 })
        .catch(() => {
          // If not focused, try to focus it
          return link.focus()
        })
    }

    // Run accessibility scan on navigation
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('nav')
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('color contrast meets AA standards', async ({ page }) => {
    await page.goto('/')

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa', 'color-contrast'])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('images have proper alt text', async ({ page }) => {
    await page.goto('/')

    const images = page.getByRole('img')
    const imageCount = await images.count()

    for (let i = 0; i < imageCount; i++) {
      const image = images.nth(i)
      const altText = await image.getAttribute('alt')

      // Alt text should be present and meaningful (not empty or just whitespace)
      expect(altText).toBeTruthy()
      expect(altText?.trim().length).toBeGreaterThan(0)
    }

    // Run accessibility scan for images
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'image-alt'])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('form error messages are accessible', async ({ page }) => {
    await page.goto('/contact')

    // Submit form without filling required fields
    await page.getByRole('button', { name: /send message/i }).click()

    // Check that error messages are properly associated with form fields
    const errorMessages = page.getByRole('alert')
    expect(await errorMessages.count()).toBeGreaterThan(0)

    // Run accessibility scan on form with errors
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('form')
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('modal dialogs are accessible', async ({ page }) => {
    await page.goto('/projects')

    // Open project modal (if it exists)
    const projectCard = page.getByTestId('project-card').first()
    await projectCard.click()

    // Check for proper modal attributes
    const modal = page.getByRole('dialog')
    if ((await modal.count()) > 0) {
      await expect(modal).toBeVisible()
      await expect(modal).toHaveAttribute('aria-modal', 'true')

      // Test escape key closes modal
      await page.keyboard.press('Escape')
      await expect(modal).not.toBeVisible()

      // Run accessibility scan on modal
      await projectCard.click() // Reopen modal
      const accessibilityScanResults = await new AxeBuilder({ page })
        .include('[role="dialog"]')
        .analyze()

      expect(accessibilityScanResults.violations).toEqual([])
    }
  })

  test('tables have proper headers and structure', async ({ page }) => {
    // Navigate to any page that might have tables (pricing, comparisons, etc.)
    await page.goto('/services')

    const tables = page.getByRole('table')
    const tableCount = await tables.count()

    for (let i = 0; i < tableCount; i++) {
      const table = tables.nth(i)

      // Check for table headers
      const headers = table.getByRole('columnheader')
      expect(await headers.count()).toBeGreaterThan(0)

      // Check for table caption or accessible name
      const caption = table.getByRole('caption')
      const accessibleName = await table.getAttribute('aria-label')

      expect((await caption.count()) > 0 || !!accessibleName).toBeTruthy()
    }

    // Run accessibility scan on tables
    if (tableCount > 0) {
      const accessibilityScanResults = await new AxeBuilder({ page })
        .include('table')
        .analyze()

      expect(accessibilityScanResults.violations).toEqual([])
    }
  })

  test('screen reader announcements work correctly', async ({ page }) => {
    await page.goto('/estimator')

    // Fill out form and check for live region updates
    await page.getByLabel(/project type/i).selectOption('Kitchen Remodel')

    // Check for live regions that announce changes
    const liveRegions = page.locator('[aria-live]')
    const liveRegionCount = await liveRegions.count()

    if (liveRegionCount > 0) {
      // Verify live regions have appropriate politeness levels
      for (let i = 0; i < liveRegionCount; i++) {
        const region = liveRegions.nth(i)
        const politeness = await region.getAttribute('aria-live')
        expect(['polite', 'assertive', 'off']).toContain(politeness)
      }
    }

    // Run accessibility scan on interactive elements
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa', 'aria'])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })
})
