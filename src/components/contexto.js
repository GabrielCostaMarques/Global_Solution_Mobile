import { createContext } from "react";


const contextoInicial ={
cadastrar:(obj)=>{},
remover:(id)=>{},
listar:()=>{},
salvar:(obj)=>{},
cadastrarInfo:()=>{},
carregarInfo:()=>{},
calculaIMC:(altura,peso)=>{},
listaSaude:[],
lista:[],


}
const Contexto= createContext(contextoInicial)

export {Contexto};