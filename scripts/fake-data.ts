import { prisma } from "@/server/db.util"
import { faker } from "@faker-js/faker"
import { Category } from "@prisma/client"

async function createCategory(name: string): Promise<Category> {
  console.log(`Creating category: ${name}`)
  return prisma.category.upsert({
    where: { name },
    update: {},
    create: { name },
  })
}

async function createPosts(count: number, categoryId: string): Promise<void> {
  for (let i = 0; i < count; i++) {
    const title = faker.lorem.words(3)
    const content = faker.lorem.paragraphs(3)
    console.log(`Creating post: ${title}`)
    await prisma.post.create({
      data: {
        title,
        content,
        slug: faker.helpers.slugify(title),
        categoryId: categoryId,
      },
    })
  }
}

async function main() {
  const resources = await createCategory("Resources")
  const posts = await createCategory("Posts")
  const data = await createCategory("Data")

  await createPosts(10, resources.id)
  await createPosts(10, posts.id)
  await createPosts(10, data.id)
}

main().catch(console.error)
