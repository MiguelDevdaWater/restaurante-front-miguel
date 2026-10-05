"use client"

import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"
import type { FormEvent } from "react"
import Swal from "sweetalert2"

export default function Cadastro(){
  const [nome,setNome] = useState("")
  const [senha,setSenha] = useState("")
  const [email,setEmail] = useState("")
  const router = useRouter()
    

    async function cadastrar(event: FormEvent<HTMLFormElement>){
      event.preventDefault()

      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`,
          {
            nome,
            email,
            senha
          }

        )

        if(!nome || !email || !senha){
          Swal.fire({
            title:"Atenção!",
            text:"Preencha todos os campos",
            icon:"warning"
          })
        }

        console.log("Cadastro realizado com sucesso!")
        console.log(response.data)

        router.push("/login")
      } catch (error) {
        console.log(error)
        alert("Falha ao cadastrar")
      }
    }
  return(

    <div className="flex items-center justify-center">

        <div className="grid grid-cols-1">
          <form onSubmit={cadastrar} className="flex flex-col gap-3">
          <label>Nome</label>
          <input type="text" 
          onChange={(e)=>{
            setNome(e.target.value)
          }}
          className="border border-white rounded"
          />

          <label>E-mail</label>
          <input type="text" 
          onChange={(e)=>{
            setEmail(e.target.value)
          }}
          />

          <label>Senha</label>
          <input type="password" 
          onChange={(e)=>{
            setSenha(e.target.value)
          }}
          />

          <button type="submit" className="bg-lime-300 p-3 text-white rounded hover:bg-lime-400 hover:cursor-pointer">Cadastrar</button>

        </form>
      </div>
      </div>

      
    
  )
  
}
