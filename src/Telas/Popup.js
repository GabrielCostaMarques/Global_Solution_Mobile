import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';

import IconFechar from '../../assets/iconRemove.png'


const PopModal = ({ aberto, fechado }) => {
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
                    <TextInput style={styles.inputForms} placeholder='Nome' />
                    <TextInput style={styles.inputForms} placeholder='Idade' />
                    <TextInput style={styles.inputForms} placeholder='Peso' />
                    <TextInput style={styles.inputForms} placeholder='Tempo de Sono' />
                    <TouchableOpacity style={styles.buttonForms} onPress={fechado}>
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