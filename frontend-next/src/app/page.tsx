import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-24">
      <h1 className="text-4xl font-bold text-center">Gerenciamento de Clientes e Cartões de Créditos</h1>
      <Link href="/customers" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 text-center border border-blue-700 rounded">
            Acessar painel
      </Link>
    </main>
  );
}
