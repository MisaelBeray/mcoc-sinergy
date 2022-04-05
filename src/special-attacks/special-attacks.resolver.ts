import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SpecialAttacksService } from './special-attacks.service';
import { SpecialAttack } from './entities/special-attack.entity';
import { CreateSpecialAttackInput } from './dto/create-special-attack.input';
import { UpdateSpecialAttackInput } from './dto/update-special-attack.input';

@Resolver(() => SpecialAttack)
export class SpecialAttacksResolver {
  constructor(private readonly specialAttacksService: SpecialAttacksService) {}

  @Mutation(() => SpecialAttack)
  async createSpecialAttack(@Args('createSpecialAttackInput') createSpecialAttackInput: CreateSpecialAttackInput) {
    return this.specialAttacksService.create(createSpecialAttackInput);
  }

  @Query(() => [SpecialAttack])
  async specialAttacks() {
    return this.specialAttacksService.findAll();
  }

  @Query(() => SpecialAttack, { name: 'specialAttack' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.specialAttacksService.findOne(id);
  }

  @Mutation(() => SpecialAttack)
  updateSpecialAttack(@Args('updateSpecialAttackInput') updateSpecialAttackInput: UpdateSpecialAttackInput) {
    return this.specialAttacksService.update(updateSpecialAttackInput.id, updateSpecialAttackInput);
  }

  @Mutation(() => SpecialAttack)
  removeSpecialAttack(@Args('id', { type: () => Int }) id: number) {
    return this.specialAttacksService.remove(id);
  }
}
