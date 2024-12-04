import { handleAuth } from '@auth0/nextjs-auth0';

export const GET = handleAuth().GET;
export const POST = handleAuth().POST;
