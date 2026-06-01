export async function getChallenge(id: number) {
	const response = await fetch("/api/challenges/" + id);
	const data = await response.json();
	return data.challenge;
}

export async function getCurrentChallenge() {
	const response = await fetch("/api/challenges/current");
	const data = await response.json();
	return data.challenge;
}

export async function getArchiveChallenge(number: number) {
	const response = await fetch("/api/challenges/archive/" + number);
	const data = await response.json();
	return data.challenges;
}
export async function getArchivesChallenges() {
	const response = await fetch("/api/challenges/archives?rand=true&limit=10");
	const data = await response.json();
	return data.challenges;
}

export async function getParticipationsByChallengeId(challenge_id: number) {
	const response = await fetch("/api/participations?limit=50&challenge_id=" + challenge_id);
	const data = await response.json();
	return data.participations;
}

export async function getUserParticipation(user_id: number, challenge_id: number) {
	const response = await fetch("/api/participations?user_id=" + user_id + "&challenge_id=" + challenge_id);
	const data = await response.json();
	return data.participations[0];
}

export async function getParticipation(participation_id: number) {
	const response = await fetch("/api/participations/" + participation_id);
	const data = await response.json();
	return data.participation;
}

export async function getSession() {
	const response = await fetch("/api/auth/session", {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});
	const data = await response.json();
	if (data.success == true) {
		return data.user;
	} else {
		return undefined;
	}
}

export async function login(email: string, password: string) {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			email: email,
			password: password,
		}),
	});
	const data = await response.json();
	return data;
}

export async function register(lastName: string, firstName: string, email: string, password: string) {
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
	const data = await response.json();
	return data;
}

export async function editUser(lastName: string, firstName: string, email: string, oldEmail: string, currentPassword: string) {
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

export async function editUserWithPassword(lastName: string, firstName: string, email: string, oldEmail: string, newPassword: string, currentPassword: string) {
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

export async function logout() {
	const response = await fetch("/api/auth/logout", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({}),
	});
	const data = await response.json();
	return data;
}

export async function postChallenge(title: string, description: string, file: File, startDate: string, endDate: string, id: string) {
	const formData = new FormData();
	formData.append("title", title);
	formData.append("description", description);
	formData.append("photoUrl", file);
	formData.append("startDate", startDate);
	formData.append("endDate", endDate);
	formData.append("creatorId", id);
	await fetch("/api/challenges", {
		method: "POST",
		credentials: "include",
		// headers: { 'Content-Type' : "multipart/form-data" },
		body: formData,
	});
}

export interface VotesResponse {
	success: boolean;
	message?: string;
	votes?: Votes;
}

export interface Votes {
	creativityNote: number;
	technicalNote: number;
	respectThemeNote: number;
	hasVotes: boolean;
}

export async function getVote(participationId: number): Promise<Votes | undefined> {
	const response: Response = await fetch(
		"/api/votes?participationId=" + String(participationId),
		{ credentials: "include" },
	);
	console.log("/api/votes?participationId=" + String(participationId));
	const data: VotesResponse = await response.json();
	if (data.success == true) {
		return data.votes;
	} else {
		return undefined;
	}
}

export async function postVote(participationId: number, creativityNote: number, technicalNote: number, respectThemeNote: number): Promise<VotesResponse | undefined> {
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
	return await response.json();
}
