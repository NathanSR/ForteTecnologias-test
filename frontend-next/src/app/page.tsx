import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      <h1 className="max-w-xl text-3xl md:text-4xl font-bold text-center truncate text-blue-600 text-">ForteTecnologias</h1>
      <h2 className="max-w-xl text-xl md:text-2xl font-semibold text-center">Gerenciamento de Clientes e Cartões de Créditos</h2>
      <Link href="/customers" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 text-center border border-blue-700 rounded">
            Acessar
      </Link>
      <img className="max-w-md w-full" src="/people_card.svg" alt="Pessoas olhando para cartão de credito" />
    </main>
  );
}
