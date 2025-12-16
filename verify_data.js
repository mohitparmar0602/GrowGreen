async function checkData() {
    try {
        const res = await fetch('http://localhost:5000/api/products');
        const data = await res.json();
        console.log(JSON.stringify(data, null, 2));
    } catch (err) {
        console.error(err.message);
    }
}

checkData();
