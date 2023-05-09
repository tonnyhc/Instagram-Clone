const requester = async (url, method, body, token) => {
    const host = 'http://localhost:8000/api/';

    if (!token){
        token = JSON.parse(localStorage.getItem('userData')).token;
    };

    try{
        const response = await fetch(host + url, {
            method: method,
            headers : {
                'Content-Type': "application/json",
                "Authorization": `Token ${token}`
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