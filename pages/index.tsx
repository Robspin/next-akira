import Image from "next/image"
import Head from "next/head"

export default function Index({ views, bot }: { views: number, bot: any }) {

      return (
          <>
              <Head>
                  <title>AKIRA</title>
                  <meta name="description" content="AKIRA" />
                  <meta name="viewport" content="width=device-width, initial-scale=1" />
                  <link rel="icon" href="/pill.png" />
              </Head>
              <div className="h-screen w-screen bg-black flex items-center flex-col">
                <div className="py-20">
                  <Image src="/img.png" alt="akira-logo" height={175} width={300} />
                </div>
                <div className="flex justify-between text-xl font-extrabold w-[380px]">
                    <div>
                        BOT STATUS:
                    </div>
                    <div className={`${bot.direction === 'LONG' && 'text-green-500'} ${bot.direction === 'SHORT' && 'text-red-500'}`}>
                        {bot.direction}
                    </div>
                </div>
                  <div className="flex justify-between text-xl font-extrabold w-[380px]">
                      <div>
                          UPDATED AT:
                      </div>
                      <div className="">
                          {bot.updatedAt.slice(0, -5)}
                      </div>
                  </div>
                <div className="text-gray-400 mt-10">
                    Page visited {views} times
                </div>
              </div>
          </>
  )
}

export async function getServerSideProps(context: any) {
    const viewData = await (await fetch(`${process.env.DENO_PRISMA_AKIRA_API_URL}/pageviews/NEXT_AKIRA_FRONTEND`, { method: "PUT" })).json()
    const { views } = viewData.data

    const botData = await (await fetch(`${process.env.DENO_PRISMA_AKIRA_API_URL}/bot-status/${process.env.STRATEGY_KEY}`)).json()
    const bot = botData.data

  return {
    props: { views, bot }
  }
}
