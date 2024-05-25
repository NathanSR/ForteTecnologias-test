'use client'
import axios from '@/services/axios'
import { EditIcon, PlusIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { MouseEvent, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function CustomerView() {
    const router = useRouter();
    const { id } = useParams();
    const [customer, setCustomer] = useState<Customer>();

    useEffect(() => {
        axios.get(`/customers/${id}`).then(resp => setCustomer({ ...resp.data }))
    }, [])

    const onDeleteCustomer = () => Swal.fire({
        title: 'Quer mesmo deletar?',
        text: "Se você apagá-lo, não poderá mais recuperá-lo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: "Não quero!",
        confirmButtonText: 'Sim, delete isso!'
    }).then((result) => {
        if (result.isConfirmed) axios.delete(`/customers/${id}`)
            .then(()=>router.push("/customers"))
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
                    <ul className='list-none'>
                        <li className='truncate'>
                            <b>Nome: </b>
                            <span>{customer?.fullName}</span>
                        </li>
                        <li>
                            <b>Email: </b>
                            <span>{customer?.email}</span>
                        </li>
                        <li>
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
            <section>
                <header>
                    <Link href={`/customers/${id}/cards/create`} className="shadow-lg border-2 truncate border-gray-300 rounded-full flex items-center justify-center bg-blue-400 text-white hover:bg-blue-500 p-2 md:p-3 gap-2">
                        <PlusIcon size="1.2rem" />
                        <p>Adicionar Cartão</p>
                    </Link>
                </header>
                <main>
                    
                </main>
            </section>
        </main>
    );
}
