import config from '../config';

class APIInvoke {
    async invokeGET(resource, queryParams = []) {
        const queryString = queryParams.reduce((last, q, i) => last + `${i === 0 ? '?' : "&"}${q}`, '');

        const token = localStorage.getItem("token") || "";
        const bearer = token ? `${token}` : "";

        const data = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': bearer
            }
        };

        const url = `${config.api.baseURL}${resource}${queryString}`;

        try {
            const response = await fetch(url, data);
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error in invokeGET:", error);
            return null; // or handle the error as appropriate
        }
    }

    async invokePUT(resource, body) {
        const token = localStorage.getItem("token") || "";
        const bearer = token ? `${token}` : "";

        const data = {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': bearer
            }
        };

        const url = `${config.api.baseURL}${resource}`;

        try {
            const response = await fetch(url, data);
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error in invokePUT:", error);
            return null;
        }
    }

    async invokePOST(resource, body) {
        const token = localStorage.getItem("token") || "";
        const bearer = token ? `${token}` : "";

        const data = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': bearer
            }
        };

        const url = `${config.api.baseURL}${resource}`;

        try {
            const response = await fetch(url, data);
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error in invokePOST:", error);
            return null;
        }
    }

    async invokeDELETE(resource) {
        const token = localStorage.getItem("token") || "";
        const bearer = token ? `${token}` : "";

        const data = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': bearer
            }
        };

        const url = `${config.api.baseURL}${resource}`;

        try {
            const response = await fetch(url, data);
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error in invokeDELETE:", error);
            return null;
        }
    }
}

// eslint-disable-next-line
export default new APIInvoke();