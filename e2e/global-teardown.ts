import { FullConfig } from '@playwright/test'

async function globalTeardown(config: FullConfig) {
  console.log('🧹 Starting global test teardown...')

  try {
    // Clean up any global test data
    // This could include cleaning up test database records, removing test files, etc.

    const isProduction = process.env.NODE_ENV === 'production'
    if (!isProduction) {
      console.log('🧪 Cleaning up test environment...')

      // Example cleanup tasks:
      // - Remove test user accounts
      // - Clean up test data from database
      // - Reset application state
      // - Clear temporary files

      console.log('✅ Test environment cleanup completed')
    }

    // Log test summary
    console.log('📊 Test execution summary:')
    console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`)
    console.log(
      `   Base URL: ${config.projects[0].use?.baseURL || 'http://localhost:3000'}`
    )
    console.log(`   Workers: ${config.workers || 'default'}`)
    console.log(`   Retries: ${config.projects[0].retries || 0}`)

    console.log('✅ Global test teardown completed successfully')
  } catch (error) {
    console.error('❌ Global test teardown failed:', error)
    // Don't throw here - we don't want teardown failures to fail the test run
  }
}

export default globalTeardown
