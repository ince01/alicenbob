#!/usr/bin/env node

import { execSync } from "child_process";
import { createInterface } from "readline";
import dotenv from "dotenv";
import AI_COMMIT_CONFIG from "./ai-commit-config.js";

// Load environment variables
dotenv.config();

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

// Filter files based on configuration
const filterFiles = files => {
  return files
    .filter(file => {
      return !AI_COMMIT_CONFIG.files.ignore.some(pattern => {
        if (pattern.includes("*")) {
          const regex = new RegExp(pattern.replace("*", ".*"));
          return regex.test(file);
        }
        return file.includes(pattern);
      });
    })
    .slice(0, AI_COMMIT_CONFIG.files.maxFiles);
};

// Get the diff for a specific file
const getFileDiff = filePath => {
  try {
    const diff = execSync(`git diff --cached -- "${filePath}"`, {
      encoding: "utf8",
    });
    // Truncate diff if too long
    return diff.length > AI_COMMIT_CONFIG.files.maxDiffSize
      ? diff.substring(0, AI_COMMIT_CONFIG.files.maxDiffSize) +
          "\n... (truncated)"
      : diff;
  } catch {
    return "";
  }
};

// Generate AI prompt for commit message
const generateAIPrompt = (files, diffs) => {
  const fileList = files.join("\n- ");
  const diffSummary = diffs.map(diff => diff).join("\n\n");

  return AI_COMMIT_CONFIG.prompt.template
    .replace("{fileList}", fileList)
    .replace("{diffSummary}", diffSummary);
};

// Validate commit message format
const validateCommitMessage = message => {
  if (!AI_COMMIT_CONFIG.validation.formatRegex.test(message)) {
    return false;
  }

  if (message.length > AI_COMMIT_CONFIG.validation.maxLength) {
    return false;
  }

  const hasForbiddenWords = AI_COMMIT_CONFIG.validation.forbiddenWords.some(
    word => message.toUpperCase().includes(word)
  );

  return !hasForbiddenWords;
};

// Call AI service to generate commit message
const generateCommitMessageWithAI = async (prompt, retryCount = 0) => {
  const apiKey =
    process.env.OPENAI_API_KEY ||
    process.env.ANTHROPIC_API_KEY ||
    process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "No AI API key found. Please set OPENAI_API_KEY, ANTHROPIC_API_KEY, or GEMINI_API_KEY in your .env file"
    );
  }

  try {
    // Try OpenAI first, then Anthropic, then Gemini
    if (process.env.OPENAI_API_KEY) {
      return await callOpenAI(prompt);
    } else if (process.env.ANTHROPIC_API_KEY) {
      return await callAnthropic(prompt);
    } else if (process.env.GEMINI_API_KEY) {
      return await callGemini(prompt);
    }
  } catch (error) {
    if (retryCount < AI_COMMIT_CONFIG.errorHandling.maxRetries) {
      console.log(
        `Retry attempt ${retryCount + 1}/${AI_COMMIT_CONFIG.errorHandling.maxRetries}...`
      );
      await new Promise(resolve =>
        setTimeout(resolve, 1000 * (retryCount + 1))
      ); // Exponential backoff
      return generateCommitMessageWithAI(prompt, retryCount + 1);
    }
    throw error;
  }
};

// Call OpenAI API
const callOpenAI = async prompt => {
  try {
    const { OpenAI } = await import("openai");
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: AI_COMMIT_CONFIG.openai.model,
      messages: [
        {
          role: "system",
          content: AI_COMMIT_CONFIG.prompt.systemMessage,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: AI_COMMIT_CONFIG.openai.maxTokens,
      temperature: AI_COMMIT_CONFIG.openai.temperature,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("OpenAI API error:", error.message);
    throw error;
  }
};

// Call Anthropic API
const callAnthropic = async prompt => {
  try {
    const Anthropic = await import("@anthropic-ai/sdk");
    const anthropic = new Anthropic.default({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const response = await anthropic.messages.create({
      model: AI_COMMIT_CONFIG.anthropic.model,
      max_tokens: AI_COMMIT_CONFIG.anthropic.maxTokens,
      temperature: AI_COMMIT_CONFIG.anthropic.temperature,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return response.content[0].text.trim();
  } catch (error) {
    console.error("Anthropic API error:", error.message);
    throw error;
  }
};

// Call Gemini API
const callGemini = async prompt => {
  try {
    const { GoogleGenAI } = await import("@google/genai");
    const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);

    // Combine system message and user prompt for Gemini
    const fullPrompt = `${AI_COMMIT_CONFIG.prompt.systemMessage}\n\n${prompt}`;
    const response = await genAI.models.generateContent({
      model: AI_COMMIT_CONFIG.gemini.model,
      contents: fullPrompt,
      config: {
        candidateCount: 1,
        maxOutputTokens: AI_COMMIT_CONFIG.gemini.maxTokens,
        temperature: AI_COMMIT_CONFIG.gemini.temperature,
      },
    });
    return response.text.trim();
  } catch (error) {
    console.error("Gemini API error:", error.message);
    throw error;
  }
};

// Fallback to pattern-based commit
const fallbackToPatternBased = async () => {
  console.log("\n🔄 Falling back to pattern-based commit generation...");

  try {
    const { execSync } = await import("child_process");
    const result = execSync("yarn commit:auto", { encoding: "utf8" });
    console.log(result);
  } catch (error) {
    console.error("Fallback also failed:", error.message);
    throw error;
  }
};

// Ask user for confirmation
const askUser = async question => {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer.toLowerCase());
    });
  });
};

// Execute commit
const executeCommit = message => {
  try {
    execSync(`git commit -m "${message}"`, { stdio: "inherit" });
    console.log(`${AI_COMMIT_CONFIG.ui.emojis.success} Commit successful!`);
  } catch (error) {
    console.error(
      `${AI_COMMIT_CONFIG.ui.emojis.error} Commit failed:`,
      error.message
    );
    process.exit(1);
  }
};

// Main execution
const main = async () => {
  console.log("🤖 AI-Powered Commit Message Generator");
  console.log("=====================================\n");

  const stagedFiles = getStagedFiles();

  if (stagedFiles.length === 0) {
    console.log("No staged files found. Please stage some files first.");
    console.log("Use: git add .");
    process.exit(1);
  }

  console.log(
    `${AI_COMMIT_CONFIG.ui.emojis.analyzing} Analyzing staged files...`
  );
  const filteredFiles = filterFiles(stagedFiles);
  console.log(`Found ${filteredFiles.length} relevant file(s):`);
  filteredFiles.forEach(file => console.log(`  - ${file}`));
  console.log();

  // Get diffs for filtered files
  const diffs = filteredFiles.map(file => {
    const diff = getFileDiff(file);
    return `File: ${file}\n${diff}`;
  });

  console.log(
    `${AI_COMMIT_CONFIG.ui.emojis.generating} Generating AI commit message...`
  );

  try {
    const prompt = generateAIPrompt(filteredFiles, diffs);
    const aiMessage = await generateCommitMessageWithAI(prompt);

    // Validate the generated message
    if (!validateCommitMessage(aiMessage)) {
      console.log(
        `${AI_COMMIT_CONFIG.ui.emojis.warning} Generated message doesn't meet validation criteria.`
      );
      console.log("Message:", aiMessage);
    }

    console.log("\n🤖 AI-Generated commit message:");
    console.log(`\n${aiMessage}\n`);

    const answer = await askUser(
      "Would you like to use this commit message? (y/n/e for edit): "
    );

    if (answer === "y" || answer === "yes") {
      executeCommit(aiMessage);
    } else if (answer === "e" || answer === "edit") {
      const customMessage = await askUser("Enter your custom commit message: ");
      if (customMessage.trim()) {
        executeCommit(customMessage.trim());
      } else {
        console.log("No message provided, aborting commit.");
        process.exit(1);
      }
    } else {
      console.log("Commit cancelled.");
      process.exit(0);
    }
  } catch (error) {
    console.error(
      `${AI_COMMIT_CONFIG.ui.emojis.error} Error generating AI commit message:`,
      error.message
    );

    if (AI_COMMIT_CONFIG.errorHandling.fallbackToPattern) {
      try {
        await fallbackToPatternBased();
      } catch {
        console.log("\n💡 Make sure you have set up your AI API key:");
        console.log("   - Set OPENAI_API_KEY for OpenAI");
        console.log("   - Set ANTHROPIC_API_KEY for Anthropic");
        console.log("   - Set GEMINI_API_KEY for Gemini");
        console.log("\n📝 You can still use the interactive commitizen:");
        console.log("   yarn commit");
        process.exit(1);
      }
    } else {
      console.log("\n💡 Make sure you have set up your AI API key:");
      console.log("   - Set OPENAI_API_KEY for OpenAI");
      console.log("   - Set ANTHROPIC_API_KEY for Anthropic");
      console.log("   - Set GEMINI_API_KEY for Gemini");
      console.log("\n📝 You can still use the interactive commitizen:");
      console.log("   yarn commit");
      process.exit(1);
    }
  }
};

main().catch(console.error);
