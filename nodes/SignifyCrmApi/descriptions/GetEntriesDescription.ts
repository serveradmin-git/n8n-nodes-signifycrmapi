import type { INodeProperties } from 'n8n-workflow';

export const getEntriesFields: INodeProperties[] = [

    {
		displayName: 'Module Name',
		name: 'moduleName',
		type: 'string',
		required: true,
        default: '',
		displayOptions: {
			show: {
				resource: ['getEntries'],
			},
		},
	},
    {
        displayName: 'Record IDs',
        name: 'recordIds',
        type: 'fixedCollection',
        typeOptions: {
            multipleValues: true,
            multipleValueButtonText: 'Add Record ID',
        },
        default: {
            idList: [
                { id: '' },
            ],
        },
        placeholder: 'Add Record ID',
        displayOptions: {
            show: { 
                resource: ['getEntries'] 
            },
        },
        options: [
            {
                name: 'idList',
                displayName: 'Record ID',
                values: [
                    {
                        displayName: 'ID',
                        name: 'id',
                        type: 'string',
                        required: true, 
                        default: '',
                        description: 'The record ID to fetch',
                    },
                ],
            },
        ],
    },
    {
		displayName: 'Select Fields',
		name: 'selectFields',
		type: 'string',
		default: '',
        description: 'Comma-separated list of fields to be returned in the results. Specifying an empty value will return all fields.',
		displayOptions: {
			show: {
				resource: ['getEntries'],
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
				resource: ['getEntries'],
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
		displayName: 'Track View',
		name: 'trackView',
		type: 'string',
		default: '',
        description: 'Flag the record as a recently viewed item',
		displayOptions: {
			show: {
				resource: ['getEntries'],
			},
		},
	},
];
