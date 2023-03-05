import Image from "next/image"

export default function Index({ views }: { views: number }) {

  return (
      <div className="h-screen w-screen bg-black flex items-center flex-col">
        <div className="py-20">
          <Image src="/img.png" alt="akira-logo" height={175} width={300} />
        </div>
          <div className="text-3xl font-extrabold">
              COMING SOON
          </div>
          <div className="text-gray-400 text-2xl">
              Page visited {views} times
          </div>
        {/*{trades.map(trade => (*/}
        {/*    <div className="text-white flex">*/}
        {/*      <div className="mr-4">{trade.createdAt}</div>*/}
        {/*      <div>{trade.side}</div>*/}
        {/*    </div>*/}
        {/*))}*/}
      </div>
  )
}

export async function getServerSideProps(context: any) {
    const data = await (await fetch(`${process.env.DENO_PRISMA_AKIRA_API_URL}/pageviews/NEXT_AKIRA_FRONTEND`, { method: "PUT" })).json()
    const { views } = data.data

  return {
    props: { views }
  }
}
