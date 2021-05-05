import axios from './base.service';

class AdminService {
  login = (data) => axios.get('/user/login', data)
}

export default AdminService;
