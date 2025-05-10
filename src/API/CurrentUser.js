async function CurrentUser() {
    const url = (process.env.REACT_APP_API_URL || "http://127.0.0.1:5000") + "/auth/currentuser";

    const response = await fetch(url, {
        method: "GET",
        credentials: 'include',
    })

    const json = await response.json();

    if(!response.ok) {
        return null;
    }

    return json;
}

export default CurrentUser;