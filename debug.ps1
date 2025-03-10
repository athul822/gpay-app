# Save this as debug.ps1 if using PowerShell
# Bundle the React Native app
Write-Host "Bundling the React Native app..."
react-native bundle --platform android --dev $false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

# Navigate to the android directory
Write-Host "Navigating to the android directory..."
Set-Location -Path "android"

# Assemble the debug APK
Write-Host "Assembling the debug APK..."
./gradlew assembleDebug

Write-Host "Build completed successfully!"

# Navigate back to the root directory
Write-Host "Navigating back to the root directory..."
Set-Location -Path ".."