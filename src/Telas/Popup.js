import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';

import IconFechar from '../../assets/iconRemove.png'
import axios from 'axios';
import {carregarInfo} from './Saude'

const apiForms = axios.create({baseURL:"https://globalteste-5ed37-default-rtdb.firebaseio.com"})

const PopModal = ({ aberto, fechado }) => {
    const [nomeSaude, setNomeSaude]=useState("")
    const [idadeSaude, setIdadeSaude]=useState(null)
    const [pesoSaude, setPesoSaude]=useState(null)
    const [tempoSono, setTempoSono]=useState("")
    

    const objSaude={nomeSaude,idadeSaude,pesoSaude,tempoSono}

    const cadastrarInfo =()=>{
        apiForms
        .post("/dadosSaude.json",objSaude)
        .then(()=>{
            cadastrarInfo()
            fechado()
        }).catch((err)=>{alert("Erro ao cadastrar"+err)})
    }    

    return (
        <Modal
            visible={aberto}
            transparent={true}
            onBackdropPress={fechado}
            onBackButtonPress={fechado}
            animationType="slide"

        >
            <View style={{ flex: 1 }}>
                    <TouchableOpacity style={styles.iconFechar} onPress={fechado}>
                    <Image source={IconFechar}  />
                    </TouchableOpacity>
                
                <View style={styles.container}>
                    <Text style={styles.titleForms}>Formulário de Saúde</Text>
                    <TextInput style={styles.inputForms} placeholder='Nome' value={nomeSaude} onChangeText={setNomeSaude}/>
                    <TextInput style={styles.inputForms} placeholder='Idade' value={idadeSaude} onChangeText={setIdadeSaude}/>
                    <TextInput style={styles.inputForms} placeholder='Peso' value={pesoSaude} onChangeText={setPesoSaude}/>
                    <TextInput style={styles.inputForms} placeholder='Tempo de Sono' value={tempoSono} onChangeText={setTempoSono}/>
                    <TouchableOpacity style={styles.buttonForms} onPress={cadastrarInfo}>
                        <Text style={styles.titleButtonForms}>Concluir</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#c5c9d1",

        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        paddingBottom: 10
    },

    iconFechar: {
        position: "absolute",
        left: 320,
        top: 10,
        zIndex: 1,
        width:40,
        height:40

    },

    titleForms: {
        fontSize: 24,
        fontWeight: "bold",
        textTransform: "uppercase",
        position: "relative",
        bottom: 40,
    },
    inputForms: {
        paddingHorizontal: 30,
        paddingVertical: 15,
        backgroundColor: "#fff",
        borderRadius: 10,
        margin: 19,
        width: "90%",
        textAlign: "center",
        opacity: 0.5
    },

    buttonForms: {
        paddingHorizontal: 50,
        paddingVertical: 20,
        marginTop: 30,
        backgroundColor: "#2C6FD1",
        borderRadius: 20
    },

    titleButtonForms: {
        fontSize: 24,
        fontWeight: "bold",

    }

})

export default PopModal