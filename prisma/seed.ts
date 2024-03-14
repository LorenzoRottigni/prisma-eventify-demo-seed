import { loadEventBus } from 'prisma-eventify'
import { User } from '@prisma/client'
import { UserService } from '../eventify/services/user.service'

async function main() {
    const eventBus = await loadEventBus({
        excludeFields: ['id'],
        excludeModels: [],
        outDir: './eventify'
    })
    const userService = new UserService(eventBus)
    

    for (let i = 0; i < 10; i++) {
        const data: Pick<User, 'username' | 'password' | 'email'> = {
            username: 'Lorenzo Rottigni',
            password: 'secretpwd',
            email: `<${(new Date()).getTime()}>.lorenzo@rottigni.tech`
        }
        await userService.create({ data })
    }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
