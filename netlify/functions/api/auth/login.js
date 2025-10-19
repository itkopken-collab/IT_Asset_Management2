const bcrypt = require('bcryptjs')

exports.handler = async (event, context) => {
  try {
    // Enable CORS
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Content-Type': 'application/json'
    }

    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers
      }
    }

    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: 'Method not allowed' })
      }
    }

    const { email, password, storeCode } = JSON.parse(event.body)

    if (!email || !password) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Email and password are required' })
      }
    }

    // Demo users for Netlify deployment
    const users = [
      {
        id: 'admin-1',
        email: 'admin@company.com',
        name: 'System Administrator',
        role: 'ADMIN',
        password: 'admin123'
      },
      {
        id: 'store-1',
        email: 'store@company.com',
        name: 'Store Manager',
        role: 'STORE_USER',
        storeCode: 'JKT.LTSHAVNU',
        store: {
          storeCode: 'JKT.LTSHAVNU',
          storeName: 'Lotte Mall Jakarta (LG)'
        },
        password: 'store123'
      },
      {
        id: 'store-2',
        email: 'store2@company.com',
        name: 'Store Manager 2',
        role: 'STORE_USER',
        storeCode: 'JKT.ONESTR',
        store: {
          storeCode: 'JKT.ONESTR',
          storeName: 'Kenangan Signature One Satrio'
        },
        password: 'store123'
      }
    ]

    const user = users.find(u => u.email === email)

    if (!user || user.password !== password) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Invalid credentials' })
      }
    }

    // For store users, validate store assignment
    if (user.role === 'STORE_USER') {
      if (!storeCode) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Store selection is required for store users' })
        }
      }

      if (user.storeCode !== storeCode) {
        return {
          statusCode: 403,
          headers,
          body: JSON.stringify({ error: 'You are not assigned to this store' })
        }
      }
    }

    // Generate token
    const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64')

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Login successful',
        user: userWithoutPassword,
        token
      })
    }

  } catch (error) {
    console.error('Login error:', error)
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Internal server error' })
    }
  }
}