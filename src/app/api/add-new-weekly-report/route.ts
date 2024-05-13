export const dynamic = 'force-dynamic' ;
import { addNewReport } from '../../../utils/add-new-report';

/**
 *  毎週月曜10時に動くCron Job
 * @param request 
 * @param response  200: 正常
 * @returns 
 */
export async function GET(request: Request) {
  if (process.env.CRON_SECRET && request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  await addNewReport();
 
  return new Response('success', { status: 200 });
}
