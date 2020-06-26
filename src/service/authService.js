import LocalStorageService from './localstorageService'

export default class AuthService {

    static isUsuarioAutenticado(){
        const usuario = LocalStorageService.obterItem('_usuario_logado')
        return usuario && usuario.id
    }

    static removerUsuarioAutenticado(){
        LocalStorageService.removerItem('_usuario_logado')
    }

    static logar(usuario) {
        LocalStorageService.adicionarItem('_usuario_logado', usuario)
    }

    static obterUsuarioAutenticado(){
        return LocalStorageService.obterItem('_usuario_logado')
    }
}