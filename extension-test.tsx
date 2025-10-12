// ! IMPORTANT: Test file for new VS Code extensions
// ? Question: Is Import Cost showing bundle sizes?
// TODO: Delete this file after testing
// NOTE: Testing Better Comments color coding
// FIXME: This is just a test file
// * Highlight: Extensions working correctly

import React from "react"; // Should show 0KB
import { motion } from "framer-motion"; // Should show ~80KB
import { Button } from "./src/components/ui"; // Should show small size

// Test component
export default function ExtensionTest() {
  return (
    <div>
      {/* Better Comments should color-code the above comments */}
      <h1>Extension Test</h1>
    </div>
  );
}
