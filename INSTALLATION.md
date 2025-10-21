# Installation & Setup Guide

## Prerequisites

- **Node.js** 16.x or higher
- **npm** or **yarn**
- **Visual Studio Code** 1.75.0 or higher
- **Git** (optional, for cloning)

## Step-by-Step Installation

### Option 1: Development Setup (Recommended for Contributors)

#### 1. Clone or Download
```bash
# Clone the repository (if using Git)
git clone https://github.com/yourusername/zoho-deluge-vscode.git
cd zoho-deluge-vscode

# Or download and extract the ZIP file
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Compile TypeScript
```bash
npm run compile
```

#### 4. Open in VS Code
```bash
code .
```

#### 5. Run Extension
- Press `F5` to launch Extension Development Host
- A new VS Code window opens with the extension loaded

#### 6. Test It!
- Create a new file: `test.deluge`
- Start typing `zoho.` and watch IntelliSense appear!

### Option 2: Install from VSIX (End Users)

#### 1. Package the Extension
```bash
# Install vsce if you haven't already
npm install -g @vscode/vsce

# Package the extension
vsce package
```

This creates a file like `zoho-deluge-1.0.0.vsix`

#### 2. Install in VS Code
1. Open VS Code
2. Go to Extensions view (Ctrl+Shift+X)
3. Click the `...` (More Actions) menu at the top
4. Select "Install from VSIX..."
5. Browse to and select `zoho-deluge-1.0.0.vsix`
6. Reload VS Code when prompted

### Option 3: Install from Marketplace (Once Published)

#### 1. Search in VS Code
1. Open Extensions view (Ctrl+Shift+X)
2. Search for "Zoho Deluge"
3. Click "Install"

#### 2. Or Install via Command Line
```bash
code --install-extension publisher-name.zoho-deluge
```

## Verifying Installation

### 1. Check Extension is Active
- Go to Extensions view (Ctrl+Shift+X)
- Search for "Zoho Deluge"
- Should show as "Installed"

### 2. Test Syntax Highlighting
Create a test file `test.deluge`:
```deluge
// This should have syntax highlighting
response = zoho.crm.getRecords("Leads", 1, 200, {}, "crm_connection");
info response;
```

Colors should appear for:
- Comments (grey/green)
- Keywords (`response`, `info`)
- Strings (`"Leads"`, `"crm_connection"`)
- Numbers (`1`, `200`)
- Functions (`zoho.crm.getRecords`)

### 3. Test IntelliSense
In your `test.deluge` file:
1. Type `zoho.`
2. A popup should appear showing: crm, desk, books, etc.
3. Select `crm` and type `.`
4. Methods should appear: getRecords, createRecord, etc.

### 4. Test Snippets
1. Type `crm-get` and press Tab
2. A code snippet should expand

## Project Structure

After installation, your project should look like:

```
zoho-deluge-vscode/
├── .vscode/              # VS Code settings (auto-generated)
├── node_modules/         # Dependencies
├── out/                  # Compiled JavaScript (after compile)
├── src/
│   └── extension.ts      # Main extension code
├── snippets/
│   └── deluge-snippets.json
├── syntaxes/
│   └── deluge.tmLanguage.json
├── .gitignore
├── .vscodeignore
├── language-configuration.json
├── package.json
├── README.md
├── tsconfig.json
└── QUICKSTART.md
```

## Development Workflow

### Watch Mode (Auto-compile on save)
```bash
npm run watch
```

This watches for changes and recompiles automatically.

### Making Changes

1. **Edit TypeScript** (`src/extension.ts`)
   - Make your changes
   - Save the file
   - Run `npm run compile` or use watch mode

2. **Edit Snippets** (`snippets/deluge-snippets.json`)
   - Make your changes
   - Save the file
   - Reload extension (Ctrl+R in Extension Development Host)

3. **Edit Syntax** (`syntaxes/deluge.tmLanguage.json`)
   - Make your changes
   - Save the file
   - Reload extension (Ctrl+R in Extension Development Host)

### Testing Changes

After making changes:
1. Press `Ctrl+R` in the Extension Development Host window
2. Or close and press `F5` again in the main VS Code window

## Debugging

### Enable Debug Mode
1. Open `src/extension.ts`
2. Add breakpoints by clicking left of line numbers
3. Press `F5` to start debugging
4. Extension Development Host opens in debug mode

### View Debug Console
- In main VS Code window: View → Debug Console
- Shows `console.log()` output from extension

### Common Issues & Solutions

#### Issue: "Cannot find module 'vscode'"
**Solution:**
```bash
npm install @types/vscode
```

#### Issue: Extension not loading
**Solution:**
1. Check VS Code version (Help → About)
2. Ensure it's 1.75.0 or higher
3. Reinstall dependencies: `rm -rf node_modules && npm install`

#### Issue: IntelliSense not working
**Solution:**
1. Check file extension is `.deluge`
2. Reload window: Ctrl+Shift+P → "Reload Window"
3. Check extension is activated in Extensions view

#### Issue: TypeScript compilation errors
**Solution:**
```bash
# Clean and rebuild
rm -rf out/
npm run compile
```

#### Issue: Snippets not appearing
**Solution:**
1. Verify `snippets/deluge-snippets.json` syntax is valid
2. Check language ID in `package.json` matches "deluge"
3. Reload window

## Building for Distribution

### Create VSIX Package
```bash
# Install vsce globally (one time)
npm install -g @vscode/vsce

# Package the extension
vsce package
```

Output: `zoho-deluge-1.0.0.vsix`

### Test VSIX Package
```bash
# Uninstall any existing version first
code --uninstall-extension publisher-name.zoho-deluge

# Install from VSIX
code --install-extension zoho-deluge-1.0.0.vsix
```

## Publishing to VS Code Marketplace

### 1. Create Publisher Account
- Go to https://marketplace.visualstudio.com/manage
- Sign in with Microsoft/GitHub account
- Create a publisher ID

### 2. Get Personal Access Token
- Go to https://dev.azure.com/
- User settings → Personal access tokens
- Create token with "Marketplace (publish)" scope

### 3. Login with vsce
```bash
vsce login your-publisher-name
# Enter your Personal Access Token when prompted
```

### 4. Update package.json
```json
{
  "publisher": "your-publisher-name",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/zoho-deluge-vscode"
  }
}
```

### 5. Publish
```bash
vsce publish
```

Or publish a specific version:
```bash
vsce publish 1.0.1
```

## Updating the Extension

### For Development
```bash
# Pull latest changes (if using Git)
git pull

# Install any new dependencies
npm install

# Recompile
npm run compile

# Test changes
# Press F5
```

### For Published Version
```bash
# Update version in package.json
# Make your changes
# Commit changes

# Publish new version
vsce publish minor  # 1.0.0 -> 1.1.0
# or
vsce publish patch  # 1.0.0 -> 1.0.1
# or
vsce publish major  # 1.0.0 -> 2.0.0
```

## Uninstalling

### From VS Code
1. Open Extensions view (Ctrl+Shift+X)
2. Find "Zoho Deluge"
3. Click "Uninstall"

### From Command Line
```bash
code --uninstall-extension publisher-name.zoho-deluge
```

## Additional Resources

- [VS Code Extension API](https://code.visualstudio.com/api)
- [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [Zoho Deluge Docs](https://www.zoho.com/deluge/help/)

## Getting Help

- **Issues**: Report on GitHub Issues
- **Discussions**: GitHub Discussions
- **Questions**: Stack Overflow (tag: zoho-deluge)

## Next Steps

1. ✅ Complete installation
2. ✅ Test all features
3. ✅ Read QUICKSTART.md
4. ✅ Start coding with Deluge!
5. ✅ Provide feedback

Happy coding! 🚀
