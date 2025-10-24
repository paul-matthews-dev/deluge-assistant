<div align="center">
  <img src="media/icon.png" alt="Deluge Assistant Logo" width="128" height="128">

  # Deluge Assistant

  **Complete language support and development assistant for Zoho Deluge scripting language**

  [![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/paul-matthews-dev/deluge-assistant)
  [![VS Code](https://img.shields.io/badge/VS%20Code-1.75.0%2B-blue.svg)](https://code.visualstudio.com/)
  [![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
  [![TypeScript](https://img.shields.io/badge/TypeScript-4.9.3+-blue.svg)](https://www.typescriptlang.org/)

</div>

## 🚀 Overview

Complete language support and development assistant for Zoho Deluge scripting language with comprehensive IntelliSense for CRM, Desk, and all Zoho service integrations.

## ✨ Features

### 🎨 Syntax Highlighting
- Full syntax highlighting for Deluge keywords, operators, and data types
- Color coding for strings, numbers, comments, and functions
- Support for `.deluge` and `.ds` file extensions

### 💡 IntelliSense
- **Auto-completion** for all `zoho.*` service integrations
- **Parameter hints** for integration task methods
- **Hover documentation** showing function signatures and descriptions
- Context-aware suggestions based on what you're typing

### 🚀 Supported Zoho Services
- **CRM** - Complete CRUD operations, search, COQL, bulk operations
- **Desk** - Ticket management, search, related records
- **Books/Billing** - Organizations, invoices, customers
- **Projects** - Tasks, time logs, portals
- **Recruit** - Candidate management
- **People** - Employee records
- **Mail** - Email operations
- **Cliq** - Team messaging
- **Writer** - Document merging
- **WorkDrive** - File management
- **Sign** - Document signing
- **AI** - Translation, OCR, sentiment analysis
- And many more...

### 📝 Code Snippets
Over 40 pre-built code snippets for common operations:
- `crm-get` - Fetch CRM records
- `crm-create` - Create CRM record
- `crm-search` - Search with criteria
- `desk-create` - Create Desk ticket
- `sendmail` - Send email
- `invokeurl-get` - HTTP GET request
- `invokeurl-post` - HTTP POST request
- `foreach` - For each loop
- `try` - Try-catch block
- And many more...

## 🎯 Usage

### Basic Example
```deluge
// Fetch leads from CRM
response = zoho.crm.getRecords("Leads", 1, 200, {}, "crm_connection");
info response;

// Create a ticket in Desk
ticketData = Map();
ticketData.put("subject", "New Issue");
ticketData.put("description", "Issue description");
response = zoho.desk.create(org_id, "tickets", ticketData, "desk_connection");
```

### IntelliSense in Action
1. Type `zoho.` to see all available services
2. Select a service (e.g., `crm`)
3. Type `.` after the service to see all available methods
4. Select a method to see parameter hints and documentation

### Using Snippets
1. Start typing a snippet prefix (e.g., `crm-get`)
2. Press `Tab` or `Enter` to expand the snippet
3. Fill in the placeholders with your values

## 📦 Installation

### 🚀 From VS Code Marketplace (Recommended)
*Coming soon - extension will be published to the marketplace*

### 📁 From VSIX File
1. Download the latest `.vsix` file from [Releases](https://github.com/paul-matthews-dev/deluge-assistant/releases)
2. In VS Code, go to Extensions view (`Ctrl+Shift+X`)
3. Click "..." menu → "Install from VSIX"
4. Select the downloaded file

### 🛠️ From Source (Development)
```bash
git clone https://github.com/paul-matthews-dev/deluge-assistant.git
cd deluge-assistant
npm install
npm run compile
# Press F5 in VS Code to launch extension in debug mode
```

## ⚙️ Configuration

Configure the extension in VS Code settings:

```json
{
  "deluge.targetService": "all"  // Options: all, crm, desk, creator, books, projects
}
```

## 📁 File Associations

The extension automatically activates for:
- `.deluge` files
- `.ds` files

## 📚 Integration Task Reference

### CRM
- `getRecords(module, page, per_page, query, connection)`
- `createRecord(module, data_map, connection)`
- `updateRecord(module, record_id, data_map, connection)`
- `searchRecords(module, criteria, connection)`
- `getRelatedRecords(related_module, parent_module, record_id, connection)`
- `convertLead(module, record_id, data_map, connection)`
- `bulkCreate(module, data_list, connection)`

### Desk
- `getRecords(org_id, module, from_index, limit, connection)`
- `create(org_id, module, data_map, connection)`
- `update(org_id, module, record_id, data_map, connection)`
- `searchRecords(org_id, module, query, from_index, limit, connection)`
- `move(org_id, ticket_id, department_id, connection)`
- `merge(org_id, ticket_ids, connection)`

### Books/Billing
- `getOrganizations(connection)`
- `create(module, org_id, data_map, connection)`
- `update(module, org_id, record_id, data_map, connection)`
- `getList(module, org_id, per_page, page, connection)`

### Projects
- `getRecords(portal, project_id, module, from_index, limit, connection)`
- `create(portal, project_id, module, data_map, connection)`
- `associateLogs(portal, project_id, module, record_id, log_data, connection)`

### AI Services
- `translate(text, target_lang, source_lang)`
- `extractKeywords(text)`
- `detectObject(image_url)`
- `recognizeText(image_url, model_type, language)`
- `analyseSentiment(text)`

## 📋 Requirements

- **Visual Studio Code** 1.75.0 or higher
- **TypeScript** 4.9.3 or higher (for development)
- **Node.js** 16.x or higher (for development)

## 🐛 Known Issues

None currently. Please report issues on GitHub.

## 📝 Release Notes

### 1.0.0
- Initial release
- Complete syntax highlighting
- IntelliSense for all Zoho services
- 40+ code snippets
- Hover documentation
- Support for CRM, Desk, Books, Projects, and 15+ other Zoho services

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 🔗 Resources

- [Zoho Deluge Documentation](https://www.zoho.com/deluge/help/)
- [Zoho CRM API](https://www.zoho.com/crm/developer/docs/)
- [Zoho Desk API](https://desk.zoho.com/support/APIDocument.do)

## 📄 License

MIT License - see LICENSE file for details

## 👨‍💻 Author

<div align="center">

**Paul Matthews**

[![GitHub](https://img.shields.io/badge/GitHub-paul--matthews--dev-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/paul-matthews-dev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/-paulmatthews/)

Built with ❤️ for the Zoho developer community

</div>

## 🆘 Support

<div align="center">

[![Issues](https://img.shields.io/badge/Issues-GitHub-red?style=for-the-badge&logo=github&logoColor=white)](https://github.com/paul-matthews-dev/deluge-assistant/issues)
[![Discussions](https://img.shields.io/badge/Discussions-GitHub-green?style=for-the-badge&logo=github&logoColor=white)](https://github.com/paul-matthews-dev/deluge-assistant/discussions)

For issues and feature requests, please use the GitHub issue tracker.

</div>
