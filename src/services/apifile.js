import axios from "axios";

const api = axios.create({
    //baseURL: "https://script.secretariavirtual.net.br:8888/api/whatsapp",
    baseURL: " https://node.secretariavirtual.net.br/api/whatsapp",
    headers: {
        'sv': 'SV1.0', 'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
    }
});


export default api