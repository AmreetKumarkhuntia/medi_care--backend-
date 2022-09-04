import axios from "axios";

const URL = 'https://us-hospitals.p.rapidapi.com/'


const getData = async () => {
    try {
        const { data } = await axios.get(URL, options);
        return data;
    } catch (error) {
        console.log(error);

    }
}
