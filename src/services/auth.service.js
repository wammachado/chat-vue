import axios from 'axios';
//const API_URL = 'https://script.secretariavirtual.net.br:8888/api/whatsapp/';
const API_URL = ' https://node.secretariavirtual.net.br/api/whatsapp/';
class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'login', {
                email: user.username,
                senha: user.password,
                token: JSON.parse(localStorage.getItem('token')),
            })
            .then(response => {
                if (!response.data.error) {
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                }
                return response.data;
            });
    }
    logout() {
        localStorage.removeItem('user');
    }

}
export default new AuthService();