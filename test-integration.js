/**
 * Integration Test Script
 * Tests Frontend ↔ Backend ↔ Firebase connectivity
 */

const { spawn } = require('child_process');
const path = require('path');

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  bold: '\x1b[1m',
  magenta: '\x1b[35m',
};

console.log('\n' + colors.magenta + colors.bold + '='.repeat(70));
console.log('🔗 CRADLE BRIDGE - FULL STACK INTEGRATION TEST');
console.log('='.repeat(70) + colors.reset + '\n');

async function runTest(testPath, testName) {
  return new Promise((resolve, reject) => {
    console.log(colors.blue + `\n${'▸'.repeat(3)} Running ${testName}...\n` + colors.reset);
    
    const testProcess = spawn('node', [testPath], {
      cwd: path.dirname(testPath),
      shell: true,
    });

    let output = '';

    testProcess.stdout.on('data', (data) => {
      output += data.toString();
      process.stdout.write(data);
    });

    testProcess.stderr.on('data', (data) => {
      output += data.toString();
      process.stderr.write(data);
    });

    testProcess.on('close', (code) => {
      if (code === 0) {
        resolve({ success: true, testName, output });
      } else {
        reject({ success: false, testName, output, code });
      }
    });

    testProcess.on('error', (error) => {
      reject({ success: false, testName, error: error.message });
    });
  });
}

async function runAllTests() {
  const results = {
    passed: [],
    failed: [],
  };

  const tests = [
    {
      path: path.join(__dirname, 'frontend', 'test-firebase.js'),
      name: 'Frontend Firebase Connection',
    },
    {
      path: path.join(__dirname, 'backend', 'test-firebase.js'),
      name: 'Backend Firebase Admin SDK',
    },
  ];

  console.log(colors.yellow + '📋 Test Suite:' + colors.reset);
  tests.forEach((test, index) => {
    console.log(`  ${index + 1}. ${test.name}`);
  });
  console.log('');

  for (const test of tests) {
    try {
      const result = await runTest(test.path, test.name);
      results.passed.push(result);
    } catch (error) {
      results.failed.push(error);
    }
  }

  // Print Final Summary
  console.log('\n' + colors.magenta + colors.bold + '='.repeat(70));
  console.log('📊 INTEGRATION TEST SUMMARY');
  console.log('='.repeat(70) + colors.reset + '\n');

  console.log(colors.bold + 'Test Results:' + colors.reset);
  console.log(colors.green + `  ✅ Passed: ${results.passed.length}` + colors.reset);
  if (results.failed.length > 0) {
    console.log(colors.red + `  ❌ Failed: ${results.failed.length}` + colors.reset);
  }
  console.log('');

  if (results.passed.length > 0) {
    console.log(colors.green + '✅ Passed Tests:' + colors.reset);
    results.passed.forEach((result) => {
      console.log(colors.green + `  • ${result.testName}` + colors.reset);
    });
    console.log('');
  }

  if (results.failed.length > 0) {
    console.log(colors.red + '❌ Failed Tests:' + colors.reset);
    results.failed.forEach((result) => {
      console.log(colors.red + `  • ${result.testName}` + colors.reset);
      if (result.error) {
        console.log(colors.red + `    Error: ${result.error}` + colors.reset);
      }
    });
    console.log('');
  }

  // Overall Status
  if (results.failed.length === 0) {
    console.log(colors.green + colors.bold + '🎉 ALL INTEGRATION TESTS PASSED!' + colors.reset);
    console.log(colors.green + '\nYour full stack application is ready:' + colors.reset);
    console.log(colors.green + '  ✓ Frontend can connect to Firebase' + colors.reset);
    console.log(colors.green + '  ✓ Backend is configured and ready' + colors.reset);
    console.log(colors.green + '  ✓ Environment variables are set correctly' + colors.reset);
    console.log('\n' + colors.yellow + '🚀 Next Steps:' + colors.reset);
    console.log('  1. Start backend: cd backend && npm start');
    console.log('  2. Start frontend: cd frontend && npm start');
    console.log('  3. Open browser: http://localhost:3000');
    console.log('  4. Test admin login: http://localhost:3000/admin\n');
  } else {
    console.log(colors.red + colors.bold + '⚠️  SOME TESTS FAILED' + colors.reset);
    console.log(colors.yellow + '\nPlease check the errors above and:' + colors.reset);
    console.log('  1. Verify your .env files are configured correctly');
    console.log('  2. Check Firebase credentials');
    console.log('  3. Ensure all dependencies are installed\n');
  }

  console.log(colors.magenta + colors.bold + '='.repeat(70) + colors.reset + '\n');
  
  process.exit(results.failed.length > 0 ? 1 : 0);
}

// Run all tests
runAllTests().catch((error) => {
  console.error(colors.red + '\n❌ Test suite error:' + colors.reset, error);
  process.exit(1);
});
