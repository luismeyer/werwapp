export async function fetchAdmin(pathname: string) {
	return fetch(`/api/admin?pathname=${pathname}`).then((res) => res.json());
}
