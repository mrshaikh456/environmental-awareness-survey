import { NextApiRequest, NextApiResponse } from 'next'
import { getAllResponses } from '../../utils/surveyStorage'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  })

  const sendUpdate = async () => {
    const responses = await getAllResponses()
    res.write(`data: ${JSON.stringify(responses)}\n\n`)
  }

  const intervalId = setInterval(sendUpdate, 1000)

  req.on('close', () => {
    clearInterval(intervalId)
    res.end()
  })
}

