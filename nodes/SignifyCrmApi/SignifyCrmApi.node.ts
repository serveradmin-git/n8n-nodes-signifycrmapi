import {
	type IExecuteFunctions,
	type IDataObject,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
	NodeConnectionType,
} from 'n8n-workflow';

import {
	getEntryFields,
    getEntriesFields,
    getEntryListFields,
    setEntryFields,
    getModuleFields,
} from './descriptions';
import {
    signifyCrmApiRequest,
} from './GenericFunctions';
import type {
	CamelCaseResource,
} from './types';

export class SignifyCrmApi implements INodeType {
	description: INodeTypeDescription = {
		// Basic node details will go here
        displayName: 'SignifyCRM API',
        name: 'signifyCrmApi',
        icon: 'file:signifycrm.svg',
        group: ['transform'],
        subtitle: '={{$parameter["resource"]}}',
        version: 1,
        description: 'Consume SignifyCRM API',
        defaults: {
            name: 'SignifyCRM API',
        },
        usableAsTool: true,
        inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
        credentials: [
            {
                name: 'signifyCrmApi',
                required: true,
            },
        ],

        // Define the resources and operations
		properties: [
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                noDataExpression: true,
				options: [
					{
						name: 'Get Available Module',
						value: 'getAvailableModules',
					},
					{
						name: 'Get Entry',
						value: 'getEntry',
					},

					{
						name: 'Get Entry List',
						value: 'getEntryList',
					},
					{
						name: 'Get Module Field',
						value: 'getModuleFields',
					},
					{
						name: 'Get User ID',
						value: 'getUserId',
					},
					{
						name: 'Get User Profile',
						value: 'getUserProfile',
					},
					{
						name: 'Set Entry',
						value: 'setEntry',
					},
				],
                default: 'getEntry',
            },

			...getEntryFields,
            ...getEntriesFields,
            ...getEntryListFields,
            ...setEntryFields,
            ...getModuleFields
		]
	};

    methods = {
		loadOptions: {
			// ----------------------------------------
			//               resources
			// ----------------------------------------
			
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as CamelCaseResource;

		let responseData;

		for (let i = 0; i < items.length; i++) {

			try {
				if (resource === 'getEntry') {
					// **********************************************************************
					//                                getEntry
					// **********************************************************************

                    const module_name = this.getNodeParameter('moduleName', i) as string;
					const id = this.getNodeParameter('recordId', i) as string;
					const select_fields = (this.getNodeParameter('selectFields', i) as string)
						.split(',')
						.map((field) => field.trim())
						.filter(Boolean);
                    const linkPairs = this.getNodeParameter('linkNameToFields.linkPair', i, []) as Array<{
                        link_name: string;
                        link_value: string;
                    }>;
                    const link_name_to_fields = linkPairs.map(pair => ({
                        name: pair.link_name,
                        value: pair.link_value
                            .split(',')
                            .map(v => v.trim())
                            .filter(Boolean),
                    }));

					const body: IDataObject = {
						module_name,
						id,
						select_fields,
						link_name_to_fields,
						track_view: this.getNodeParameter('trackView', i) as string,
					};

                    responseData = await signifyCrmApiRequest.call(this, 'POST', '/get_entry', body);
                    responseData = responseData.data;
				} else if (resource === 'getEntries') {
					// **********************************************************************
					//                                getEntries
					// **********************************************************************

                    const module_name = this.getNodeParameter('moduleName', i) as string;

                    const rawIds = this.getNodeParameter('recordIds.idList', i, []) as Array<{ id: string }>;
                    const ids = rawIds.map(item => item.id);

					const select_fields = (this.getNodeParameter('selectFields', i) as string)
						.split(',')
						.map((field) => field.trim())
						.filter(Boolean);

                    const linkPairs = this.getNodeParameter('linkNameToFields.linkPair', i, []) as Array<{
                        link_name: string;
                        link_value: string;
                    }>;
                    const link_name_to_fields = linkPairs.map(pair => ({
                        name: pair.link_name,
                        value: pair.link_value
                            .split(',')
                            .map(v => v.trim())
                            .filter(Boolean),
                    }));

					const body: IDataObject = {
						module_name,
						ids,
						select_fields,
						link_name_to_fields,
						track_view: this.getNodeParameter('trackView', i) as string,
					};

                    responseData = await signifyCrmApiRequest.call(this, 'POST', '/get_entries', body);
                    responseData = responseData.data;
				} else if (resource === 'setEntry') {
					// **********************************************************************
					//                                setEntry
					// **********************************************************************

                    const module_name = this.getNodeParameter('moduleName', i) as string;
                    const nameValuePair = this.getNodeParameter('nameValueList.nameValuePair', i, []) as Array<{
                        name: string;
                        value: string;
                    }>;
                    const name_value_list = nameValuePair.map(pair => ({
                        name: pair.name,
                        value: pair.value, 
                    }));

					const body: IDataObject = {
						module_name,
						name_value_list,
						track_view: this.getNodeParameter('trackView', i) as string,
					};

                    responseData = await signifyCrmApiRequest.call(this, 'POST', '/set_entry', body);
                    responseData = responseData.data;
				} else if (resource === 'getEntryList') {
                    // **********************************************************************
					//                                getEntryList
					// **********************************************************************

                    const module_name = this.getNodeParameter('moduleName', i) as string;
                    const str_query = this.getNodeParameter('strQuery', i) as string;
                    const str_order_by = this.getNodeParameter('strOrderBy', i) as string;
                    const offset = this.getNodeParameter('offset', i) as string;
					const select_fields = (this.getNodeParameter('selectFields', i) as string)
						.split(',')
						.map((field) => field.trim())
						.filter(Boolean);
                    const linkPairs = this.getNodeParameter('linkNameToFields.linkPair', i, []) as Array<{
                        link_name: string;
                        link_value: string;
                    }>;
                    const link_name_to_fields = linkPairs.map(pair => ({
                        name: pair.link_name,
                        value: pair.link_value
                            .split(',')
                            .map(v => v.trim())
                            .filter(Boolean),
                    }));
                    const max_results = this.getNodeParameter('maxResults', i) as string;
                    const deleted = this.getNodeParameter('deletes', i) as string;
                    const favorites = this.getNodeParameter('favorites', i) as string;

					const body: IDataObject = {
                        module_name,
                        str_query,
                        str_order_by,
                        offset,
                        select_fields,
                        link_name_to_fields,
                        max_results,
                        deleted,
                        favorites,
					};

                    responseData = await signifyCrmApiRequest.call(this, 'POST', '/get_entry_list', body);
                    responseData = responseData.data;
                } else if (resource === 'getUserId') {
                    // **********************************************************************
					//                                getUserId
					// **********************************************************************

					const body: IDataObject = {};

                    responseData = await signifyCrmApiRequest.call(this, 'POST', '/get_user_id', body);
                    responseData = responseData.data;
                } else if (resource === 'getUserProfile') {
                    // **********************************************************************
					//                                getUserProfile
					// **********************************************************************

					const body: IDataObject = {};

                    responseData = await signifyCrmApiRequest.call(this, 'POST', '/get_user_profile', body);
                    responseData = responseData.data;
                } else if (resource === 'getAvailableModules') {
                    // **********************************************************************
					//                                getAvailableModules
					// **********************************************************************

					const body: IDataObject = {};

                    responseData = await signifyCrmApiRequest.call(this, 'POST', '/get_available_modules', body);
                    responseData = responseData.data;
                } else if (resource === 'getModuleFields') {
                    // **********************************************************************
					//                                getModuleFields
					// **********************************************************************

                    const module_name = this.getNodeParameter('moduleName', i) as string;
					const body: IDataObject = {
                        module_name,
                    };

                    responseData = await signifyCrmApiRequest.call(this, 'POST', '/get_module_fields', body);
                    responseData = responseData.data;
                }
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ error: error.message, json: {} });
					continue;
				}
				throw error;
			}

			const executionData = this.helpers.constructExecutionMetaData(
				this.helpers.returnJsonArray(responseData as IDataObject),
				{ itemData: { item: i } },
			);
            
			returnData.push(...executionData);
		}

		return [returnData];
	}
}