'use client'

import { PlusIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from '@/services/axios';
import moment from "moment";
import { useRouter } from "next/navigation";

export default function Customer() {
	const router = useRouter();
	const [customers, setCustomers] = useState<Customer[]>([]);
	const [filter, setFilter] = useState("");
	useEffect(() => { onSearchByName() }, [])
	const onSearchByName = () => axios.get(`/customers?filter=${filter}`).then((resp) => setCustomers([...resp.data]))
	const goToCustomerView = (id: number) => router.push(`/customers/${id}`)
	return (
		<div className="flex min-h-screen flex-col p-4 gap-4">
			<header className="flex justify-between items-center">
				<p className="font-bold text-2xl">FT-test</p>
				<Link href="/" className="hover:bg-red-400 bg-red-300 text-white text-xs px-3 py-2 rounded-xl">
					Sair
				</Link>
			</header>
			<main className="flex flex-col gap-4 h-full">
				<header className="flex gap-4">
					<Link href="/customers/create" className="shadow-lg border-2 truncate border-gray-300 rounded-full flex items-center justify-center bg-blue-400 text-white hover:bg-blue-500 p-2 md:p-3 gap-2">
						<PlusIcon size="1.2rem" />
						<p className="hidden sm:inline">Novo Cliente</p>
					</Link>
					<form className="shadow-lg flex border-2 border-gray-300 bg-white rounded-full overflow-hidden w-full max-w-xl" onSubmit={e => e.preventDefault()}>
						<input autoComplete="off" className="focus:outline-none pl-4 pr-2 w-full text-sm" type="search" name="filter" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Nome..." />
						<button type="submit" className="bg-blue-400 text-white hover:bg-blue-500 p-2 pr-3 border-l-2" onClick={onSearchByName}>
							<SearchIcon size="1rem" />
						</button>
					</form>
				</header>
				<div className="shadow-lg relative overflow-x-auto rounded-xl md:rounded-3xl">
					<table className="w-full text-sm text-left rtl:text-right">
						<thead className="text-xs text-white uppercase truncate bg-blue-400 border-b-2">
							<tr>
								<th scope="col" className="px-5 py-3">
									Nome Completo
								</th>
								<th scope="col" className="px-5 py-3">
									Email
								</th>
								<th scope="col" className="px-5 py-3">
									Data de Nascimento
								</th>
								<th scope="col" className="px-5 py-3">
									Telefone
								</th>
								<th scope="col" className="px-5 py-3">
									Endereço
								</th>
							</tr>
						</thead>
						<tbody>
							{customers.map(customer =>
								<tr onClick={() => goToCustomerView(customer.id)} className="bg-white border-b truncate hover:bg-sky-100">
									<th scope="row" className="px-5 py-3 font-medium text-gray-600 whitespace-nowrap">
										{customer.fullName}
									</th>
									<td className="px-5 py-3">
										{customer.email}
									</td>
									<td className="px-5 py-3">
										{moment(customer.birthdate).format("DD/MM/YYYY")}
									</td>
									<td className="px-5 py-3">
										{customer.phone}
									</td>
									<td className="px-5 py-3">
										{customer.address}
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
				<div className="pagination"></div>
			</main>
		</div>
	);
}
