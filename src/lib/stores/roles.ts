import { z } from 'zod';
import RolesDefinitions from './roles.json';
import { createAsyncStore } from './async-store';

const PlayerRoleDefSchema = z.object({
	type: z.literal('player'),
	state: z.enum(['day', 'night']),
	name: z.string(),
	addable: z.boolean(),
	combinedWith: z.string().optional(),
	prefix: z.enum(['feminimum', 'masculinum', 'neutrum']),
	isEvil: z.boolean(),
	activeNights: z.array(z.number()).optional()
});

export type PlayerRoleDef = z.infer<typeof PlayerRoleDefSchema>;

export const UtilityRoleDefSchema = z.object({
	type: z.literal('util'),
	state: z.enum(['day', 'night']),
	name: z.string()
});

export type UtilityRoleDef = z.infer<typeof UtilityRoleDefSchema>;

export const RoleDefSchema = z.union([PlayerRoleDefSchema, UtilityRoleDefSchema]);

const RoleDefResponseSchema = z.object({
	roles: z.array(RoleDefSchema)
});

export type RoleDefResponse = z.infer<typeof RoleDefResponseSchema>;

export const roleDefinitionsStore = createAsyncStore<RoleDefResponse>({
	createStorageKey: () => 'werwapp-roles',
	fetchValue: async () => {
		const roleDefinitions = RoleDefResponseSchema.parse(RolesDefinitions);

		await new Promise((resolve) => setTimeout(resolve, 1000));

		return roleDefinitions;
	}
});
