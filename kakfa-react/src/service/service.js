import axios from "axios";

const URL = 'http://localhost:8080/kafka';

async function postData(data) {
    try {
        const response = await axios.post(URL, data);
        console.log(response.data);
    } catch (error) {
        console.log("Error has occurred: " + error);
    }
}

export { postData };
