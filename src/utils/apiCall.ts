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
	const response = await fetch("/api/challenges/archives/");
	const data = await response.json();
	return data.challenges;
}

// export async function getRandomArchivesChallenges(number: number) {
// 	const response = await fetch("/api/challenges/archives/" + number);
// 	const data = await response.json();
// 	return data.challenges;
// }

// export async function getParticipationsByChallengeId(number: number, id: number) {
// 	const response = await fetch("/participations/"+number+"/challenge_id/"+id);
// 	const data = await response.json();
// 	return data.participations;
// }

// export async function getRandomParticipationsByChallengeId(number: number, id: number) {
// 	const response = await fetch("/participations/random/"+number+"/challenge_id/"+id);
// 	const data = await response.json();
// 	return data.participations;
// }

export async function getSession() {
	const response = await fetch("/api/auth/session", { // @TODO ← Les get session avec apiCall, pas ailleur (Recherge global / projet, tape "/api/auth/session")
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
