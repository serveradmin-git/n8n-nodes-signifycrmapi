# n8n-nodes-signifycrmapi

This is an n8n community node. It lets you make generic REST API calls to **SignifyCRM** within your n8n workflows.

SignifyCRM is a powerful CRM platform serving APAC businesses since 2006, helping teams automate sales pipelines, manage marketing campaigns, and streamline customer support.

The **SignifyCRM API** node provides access to:

* Available modules
* Single or batch record retrieval
* Record listing/search with filtering and pagination
* Module field metadata
* Current user ID and profile
* Creating or updating records

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)
[Version history](#version-history)
[License](#license)

## Installation

Follow the [community nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/), then install this package:

```bash
npm install n8n-nodes-signifycrm-api
```

## Operations

Select a **Resource** from the dropdown, then fill in its parameters:

| Resource                | Description                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------ |
| **getAvailableModules** | List all modules available in your SignifyCRM instance                                     |
| **getEntry**            | Retrieve a single record by **moduleName** and **recordId**                                |
| **getEntries**          | Retrieve multiple records by **moduleName** and a list of **recordIds**                    |
| **getEntryList**        | Search or list records with **strQuery**, **strOrderBy**, **offset**, **maxResults**, etc. |
| **getModuleFields**     | Fetch field metadata for a given **moduleName**                                            |
| **getUserId**           | Retrieve the current authenticated user’s ID                                               |
| **getUserProfile**      | Retrieve the current authenticated user’s profile                                          |
| **setEntry**            | Create or update any record by supplying **moduleName** and **nameValueList**              |

## Credentials

To connect your workflows to SignifyCRM, you must create a **SignifyCRM API** credential in n8n.

### Prerequisites
- An active SignifyCRM account (contact your administrator if you don’t have one).  
- Your SignifyCRM instance URL (e.g. `https://example.signifycrm.com`).  
- A valid **API Key** issued by your SignifyCRM administrator.  
- Your SignifyCRM **Username** and **Password**.

### Authentication Method
This node uses SignifyCRM’s REST-API login endpoint (`POST /rest_api/v1/rest/login`) to authenticate on every request. Your API key is sent in the request body along with your login credentials.

### How to set up in n8n
1. In n8n, go to **Settings → Credentials**.  
2. Click **New Credential** and choose **SignifyCRM API**.  
3. Enter the following fields:  
   - **Site URL**  
     - The full base URL of your SignifyCRM instance (e.g. `https://example.signifycrm.com`).  
   - **API Key**  
     - Your SignifyCRM API key.  
   - **Username**  
     - Your SignifyCRM username.  
   - **Password**  
     - Your SignifyCRM login password.  
4. Click **Save**.  
5. n8n will automatically send a test request to `/rest_api/v1/rest/login`. If the test succeeds, your credential is ready to use.

For more details on SignifyCRM authentication, refer to the [SignifyCRM API docs](https://support.signifycrm.net/service/api_v1/docs/).

## Compatibility

* Developed and tested on the latest stable n8n release
* Built against SignifyCRM REST API v1

## Usage

If you’re new to n8n, check out the [Try it out guide](https://docs.n8n.io/try-it-out/) first.

1. **Add the node**  
   On your workflow canvas click the “+” button and search for **SignifyCRM**.

2. **Select your credential**  
   In the node’s **Credentials** dropdown, pick the **SignifyCRM API** you created.

3. **Choose a resource & operation**  
   - **Resource**: e.g. Account, Contact, Lead, Opportunity, Case, or Task  
   - **Operation**: e.g. create, get, getAll, update, delete  

4. **Fill in the parameters**  
   - Required fields will be marked in red  
   - You can expand **Additional Fields** to set any optional properties  

5. **Connect to other nodes**  
   - Use an **HTTP Request**, **Set**, or **Function** node before/after to pass data in or handle results  

6. **Execute the workflow**  
   - Click **Execute Node** (or run the whole workflow) to test  
   - Inspect the output in the node’s **Output** panel

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [SignifyCRM API v1 documentation](https://support.signifycrm.net/service/api_v1/docs/)  
* [GitHub repository & README](https://github.com/serveradmin-git/n8n-nodes-signifycrm#readme)  

## Version history

* **1.0.0** (2025-05-20)

  * Initial release: getAvailableModules, getEntry, getEntries, getEntryList, getModuleFields, getUserId, getUserProfile, setEntry

## License

This project is licensed under the [MIT License](LICENSE.md).
