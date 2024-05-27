'use client'
import axios from '@/services/axios'
import { EditIcon, PlusIcon, TrashIcon } from 'lucide-react';
import moment from 'moment';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { MouseEvent, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function CustomerView() {
    const router = useRouter();
    const { id } = useParams();
    const [customer, setCustomer] = useState<Customer>();
    const [creditCards, setCreditCards] = useState<Cards[]>();

    useEffect(() => {
        axios.get(`/customers/${id}`).then(resp => setCustomer({ ...resp.data }))
        axios.get(`/creditcards?customer_id=${id}`).then(resp => setCreditCards([...resp.data]))
    }, [])

    const onDeleteCustomer = () => Swal.fire({
        title: 'Deletar Cliente?',
        text: "Se você apagá-lo, não poderá mais recuperá-lo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: "Não quero!",
        confirmButtonText: 'Sim, delete-o!'
    }).then((result) => {
        if (result.isConfirmed) axios.delete(`/customers/${id}`)
            .then(() => router.push("/customers"))
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    // @ts-ignore
                    text: error.response?.data?.message,
                });
            })
    });

    const onDeleteCreditCard = (card_id: any) => Swal.fire({
        title: 'Deletar Cartão?',
        text: "Se você apagá-lo, não poderá mais recuperá-lo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: "Não quero!",
        confirmButtonText: 'Sim, delete-o!'
    }).then((result) => {
        if (result.isConfirmed) axios.delete(`/creditcards/${card_id}`)
            .then(()=>window.location.reload())
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    // @ts-ignore
                    text: error.response?.data?.message,
                });
            })
    });

    return (
        <main className="p-4 min-h-screen">
            <Link href="/customers" className="bg-red-600 text-white py-2 px-4 border-2 rounded-xl hover:bg-red-800 w-[5rem] self-start">Voltar</Link>
            <div className='mx-auto max-w-3xl flex flex-col sm:flex-row-reverse gap-1 sm:gap-8 items-center justify-center bg-white rounded-3xl p-4 shadow-lg'>
                <main className='sm:w-1/2'>
                    <div className='flex gap-2 mb-2'>
                        <Link href={`/customers/${id}/edit`} className='flex gap-1 bg-amber-400 text-white p-2 rounded-xl hover:bg-amber-600 shadow-md'>
                            <EditIcon />
                            Editar
                        </Link>
                        <button onClick={onDeleteCustomer} className='flex gap-1 bg-red-400 text-white p-2 rounded-xl hover:bg-red-600 shadow-md'>
                            <TrashIcon />
                            Excluir
                        </button>
                    </div>
                    <ul className='list-none overflow-hidden w-64 sm:w-full'>
                        <li className='truncate'>
                            <b>Nome: </b>
                            <span>{customer?.fullName}</span>
                        </li>
                        <li className='truncate'>
                            <b>Email: </b>
                            <span>{customer?.email}</span>
                        </li>
                        <li className='truncate'>
                            <b>Telefone: </b>
                            <span>{customer?.phone}</span>
                        </li>
                        <li>
                            . . .
                        </li>
                    </ul>
                </main>
                <aside>
                    <img className='hidden sm:w-80 sm:inline-block' src="/undraw_man_cards.svg" alt="homem segurando cartões" />
                </aside>
            </div>
            <section className='mx-auto max-w-3xl mt-2'>
                <header>
                    <Link href={`/customers/${id}/cards/create`} className="shadow-lg border-2 truncate border-gray-300 rounded-full flex items-center justify-center bg-blue-400 text-white hover:bg-blue-500 p-2 md:p-3 gap-2">
                        <PlusIcon size="1.2rem" />
                        <p>Adicionar Cartão</p>
                    </Link>
                </header>
                <main className='grid sm:grid-cols-2 gap-2 py-2'>
                    {creditCards?.map(creditCard =>
                        <div className='rounded-xl shadow-md p-4 text-white border-1 border-gray-200 bg-gradient-to-b from-slate-400 to-slate-500 hover:to-slate-700'>
                            <header className='flex gap-1 justify-between mb-4 items-center'>
                                <h1 className='font-bold text-xl'>Cartão {creditCard.id}</h1>
                                <div className='flex'>
                                    <Link href={`/customers/${id}/cards/${creditCard.id}/edit`} className='flex gap-1 bg-amber-400 text-white p-2 rounded-xl hover:bg-amber-600 shadow-md'>
                                        <EditIcon />
                                    </Link>
                                    <button onClick={()=>onDeleteCreditCard(creditCard.id)} className='flex gap-1 bg-red-400 text-white p-2 rounded-xl hover:bg-red-600 shadow-md'>
                                        <TrashIcon />
                                    </button>
                                </div>
                            </header>
                            <p className='flex gap-2'>
                                <b>Número:</b>
                                <span>{creditCard?.number}</span>
                            </p>
                            <p className='flex gap-2'>
                                <b>CVV:</b>
                                <span>{creditCard?.cvv}</span>
                            </p>
                            <p className='flex gap-2'>
                                <b>Expiração:</b>
                                <span>{moment(creditCard.expiration_date).format("MM/YYYY")}</span>
                            </p>
                        </div>
                    )}
                </main>
            </section>
        </main>
    );
}
