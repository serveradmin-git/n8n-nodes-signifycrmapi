import type { INodeProperties } from 'n8n-workflow';

export const getEntryListFields: INodeProperties[] = [

    {
		displayName: 'Module Name',
		name: 'moduleName',
		type: 'string',
		required: true,
        default: '',
		displayOptions: {
			show: {
				resource: ['getEntryList'],
			},
		},
	},
	{
		displayName: 'Query',
		name: 'strQuery',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['getEntryList'],
			},
		},
	},
    {
		displayName: 'Order By',
		name: 'strOrderBy',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['getEntryList'],
			},
		},
	},
    {
		displayName: 'Offset',
		name: 'offset',
		type: 'string',
		default: '',
        description: 'The record offset from which to start',
		displayOptions: {
			show: {
				resource: ['getEntryList'],
			},
		},
	},
    {
		displayName: 'Select Fields',
		name: 'selectFields',
		type: 'string',
		default: '',
        description: 'Comma-separated list of fields to be returned in the results. Specifying an empty value will return all fields.',
		displayOptions: {
			show: {
				resource: ['getEntryList'],
			},
		},
	},
    {
		displayName: 'Link Name to Fields',
		name: 'linkNameToFields',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
			multipleValueButtonText: 'Add Link Name',
		},
		default: [],
		placeholder: 'Add Link Name to Fields',
		displayOptions: {
			show: {
				resource: ['getEntryList'],
			},
		},
        options: [
            {
              name: 'linkPair',
              displayName: 'Link → Fields',
                values: [
                    {
                        displayName: 'Name',
                        name: 'link_name',
                        type: 'string',
                        default: '',
                        description: 'The relationship name to pull (e.g. email_addresses)',
                    },
                    {
                        displayName: 'Value',
                        name: 'link_value',
                        type: 'string',
                        default: '',
                        description: 'Comma-separated list of fields to return',
                    },
                ],
            },
        ],
	},
    {
		displayName: 'Max Results',
		name: 'maxResults',
		type: 'string',
		default: '',
        description: 'The maximum number of results to return',
		displayOptions: {
			show: {
				resource: ['getEntryList'],
			},
		},
	},
    {
		displayName: 'Deleted',
		name: 'deletes',
		type: 'string',
		default: '',
        description: 'If deleted records should be included in the results',
		displayOptions: {
			show: {
				resource: ['getEntryList'],
			},
		},
	},
    {
		displayName: 'Favorites',
		name: 'favorites',
		type: 'string',
		default: '',
        description: 'If only records marked as favorites should be returned',
		displayOptions: {
			show: {
				resource: ['getEntryList'],
			},
		},
	},
];
