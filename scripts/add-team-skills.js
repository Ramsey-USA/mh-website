/**
 * Script to add skill metrics to team data for radar charts
 * Generates realistic skill profiles based on role and experience
 */

const fs = require("fs");
const path = require("path");

const teamDataPath = path.join(__dirname, "../src/lib/data/team-data.json");

// Read current team data
const teamData = JSON.parse(fs.readFileSync(teamDataPath, "utf-8"));

/**
 * Generate skill profile based on role and experience
 * Skills are on a 0-100 scale
 */
function generateSkills(member) {
  const role = member.role.toLowerCase();
  const experience = member.careerStats.yearsExperience;
  const isLeadership =
    role.includes("owner") ||
    role.includes("president") ||
    role.includes("vice") ||
    role.includes("director");
  const isProject =
    role.includes("project") ||
    role.includes("estimat") ||
    role.includes("manager");
  const isField =
    role.includes("superintend") ||
    role.includes("foreman") ||
    role.includes("field");
  const isAdmin = role.includes("admin") || role.includes("coordinator");

  // Base experience factor (scales 60-95 based on years)
  const experienceFactor = Math.min(95, 60 + experience * 1.5);

  let skills = {
    leadership: 70,
    technical: 70,
    communication: 70,
    safety: 85,
    problemSolving: 70,
    teamwork: 80,
  };

  // Adjust based on role
  if (isLeadership) {
    skills.leadership = Math.min(100, experienceFactor + 5);
    skills.communication = Math.min(100, experienceFactor + 3);
    skills.problemSolving = Math.min(100, experienceFactor + 2);
    skills.technical = Math.min(95, experienceFactor - 10);
    skills.teamwork = Math.min(100, experienceFactor);
    skills.safety = Math.min(100, experienceFactor + 5);
  } else if (isProject) {
    skills.leadership = Math.min(95, experienceFactor - 5);
    skills.technical = Math.min(95, experienceFactor);
    skills.communication = Math.min(100, experienceFactor + 5);
    skills.problemSolving = Math.min(100, experienceFactor + 5);
    skills.teamwork = Math.min(95, experienceFactor);
    skills.safety = Math.min(100, experienceFactor + 3);
  } else if (isField) {
    skills.leadership = Math.min(90, experienceFactor - 3);
    skills.technical = Math.min(100, experienceFactor + 5);
    skills.communication = Math.min(90, experienceFactor - 5);
    skills.problemSolving = Math.min(100, experienceFactor + 3);
    skills.teamwork = Math.min(95, experienceFactor);
    skills.safety = Math.min(100, experienceFactor + 10);
  } else if (isAdmin) {
    skills.leadership = Math.min(85, experienceFactor - 10);
    skills.technical = Math.min(90, experienceFactor - 5);
    skills.communication = Math.min(100, experienceFactor + 5);
    skills.problemSolving = Math.min(90, experienceFactor);
    skills.teamwork = Math.min(100, experienceFactor + 5);
    skills.safety = Math.min(95, experienceFactor);
  }

  // Special adjustments
  if (role.includes("estimat")) {
    skills.technical = Math.min(100, skills.technical + 5);
    skills.problemSolving = Math.min(100, skills.problemSolving + 3);
  }

  if (role.includes("safety")) {
    skills.safety = 100;
    skills.leadership = Math.min(95, skills.leadership + 5);
  }

  // Round all values
  Object.keys(skills).forEach((key) => {
    skills[key] = Math.round(skills[key]);
  });

  return skills;
}

// Add skills to each team member
const updatedTeamData = teamData.map((member) => {
  if (!member.skills) {
    member.skills = generateSkills(member);
    console.log(`Added skills for ${member.name}`);
  } else {
    console.log(`Skipped ${member.name} (already has skills)`);
  }
  return member;
});

// Write updated data back to file
fs.writeFileSync(teamDataPath, JSON.stringify(updatedTeamData, null, 2));

console.log("\n✅ Successfully added skills to all team members!");
console.log(`Updated ${updatedTeamData.length} team members`);
