import axios from 'axios';

const API = {
    postRegister: async register => {
        try {
            return await axios.post('/register', { register });
        } catch (err) {
            return err;
        }
    },
    postLogin: async login => {
        try {
            return await axios.post('/login', { login });
        } catch (err) {
            return err;
        }
    },
    postQuestion: async (questInfo, jwt) => {
        try {
            return await axios.post('/question', questInfo, {
                headers: {
                    authorization: jwt
                }
            });
        } catch (err) {
            console.log(err);
        }
    },
    getQuestions: async jwt => {
        try {
            return await axios.get('/question', {
                headers: {
                    authorization: jwt
                }
            })
        } catch (err) {
            console.log(err);
        }
    },
    deleteQuestion: async (id, jwt) => {
        try {
            return axios.delete(`/question/${id}`, {
                headers: {
                    authorization: jwt
                }
            })
        } catch (err) {
            console.log(err);
        }
    }
};

export default API;