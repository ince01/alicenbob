#!/usr/bin/env node

import { execSync } from "child_process";

// Get the staged files
const getStagedFiles = () => {
  try {
    const output = execSync("git diff --cached --name-only", {
      encoding: "utf8",
    });
    return output.trim().split("\n").filter(Boolean);
  } catch (error) {
    console.error("Error getting staged files:", error.message);
    return [];
  }
};

// Get the diff for a specific file
const getFileDiff = filePath => {
  try {
    return execSync(`git diff --cached -- "${filePath}"`, { encoding: "utf8" });
  } catch {
    return "";
  }
};

// Analyze file changes to determine commit type
const analyzeChanges = files => {
  const analysis = {
    type: "chore",
    scope: "",
    description: "",
    hasBreakingChanges: false,
    files: {
      added: [],
      modified: [],
      deleted: [],
    },
  };

  for (const file of files) {
    const diff = getFileDiff(file);

    // Determine file type and scope
    if (file.startsWith("apps/server/")) {
      analysis.scope = analysis.scope || "server";
    } else if (file.startsWith("apps/web/")) {
      analysis.scope = analysis.scope || "web";
    } else if (file.startsWith("packages/")) {
      analysis.scope = analysis.scope || "shared";
    } else if (file.includes("package.json") || file.includes("yarn.lock")) {
      analysis.scope = analysis.scope || "deps";
    } else if (file.includes(".md") || file.includes("docs/")) {
      analysis.scope = analysis.scope || "docs";
    } else if (file.includes("config") || file.includes(".config.")) {
      analysis.scope = analysis.scope || "config";
    }

    // Analyze content changes
    if (diff.includes("+") && diff.includes("-")) {
      analysis.files.modified.push(file);
    } else if (diff.startsWith("+") && !diff.includes("-")) {
      analysis.files.added.push(file);
    } else if (diff.startsWith("-") && !diff.includes("+")) {
      analysis.files.deleted.push(file);
    }

    // Determine commit type based on file patterns and content
    if (file.includes("test") || file.includes("spec")) {
      analysis.type = "test";
    } else if (file.includes(".md") || file.includes("docs/")) {
      analysis.type = "docs";
    } else if (file.includes("package.json") || file.includes("yarn.lock")) {
      analysis.type = "build";
    } else if (
      file.includes("eslint") ||
      file.includes("prettier") ||
      file.includes("style")
    ) {
      analysis.type = "style";
    } else if (
      diff.includes("fix") ||
      diff.includes("bug") ||
      diff.includes("error")
    ) {
      analysis.type = "fix";
    } else if (
      diff.includes("feat") ||
      diff.includes("add") ||
      diff.includes("new")
    ) {
      analysis.type = "feat";
    } else if (diff.includes("refactor") || diff.includes("improve")) {
      analysis.type = "refactor";
    }
  }

  // Generate description based on changes
  const descriptions = [];

  if (analysis.files.added.length > 0) {
    descriptions.push(
      `add ${analysis.files.added.length} new file${analysis.files.added.length > 1 ? "s" : ""}`
    );
  }

  if (analysis.files.modified.length > 0) {
    descriptions.push(
      `update ${analysis.files.modified.length} file${analysis.files.modified.length > 1 ? "s" : ""}`
    );
  }

  if (analysis.files.deleted.length > 0) {
    descriptions.push(
      `remove ${analysis.files.deleted.length} file${analysis.files.deleted.length > 1 ? "s" : ""}`
    );
  }

  analysis.description = descriptions.join(", ");

  return analysis;
};

// Generate commit message
const generateCommitMessage = analysis => {
  const scope = analysis.scope ? `(${analysis.scope})` : "";
  const breaking = analysis.hasBreakingChanges ? "!" : "";

  return `${analysis.type}${scope}${breaking}: ${analysis.description}`;
};

// Main execution
const main = () => {
  const stagedFiles = getStagedFiles();

  if (stagedFiles.length === 0) {
    console.log("No staged files found. Please stage some files first.");
    process.exit(1);
  }

  const analysis = analyzeChanges(stagedFiles);
  const commitMessage = generateCommitMessage(analysis);

  console.log("\n🤖 Auto-generated commit message:");
  console.log(`\n${commitMessage}\n`);

  // Ask user if they want to use this message
  console.log("Would you like to use this message? (y/n)");

  // For now, just output the message
  // In a real implementation, you'd read from stdin and handle the response
  console.log("\nTo use this message, run:");
  console.log(`git commit -m "${commitMessage}"`);
  console.log("\nOr use the interactive commitizen:");
  console.log("yarn commit");
};

main();
