import type { INodeProperties } from 'n8n-workflow';

export const getModuleFields: INodeProperties[] = [

    {
		displayName: 'Module Name',
		name: 'moduleName',
		type: 'string',
		required: true,
        default: '',
		displayOptions: {
			show: {
				resource: ['getModuleFields'],
			},
		},
	}
];
