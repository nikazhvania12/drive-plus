async function AddTripApi(model) {
    const url = (process.env.REACT_APP_API_URL || "http://127.0.0.1:5000") + "/trips";

    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(model)
    })

    const json = await response.json();

    if(!response.ok) {
        console.log(json);
        return;
    }

    return json;
}

export default AddTripApi;