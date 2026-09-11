"use client"

import { useEffect,useState } from "react"

interface Produto{
    id:number,
    descricao:string,
    categoria:string,
    preco:number,
    imagem:string
}

export default function CardapioAdmin(){

    const [produtos,setProdutos] = useState<Produto[]>([])
    const [carregando,setCarregando] = useState(true)

    async function carregarProdutos() {
        try {
            const response = await fetch("http://localhost:3001/produtos")

            if(!response){
                throw new Error("Erro ao buscar produtos")
            }

            const data = await response.json()
            setProdutos(data)
        } catch (error) {
            console.log(error)
        }
    }

    async function excluirProdutos(id:number) {
        const resultado = await Swal.fire({
            title:"Excluir produto?",
            text:"essa opçao nao sera desfeita",
            icon:"warning",
            showCancelButton:true,
            confirmButtonText
        })
    }


    return(

    )
}
