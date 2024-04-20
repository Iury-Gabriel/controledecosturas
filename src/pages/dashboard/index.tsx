import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp, doc } from 'firebase/firestore';
import { db } from '../../services/firebaseConnection';
import { Header } from '../../components/header';

interface Medidas {
    cintura?: string;
    quadril?: string;
    busto?: string;
    comprimento?: string;
    costa?: string;
    manga?: string;
}

const Dashboard = () => {
    const [costuraName, setCosturaName] = useState('');
    const [telefone, setTelefone] = useState('');
    const [tipo, setTipo] = useState('');
    const [medidas, setMedidas] = useState({} as Medidas);
    const [valor, setValor] = useState('');
    const [observacoes, setObservacoes] = useState('');

    const handleCosturaSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Verifica se o nome da costura não está vazio
            if (costuraName.trim() === '' || telefone.trim() === '' || tipo.trim() === '' || valor.trim() === '' || medidas === null) {
                alert('Por favor, preencha as informações');
                return;
            }

            // Obtém o email do usuário do localStorage
            const userEmail = localStorage.getItem('userEmail');

            // Verifica se o email do usuário está disponível
            if (!userEmail) {
                alert('O email do usuário não está disponível.');
                return;
            }

            // Adiciona a costura ao banco de dados do usuário atual
            const userDocRef = doc(db, 'usuarios', userEmail);
            const costurasCollectionRef = collection(userDocRef, 'costuras');

            const costuraData = {
                name: costuraName,
                telefone: telefone,
                tipo: tipo,
                valor: valor,
                observacoes: observacoes,
                medidas: medidas,
                createdAt: serverTimestamp(),
            };

            await addDoc(costurasCollectionRef, costuraData);

            // Limpa o campo de input após a criação da costura
            setCosturaName('');
            setTelefone('');
            setTipo('');
            setMedidas({});
            setValor('');
            setObservacoes('');
            
            alert('Costura criada com sucesso!');
        } catch (error) {
            console.error('Erro ao criar costura:', error);
            alert('Ocorreu um erro ao criar a costura. Por favor, tente novamente.');
        }
    };

    return (
        <div className='flex items-center flex-col min-h-screen pb-7 px-2'>
            <Header />
            <h2 className='text-white text-3xl font-bold my-5'>Criar Nova Costura</h2>

            <div className="w-full max-w-7xl p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2">
                <form className="w-full" onSubmit={handleCosturaSubmit}>
                    <div className="mb-3">
                        <p className="mb-2 text-white font-medium">Nome do Cliente</p>
                        <input
                            type="text"
                            id="costuraName"
                            value={costuraName}
                            onChange={(e) => setCosturaName(e.target.value)}
                            className='w-full border-2 rounded-md h-11 px-2'
                            placeholder='Ex: Geciane'
                        />
                    </div>

                    <div className="mb-3">
                        <p className="mb-2 text-white font-medium">Whatsapp para contato</p>
                        <input
                            type="text"
                            id="costuraName"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                            className='w-full border-2 rounded-md h-11 px-2'
                            placeholder='Ex: (99) 981808216'
                        />
                    </div>

                    <p className="mb-2 text-white font-medium">Tipo De Roupa</p>
                    <select className='w-full border-2 rounded-md h-11 px-2 mb-2' id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                        <option value="">Selecione</option>
                        <option value="Bluza">Bluza</option>
                        <option value="Saia">Saia</option>
                        <option value="Jaleco">Jaleco</option>
                        <option value="Vestido">Vestido</option>
                    </select>

                    {tipo === 'Bluza' && (
                        <div>
                            <div className="flex w-full mb-3 gap-4 flex-row items-center">
                                <div className="w-full">
                                    <p className="mb-2 text-white font-medium">Comprimento</p>
                                    <input
                                        type="text"
                                        id="comprimento"
                                        value={medidas.comprimento}
                                        onChange={(e) => setMedidas({ ...medidas, comprimento: e.target.value })}
                                        className='w-full border-2 rounded-md h-11 px-2'
                                        placeholder='Ex: 40cm'
                                    />
                                </div>

                                <div className="w-full">
                                    <p className="mb-2 text-white font-medium">Busto</p>
                                    <input
                                        type="text"
                                        id="costuraName"
                                        value={medidas.busto}
                                        onChange={(e) => setMedidas({ ...medidas, busto: e.target.value })}
                                        className='w-full border-2 rounded-md h-11 px-2'
                                        placeholder='Ex: 90cm'
                                    />
                                </div>
                            </div>

                            <div className="flex w-full mb-3 gap-4 flex-row items-center">
                                <div className="w-full">
                                    <p className="mb-2 text-white font-medium">Cintura</p>
                                    <input
                                        type="text"
                                        id="costuraName"
                                        value={medidas.cintura}
                                        onChange={(e) => setMedidas({ ...medidas, cintura: e.target.value })}
                                        className='w-full border-2 rounded-md h-11 px-2'
                                        placeholder='Ex: 60cm'
                                    />
                                </div>

                                <div className="w-full">
                                    <p className="mb-2 text-white font-medium">Costa</p>
                                    <input
                                        type="text"
                                        id="costuraName"
                                        value={medidas.costa}
                                        onChange={(e) => setMedidas({ ...medidas, costa: e.target.value })}
                                        className='w-full border-2 rounded-md h-11 px-2'
                                        placeholder='Ex: 60cm'
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {tipo === 'Saia' && (
                        <div>
                            <div className="flex w-full mb-3 gap-4 flex-row items-center">
                                <div className="w-full">
                                    <p className="mb-2 text-white font-medium">Cintura</p>
                                    <input
                                        type="text"
                                        id="comprimento"
                                        value={medidas.cintura}
                                        onChange={(e) => setMedidas({ ...medidas, cintura: e.target.value })}
                                        className='w-full border-2 rounded-md h-11 px-2'
                                        placeholder='Ex: 40cm'
                                    />
                                </div>

                                <div className="w-full">
                                    <p className="mb-2 text-white font-medium">Quadril</p>
                                    <input
                                        type="text"
                                        id="costuraName"
                                        value={medidas.quadril}
                                        onChange={(e) => setMedidas({ ...medidas, quadril: e.target.value })}
                                        className='w-full border-2 rounded-md h-11 px-2'
                                        placeholder='Ex: 90cm'
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <p className="mb-2 text-white font-medium">Comprimento</p>
                                <input
                                    type="text"
                                    id="comprimento"
                                    value={medidas.comprimento}
                                    onChange={(e) => setMedidas({ ...medidas, comprimento: e.target.value })}
                                    className='w-full border-2 rounded-md h-11 px-2'
                                    placeholder='Ex: 40cm'
                                />
                            </div>
                        </div>
                    )}

                    {tipo === 'Jaleco' && (
                        <div>
                            <div className="flex w-full mb-3 gap-4 flex-row items-center">
                                <div className="w-full">
                                    <p className="mb-2 text-white font-medium">Comprimento</p>
                                    <input
                                        type="text"
                                        id="comprimento"
                                        value={medidas.comprimento}
                                        onChange={(e) => setMedidas({ ...medidas, comprimento: e.target.value })}
                                        className='w-full border-2 rounded-md h-11 px-2'
                                        placeholder='Ex: 40cm'
                                    />
                                </div>

                                <div className="w-full">
                                    <p className="mb-2 text-white font-medium">Busto</p>
                                    <input
                                        type="text"
                                        id="costuraName"
                                        value={medidas.busto}
                                        onChange={(e) => setMedidas({ ...medidas, busto: e.target.value })}
                                        className='w-full border-2 rounded-md h-11 px-2'
                                        placeholder='Ex: 90cm'
                                    />
                                </div>
                            </div>

                            <div className="flex w-full mb-3 gap-4 flex-row items-center">
                                <div className="w-full">
                                    <p className="mb-2 text-white font-medium">Cintura</p>
                                    <input
                                        type="text"
                                        id="costuraName"
                                        value={medidas.cintura}
                                        onChange={(e) => setMedidas({ ...medidas, cintura: e.target.value })}
                                        className='w-full border-2 rounded-md h-11 px-2'
                                        placeholder='Ex: 60cm'
                                    />
                                </div>

                                <div className="w-full">
                                    <p className="mb-2 text-white font-medium">Costa</p>
                                    <input
                                        type="text"
                                        id="costuraName"
                                        value={medidas.costa}
                                        onChange={(e) => setMedidas({ ...medidas, costa: e.target.value })}
                                        className='w-full border-2 rounded-md h-11 px-2'
                                        placeholder='Ex: 60cm'
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <p className="mb-2 text-white font-medium">Manga</p>
                                <input
                                    type="text"
                                    id="comprimento"
                                    value={medidas.manga}
                                    onChange={(e) => setMedidas({ ...medidas, manga: e.target.value })}
                                    className='w-full border-2 rounded-md h-11 px-2'
                                    placeholder='Ex: 40cm'
                                />
                            </div>
                        </div>
                    )}

                    {tipo === 'Vestido' && (
                        <div>
                            <div className="flex w-full mb-3 gap-4 flex-row items-center">
                                <div className="w-full">
                                    <p className="mb-2 text-white font-medium">Comprimento</p>
                                    <input
                                        type="text"
                                        id="comprimento"
                                        value={medidas.comprimento}
                                        onChange={(e) => setMedidas({ ...medidas, comprimento: e.target.value })}
                                        className='w-full border-2 rounded-md h-11 px-2'
                                        placeholder='Ex: 40cm'
                                    />
                                </div>

                                <div className="w-full">
                                    <p className="mb-2 text-white font-medium">Busto</p>
                                    <input
                                        type="text"
                                        id="costuraName"
                                        value={medidas.busto}
                                        onChange={(e) => setMedidas({ ...medidas, busto: e.target.value })}
                                        className='w-full border-2 rounded-md h-11 px-2'
                                        placeholder='Ex: 90cm'
                                    />
                                </div>
                            </div>

                            <div className="flex w-full mb-3 gap-4 flex-row items-center">
                                <div className="w-full">
                                    <p className="mb-2 text-white font-medium">Cintura</p>
                                    <input
                                        type="text"
                                        id="costuraName"
                                        value={medidas.cintura}
                                        onChange={(e) => setMedidas({ ...medidas, cintura: e.target.value })}
                                        className='w-full border-2 rounded-md h-11 px-2'
                                        placeholder='Ex: 60cm'
                                    />
                                </div>

                                <div className="w-full">
                                    <p className="mb-2 text-white font-medium">Costa</p>
                                    <input
                                        type="text"
                                        id="costuraName"
                                        value={medidas.costa}
                                        onChange={(e) => setMedidas({ ...medidas, costa: e.target.value })}
                                        className='w-full border-2 rounded-md h-11 px-2'
                                        placeholder='Ex: 60cm'
                                    />
                                </div>
                            </div>

                            <div className="flex w-full mb-3 gap-4 flex-row items-center">
                                <div className="w-full">
                                    <p className="mb-2 text-white font-medium">Manga</p>
                                    <input
                                        type="text"
                                        id="costuraName"
                                        value={medidas.manga}
                                        onChange={(e) => setMedidas({ ...medidas, manga: e.target.value })}
                                        className='w-full border-2 rounded-md h-11 px-2'
                                        placeholder='Ex: 40cm'
                                    />
                                </div>

                                <div className="w-full">
                                    <p className="mb-2 text-white font-medium">Quadril</p>
                                    <input
                                        type="text"
                                        id="costuraName"
                                        value={medidas.quadril}
                                        onChange={(e) => setMedidas({ ...medidas, quadril: e.target.value })}
                                        className='w-full border-2 rounded-md h-11 px-2'
                                        placeholder='Ex: 90cm'
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mb-3">
                        <p className="mb-2 text-white font-medium">Preço</p>
                        <input
                            type="text"
                            id="costuraName"
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                            className='w-full border-2 rounded-md h-11 px-2'
                            placeholder='R$ 0,00'
                        />
                    </div>

                    <div className="mb-3">
                        <p className="mb-2 text-white font-medium">Descrição</p>
                        <textarea
                            className="border-2 w-full rounded-md h-24 px-2"
                            name="description"
                            id="description"
                            placeholder="Observações: "
                            value={observacoes}
                            onChange={(e) => setObservacoes(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="rounded-md bg-zinc-900 text-white font-medium w-full h-10">
                        Cadastrar
                    </button>

                </form>
            </div>
        </div>
    );
};

export default Dashboard;
