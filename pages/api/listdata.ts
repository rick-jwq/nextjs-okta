// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  data: string[]
}

let data = [
  'High 1',
  'High 2',
  'High 3',
  'High 4',
  'High 5',
  'High 6',
  'High 7',
  'High 8',
  'High 9',
  'High 10',
  'High 11',
  'High 12',
]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.log('got called')
  if (req.method === 'post'){
    data = data.splice(0, 1)
    setTimeout(() => {
      res
      .status(200)
      .json({
        data,
      })
    }, 1000);
  } else {
    setTimeout(() => {
      res
      .status(200)
      .json({
        data,
      })
    }, 1000);
  }
}
