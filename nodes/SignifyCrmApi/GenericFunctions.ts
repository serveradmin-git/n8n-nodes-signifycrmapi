import type {
	IExecuteFunctions,
	IHookFunctions,
	IDataObject,
	ILoadOptionsFunctions,
	IHttpRequestMethods,
} from 'n8n-workflow';

// Token cache implementation
interface TokenCache {
    token: string;
    expiresAt: number; // Timestamp in milliseconds when the token expires
}

const tokenCacheMap: Record<string, TokenCache> = {};

// Safety buffer in milliseconds (5 minutes)
const TOKEN_SAFETY_BUFFER_MS = 5 * 60 * 1000;

export async function signifyCrmApiLogin(
	this: IExecuteFunctions | IHookFunctions | ILoadOptionsFunctions,
): Promise<string> {

	const credentials = await this.getCredentials('signifyCrmApi');
	const now = Date.now();
    const userKey = `${credentials.siteUrl}_${credentials.username}`;

	const cached = tokenCacheMap[userKey];
	if (cached && cached.expiresAt > now) {
		return cached.token;
	}

	const response = await this.helpers.httpRequest({
		method: 'POST',
		url: `${credentials.siteUrl}/rest_api/v1/rest/login`,
		body: {
			'Api-Key': credentials.apiKey,
			login_name: credentials.username,
			login_password: credentials.password,
		},
		json: true,
	});

	// Parse the response
	const responseBody = JSON.parse(response.data);

	// Extract token and expiration details
	const token = responseBody.token;
	const expiresAt = (responseBody.token_expires_in * 1000) - TOKEN_SAFETY_BUFFER_MS;
	
	// Cache the token with expiration
	tokenCacheMap[userKey] = { token, expiresAt };

	return token;
}

export async function signifyCrmApiRequest(
	this: IExecuteFunctions | IHookFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
	uri?: string,
) {
    const credentials = await this.getCredentials('signifyCrmApi');
	const token = await signifyCrmApiLogin.call(this);

    const options = {
		method,
		url: `${credentials.siteUrl}/rest_api/v1/rest${endpoint}`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		body,
		qs,
		json: true,
	};

	return this.helpers.requestWithAuthentication.call(
		this,
		'signifyCrmApi',
		options,
	);
}

/**
 * Fetches the current user's ID from the /get_user_id endpoint.
 */
export async function signifyCrmGetUserId(
    this: IExecuteFunctions | IHookFunctions | ILoadOptionsFunctions,
): Promise<string> {
    const credentials = await this.getCredentials('signifyCrmApi');
    const token       = await signifyCrmApiLogin.call(this);
  
    const response = await this.helpers.httpRequest({
      method:  'POST',
      url:     `${credentials.siteUrl}/rest_api/v1/rest/get_user_id`,
      headers: { Authorization: `Bearer ${token}` },
      body:    { 'Api-Key': credentials.apiKey },
      json:    true,
    });
  
    // here response.data is already the plain user ID string
    return response.data as string;
}

// ----------------------------------------
//               helpers
// ----------------------------------------

export const capitalizeInitial = (str: string) => str[0].toUpperCase() + str.slice(1);