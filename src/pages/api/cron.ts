import type { NextApiRequest, NextApiResponse } from 'next';
import { generateReport } from "../../utils/report";
 
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const data = await generateReport();
  response.status(200).json({ success: true, data: data });
}
