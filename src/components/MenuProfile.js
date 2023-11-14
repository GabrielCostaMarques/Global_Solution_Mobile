import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Button,
  StyleSheet,
} from "react-native";
import { Contexto } from "../components/contexto";
import { api, API_URL } from "../api";
import { onSucess, onError } from "../components/Toast";
import { useNavigation } from '@react-navigation/native';

const UserProfile = () => {
  const navigation = useNavigation();
  useEffect(() => {
    getUserInfos();
  }, []);

  const contexto = useContext(Contexto);
  const [userData, setUserData] = useState({
    id:contexto.id,
    nome: "John",
    email: "johndoe@example.com",
    dataCadastro: "01/01/2023",
  });

  const [editing, setEditing] = useState(false);

  const [editData, setEditData] = useState({
    id:contexto.id,
    nome: "",
    email: "",
  });

  const [showModal, setShowModal] = useState(false);

  const getUserInfos = () => {
    try {
      api.get(`${API_URL}usuarios/${contexto.id}`).then((resp) => {
        setUserData(...resp.data);
      });
    } catch (error) {
      onError(`Falha ao carregar os dados`);
    }
  };

  const handleEdit = () => {
    setEditData(userData);
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
    try {
      api.put(`${API_URL}usuarios/${contexto.id}`,{...editData}).then((resp) => {
        onSucess(`${resp.data}`);
        setTimeout(() => {
          getUserInfos()
        }, 300);
      });
    } catch (error) {
      onError(`Falha ao atualizar os dados`);
    }
  };

  const handleDeactivateAccount = () => {
    setShowModal(true);
  };

  const confirmDeactivateAccount = () => {
    try {
      api.delete(`${API_URL}usuarios/${contexto.id}`).then((resp) => {
        onSucess(`${resp.data}!`);
        setTimeout(() => {
          navigation.navigate("Login");  
        }, 800);
      });
    } catch (error) {
      onError(`Falha ao desativar a conta`);
    }
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/user.png")} style={styles.avatar} />
      {editing ? (
        <View style={styles.editFields}>
          <TextInput
            value={editData.nome}
            onChangeText={(text) => setEditData({ ...editData, nome: text })}
          />
          <TextInput
            value={editData.email}
            onChangeText={(text) => setEditData({ ...editData, email: text })}
          />
        </View>
      ) : (
        <View style={styles.userInfo}>
          <Text>Nome: {userData.nome}</Text>
          <Text>Email: {userData.email}</Text>
          <Text>Data de Registro:{new Date(userData.dataCadastro).toLocaleDateString()}
          </Text>
        </View>
      )}
      {editing ? (
        <Button title="Salvar" onPress={handleSave} />
      ) : (
        <Button title="Editar" onPress={handleEdit} />
      )}
      <TouchableOpacity
        style={styles.deactivateButton}
        onPress={handleDeactivateAccount}
      >
        <Text style={styles.buttonText}>Remover minha conta</Text>
      </TouchableOpacity>

      <Modal visible={showModal} animationType="slide">
        <View style={styles.modalContent}>
          <Text>Tem certeza de que deseja remover sua conta?</Text>

          <TouchableOpacity style={styles.deactivateButton} onPress={confirmDeactivateAccount}>
            <Text style={styles.buttonText}>Sim, remover</Text>
          </TouchableOpacity>

          <Button title="Cancelar" onPress={() => setShowModal(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userInfo: {
    marginVertical: 10,
  },
  editFields: {
    marginVertical: 10,
  },
  deactivateButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
});

export default UserProfile;
