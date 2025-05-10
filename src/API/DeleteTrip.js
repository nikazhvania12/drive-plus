async function DeleteTripApi(id) {
    const url = (process.env.REACT_APP_API_URL || "http://127.0.0.1:5000") + `/trips/${id}`;

    const response = await fetch(url, {
        method: "DELETE",
        credentials: 'include'
    })

    const json = await response.json();

    if(!response.ok) {
        console.log(json);
        return;
    }

    return json;
}

export default DeleteTripApi;