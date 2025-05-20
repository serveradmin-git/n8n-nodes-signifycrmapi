import type { ICredentialType, INodeProperties, ICredentialTestRequest, IAuthenticateGeneric } from 'n8n-workflow';

export class SignifyCrmApi implements ICredentialType {

	name = 'signifyCrmApi';
	displayName = 'SignifyCRM API';
	documentationUrl = 'https://support.signifycrm.net/service/api_v1/docs/';

	properties: INodeProperties[] = [
        {
			displayName: 'Site URL',
			name: 'siteUrl',
			type: 'string',
			default: '',
            required: true,
			placeholder: 'https://example.signifycrm.com',
			description:
				'If the domain is https://example.signifycrm.com "example" would have to be entered',
		},
        {
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
            required: true,
			placeholder: '1234567890',
			default: '',
		},
        {
			displayName: 'Username',
			name: 'username',
			type: 'string',
            required: true,
			placeholder: 'Username',
			default: '',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
            required: true,
			typeOptions: { password: true },
			default: '',
		},
	];

    authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			body: {
				'Api-Key': '={{ $credentials.apiKey }}',
			},
		},
	};

    test: ICredentialTestRequest = {
        request: {
            baseURL: '={{$credentials.siteUrl}}',
            url:     '/rest_api/v1/rest/login',
            method:  'POST',
            body: {
                'Api-Key':      '={{$credentials.apiKey}}',
                login_name:     '={{$credentials.username}}',
                login_password: '={{$credentials.password}}',
            },
            json: true,
        },
    };
}
