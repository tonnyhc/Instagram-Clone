const requester = async (url, method, body) => {
    const host = 'http://localhost:8000/api/';

    try{
        const response = await fetch(host + url, {
            method: method,
            headers : {
                'Content-Type': "application/json",
                // 'X-CSRFToken': csrf
            },
            body: JSON.stringify(body)
        });

        if (!response.ok){
            const data = await response.json();
            throw data;
        }

        return response.json();
    } catch(e){
        throw e;
    }
}

export const post = async (url, body) => {
    try{
        const data = await requester(url, 'POST', body);
        return data;
    } catch(e){
        throw e;
    }
}