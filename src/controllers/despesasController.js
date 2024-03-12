const Despesa = require('../model/Despesas.js');

const despesasControllers = {
  create: async (req, res) => {
    try {
      const response = await cadastrarDespesa(req.body);
      res.status(201).json({ response });
    } catch (error) {
      console.log(error);
      res.status(500).send('Não foi possivel criar despesas. Verifique os valores digitados');
    }
  },

  getAll: async (req, res) => {
    try {
      const response = await listarTodos();
      res.json(response);
    } catch (error) {
      res.status(500).send('Não foi possivel realizar a operação.');
    }
  },
  deleteAll: async (req, res) => {
    try {
      const response = await deletarTodos();
      res.send('Arquivos deletados com sucesso');
    } catch (error) {
      res.status(500).send('Não foi possivel realizar a operação.');
    }
  },
};

async function cadastrarDespesa(despesa, idComum = generateIDComum()) {
  let date = despesa.vencimento.split('/');
  const diaInicio = date[0];
  date = new Date(`${date[2]}-${date[1]}-${date[0]}`);
  let atrasada = despesa.atrasada;
  let finalizada = despesa.finalizada;
  let pendente = despesa.pendente;

  if (isNaN(despesa.item)) {
    for (let i = 1; i <= despesa.parcelas; i++) {
      let situacao = () => {
        if (atrasada > 0) {
          atrasada--;
          return 'Atrasada';
        } else if (finalizada > 0) {
          finalizada--;
          return 'Finalizada';
        } else if (pendente > 0) {
          pendente--;
          return 'Pendente';
        }
      };

      let parcela = { ...despesa, comum: idComum };
      parcela.parcelas = i;
      parcela.vencimento = date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
      parcela.situacao = situacao();

      await Despesa.create(parcela);
      date = validarData(date, diaInicio);
    }
    return 'Cadastro realizado com sucesso';
  } else throw 'Não foi Não foi possivel criar despesas. Verifique os valores digitados cadastrar despesa';
}
async function listarTodos() {
  return Despesa.find();
}
async function deletarTodos() {
  return await Despesa.deleteMany({});
}

/**
 * Converter as strings recebidas em datas validas.
 * @param {string} date insira uma string no seguinte formato "dd/mm/aaaa"
 * @param {number} inicio
 * @returns retorna data no formato "yyyy/mm/dd"
 */
function validarData(date, inicio) {
  let dataAtual = new Date(date);
  let novaData = new Date(date);

  novaData.setUTCMonth(novaData.getUTCMonth() + 1);
  novaData.setUTCDate(inicio);

  if (novaData.getUTCMonth() - dataAtual.getUTCMonth() > 1) {
    dataAtual.setUTCMonth(dataAtual.getUTCMonth() + 1);
    dataAtual.setUTCDate(0);

    return dataAtual;
  } else {
    return novaData;
  }
}
const generateIDComum = () => {
  const getLetterUppercase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  };
  const getLetterLowercase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  };
  const getNUmber = () => {
    return Math.floor(Math.random() * 10).toString();
  };
  const getSymbol = () => {
    const symbols = '(){}[]=<>/!@#$%&*+_-';
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  let password = '';
  const passwordLength = 10;
  const generator = [getLetterLowercase, getLetterUppercase, getNUmber, getSymbol];
  for (let i = 0; i < passwordLength; i = i + 4) {
    generator.forEach(() => {
      const randomValue = generator[Math.floor(Math.random() * generator.length)]();
      password += randomValue;
    });
  }
  return password;
};

module.exports = { despesasControllers, cadastrarDespesa, listarTodos, deletarTodos };
