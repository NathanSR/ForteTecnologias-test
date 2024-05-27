'use client';

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import axios from '@/services/axios';
import { useParams, useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Cards from 'react-credit-cards-2';
import moment from "moment";
import InputMask from "react-input-mask";

export default function CardEditor() {
    const router = useRouter();
    const { id, idCard } = useParams();
    const [customer, setCustomer] = useState<Customer>();
    const [creditCard, setCreditCard] = useState<Cards>({number: "", expiration_date: moment().format("YYYY-MM"), cvv: "", customer_id: Number(id)});
    
    useEffect(() => { 
        axios.get(`/customers/${id}`).then(resp => setCustomer({ ...resp.data })) 
        axios.get(`/creditcards/${idCard}`).then(resp => setCreditCard({ ...creditCard, ...resp.data })) 
    }, [])

    //@ts-ignore
    const onChangeCard = (e: ChangeEvent<HTMLInputElement>) => setCreditCard({ ...creditCard, [e.target.name]: e.target.value })

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        axios.put(`/creditcards/${idCard}`, creditCard)
            .then(() => router.push(`/customers/${id}`))
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    // @ts-ignore
                    text: error.response?.data?.message,
                });
            })
    };

    return (
        <main className="grid min-h-screen max-w-screen p-4 justify-center place-items-start">
            <Link href={`/customers/${id}`} className="self-end bg-red-600 text-white py-2 px-4 border-2 rounded-xl hover:bg-red-800 -rotate-12 z-10 w-[5rem] translate-y-5 -translate-x-5">Voltar</Link>
            <form onSubmit={e => onSubmit(e)} className="shadow-lg border-2 overflow-hidden border-yellow-500 rounded-3xl mx-auto max-w-xl sm:w-[30rem] flex flex-col">
                <header className="px-8 py-4 bg-yellow-400 text-white">
                    <legend className="text-xl md:text-2xl font-bold">Editar Cartão</legend>
                </header>
                <main className="px-8 py-4 flex flex-col gap-4 bg-white">
                    <div>
                        <Cards
                            number={creditCard.number}
                            expiry={moment(creditCard.expiration_date, "YYYY-MM").format("YY/MM")}
                            cvc={creditCard.cvv}
                            name={customer?.fullName || ""}
                        />
                    </div>
                    <div>
                        <label htmlFor="number" className="block text-sm font-medium text-gray-900 ">Número do Cartão</label>
                        <InputMask mask="9999 9999 9999 9999" onChange={onChangeCard} type="text" name="number" value={creditCard.number} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="1234 5678 9101 1121" required />
                    </div>
                    <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-900 ">CVV</label>
                        <input onChange={onChangeCard} type="text" name="cvv" value={creditCard.cvv} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="1234" required maxLength={4} />
                    </div>
                    <div>
                        <label htmlFor="expiration_date" className="block text-sm font-medium text-gray-900 ">Data de Expiração</label>
                        <input onChange={onChangeCard} type="month" name="expiration_date" value={creditCard.expiration_date} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="1234" required />
                    </div>
                </main>
                <footer className="px-8 py-4 flex justify-center bg-white">
                    <button type="submit" className="text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Atualizar</button>
                </footer>
            </form>
        </main>
    );
}
