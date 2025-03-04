import { PokemonPermission } from "@app/pokemon/permissions/pokemon.permission";

export const Permission = {
  ...PokemonPermission,
};

export type PermissionType = PokemonPermission; // | any other permissions