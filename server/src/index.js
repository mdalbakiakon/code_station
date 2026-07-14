import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { pool } from './db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())


app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Code Station server is healthy'
  })
})


app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()')
    res.json({ status: 'ok', message: 'Database connected!', time: result.rows[0] })
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message })
  }
})


app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body
    const passwordHash = await bcrypt.hash(password, 10)

    const result = await pool.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, role, created_at',
      [name, email, passwordHash]
    )

    res.status(201).json({
      status: 'ok',
      user: result.rows[0]
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    })
  }
})


app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1', [email]
    )

    if (result.rows.length === 0) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      })
    }

    const user = result.rows[0]

    const isMatch = await bcrypt.compare(password, user.password_hash)

    if (!isMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      })
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      status: 'ok',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    })

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    })
  }
})




app.listen(PORT, () => {
  console.log(`Server is online! Running on PORT:${PORT}`)
})