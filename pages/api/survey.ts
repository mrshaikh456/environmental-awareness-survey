import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'data', 'responses.json')

type Response = {
  [key: number]: string
}

function getResponses(): Response[] {
  if (!fs.existsSync(dataFilePath)) {
    return []
  }
  const fileContents = fs.readFileSync(dataFilePath, 'utf8')
  return JSON.parse(fileContents)
}

function saveResponses(responses: Response[]) {
  const dirPath = path.dirname(dataFilePath)
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
  fs.writeFileSync(dataFilePath, JSON.stringify(responses))
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const responses = getResponses()
    res.status(200).json(responses)
  } else if (req.method === 'POST') {
    const newResponse = req.body
    const responses = getResponses()
    responses.push(newResponse)
    saveResponses(responses)
    res.status(200).json({ message: 'Response saved successfully' })
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

