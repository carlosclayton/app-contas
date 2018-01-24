const actions = {
    accessToken: { method: 'POST', url: 'http://localhost:8000/api/access_token' }
};
export const Resource = (resource) => resource('http://localhost:8000/api/', {}, actions);