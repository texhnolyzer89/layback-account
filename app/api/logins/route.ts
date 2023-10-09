import { prisma } from 'prisma/db'

export async function GET(req: any) {
    try {
        const { searchParams } = new URL(req.url)
        const userId = searchParams.get('userId')
        const logins = await prisma.login.findMany({
            where: {
                userId
            }
        })
        return new Response(JSON.stringify({ logins: logins }), { status: 200 })
    }
    catch (e) {
        console.log(e)
        return new Response('Something went wrong', { status: 500 })
    }
}