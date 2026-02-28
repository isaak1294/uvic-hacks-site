// In-memory feature flags — reset on server restart.

import { truncates } from "bcryptjs";

// Toggle via POST /api/admin/settings with x-api-key header.
export const settings = {
    scoringOpen: true,    // non-judges can submit scores
    scoresVisible: false,  // non-judges can see scores and leaderboard
};
