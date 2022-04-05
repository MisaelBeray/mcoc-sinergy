import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SinergiesService } from './sinergies.service';
import { Sinergy } from './entities/sinergy.entity';
import { CreateSinergyInput } from './dto/create-sinergy.input';
import { UpdateSinergyInput } from './dto/update-sinergy.input';

@Resolver(() => Sinergy)
export class SinergiesResolver {
  constructor(private readonly sinergiesService: SinergiesService) {}

  @Mutation(() => Sinergy)
  async createSinergy(@Args('createSinergyInput') createSinergyInput: CreateSinergyInput) {
    return this.sinergiesService.create(createSinergyInput);
  }

  @Query(() => [Sinergy])
  async sinergies() {
    return this.sinergiesService.findAll();
  }

  @Query(() => Sinergy, { name: 'sinergy' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.sinergiesService.findOne(id);
  }

  @Mutation(() => Sinergy)
  updateSinergy(@Args('updateSinergyInput') updateSinergyInput: UpdateSinergyInput) {
    return this.sinergiesService.update(updateSinergyInput.id, updateSinergyInput);
  }

  @Mutation(() => Sinergy)
  removeSinergy(@Args('id', { type: () => Int }) id: number) {
    return this.sinergiesService.remove(id);
  }
}
