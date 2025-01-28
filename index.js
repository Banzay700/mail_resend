import 'dotenv/config'
import { Resend } from 'resend'
import express from 'express'
import fs from 'fs'
import path from 'path'

const DELIVERED_EMAIL = 'твій емейл'

const resend = new Resend(process.env.RESEND_API_KEY)
const app = express()
const mail = fs.readFileSync(path.resolve('mail.html'), 'utf-8')

app.get('/', async (req, res) => {
  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [DELIVERED_EMAIL],
      subject: 'Hello World',
      html: mail,
    })

    res.status(200).json(data)
  } catch (error) {
    res.status(400).json(error)
  }
})

app.listen(3000, () => {
  if (!process.env.RESEND_API_KEY) {
    throw `Abort: You need to define RESEND_API_KEY in the .env file.`
  }

  console.log('Listening on http://localhost:3000')
})
