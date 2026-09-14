"use client"

import { FormEvent, useState } from "react"
import Navbar from "@/components/Navbar"

export default function AdminPage() {
    const [descricao, setDescricao] = useState("")
    const [categoria, setCategoria] = useState("")
    const [preco, setPreco] = useState("")
    const [imagem, setImagem] = useState("")
    const [carregando, setCarregando] = useState(false)

    async function cadastrarLanche(e) {
        e.preventDefault()

        if (!descricao || !categoria || !preco) {
            alert("Preencha todos os campos obrigatórios.")
            return
        }

        try {
            setCarregando(true)

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/produtos`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        descricao,
                        categoria,
                        preco: Number(preco),
                        imagem,
                    }),
                }
            )

            if (!response.ok) {
                throw new Error("Erro ao cadastrar o produto.")
            }

            alert("Produto cadastrado com sucesso!")

            setDescricao("")
            setCategoria("")
            setPreco("")
            setImagem("")
        } catch (error) {
            console.error("Erro:", error)
            alert("Erro ao cadastrar o produto.")
        } finally {
            setCarregando(false)
        }
    }

    return (
        <main className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="p-8">
                <div className="mx-auto max-w-xl rounded-lg bg-white p-8 shadow">
                    <h1 className="mb-6 text-3xl font-bold">
                        Cadastrar Lanche
                    </h1>

                    <form
                        onSubmit={cadastrarLanche}
                        className="space-y-5"
                    >
                        <div>
                            <label
                                htmlFor="descricao"
                                className="mb-1 block font-medium"
                            >
                                Descrição
                            </label>

                            <input
                                id="descricao"
                                type="text"
                                value={descricao}
                                onChange={(e) =>
                                    setDescricao(e.target.value)
                                }
                                placeholder="Ex: X-Bacon com carne e salada"
                                className="w-full rounded border p-3 outline-none focus:border-orange-500"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="categoria"
                                className="mb-1 block font-medium"
                            >
                                Categoria
                            </label>

                            <input
                                id="categoria"
                                type="text"
                                value={categoria}
                                onChange={(e) =>
                                    setCategoria(e.target.value)
                                }
                                placeholder="Ex: Hambúrguer"
                                className="w-full rounded border p-3 outline-none focus:border-orange-500"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="preco"
                                className="mb-1 block font-medium"
                            >
                                Preço
                            </label>

                            <input
                                id="preco"
                                type="number"
                                step="0.01"
                                min="0"
                                value={preco}
                                onChange={(e) =>
                                    setPreco(e.target.value)
                                }
                                placeholder="Ex: 10.00"
                                className="w-full rounded border p-3 outline-none focus:border-orange-500"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="imagem"
                                className="mb-1 block font-medium"
                            >
                                Imagem
                            </label>

                            <input
                                id="imagem"
                                type="url"
                                value={imagem}
                                onChange={(e) =>
                                    setImagem(e.target.value)
                                }
                                placeholder="https://exemplo.com/imagem.jpg"
                                className="w-full rounded border p-3 outline-none focus:border-orange-500"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={carregando}
                            className="w-full cursor-pointer rounded bg-orange-500 py-3 font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {carregando
                                ? "Cadastrando..."
                                : "Cadastrar Lanche"}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    )
}
