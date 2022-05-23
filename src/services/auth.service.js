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
    async logout() {
        var user = JSON.parse(localStorage.getItem('user'));
        console.log(user.aten_id);
        return axios
            .post(API_URL + 'logoff', {
                aten_id: user.aten_id,
            })
            .then(response => {
                if (!response.data.error) {
                    localStorage.removeItem('user');

                }
                return response.data;
            }).catch(error => {
                console.log(error);
            });
    }

}
export default new AuthService();