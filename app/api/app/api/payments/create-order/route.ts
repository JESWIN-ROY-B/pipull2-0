import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { amount } = body

    // Demo payment order object
    const order = {
      id: `order_demo_${Date.now()}`,
      amount: amount || 500,
      currency: 'INR',
      status: 'created',
    }

    return NextResponse.json({ success: true, order }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create payment order' },
      { status: 500 }
    )
  }
}