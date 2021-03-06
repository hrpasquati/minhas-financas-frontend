import ApiService from '../app/apiservice'

class UsuarioService extends ApiService {

    constructor () {
        super('/usuarios')
    }

    autenticar(credenciais) {
        return this.post('/autenticar', credenciais)
    }

    obterSaldoPorUsuario(id){
        return this.get(`/${id}/saldo`)
    }

    salvar(usuario) {
        return this.post('/', usuario)
    }

}

export default UsuarioService