import { prisma } from "@/server/db.util"
import bcrypt from "bcrypt"

async function main() {
  const username = process.argv[2]
  const password = process.argv[3]
  const hash = await bcrypt.hash(password, 10)

  await prisma.credentials.upsert({
    where: { username },
    update: {},
    create: {
      username,
      password: hash,
    },
  })

  console.log(`User ${username} created`)
}

main().catch(console.error)
