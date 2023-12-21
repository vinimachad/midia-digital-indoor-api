import { google } from 'googleapis'

export const driveService = () => {
  const SCOPES = ['https://www.googleapis.com/auth/drive']
  const clientId = process.env.CLIENT_ID
  const clientSecret = process.env.CLIENT_SECRET

  const auth = new google.auth.GoogleAuth({
    clientOptions: { clientSecret, clientId },
    scopes: SCOPES
  })

  return google.drive({ version: 'v3', auth })
}
