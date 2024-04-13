import type { NextApiRequest, NextApiResponse } from 'next';
import { generateReport } from "../../utils/report";
 
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return response.status(401).end('Unauthorized');
  }
  const data = await generateReport();
  response.status(200).json({ success: true, data: data });
}
