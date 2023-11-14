import axios from 'axios';

const API_KEY = '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';

export const respostaApiGPT = async (mensagemUser) => {
  const apiChat = axios.create({
    baseURL: 'https://api.openai.com/v1/chat/completions',
  });

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
