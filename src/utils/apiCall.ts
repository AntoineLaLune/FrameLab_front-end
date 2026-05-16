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

export async function getSession() {
	const response = await fetch("/api/auth/session", {
		method: "GET",
		headers: { 'Content-Type' : "application/json" },
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
		headers: { 'Content-Type' : "application/json" },
		body: JSON.stringify({
			email : email,
			password : password
		})
	});
	const data = await response.json();
	return data;
}

export async function postChallenge(title:string, description:string, file:any, startDate:string, endDate:string, id:string) {
	const formData = new FormData()
	formData.append("title", title);
	formData.append("description", description);
	formData.append("photoUrl", file);
	formData.append("startDate", startDate);
	formData.append("endDate", endDate);
	formData.append("creatorId", id);
	const response = await fetch("/api/challenges", {
		method: "POST",
		credentials: "include",
		// headers: { 'Content-Type' : "multipart/form-data" },
		body: formData
	});
}
