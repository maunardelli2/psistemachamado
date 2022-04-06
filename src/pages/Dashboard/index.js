import './styles.css';
import { useState, useEffect } from "react";

import Header from "../../components/Header";
import Title from '../../components/Title';
import Modal from '../../components/Modal';

import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import firebase from '../../services/firebaseConnection';

const listRef = firebase.firestore().collection('chamados').orderBy('created', 'desc');

function Dashboard() {
    const [chamados, setChamados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);
    const [lastDocs, setLastDocs] = useState();
    const [showPostModal, setShowPostModal] = useState(false);
    const [detail, setDetail] = useState();

    useEffect(() => {

        async function loadChamados() {
            await listRef.limit(5)
            .get()
            .then((snapshot) => {
                updateState(snapshot)
            })
            .catch((err) => {
                console.log(err);
            })
    
            setLoading(false);
        }

        loadChamados();

        return () => {

        }
    }, []);

    async function updateState(snapshot) {
        const isCollectionEmpty = snapshot.size === 0;

        if (!isCollectionEmpty) {
            let lista = [];

            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    assunto: doc.data().assunto,
                    cliente: doc.data().cliente,
                    clienteId: doc.data().clienteId,
                    created: doc.data().created,
                    createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
                    status: doc.data().status,
                    complemento: doc.data().complemento
                })
            })

            const lastDoc = snapshot.docs[snapshot.docs.length - 1]; //ULtimo documento buscado

            //utiliza o que ja tem na variavel chamados e adiciona o que tem na variavel lista
            //Isso se chama de "spread operator"
            setChamados(chamados => [... chamados, ...lista]);
            setLastDocs(lastDoc);
        } else {
            setIsEmpty(true);
        }

        setLoadingMore(false);

    }

    async function handleMore() {
        setLoadingMore(true);

        await listRef.startAfter(lastDocs).limit(5)
        .get()
        .then((snapshot) => {
            updateState(snapshot)
        })
        .catch(() => {

        })
    }

    if (loading) {
        return (
            <div>
                <Header/>
                    
                <div className='content'>
                    <Title name="Atendimentos">
                        <FiMessageSquare size={25}/>
                    </Title>                
                </div>

                <div className='container dashboard'>
                    <span>Buscando chamados...</span>
                </div>

            </div>
        )
    }

    function tooglePostModal(item) {
        setShowPostModal(!showPostModal); //Vai ficar trocando de true para false
        setDetail(item);
    }

    return(
        <div>
            <Header/>
            
            <div className='content'>
                <Title name="Atendimentos">
                    <FiMessageSquare size={25}/>
                </Title>

                {chamados.length === 0 ? (
                    <div className='container dashboard'>
                        <span>Nenhum chamado registrado...</span>

                        <Link to="/new" className='new'>
                            <FiPlus size={25} color="#FFF"/>
                            Novo chamado
                        </Link>
                    </div>
                ) : (
                    <>
                        <Link to="/new" className='new'>
                            <FiPlus size={25} color="#FFF"/>
                            Novo chamado
                        </Link>

                        <table>
                            <thead>
                                <tr>
                                    <th scope='col'>Cliente</th>
                                    <th scope='col'>Assunto</th>
                                    <th scope='col'>Status</th>
                                    <th scope='col'>Cadastrado em</th>
                                    <th scope='col'>#</th>
                                </tr>
                            </thead>
                            <tbody>
                                {chamados.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td data-Label="Cliente">{item.cliente}</td>
                                            <td data-Label="Assunto">{item.assunto}</td>
                                            <td data-Label="Status">
                                                <span className='badge' style={{ backgroundColor: item.status === 'Aberto' ? '#5cb85c' : '#999' }}>{item.status}</span>
                                            </td>
                                            <td data-Label="Cadastrado">{item.createdFormated}</td>
                                            <td data-Label="#">
                                                <button className='action' style={{background: '#3583f6'}} onClick={ () => tooglePostModal(item) } >
                                                    <FiSearch color='#FFF' size={17} />
                                                </button>
                                                <Link className='action' style={{background: '#F6a935'}} to={`/new/${item.id}`}>
                                                    <FiEdit2 color='#FFF' size={17} />
                                                </Link>                                        
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                        { loadingMore && <h3 style={{textAlign: 'center', marginTop: 15}}>Buscando dados...</h3> }          
                        { !loadingMore && !isEmpty && <button className='btn-more' onClick={handleMore}>Buscar mais</button>}

                    </>
                )}
            </div>

            {showPostModal && (
                <Modal conteudo={detail} close={tooglePostModal} />
            )}
        </div>
    )
}

export default Dashboard;