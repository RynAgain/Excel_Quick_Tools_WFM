// Test script to verify Excel serial date detection fix
// This tests the formatDateYMD function with various Excel serial dates

// Extract the formatDateYMD function from splitToUpload.js for testing
function formatDateYMD(val) {
  if (val === null || val === undefined || String(val).trim() === "") return "";
  let str = String(val).trim();

  // Excel serial date (days since 1899-12-30)
  // DEBUG: Log potential Excel serial dates for diagnosis
  if (!isNaN(str)) {
    const numVal = Number(str);
    if (numVal > 1 && numVal < 3000000) { // Broad range for logging
      console.log(`[DEBUG] Potential Excel serial date detected: ${str} (${numVal})`);
      if (numVal > 2958465) {
        console.log(`[DEBUG] Excel serial date too large (> 2958465): ${numVal} - would be REJECTED by current logic`);
      } else if (numVal < 1) {
        console.log(`[DEBUG] Excel serial date too small (< 1): ${numVal} - would be REJECTED by current logic`);
      } else {
        console.log(`[DEBUG] Excel serial date in valid range (1-2958465): ${numVal} - would be ACCEPTED`);
      }
    }
  }
  
  if (!isNaN(str) && Number(str) >= 1 && Number(str) <= 2958465) {
    console.log(`[DEBUG] Processing Excel serial date: ${str}`);
    // Excel's day 1 is 1899-12-31, but JS Date epoch is 1970-01-01
    // Excel's 0 is 1899-12-30 (due to Lotus 1-2-3 bug)
    let base = new Date(Date.UTC(1899, 11, 30));
    let dt = new Date(base.getTime() + Number(str) * 86400000);
    if (!isNaN(dt)) {
      const result = dt.toISOString().slice(0, 10);
      console.log(`[DEBUG] Excel serial date ${str} converted to: ${result}`);
      return result;
    }
  }

  // Already in YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;

  // UNIX timestamp (seconds or ms)
  if (/^\d{10}$/.test(str)) {
    // 10 digits: seconds
    let dt = new Date(Number(str) * 1000);
    if (!isNaN(dt)) return dt.toISOString().slice(0, 10);
  }
  if (/^\d{13}$/.test(str)) {
    // 13 digits: ms
    let dt = new Date(Number(str));
    if (!isNaN(dt)) return dt.toISOString().slice(0, 10);
  }

  // MM-DD-YYYY or MM/DD/YYYY
  let mdy = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (mdy) {
    let [_, mm, dd, yyyy] = mdy;
    let dt = new Date(`${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`);
    if (!isNaN(dt)) return dt.toISOString().slice(0, 10);
  }

  // DD-MM-YYYY or DD/MM/YYYY
  let dmy = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (dmy) {
    let [_, dd, mm, yyyy] = dmy;
    // If MM > 12, assume DD-MM-YYYY
    if (Number(mm) > 12) {
      let dt = new Date(`${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`);
      if (!isNaN(dt)) return dt.toISOString().slice(0, 10);
    }
  }

  // YYYY/MM/DD
  let ymd = str.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/);
  if (ymd) {
    let [_, yyyy, mm, dd] = ymd;
    let dt = new Date(`${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`);
    if (!isNaN(dt)) return dt.toISOString().slice(0, 10);
  }

  // Try Date.parse fallback
  let parsed = Date.parse(str);
  if (!isNaN(parsed)) {
    let dt = new Date(parsed);
    return dt.toISOString().slice(0, 10);
  }
  return str; // fallback: return as-is
}

// Test cases for Excel serial dates
console.log("=== Testing Excel Serial Date Detection Fix ===\n");

const testCases = [
  // Test cases that were previously rejected (> 60000)
  { serial: "73050", expected: "2100-01-01", description: "January 1, 2100 (large date that was previously rejected)" },
  { serial: "65000", expected: "2077-11-18", description: "Date beyond old 60000 limit" },
  { serial: "80000", expected: "2119-01-25", description: "Very large Excel serial date" },
  
  // Test cases that were previously accepted (20000-60000 range)
  { serial: "45658", expected: "2025-01-01", description: "January 1, 2025 (modern date)" },
  { serial: "36526", expected: "2000-01-01", description: "January 1, 2000 (Y2K)" },
  { serial: "25569", expected: "1970-01-01", description: "Unix epoch start" },
  
  // Test cases that were previously rejected (< 20000)
  { serial: "1", expected: "1900-01-01", description: "January 1, 1900 (Excel serial date 1)" },
  { serial: "18264", expected: "1950-01-01", description: "January 1, 1950 (historical date)" },
  { serial: "10000", expected: "1927-05-18", description: "Mid-range historical date" },
  
  // Edge cases
  { serial: "2958465", expected: "9999-12-31", description: "Maximum Excel date (Dec 31, 9999)" },
  { serial: "0.5", expected: "1899-12-30", description: "Fractional serial date" },
  
  // Invalid cases (should not be processed as Excel dates)
  { serial: "2958466", expected: "2958466", description: "Beyond Excel maximum (should not convert)" },
  { serial: "0", expected: "0", description: "Zero (should not convert)" },
  { serial: "-1", expected: "-1", description: "Negative (should not convert)" }
];

testCases.forEach((testCase, index) => {
  console.log(`\nTest ${index + 1}: ${testCase.description}`);
  console.log(`Input: ${testCase.serial}`);
  const result = formatDateYMD(testCase.serial);
  console.log(`Output: ${result}`);
  console.log(`Expected: ${testCase.expected}`);
  console.log(`Status: ${result === testCase.expected ? "✅ PASS" : "❌ FAIL"}`);
  console.log("-".repeat(60));
});

console.log("\n=== Test Summary ===");
console.log("The fix should now properly detect and convert Excel serial dates");
console.log("in the full range from 1 (Jan 1, 1900) to 2,958,465 (Dec 31, 9999)");