import React, { useState, useEffect } from 'react';
import { Header } from '../../components/header';
import { collection, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../services/firebaseConnection';
import { FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";

interface Costura {
    id: string;
    name?: string;
    telefone?: string;
    tipo?: string;
    valor?: string;
    observacoes?: string;
    medidas?: {
        cintura?: string;
        quadril?: string;
        busto?: string;
        comprimento?: string;
        costa?: string;
        manga?: string;
    };
    createdAt?: any;
}

const Home = () => {
    const [costuras, setCosturas] = useState<Costura[]>([]);

    useEffect(() => {
        fetchCosturas();
    }, []);

    const fetchCosturas = async () => {
        try {
            // Obter o email do usuário logado do localStorage
            const userEmail = localStorage.getItem('userEmail');
            if (!userEmail) {
                console.error('O email do usuário não está disponível.');
                return;
            }

            // Consultar as costuras do usuário logado, ordenadas por ordem de criação mais recente
            const costurasQuery = query(
                collection(db, 'usuarios', userEmail, 'costuras'),
                orderBy('createdAt', 'desc')
            );

            const costurasSnapshot = await getDocs(costurasQuery);
            const costurasData = costurasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // Definir as costuras no estado
            setCosturas(costurasData);
        } catch (error) {
            console.error('Erro ao obter costuras:', error);
        }
    };


    const deleteCostura = async (costuraId: string) => {
        try {
            // Obtém o email do usuário do localStorage
            const userEmail = localStorage.getItem('userEmail');
    
            // Verifica se o email do usuário está disponível
            if (!userEmail) {
                throw new Error('O email do usuário não está disponível.');
            }
    
            // Obtém a referência do documento da costura a ser excluída
            const costuraDocRef = doc(db, 'usuarios', userEmail, 'costuras', costuraId);
    
            // Exclui o documento do Firestore
            await deleteDoc(costuraDocRef);

            fetchCosturas();

            console.log('Costura excluída com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir costura:', error);
            throw new Error('Ocorreu um erro ao excluir a costura. Por favor, tente novamente.');
        }
    };

    return (
        <div className='flex items-center flex-col min-h-screen pb-7 px-2'>
            <Header />
            <h2 className="my-4 text-white text-2xl font-bold">Costuras do Usuário</h2>
            <ul>
                {costuras.map(costura => (
                    <section className="w-full min-w-80 p-2 bg-white rounded-lg mb-10" key={costura.name}>

                        <div className="w-full flex items-center justify-between">
                            <p className="font-bold mt-1 mb-2 px-2">{costura.name}</p>
                            <div className='flex gap-4'>
                                <Link to={`/dashboard/${costura.id}`}>
                                    <FaEdit size={20} className="text-zinc-700 cursor-pointer" />
                                </Link>
                                <MdDelete onClick={() => deleteCostura(costura.id)} size={20} className="text-zinc-700 cursor-pointer" />
                            </div>
                        </div>
                        <div className="flex flex-col px-2">
                            <span className="text-zinc-700 mb-6">{costura.tipo} | {costura.telefone}</span>
                            <span className="text-zinc-700 mb-6">Cintura: {costura.medidas?.cintura}</span>
                            <span className="text-zinc-700 mb-6">Quadril: {costura.medidas?.quadril}</span>
                            <span className="text-zinc-700 mb-6">Busto: {costura.medidas?.busto}</span>
                            <span className="text-zinc-700 mb-6">Comprimento: {costura.medidas?.comprimento}</span>
                            <span className="text-zinc-700 mb-6">Costa: {costura.medidas?.costa}</span>
                            <span className="text-zinc-700 mb-6">Manga: {costura.medidas?.manga}</span>
                            <strong className="text-black font-medium text-xl">R$ {costura.valor}</strong>
                        </div>

                        <div className="w-full h-px bg-slate-200 my-2"></div>

                        <div className="px-2 pb-2">
                            <span className="text-zinc-700">
                                {costura.observacoes}
                            </span>
                        </div>
                    </section>
                ))}
            </ul>
        </div>
    );
};

export default Home;
