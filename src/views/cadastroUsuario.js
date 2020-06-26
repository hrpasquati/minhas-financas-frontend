import React from 'react'

import Card from '../components/card'
import FormGroup from '../components/form-group'

import { withRouter} from 'react-router-dom'

import UsuarioService from '../service/usuarioService'
import { mensagemSucesso, mensagemErro } from '../components/toastr'

class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }

    validar() {
        const msg = []

        if (!this.state.nome){
            msg.push('O campo Nome é obrigatório.')
        }

        if(!this.state.senha || !this.state.senhaRepeticao) {
            msg.push('Digite a senha 2x.')
        }else if(this.state.senha !== this.state.senhaRepeticao) {
            msg.push('As senhas não batem.')
        }

        return msg;
    }

    cadastrar = () => {

        const msg = this.validar();
        if (msg && msg.length > 0) {
            msg.forEach((msg, index) => {
                mensagemErro(msg)
            });
            return false;
        }

        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
        }
        this.service.salvar(usuario)
        .then(response => {
            mensagemSucesso('Usuário cadastrado com sucesso! Faça o login para acessar o sistema.')
            this.props.history.push('/login')
        }).catch(error => {
            mensagemErro(error.response);
        })
    }

    cancelar = () => {
        this.props.history.push('/login')
    }

    render() {
        return (

            <Card title='Cadastro de Usuário'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='bs-component'>
                            <FormGroup label='Nome: *' htmlFor='inputNome'>
                                <input type='text'
                                    id='inputNome'
                                    className='form-control'
                                    name='nome'
                                    onChange={e => this.setState({ nome: e.target.value })} />
                            </FormGroup>

                            <FormGroup label='Email: *' htmlFor='inputEmail'>
                                <input type='email'
                                    id='inputEmail'
                                    className='form-control'
                                    nome='email'
                                    onChange={e => this.setState({ email: e.target.value })} />
                            </FormGroup>
                            <FormGroup label='Senha: *' htmlFor='inputSenha'>
                                <input type='password'
                                    id='inputSenha'
                                    className='form-control'
                                    nome='senha'
                                    onChange={e => this.setState({ senha: e.target.value })} />
                            </FormGroup>
                            <FormGroup label='Repita a senha: *' htmlFor='inputRepitaSenha'>
                                <input type='password'
                                    id='inputRepitaSenha'
                                    className='form-control'
                                    nome='senha'
                                    onChange={e => this.setState({ senhaRepeticao: e.target.value })} />
                            </FormGroup>

                            <button onClick={this.cadastrar} type='button' className='btn btn-success'>
                            <i className='pi pi-save'></i>Salvar</button>
                            <button onClick={this.cancelar} type='button' className='btn btn-danger'>
                            <i className='pi pi-times'></i>Cancelar</button>

                        </div>
                    </div>
                </div>
            </Card>

        )
    }
}

export default withRouter (CadastroUsuario)