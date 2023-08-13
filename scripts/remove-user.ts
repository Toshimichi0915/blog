import { prisma } from "@/server/db.util"

async function main() {
  const username = process.argv[2]

  await prisma.credentials.delete({
    where: { username },
  })

  console.log(`User ${username} deleted`)
}

main().catch(console.error)
