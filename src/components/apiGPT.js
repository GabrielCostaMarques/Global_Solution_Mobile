import axios from 'axios';

const API_KEY = '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';

export const respostaApiGPT = async (mensagemUser, infoSaude) => {
  const apiChat = axios.create({
    baseURL: 'https://api.openai.com/v1/chat/completions',
  });


  //Tela Saúde
  try {
    const responseSaude = await apiChat.post('', {
      model: 'gpt-3.5-turbo',
      messages:[{role:'user',content:`Me dê orientações para que eu possa melhorar a minha saúde com base nessas informações sobre mim${infoUser} e coloque em tópico`}],
      max_tokens: 700,
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
