import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Deluge Assistant extension is now active!');

    // Register completion provider
    const completionProvider = vscode.languages.registerCompletionItemProvider(
        'deluge',
        {
            provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
                const linePrefix = document.lineAt(position).text.substr(0, position.character);

                // Check if we're typing zoho.
                if (linePrefix.endsWith('zoho.')) {
                    return getZohoServiceCompletions();
                }

                // Check if we're typing a service method like zoho.crm.
                const zohoServiceMatch = linePrefix.match(/zoho\.(crm|desk|books|billing|projects|recruit|people|inventory|mail|cliq|sign|writer|workdrive|fsm|analytics|campaigns|commerce|expense|subscriptions|directory|connect|sheet|calendar|bookings|map|salesiq|ai)\.$/);
                if (zohoServiceMatch) {
                    return getServiceMethodCompletions(zohoServiceMatch[1]);
                }

                // Default Deluge keywords and functions
                return getDelugeCompletions();
            }
        },
        '.' // Trigger completion on dot
    );

    // Register hover provider
    const hoverProvider = vscode.languages.registerHoverProvider('deluge', {
        provideHover(document, position) {
            const range = document.getWordRangeAtPosition(position);
            const word = document.getText(range);

            return getHoverDocumentation(word);
        }
    });

    context.subscriptions.push(completionProvider, hoverProvider);
}

function getZohoServiceCompletions(): vscode.CompletionItem[] {
    const services = [
        { name: 'crm', desc: 'Zoho CRM integration tasks' },
        { name: 'desk', desc: 'Zoho Desk integration tasks' },
        { name: 'books', desc: 'Zoho Books integration tasks' },
        { name: 'billing', desc: 'Zoho Billing integration tasks' },
        { name: 'projects', desc: 'Zoho Projects integration tasks' },
        { name: 'recruit', desc: 'Zoho Recruit integration tasks' },
        { name: 'people', desc: 'Zoho People integration tasks' },
        { name: 'inventory', desc: 'Zoho Inventory integration tasks' },
        { name: 'mail', desc: 'Zoho Mail integration tasks' },
        { name: 'cliq', desc: 'Zoho Cliq integration tasks' },
        { name: 'sign', desc: 'Zoho Sign integration tasks' },
        { name: 'writer', desc: 'Zoho Writer integration tasks' },
        { name: 'workdrive', desc: 'Zoho WorkDrive integration tasks' },
        { name: 'fsm', desc: 'Zoho FSM integration tasks' },
        { name: 'ai', desc: 'Zoho AI tasks' }
    ];

    return services.map(service => {
        const item = new vscode.CompletionItem(service.name, vscode.CompletionItemKind.Module);
        item.detail = service.desc;
        return item;
    });
}

function getServiceMethodCompletions(service: string): vscode.CompletionItem[] {
    const methods: { [key: string]: Array<{name: string, params: string, desc: string, returns: string}> } = {
        'crm': [
            { name: 'getRecords', params: '(module_name, page, per_page, query_value, connection)', desc: 'Fetches records from specified CRM module', returns: 'Map' },
            { name: 'getRecordById', params: '(module_name, record_id, connection)', desc: 'Fetches a specific record by ID', returns: 'Map' },
            { name: 'createRecord', params: '(module_name, data_map, connection)', desc: 'Creates a new record', returns: 'Map' },
            { name: 'updateRecord', params: '(module_name, record_id, data_map, connection)', desc: 'Updates an existing record', returns: 'Map' },
            { name: 'searchRecords', params: '(module_name, criteria, connection)', desc: 'Searches records based on criteria', returns: 'List' },
            { name: 'getRelatedRecords', params: '(related_module, parent_module, record_id, connection)', desc: 'Fetches related records', returns: 'List' },
            { name: 'updateRelatedRecord', params: '(module, record_id, parent_module, parent_id, data_map, connection)', desc: 'Updates a related record', returns: 'Map' },
            { name: 'convertLead', params: '(module, record_id, data_map, connection)', desc: 'Converts a lead to contact/deal', returns: 'Map' },
            { name: 'bulkCreate', params: '(module_name, data_list, connection)', desc: 'Creates multiple records', returns: 'List' },
            { name: 'upsert', params: '(module_name, data_map, connection)', desc: 'Insert or update record', returns: 'Map' },
            { name: 'attachFile', params: '(module_name, record_id, file, connection)', desc: 'Attaches file to record', returns: 'Map' }
        ],
        'desk': [
            { name: 'getRecords', params: '(org_id, module_name, from_index, limit, connection)', desc: 'Fetches records from Desk module', returns: 'List' },
            { name: 'getRecordById', params: '(org_id, module_name, record_id, connection)', desc: 'Fetches specific Desk record', returns: 'Map' },
            { name: 'create', params: '(org_id, module_name, data_map, connection)', desc: 'Creates a Desk record', returns: 'Map' },
            { name: 'update', params: '(org_id, module_name, record_id, data_map, connection)', desc: 'Updates a Desk record', returns: 'Map' },
            { name: 'searchRecords', params: '(org_id, module_name, query, from_index, limit, connection)', desc: 'Searches Desk records', returns: 'List' },
            { name: 'getRelatedRecords', params: '(org_id, related_module, parent_module, parent_id, from_index, limit, connection)', desc: 'Fetches related Desk records', returns: 'List' },
            { name: 'createRelatedRecord', params: '(org_id, related_module, parent_module, parent_id, data_map, connection)', desc: 'Creates related Desk record', returns: 'Map' },
            { name: 'updateRelatedRecord', params: '(org_id, related_module, record_id, parent_module, parent_id, data_map, connection)', desc: 'Updates related Desk record', returns: 'Map' },
            { name: 'move', params: '(org_id, ticket_id, department_id, connection)', desc: 'Moves ticket to department', returns: 'Map' },
            { name: 'split', params: '(org_id, ticket_id, thread_id, connection)', desc: 'Splits reply as new ticket', returns: 'Map' },
            { name: 'merge', params: '(org_id, ticket_ids, connection)', desc: 'Merges multiple tickets', returns: 'Map' }
        ],
        'books': [
            { name: 'getOrganizations', params: '(connection)', desc: 'Fetches Zoho Books organizations', returns: 'List' },
            { name: 'getList', params: '(module_name, org_id, per_page, page, connection)', desc: 'Fetches records from module', returns: 'List' },
            { name: 'retrieve', params: '(module_name, org_id, record_id, connection)', desc: 'Fetches specific record', returns: 'Map' },
            { name: 'create', params: '(module_name, org_id, data_map, connection)', desc: 'Creates a Books record', returns: 'Map' },
            { name: 'update', params: '(module_name, org_id, record_id, data_map, connection)', desc: 'Updates a Books record', returns: 'Map' },
            { name: 'markStatus', params: '(module_name, org_id, record_id, status, connection)', desc: 'Changes record status', returns: 'Map' },
            { name: 'getTemplates', params: '(org_id, connection)', desc: 'Fetches invoice templates', returns: 'List' }
        ],
        'billing': [
            { name: 'getOrganizations', params: '(connection)', desc: 'Fetches Billing organizations', returns: 'List' },
            { name: 'getList', params: '(module_name, org_id, per_page, page, connection)', desc: 'Fetches records', returns: 'List' },
            { name: 'retrieve', params: '(module_name, org_id, record_id, connection)', desc: 'Fetches specific record', returns: 'Map' },
            { name: 'create', params: '(module_name, org_id, data_map, connection)', desc: 'Creates a record', returns: 'Map' },
            { name: 'update', params: '(module_name, org_id, record_id, data_map, connection)', desc: 'Updates a record', returns: 'Map' }
        ],
        'projects': [
            { name: 'getRecords', params: '(portal, project_id, module, from_index, limit, connection)', desc: 'Fetches project records', returns: 'List' },
            { name: 'getProjectDetails', params: '(portal, connection)', desc: 'Fetches project details', returns: 'List' },
            { name: 'create', params: '(portal, project_id, module, data_map, connection)', desc: 'Creates project record', returns: 'Map' },
            { name: 'update', params: '(portal, project_id, module, record_id, data_map, connection)', desc: 'Updates project record', returns: 'Map' },
            { name: 'associateLogs', params: '(portal, project_id, module, record_id, log_data, connection)', desc: 'Creates time log', returns: 'Map' },
            { name: 'updateAssociateLogs', params: '(portal, project_id, log_id, module, record_id, log_data, connection)', desc: 'Updates time log', returns: 'Map' },
            { name: 'getPortals', params: '(connection)', desc: 'Fetches project portals', returns: 'List' }
        ],
        'ai': [
            { name: 'translate', params: '(text, target_lang, source_lang)', desc: 'Translates text between languages', returns: 'String' },
            { name: 'extractKeywords', params: '(text)', desc: 'Extracts keywords from text', returns: 'List' },
            { name: 'detectObject', params: '(image_url)', desc: 'Detects objects in image', returns: 'Map' },
            { name: 'detectFace', params: '(image_url)', desc: 'Detects faces in image', returns: 'Map' },
            { name: 'recognizeText', params: '(image_url, model_type, language)', desc: 'Performs OCR on image', returns: 'String' },
            { name: 'analyseSentiment', params: '(text)', desc: 'Analyzes sentiment of text', returns: 'Map' },
            { name: 'predictLanguage', params: '(text)', desc: 'Predicts language of text', returns: 'String' }
        ]
    };

    const serviceMethods = methods[service] || [];

    return serviceMethods.map(method => {
        const item = new vscode.CompletionItem(method.name, vscode.CompletionItemKind.Method);
        item.detail = `${method.returns} ${method.name}${method.params}`;
        item.documentation = new vscode.MarkdownString(
            `**${method.name}**\n\n${method.desc}\n\n` +
            `**Returns:** \`${method.returns}\`\n\n` +
            `**Usage:** \`zoho.${service}.${method.name}${method.params}\``
        );
        item.insertText = new vscode.SnippetString(`${method.name}($1)`);
        return item;
    });
}

function getDelugeCompletions(): vscode.CompletionItem[] {
    const keywords = [
        'if', 'else', 'for', 'while', 'return', 'break', 'continue',
        'try', 'catch', 'throw', 'each', 'in', 'void', 'Map', 'List',
        'Collection', 'info', 'sendmail', 'invokeurl'
    ];

    const functions = [
        'toDate', 'toDateTime', 'toNumber', 'toLong', 'toText', 'toString',
        'equals', 'isNull', 'isEmpty', 'contains', 'trim', 'length'
    ];

    const items: vscode.CompletionItem[] = [];

    keywords.forEach(keyword => {
        const item = new vscode.CompletionItem(keyword, vscode.CompletionItemKind.Keyword);
        items.push(item);
    });

    functions.forEach(func => {
        const item = new vscode.CompletionItem(func, vscode.CompletionItemKind.Function);
        items.push(item);
    });

    return items;
}

function getHoverDocumentation(word: string): vscode.Hover | undefined {
    const docs: { [key: string]: string } = {
        'getRecords': '**getRecords** - Fetches records from a specified module.\n\n**Syntax:** `zoho.crm.getRecords(module_name, page, per_page, query_value, connection)`',
        'createRecord': '**createRecord** - Creates a new record in the specified module.\n\n**Syntax:** `zoho.crm.createRecord(module_name, data_map, connection)`',
        'searchRecords': '**searchRecords** - Searches for records based on criteria.\n\n**Syntax:** `zoho.crm.searchRecords(module_name, criteria, connection)`',
        'info': '**info** - Logs information to the execution log.\n\n**Syntax:** `info message;`',
        'sendmail': '**sendmail** - Sends an email.\n\n**Syntax:** `sendmail [from: ... to: ... subject: ... message: ...]`',
        'invokeurl': '**invokeurl** - Makes HTTP requests to external services.\n\n**Syntax:** `invokeurl [url: ... type: ... parameters: ... connection: ...]`'
    };

    if (docs[word]) {
        return new vscode.Hover(new vscode.MarkdownString(docs[word]));
    }

    return undefined;
}

export function deactivate() {}
