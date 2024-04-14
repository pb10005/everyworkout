import type { NextApiRequest, NextApiResponse } from 'next';
import { generateReport } from "../../utils/report";

/**
 *  毎週月曜10時に動くCron Job
 * @param request 
 * @param response  200: 正常
 * @returns 
 */
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
): Promise<NextApiResponse<any> | undefined> {
  if (process.env.CRON_SECRET && request.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return response.status(401).end('Unauthorized');
  }
  const data = await generateReport();
  response.status(200).json({ result: data });
}
