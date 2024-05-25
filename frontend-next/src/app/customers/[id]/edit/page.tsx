'use client';

import moment from "moment";
import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from '@/services/axios';
import { useRouter, useParams } from 'next/navigation';
import Swal from 'sweetalert2';
import { AxiosError } from "axios";
import InputMask from 'react-input-mask';

export default function CustomerEdit() {
	const router = useRouter();
	const { id } = useParams();
	const [customer, setCustomer] = useState<Customer>();

	useEffect(() => { axios.get(`/customers/${id}`).then(resp => setCustomer({ ...resp.data })) }, [])

	//@ts-ignore
	const onChangeCustomer = (e: ChangeEvent<HTMLInputElement>) => setCustomer({ ...customer, [e.target.name]: e.target.value })
	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData(e.currentTarget);
		const formValues = Object.fromEntries(formData.entries());

		axios.put(`/customers/${id}`, formValues)
			.then(() => router.push(`/customers/${id}`))
			.catch((error: AxiosError) => {
				Swal.fire({
					icon: 'error',
					title: 'Erro!',
					// @ts-ignore
					text: error.response?.data?.message,
				});
			})
	};

	return (
		<main className="grid min-h-screen p-4 justify-center place-items-start">
			<Link href={`/customers/${id}`} className="self-end bg-red-600 text-white py-2 px-4 border-2 rounded-xl hover:bg-red-800 -rotate-12 z-10 w-[5rem] translate-y-5 -translate-x-5">Voltar</Link>
			<form onSubmit={e => onSubmit(e)} className="shadow-lg border-2 overflow-hidden border-yellow-500 rounded-3xl mx-auto max-w-xl sm:w-[30rem] flex flex-col">
				<header className="px-8 py-4 bg-yellow-400 text-white">
					<legend className="text-xl md:text-2xl font-bold">Editar Cliente</legend>
				</header>
				<main className="px-8 py-4 flex flex-col gap-4 bg-white">
					<div>
						<label htmlFor="firstName" className="block text-sm font-medium text-gray-900 ">Primeiro Nome</label>
						<input type="text" name="firstName" onChange={onChangeCustomer} value={customer?.firstName} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="João" required />
					</div>
					<div>
						<label htmlFor="lastName" className="block text-sm font-medium text-gray-900 ">Último Nome</label>
						<input type="text" name="lastName" onChange={onChangeCustomer} value={customer?.lastName} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Silva" required />
					</div>
					<div>
						<label htmlFor="email" className="block text-sm font-medium text-gray-900 ">Email</label>
						<input type="email" name="email" onChange={onChangeCustomer} value={customer?.email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="nome@email.com" required />
					</div>
					<div>
						<label htmlFor="birthdate" className="block text-sm font-medium text-gray-900 ">Data de Nascimento</label>
						<input type="date" name="birthdate" onChange={onChangeCustomer} value={customer?.birthdate} max={moment().format("YYY-MM-DD").toString()} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
					</div>
					<div>
						<label htmlFor="Telefone" className="block text-sm font-medium text-gray-900 ">Telefone</label>
						<InputMask mask="(99) 99999-9999" type="tel" name="phone" onChange={onChangeCustomer} value={customer?.phone} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="(99) 99999-9999" required />
					</div>
					<div>
						<label htmlFor="address" className="block text-sm font-medium text-gray-900 ">Endereço</label>
						<input type="textarea" name="address" onChange={onChangeCustomer} value={customer?.address} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Rua Tal, nº 8, bairr..." required />
					</div>
				</main>
				<footer className="px-8 py-4 flex justify-center bg-white">
					<button type="submit" className="text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Atualizar</button>
				</footer>
			</form>
		</main>
	);
}
