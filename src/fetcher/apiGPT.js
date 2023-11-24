import axios from 'axios';

const API_KEY = '';

export const respostaApiGPT = async (mensagemUser) => {
  const apiChat = axios.create({
    baseURL: 'https://api.openai.com/v1/chat/completions',
  });

  //Tela Chat
  try {
    const response = await apiChat.post('', {
      model: 'gpt-3.5-turbo',
      messages:[{role:'user',content:mensagemUser}],
      max_tokens: 500,
      temperature: 0.5,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      }
    });

    const resposta = response.data.choices[0].message.content;
    return resposta;
  } catch (error) {
    console.error('Erro na chamada da API GPT-3:'+ error);
  }
};



export const respostaApiGPTSaude = async(infoSaude)=>{
  const apiChatSaude = axios.create({
    baseURL: 'https://api.openai.com/v1/chat/completions',
  });

  try {
    const responseSaude = await apiChatSaude.post('', {
      model: 'gpt-3.5-turbo',
      messages:[{role:'user',content:`Me de Orientações em tópicos com base nessas informações: ${infoSaude}`}],
      max_tokens: 500,
      temperature: 0.5,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      }
    });

    const resposta = responseSaude.data.choices[0].message.content;
    return resposta;
  } catch (error) {
    console.error('Erro na chamada da API GPT-3:'+ error);
  }

}
