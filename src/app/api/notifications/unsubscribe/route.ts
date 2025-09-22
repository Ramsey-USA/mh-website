import { NextRequest, NextResponse } from 'next/server'

// Reference to the same subscription store (in production, use a database)
import type { SubscriptionData } from '../send/route'

declare global {
  var subscriptionsStore: Map<string, SubscriptionData>
}

if (!global.subscriptionsStore) {
  global.subscriptionsStore = new Map()
}

export async function POST(request: NextRequest) {
  try {
    const { subscription } = await request.json()
    
    if (!subscription || !subscription.endpoint) {
      return NextResponse.json(
        { error: 'Invalid subscription object' },
        { status: 400 }
      )
    }

    // Generate the same ID used when subscribing
    const subscriptionId = Buffer.from(subscription.endpoint).toString('base64')
    
    // Remove the subscription
    const existed = global.subscriptionsStore.delete(subscriptionId)

    console.log(`Push subscription unregistered: ${subscriptionId}`)
    console.log(`Total subscriptions: ${global.subscriptionsStore.size}`)

    return NextResponse.json({
      message: existed ? 'Subscription removed successfully' : 'Subscription not found',
      id: subscriptionId
    })
  } catch (error) {
    console.error('Error removing subscription:', error)
    return NextResponse.json(
      { error: 'Failed to remove subscription' },
      { status: 500 }
    )
  }
}