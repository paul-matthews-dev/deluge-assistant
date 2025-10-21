# Quick Start Guide - Zoho Deluge Extension

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Compile TypeScript
```bash
npm run compile
```

### 3. Test the Extension
Press `F5` in VS Code to open a new Extension Development Host window.

### 4. Create a Test File
Create a new file with `.deluge` extension and start coding!

## Quick Examples

### Example 1: Fetch CRM Leads
```deluge
// Type 'crm-get' and press Tab
response = zoho.crm.getRecords("Leads", 1, 200, {}, "crm_connection");
info response;
```

### Example 2: Create Desk Ticket
```deluge
// Type 'desk-create' and press Tab
ticketData = Map();
ticketData.put("subject", "Customer Issue");
ticketData.put("description", "Description here");
ticketData.put("contactId", "12345");
ticketData.put("departmentId", "67890");
ticketData.put("priority", "High");

response = zoho.desk.create(org_id, "tickets", ticketData, "desk_connection");
info response;
```

### Example 3: Search CRM Records
```deluge
// Type 'crm-search' and press Tab
criteria = "((Email:equals:test@example.com))";
response = zoho.crm.searchRecords("Contacts", criteria, "crm_connection");

for each record in response
{
    info record.get("Full_Name");
}
```

### Example 4: Use IntelliSense
1. Type `zoho.`
2. See all services appear in IntelliSense
3. Select `crm`
4. Type `.` again
5. See all CRM methods with descriptions
6. Select a method to see parameter hints

### Example 5: Send Email
```deluge
// Type 'sendmail' and press Tab
sendmail
[
    from: "noreply@company.com"
    to: "customer@example.com"
    subject: "Welcome!"
    message: "Thank you for signing up."
]
```

## Testing IntelliSense

### Test CRM Functions
```deluge
// Start typing and watch IntelliSense:
zoho.crm.  // <- IntelliSense shows all CRM methods
```

### Test Desk Functions
```deluge
// Start typing and watch IntelliSense:
zoho.desk.  // <- IntelliSense shows all Desk methods
```

### Test AI Functions
```deluge
// Translate text
translated = zoho.ai.translate("Hello World", "es");
info translated;

// Extract keywords
keywords = zoho.ai.extractKeywords("This is a sample text about machine learning and AI");
info keywords;
```

## Project Structure

```
zoho-deluge-vscode/
├── src/
│   └── extension.ts          # Main extension logic
├── syntaxes/
│   └── deluge.tmLanguage.json # Syntax highlighting
├── snippets/
│   └── deluge-snippets.json   # Code snippets
├── package.json               # Extension manifest
├── tsconfig.json             # TypeScript config
├── language-configuration.json # Language config
└── README.md                 # Documentation
```

## Building VSIX Package

To package the extension for distribution:

```bash
# Install vsce globally
npm install -g @vscode/vsce

# Package the extension
vsce package
```

This creates a `.vsix` file you can install or distribute.

## Publishing to Marketplace

1. Create a publisher account at https://marketplace.visualstudio.com/
2. Get a Personal Access Token
3. Login with vsce:
```bash
vsce login your-publisher-name
```
4. Publish:
```bash
vsce publish
```

## Customization

### Add More Services
Edit `src/extension.ts` and add to the `methods` object:

```typescript
'newservice': [
    {
        name: 'methodName',
        params: '(param1, param2)',
        desc: 'Description',
        returns: 'Map'
    }
]
```

### Add More Snippets
Edit `snippets/deluge-snippets.json`:

```json
{
  "Your Snippet Name": {
    "prefix": "trigger",
    "body": [
      "// Your code here",
      "$1"
    ],
    "description": "Description"
  }
}
```

### Update Syntax Highlighting
Edit `syntaxes/deluge.tmLanguage.json` to add new keywords or patterns.

## Troubleshooting

### Extension Not Loading
- Check VS Code version (must be 1.75.0+)
- Run `npm run compile` to recompile
- Check Developer Tools console for errors (Help → Toggle Developer Tools)

### IntelliSense Not Working
- Make sure file has `.deluge` extension
- Reload VS Code window (Ctrl+Shift+P → "Reload Window")
- Check if extension is activated (it should show in Extensions view)

### Snippets Not Appearing
- Make sure you're in a `.deluge` file
- Try typing the full prefix
- Check `snippets/deluge-snippets.json` for correct syntax

## Next Steps

1. ✅ Test all IntelliSense features
2. ✅ Try different code snippets
3. ✅ Test with your actual Deluge scripts
4. ✅ Customize to your needs
5. ✅ Share feedback!

## Support

- Report issues on GitHub
- Suggest new features
- Contribute improvements

Happy Coding! 🚀
