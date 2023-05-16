import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const CepForm = () => {

    const [estados, setEstados] = useState([]);
    const [endereco, setEnderecos] = useState({});

    const buscarEstados = () => {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(function (response) {
                // handle success

                let arrayEstados = response.data.map((estado, index) =>
                    <option key={index} value={estado.sigla}>{estado.nome}</option>
                );
                setEstados(arrayEstados);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    };

    const buscarPorCep = (e) => {
        let cep = e.target.value
        axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            .then(function (response) {
                // handle success

                console.log(response.data)

                setEnderecos({...endereco,
                     logradouro: response.data.logradouro,
                     bairro: response.data.bairro,
                     localidade:response.data.localidade
                })

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }


    useEffect(() => {
        buscarEstados()
    }, [])

    return (
        <div className='container'>
            <h1>Buscar CEP</h1>
            <hr />

            <form className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="cep" className="form-label">CEP</label>
                    <input type="text" className="form-control" id="cep" onBlur={buscarPorCep} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="lografouro" className="form-label">Endereço</label>
                    <input type="text" className="form-control" id="logradouro" value={endereco.logradouro || ''} />
                </div>
                <div className="col-12">
                    <label htmlFor="complemento" className="form-label">Complemento</label>
                    <input type="text" className="form-control" id="complemento" placeholder="Complemento" value={endereco.complemento || ''} />
                </div>
                <div className="col-12">
                    <label htmlFor="inputAddress2" className="form-label"><form className="row g-3">
                        <div className="col-12">
                            <label htmlFor="bairro" className="form-label">Bairro</label>
                            <input type="text" className="form-control" id="bairro" placeholder="Bairro" value={endereco.bairro || ''} />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="estado" className="form-label">Estado </label>
                            <select id="estado" className="form-select">
                                <option selected>Selecione...   </option>
                                {estados}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="cidade" className="form-label">Cidade </label>
                            <select id="cidade" className="form-select">
                                <option selected>Selecione...   </option>
                            </select>
                        </div>

                        <div className="col-12">
                            <button type="submit" className="btn btn-primary" >Sign in</button>
                        </div>
                    </form>
                    </label>
                </div>
            </form>
        </div>
    )
}
