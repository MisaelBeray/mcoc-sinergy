import { Args, Resolver, Mutation, Query } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { SkipAuth } from '../common/decorators/skip-auth.decorator'
import { GqlUserDecorator } from '../common/decorators/gql-jwt-user-decorator'
import { AuthArgs } from './dto/auth.args'
import { Auth } from './entities/auth.entity'
import { User } from '../users/entities/user.entity'

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  @SkipAuth()
  async login(@Args() authArgs: AuthArgs) {
    return this.authService.login(authArgs)
  }

  @Query(() => User)
  async whoAmI(@GqlUserDecorator() user: User): Promise<any> {
    return user
  }
}