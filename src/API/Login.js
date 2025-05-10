async function LoginApi(model) {
    const url = (process.env.REACT_APP_API_URL || "http://127.0.0.1:5000") + "/auth/login";

    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(model)
    })

    const json = await response.json();

    if(!response.ok) {
        console.log(json);
        return;
    }

    return json;
}

export default LoginApi;