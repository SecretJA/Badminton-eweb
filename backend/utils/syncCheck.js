const User = require('../models/User');
const { encrypt, decrypt } = require('./encryption');

// Check and fix data synchronization issues
const checkAndFixSync = async () => {
  console.log('🔍 Checking data synchronization...');
  
  try {
    // Get all users
    const users = await User.find({});
    let fixedCount = 0;
    let errors = [];

    for (const user of users) {
      let needsUpdate = false;
      const updates = {};

      // Check if email is encrypted
      if (user.email && !user.email.includes(':')) {
        // Email is not encrypted, encrypt it
        updates.email = encrypt(user.email);
        needsUpdate = true;
        console.log(`📧 Encrypting email for user: ${user.name}`);
      }

      // Check if phone is encrypted
      if (user.phone && !user.phone.includes(':')) {
        // Phone is not encrypted, encrypt it
        updates.phone = encrypt(user.phone);
        needsUpdate = true;
        console.log(`📱 Encrypting phone for user: ${user.name}`);
      }

      // Check if address street is encrypted
      if (user.address && user.address.street && !user.address.street.includes(':')) {
        // Address street is not encrypted, encrypt it
        updates['address.street'] = encrypt(user.address.street);
        needsUpdate = true;
        console.log(`🏠 Encrypting address for user: ${user.name}`);
      }

      // Update user if needed
      if (needsUpdate) {
        try {
          await User.findByIdAndUpdate(user._id, updates);
          fixedCount++;
        } catch (error) {
          errors.push(`Failed to update user ${user.name}: ${error.message}`);
        }
      }
    }

    console.log(`✅ Fixed ${fixedCount} users`);
    
    if (errors.length > 0) {
      console.log('❌ Errors encountered:');
      errors.forEach(error => console.log(`  - ${error}`));
    }

    return { fixedCount, errors };
  } catch (error) {
    console.error('❌ Sync check failed:', error);
    throw error;
  }
};

// Validate user data integrity
const validateUserData = async () => {
  console.log('🔍 Validating user data integrity...');
  
  try {
    const users = await User.find({});
    let validCount = 0;
    let invalidCount = 0;
    let issues = [];

    for (const user of users) {
      let isValid = true;
      const userIssues = [];

      // Check if user has required fields
      if (!user.name || !user.email) {
        isValid = false;
        userIssues.push('Missing required fields');
      }

      // Check if email format is valid (after decryption)
      try {
        const decryptedEmail = decrypt(user.email);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(decryptedEmail)) {
          isValid = false;
          userIssues.push('Invalid email format');
        }
      } catch (error) {
        isValid = false;
        userIssues.push('Email decryption failed');
      }

      // Check if phone format is valid (if exists)
      if (user.phone) {
        try {
          const decryptedPhone = decrypt(user.phone);
          const phoneRegex = /^[0-9]{10,11}$/;
          if (!phoneRegex.test(decryptedPhone)) {
            isValid = false;
            userIssues.push('Invalid phone format');
          }
        } catch (error) {
          isValid = false;
          userIssues.push('Phone decryption failed');
        }
      }

      if (isValid) {
        validCount++;
      } else {
        invalidCount++;
        issues.push({
          userId: user._id,
          name: user.name,
          issues: userIssues
        });
      }
    }

    console.log(`✅ Valid users: ${validCount}`);
    console.log(`❌ Invalid users: ${invalidCount}`);
    
    if (issues.length > 0) {
      console.log('Issues found:');
      issues.forEach(issue => {
        console.log(`  - User: ${issue.name} (${issue.userId})`);
        issue.issues.forEach(problem => console.log(`    * ${problem}`));
      });
    }

    return { validCount, invalidCount, issues };
  } catch (error) {
    console.error('❌ Data validation failed:', error);
    throw error;
  }
};

// Check authentication token validity
const checkAuthTokens = async () => {
  console.log('🔍 Checking authentication tokens...');
  
  try {
    const users = await User.find({});
    let activeUsers = 0;
    let inactiveUsers = 0;

    for (const user of users) {
      if (user.isActive) {
        activeUsers++;
      } else {
        inactiveUsers++;
        console.log(`⚠️  Inactive user: ${user.name} (${user._id})`);
      }
    }

    console.log(`✅ Active users: ${activeUsers}`);
    console.log(`❌ Inactive users: ${inactiveUsers}`);

    return { activeUsers, inactiveUsers };
  } catch (error) {
    console.error('❌ Auth token check failed:', error);
    throw error;
  }
};

// Run all checks
const runAllChecks = async () => {
  console.log('🚀 Starting comprehensive system check...\n');
  
  try {
    // Check data synchronization
    const syncResult = await checkAndFixSync();
    console.log('');
    
    // Validate user data
    const validationResult = await validateUserData();
    console.log('');
    
    // Check auth tokens
    const authResult = await checkAuthTokens();
    console.log('');
    
    console.log('📊 Summary:');
    console.log(`  - Fixed users: ${syncResult.fixedCount}`);
    console.log(`  - Valid users: ${validationResult.validCount}`);
    console.log(`  - Invalid users: ${validationResult.invalidCount}`);
    console.log(`  - Active users: ${authResult.activeUsers}`);
    console.log(`  - Inactive users: ${authResult.inactiveUsers}`);
    
    if (syncResult.errors.length > 0 || validationResult.issues.length > 0) {
      console.log('\n⚠️  Issues detected. Please review the logs above.');
      return false;
    } else {
      console.log('\n✅ All checks passed successfully!');
      return true;
    }
  } catch (error) {
    console.error('❌ System check failed:', error);
    return false;
  }
};

module.exports = {
  checkAndFixSync,
  validateUserData,
  checkAuthTokens,
  runAllChecks
}; 