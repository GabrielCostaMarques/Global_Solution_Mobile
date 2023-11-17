import React, { useState } from 'react';
import { View, Text, TouchableOpacity,TextInput, Button } from 'react-native';
import Modal from 'react-native-modal';


const PopModal=({aberto,fechado})=>{
    return(
        <Modal
        visible={aberto}
        transparent={false}
        onBackdropPress={fechado}
        onBackButtonPress={fechado}
        animationType="slide"
        
        >
            <View style={{flex:1, backgroundColor:"a8a8a8"}}>
                <TextInput placeholder='Nome'/>
                <TextInput placeholder='Idade'/>
                <TextInput placeholder='Peso'/>
                <Button title={"fechar"} onPress={fechado}/>
            </View>
        </Modal>
    )
}

export default PopModal