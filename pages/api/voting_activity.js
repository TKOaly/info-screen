import {
  fetchSciencePercentage,
  fetchTotalPercentage
} from "services/repcoVoteService";

export default async function handle(_req, res) {
  const facultyPercentage = await fetchSciencePercentage();
  const totalPercentage = await fetchTotalPercentage();

  return res.json({
    faculty: facultyPercentage,
    total: totalPercentage
  });
}
