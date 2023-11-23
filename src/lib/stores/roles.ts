import { fetchAdmin } from '$lib/admin';
import { z } from 'zod';

import { createAsyncStore } from './async-store';

const PlayerRoleDefSchema = z.object({
	type: z.literal('player'),
	state: z.enum(['day', 'night']),
	image: z.string(),
	name: z.string(),
	addable: z.boolean(),
	combinedWith: z.string().optional(),
	prefix: z.enum(['feminimum', 'masculinum', 'neutrum']),
	isEvil: z.boolean(),
	activeNights: z.array(z.number()).optional(),
	order: z.number()
});

export type PlayerRoleDef = z.infer<typeof PlayerRoleDefSchema>;

export const UtilityRoleDefSchema = z.object({
	type: z.literal('util'),
	state: z.enum(['day', 'night']),
	name: z.string(),
	order: z.number()
});

export type UtilityRoleDef = z.infer<typeof UtilityRoleDefSchema>;

export const RoleDefSchema = z.union([PlayerRoleDefSchema, UtilityRoleDefSchema]);

export const RoleDefRecordSchema = z.record(RoleDefSchema);

export type RoleDefRecord = z.infer<typeof RoleDefRecordSchema>;

export const roleDefinitionsStore = createAsyncStore<RoleDefRecord>({
	createStorageKey: () => 'werwapp-roles',
	fetchFunction: fetchAdmin,
	createRequestPathname: () => '/roles',
	parseResponse: (response) => RoleDefRecordSchema.parse(response)
});

export const rolesStore = roleDefinitionsStore.store;
