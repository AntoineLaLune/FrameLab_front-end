export interface ServerResponse {
	success: boolean;
	message: string;
}

export interface LoginResponse extends ServerResponse {
	user?: UserData;
}

export interface RegisterResponse extends ServerResponse {
	user?: UserData;
}

export interface SessionResponse extends ServerResponse {
	user?: UserData;
}

export interface UserData {
	id: number;
	email: string;
	last_name: string;
	first_name: string;
	is_admin: number;
	inscription_date: Date;
}

export interface VotesResponse extends ServerResponse {
	votes?: Votes;
}

export interface Votes {
	creativityNote: number;
	technicalNote: number;
	respectThemeNote: number;
	hasVotes: boolean;
}

export async function getChallenge(id?: number) { // @TODO
	const response = await fetch("/api/challenges/" + id);
	const data = await response.json();
	return data.challenge;
}

export async function getCurrentChallenge() { // @TODO
	const response = await fetch("/api/challenges/current");
	const data = await response.json();
	return data.challenge;
}

export async function getArchiveChallenge(number?: number) { // @TODO
	const response = await fetch("/api/challenges/archive/" + number);
	const data = await response.json();
	return data.challenges;
}
export async function getArchivesChallenges() { // @TODO
	const response = await fetch("/api/challenges/archives?rand=true&limit=10");
	const data = await response.json();
	return data.challenges;
}

export async function getParticipationsByChallengeId(challengeId?: number) { // @TODO
	const response = await fetch("/api/participations?limit=50&challenge_id=" + challengeId);
	const data = await response.json();
	return data.participations;
}

export async function getUserParticipation(userId?: number, challengeId?: number) { // @TODO
	const response = await fetch("/api/participations?user_id=" + userId + "&challenge_id=" + challengeId);
	const data = await response.json();
	return data.participations[0];
}

export async function getParticipation(participationId?: number) { // @TODO
	const response = await fetch("/api/participations/" + participationId);
	const data = await response.json();
	return data.participation;
}

export async function getSession(): Promise<UserData | undefined> {
	const response = await fetch("/api/auth/session", {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});
	const data: SessionResponse = await response.json();
	if (data.success == true) {
		return data.user as UserData;
	} else {
		return undefined;
	}
}

export async function login(email?: string, password?: string): Promise<LoginResponse> {
	const response: Response = await fetch("/api/auth/login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			email: email,
			password: password,
		}),
	});
	return await response.json() as LoginResponse;
}

export async function register(lastName?: string, firstName?: string, email?: string, password?: string): Promise<RegisterResponse> {
	const response = await fetch("/api/auth/register", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			lastName: lastName,
			firstName: firstName,
			email: email,
			password: password,
		}),
	});
	return await response.json() as RegisterResponse;
}

export async function editUser(lastName?: string, firstName?: string, email?: string, oldEmail?: string, currentPassword?: string) { // @TODO
	const response = await fetch("/api/users/edit", {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			newLastName: lastName,
			newFirstName: firstName,
			newEmail: email,
			email: oldEmail,
			password: currentPassword,
		}),
	});
	const data = await response.json();
	return data;
}

export async function editUserWithPassword(lastName?: string, firstName?: string, email?: string, oldEmail?: string, newPassword?: string, currentPassword?: string) { // @TODO
	const response = await fetch("/api/users/edit", {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			newLastName: lastName,
			newFirstName: firstName,
			newEmail: email,
			email: oldEmail,
			newPassword: newPassword,
			password: currentPassword,
		}),
	});
	const data = await response.json();
	return data;
}

export async function logout() { // @TODO
	const response = await fetch("/api/auth/logout", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({}),
	});
	const data = await response.json();
	return data;
}

export async function postChallenge(title?: string, description?: string, file?: File, startDate?: Date, endDate?: Date, id?: number): Promise<ServerResponse> {
	const formData = new FormData();
	formData.append("title", String(title));
	formData.append("description", String(description));
	formData.append("image", String(file));
	formData.append("startDate", String(startDate?.toDateString));
	formData.append("endDate", String(endDate?.toDateString));
	formData.append("creatorId", String(id));
	const response: Response = await fetch("/api/challenges", {
		method: "POST",
		body: formData,
	});
	return await response.json() as ServerResponse;
}

export async function removeParticipation(id?: number): Promise<ServerResponse> {
	const response: Response = await fetch("/api/participations/" + id, {
		method: "DELETE",
	});
	return await response.json() as ServerResponse;
}

export async function getVote(participationId?: number): Promise<Votes | undefined> {
	const response: Response = await fetch(
		"/api/votes?participationId=" + String(participationId),
		{ credentials: "include" },
	);
	const data: VotesResponse = await response.json();
	if (data.success == true) {
		return data.votes;
	} else {
		return undefined;
	}
}

export async function postVote(participationId?: number, creativityNote?: number, technicalNote?: number, respectThemeNote?: number): Promise<VotesResponse | undefined> {
	const response: Response = await fetch("/api/votes", {
		method: "POST",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			participationId: participationId,
			creativityNote: creativityNote,
			technicalNote: technicalNote,
			respectThemeNote: respectThemeNote,
		}),
	});
	return await response.json() as VotesResponse;
}
