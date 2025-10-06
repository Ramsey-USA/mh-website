import { chromium, FullConfig } from '@playwright/test'

async function globalSetup(config: FullConfig) {
  console.log('🚀 Starting global test setup...')
  
  // Verify that the application is running
  const browser = await chromium.launch()
  const page = await browser.newPage()
  
  try {
    // Wait for the application to be available
    const baseURL = config.projects[0].use?.baseURL || 'http://localhost:3000'
    console.log(`📡 Checking if application is running at ${baseURL}`)
    
    await page.goto(baseURL, { timeout: 30000 })
    await page.waitForLoadState('networkidle')
    
    console.log('✅ Application is running and responding')
    
    // Set up any global test data or authentication state
    // This could include creating test user accounts, setting up database state, etc.
    
    // Example: Set up test user session
    const isProduction = process.env.NODE_ENV === 'production'
    if (!isProduction) {
      // Create test user session for non-production environments
      await page.evaluate(() => {
        localStorage.setItem('test-mode', 'true')
        localStorage.setItem('test-user-id', 'test-user-123')
      })
      console.log('🧪 Test mode enabled with test user session')
    }
    
    console.log('✅ Global test setup completed successfully')
    
  } catch (error) {
    console.error('❌ Global test setup failed:', error)
    throw error
  } finally {
    await page.close()
    await browser.close()
  }
}

export default globalSetup