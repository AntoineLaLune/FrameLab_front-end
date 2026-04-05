export async function getCurrentChallenge() {
  const currentResponse = await fetch("/api/challenge/current");
  const currentData = await currentResponse.json();
  return currentData.challenge;
}

export async function getArchiveChallenge() {
  const archiveResponse = await fetch("/api/challenge/archive");
  const archiveData = await archiveResponse.json();
  return archiveData.challenges;
}
export async function getRandomArchivesChallenges(number: number) {
  const archiveResponse = await fetch("/api/challenges/archives/random/" + number);
  const archiveData = await archiveResponse.json();
  return archiveData.challenges;
}

export async function getParticipationsByChallengeId(number: number, id: number) {
  const participationResponse = await fetch("/participations/"+number+"/challenge_id/"+id);
  const participationData = await participationResponse.json();
  return participationData.participations;
}

export async function getRandomParticipationsByChallengeId(number: number, id: number) {
  const participationResponse = await fetch("/participations/random/"+number+"/challenge_id/"+id);
  const participationData = await participationResponse.json();
  return participationData.participations;
}
