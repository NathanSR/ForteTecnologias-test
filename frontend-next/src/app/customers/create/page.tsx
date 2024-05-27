'use client';

import moment from "moment";
import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import axios from '@/services/axios';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { AxiosError } from "axios";
import InputMask from 'react-input-mask';

export default function CustomerCreate() {
	const router = useRouter();
	const [customer, setCustomer] = useState<Customer>();
	//@ts-ignore
	const onChangeCustomer = (e: ChangeEvent<HTMLInputElement>) => setCustomer({ ...customer, [e.target.name]: e.target.value })


	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		axios.post("/customers", customer)
			.then(() => router.push('/customers'))
			.catch((error: AxiosError) => {
				Swal.fire({
					icon: 'error',
					title: 'Erro!',
					// @ts-ignore
					text: error.response?.data?.message,
				});
			})
	};
	const showModalCEP = () => {
		Swal.fire({
			title: 'Informe seu CEP:',
			input: 'text',
			inputPlaceholder: "00000-000",
			showCancelButton: true,
			confirmButtonText: 'Procurar',
			cancelButtonText: 'Cancelar',
			preConfirm: async (valueCEP) =>
				await axios.get(`https://viacep.com.br/ws/${valueCEP.replace(/\D/g, '')}/json/`)
					//@ts-ignore
					.then((resp) => setCustomer({...customer, address: [`Rua: ${resp.data['logradouro'] || "_"}`, `complemento: ${resp.data['complemento'] || "_"}`, `bairro: ${resp.data['bairro'] || "_"}`, resp.data['localidade'], resp.data['uf'], resp.data['cep']].filter(Boolean).join(', ')}))
					//@ts-ignore
					.catch((error: AxiosError) => { Swal.fire({ icon: 'error', title: 'Erro!', text: error.response?.data?.message, }) })
		})
	}

	return (
		<main className="grid min-h-screen p-4 justify-center place-items-start">
			<Link href="/customers" className="self-end bg-red-600 text-white py-2 px-4 border-2 rounded-xl hover:bg-red-800 -rotate-12 z-10 w-[5rem] translate-y-5 -translate-x-5">Voltar</Link>
			<form onSubmit={e => onSubmit(e)} className="shadow-lg border-2 overflow-hidden border-blue-500 rounded-3xl mx-auto max-w-xl sm:w-[30rem] flex flex-col">
				<header className="px-8 py-4 bg-blue-400 text-white">
					<legend className="text-xl md:text-2xl font-bold">Formulário de Cliente</legend>
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
						<label htmlFor="address" className="block text-sm font-medium text-gray-900 ">
							Endereço
							<button type="button" className="text-xs text-blue-700 underline ml-2" onClick={showModalCEP}>(Pesquisar por CEP)</button>
						</label>
						<input name="address" onChange={onChangeCustomer} value={customer?.address} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Rua Tal, complemento, bairr..." required />
					</div>
				</main>
				<footer className="px-8 py-4 flex justify-center bg-white">
					<button type="submit" className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Cadastrar Cliente</button>
				</footer>
			</form>
		</main>
	);
}
