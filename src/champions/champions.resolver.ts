import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ChampionsService } from './champions.service';
import { Champion } from './schemas/champions.schema';
import { CreateChampionInput } from './dto/create-champion.input';
import { UpdateChampionInput } from './dto/update-champion.input';

@Resolver(() => Champion)
export class ChampionsResolver {
  constructor(private readonly championsService: ChampionsService) {}

  @Mutation(() => Champion)
  async createChampion(@Args('createChampionInput') createChampionInput: CreateChampionInput) {
    return this.championsService.create(createChampionInput);
  }

  @Query(() => [Champion])
  async champions() {
    return this.championsService.findAll();
  }

  @Query(() => Champion, { name: 'champion' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.championsService.findOne(id);
  }

  @Mutation(() => Champion)
  updateChampion(
    @Args('updateChampionInput') updateChampionInput: UpdateChampionInput,
  ) {
    return this.championsService.update(
      updateChampionInput.id,
      updateChampionInput,
    );
  }

  @Mutation(() => Champion)
  removeChampion(@Args('id', { type: () => String }) id: string) {
    return this.championsService.remove(id);
  }
}
