/**
 * TypeScript utility to add cSpell words to Firestore database
 * Integrates with existing Firebase configuration
 */

import {
  collection,
  doc,
  setDoc,
  writeBatch,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { getFirebaseDb } from "../firebase/config";
import cspellConfig from "../../../cspell.json";

interface SpellCheckWord {
  word: string;
  originalCase: string;
  length: number;
  category: WordCategory;
  addedAt: Timestamp;
  isActive: boolean;
  type: "custom" | "system";
}

interface SpellCheckMetadata {
  totalWords: number;
  totalIgnoreWords: number;
  lastUpdated: Timestamp;
  version: string;
  language: string;
  source: string;
  description: string;
}

interface SearchIndexEntry {
  word: string;
  original: string;
  id: string;
}

type WordCategory =
  | "acronym"
  | "camelCase"
  | "hyphenated"
  | "lowercase"
  | "properNoun"
  | "alphanumeric"
  | "other";

export class CSpellDatabaseManager {
  private db = getFirebaseDb();
  private collectionName = "spell-check";

  /**
   * Add all cSpell words to Firestore database
   */
  async addWordsToDatabase(): Promise<void> {
    try {
      console.log("🔥 Starting cSpell words upload to Firestore...");

      const words = cspellConfig.words || [];
      const ignoreWords = cspellConfig.ignoreWords || [];

      console.log(
        `📝 Processing ${words.length} words and ${ignoreWords.length} ignore words`
      );

      const spellCheckRef = collection(this.db, this.collectionName);

      // Add metadata
      await this.addMetadata(spellCheckRef, words.length, ignoreWords.length);

      // Add words in batches
      await this.addWordsBatch(spellCheckRef, words);

      // Add ignore words
      if (ignoreWords.length > 0) {
        await this.addIgnoreWords(spellCheckRef, ignoreWords);
      }

      // Create search index
      await this.createSearchIndex(spellCheckRef, words);

      console.log("🎉 Successfully added all cSpell words to Firestore!");
      console.log(
        `📊 Summary: ${words.length} words, ${ignoreWords.length} ignore words`
      );
    } catch (error) {
      console.error("❌ Error adding words to database:", error);
      throw error;
    }
  }

  /**
   * Add metadata document
   */
  private async addMetadata(
    collectionRef: any,
    totalWords: number,
    totalIgnoreWords: number
  ): Promise<void> {
    const metadata: SpellCheckMetadata = {
      totalWords,
      totalIgnoreWords,
      lastUpdated: serverTimestamp() as Timestamp,
      version: cspellConfig.version || "0.2",
      language: cspellConfig.language || "en",
      source: "cspell.json",
      description:
        "Custom dictionary words for MH Construction website spell checking",
    };

    await setDoc(doc(collectionRef, "metadata"), metadata);
    console.log("✅ Added metadata document");
  }

  /**
   * Add words in batches to respect Firestore limits
   */
  private async addWordsBatch(
    collectionRef: any,
    words: string[]
  ): Promise<void> {
    const batchSize = 400; // Under Firestore's 500 document limit
    const wordBatches = this.chunkArray(words, batchSize);

    console.log(`📦 Processing ${wordBatches.length} batches...`);

    for (let batchIndex = 0; batchIndex < wordBatches.length; batchIndex++) {
      const batch = writeBatch(this.db);
      const currentWords = wordBatches[batchIndex];

      currentWords.forEach((word, index) => {
        const docId = `word_${batchIndex * batchSize + index + 1}`.padStart(
          10,
          "0"
        );
        const wordRef = doc(collectionRef, docId);

        const wordData: SpellCheckWord = {
          word: word.toLowerCase(),
          originalCase: word,
          length: word.length,
          category: this.categorizeWord(word),
          addedAt: serverTimestamp() as Timestamp,
          isActive: true,
          type: "custom",
        };

        batch.set(wordRef, wordData);
      });

      await batch.commit();
      console.log(
        `✅ Batch ${batchIndex + 1}/${wordBatches.length} committed (${currentWords.length} words)`
      );
    }
  }

  /**
   * Add ignore words document
   */
  private async addIgnoreWords(
    collectionRef: any,
    ignoreWords: string[]
  ): Promise<void> {
    const ignoreData = {
      words: ignoreWords,
      count: ignoreWords.length,
      lastUpdated: serverTimestamp(),
      description: "Words to ignore during spell checking",
    };

    await setDoc(doc(collectionRef, "ignore-words"), ignoreData);
    console.log(`✅ Added ${ignoreWords.length} ignore words`);
  }

  /**
   * Create search index for faster lookups
   */
  private async createSearchIndex(
    collectionRef: any,
    words: string[]
  ): Promise<void> {
    try {
      const searchIndex: Record<string, SearchIndexEntry[]> = {};

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

      // Sort alphabetically
      Object.keys(searchIndex).forEach((letter) => {
        searchIndex[letter].sort((a, b) => a.word.localeCompare(b.word));
      });

      const indexData = {
        index: searchIndex,
        totalLetters: Object.keys(searchIndex).length,
        createdAt: serverTimestamp(),
        description: "Alphabetical index for faster word lookups",
      };

      await setDoc(doc(collectionRef, "search-index"), indexData);
      console.log("✅ Created search index for faster lookups");
    } catch (error) {
      console.log("⚠️  Warning: Could not create search index:", error);
    }
  }

  /**
   * Categorize word based on patterns
   */
  private categorizeWord(word: string): WordCategory {
    if (word.match(/^[A-Z]{2,}$/)) return "acronym";
    if (word.match(/[A-Z][a-z]+[A-Z]/)) return "camelCase";
    if (word.includes("-")) return "hyphenated";
    if (word.match(/^[a-z]+$/)) return "lowercase";
    if (word.match(/^[A-Z][a-z]+$/)) return "properNoun";
    if (word.match(/\d/)) return "alphanumeric";
    return "other";
  }

  /**
   * Split array into chunks
   */
  private chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  /**
   * Query words from database
   */
  async queryWords(
    letter?: string,
    category?: WordCategory
  ): Promise<SpellCheckWord[]> {
    // Implementation for querying words from database
    // This can be used to retrieve words for spell checking
    console.log(`Querying words: letter=${letter}, category=${category}`);
    return [];
  }

  /**
   * Check if word exists in database
   */
  async wordExists(word: string): Promise<boolean> {
    // Implementation to check if a word exists
    console.log(`Checking if word exists: ${word}`);
    return false;
  }
}

// Export for use in other modules
export const cspellDB = new CSpellDatabaseManager();

// CLI usage
if (require.main === module) {
  cspellDB
    .addWordsToDatabase()
    .then(() => {
      console.log("🏁 TypeScript script completed successfully");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 TypeScript script failed:", error);
      process.exit(1);
    });
}
