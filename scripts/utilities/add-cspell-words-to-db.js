#!/usr/bin/env node

/**
 * Script to add cSpell words to Firebase Firestore database
 * This helps maintain a centralized dictionary for spell checking across the platform
 */

const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

// Initialize Firebase Admin (requires service account key or running in Firebase environment)
if (!admin.apps.length) {
  try {
    // Try to initialize with default credentials (works in Firebase environment)
    admin.initializeApp();
    console.log("✅ Firebase Admin initialized with default credentials");
  } catch (error) {
    console.error("❌ Failed to initialize Firebase Admin:", error.message);
    console.log("💡 Make sure you have proper Firebase credentials configured");
    process.exit(1);
  }
}

const db = admin.firestore();

async function addCSpellWordsToDatabase() {
  try {
    // Read cspell.json file
    const cspellPath = path.join(__dirname, "..", "cspell.json");
    const cspellContent = fs.readFileSync(cspellPath, "utf8");

    // Parse JSON (handle comments by removing them first)
    const cleanJson = cspellContent.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, "");
    const cspellConfig = JSON.parse(cleanJson);

    const words = cspellConfig.words || [];
    const ignoreWords = cspellConfig.ignoreWords || [];

    console.log(
      `📝 Found ${words.length} words and ${ignoreWords.length} ignore words in cspell.json`,
    );

    // Create or update the spell-check collection
    const spellCheckRef = db.collection("spell-check");

    // Add metadata document
    await spellCheckRef.doc("metadata").set({
      totalWords: words.length,
      totalIgnoreWords: ignoreWords.length,
      lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
      version: cspellConfig.version || "0.2",
      language: cspellConfig.language || "en",
      source: "cspell.json",
      description:
        "Custom dictionary words for MH Construction website spell checking",
    });

    console.log("✅ Added metadata document");

    // Batch write words (Firestore has a 500 document limit per batch)
    const batchSize = 400; // Keep under the limit
    const wordBatches = [];

    for (let i = 0; i < words.length; i += batchSize) {
      wordBatches.push(words.slice(i, i + batchSize));
    }

    console.log(`📦 Processing ${wordBatches.length} batches of words...`);

    for (let batchIndex = 0; batchIndex < wordBatches.length; batchIndex++) {
      const batch = db.batch();
      const currentWords = wordBatches[batchIndex];

      currentWords.forEach((word, index) => {
        const docId = `word_${batchIndex * batchSize + index + 1}`.padStart(
          10,
          "0",
        );
        const wordRef = spellCheckRef.doc(docId);

        batch.set(wordRef, {
          word: word.toLowerCase(),
          originalCase: word,
          length: word.length,
          category: categorizeWord(word),
          addedAt: admin.firestore.FieldValue.serverTimestamp(),
          isActive: true,
          type: "custom",
        });
      });

      await batch.commit();
      console.log(
        `✅ Batch ${batchIndex + 1}/${wordBatches.length} committed (${currentWords.length} words)`,
      );
    }

    // Add ignore words if any
    if (ignoreWords.length > 0) {
      const ignoreRef = spellCheckRef.doc("ignore-words");
      await ignoreRef.set({
        words: ignoreWords,
        count: ignoreWords.length,
        lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
        description: "Words to ignore during spell checking",
      });
      console.log(`✅ Added ${ignoreWords.length} ignore words`);
    }

    // Create search index for better querying
    await createSearchIndex(spellCheckRef, words);

    console.log(
      "🎉 Successfully added all cSpell words to Firestore database!",
    );
    console.log(`📊 Summary:`);
    console.log(`   - Total words: ${words.length}`);
    console.log(`   - Ignore words: ${ignoreWords.length}`);
    console.log(`   - Collection: spell-check`);
    console.log(`   - Database: Firestore`);
  } catch (error) {
    console.error("❌ Error adding words to database:", error);
    process.exit(1);
  }
}

function categorizeWord(word) {
  // Simple categorization based on word patterns
  if (word.match(/^[A-Z]{2,}$/)) return "acronym";
  if (word.match(/[A-Z][a-z]+[A-Z]/)) return "camelCase";
  if (word.includes("-")) return "hyphenated";
  if (word.match(/^[a-z]+$/)) return "lowercase";
  if (word.match(/^[A-Z][a-z]+$/)) return "properNoun";
  if (word.match(/\d/)) return "alphanumeric";
  return "other";
}

async function createSearchIndex(collectionRef, words) {
  try {
    // Create a search index document for faster lookups
    const searchIndex = {};

    words.forEach((word, index) => {
      const firstLetter = word.charAt(0).toLowerCase();
      if (!searchIndex[firstLetter]) {
        searchIndex[firstLetter] = [];
      }
      searchIndex[firstLetter].push({
        word: word.toLowerCase(),
        original: word,
        id: `word_${index + 1}`.padStart(10, "0"),
      });
    });

    // Sort each letter's words alphabetically
    Object.keys(searchIndex).forEach((letter) => {
      searchIndex[letter].sort((a, b) => a.word.localeCompare(b.word));
    });

    await collectionRef.doc("search-index").set({
      index: searchIndex,
      totalLetters: Object.keys(searchIndex).length,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      description: "Alphabetical index for faster word lookups",
    });

    console.log("✅ Created search index for faster lookups");
  } catch (error) {
    console.log("⚠️  Warning: Could not create search index:", error.message);
  }
}

// Run the script
if (require.main === module) {
  addCSpellWordsToDatabase()
    .then(() => {
      console.log("🏁 Script completed successfully");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Script failed:", error);
      process.exit(1);
    });
}

module.exports = { addCSpellWordsToDatabase };
