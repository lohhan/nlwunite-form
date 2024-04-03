let participantes = [
  {
    nome: "Lohhan Guilherme",
    email: "lohhan@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 0),
  },
  {
    nome: "Diogo Fernandes",
    email: "diogo@gmail.com",
    dataInscricao: new Date(2024, 1, 2, 19, 23),
    dataCheckIn: null,
  },
  {
    nome: "Amanda Souza",
    email: "amanda@gmail.com",
    dataInscricao: new Date(2024, 0, 15, 10, 30),
    dataCheckIn: new Date(2024, 0, 18, 15, 45),
  },
  {
    nome: "Rafael Silva",
    email: "rafael@gmail.com",
    dataInscricao: new Date(2024, 3, 5, 14, 10),
    dataCheckIn: new Date(2024, 3, 4, 17, 20),
  },
  {
    nome: "Juliana Santos",
    email: "juliana@gmail.com",
    dataInscricao: new Date(2024, 1, 10, 8, 0),
    dataCheckIn: null,
  },
  {
    nome: "Lucas Oliveira",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2024, 2, 5, 16, 40),
    dataCheckIn: new Date(2024, 2, 8, 18, 50),
  },
  {
    nome: "Carolina Costa",
    email: "carolina@gmail.com",
    dataInscricao: new Date(2024, 0, 28, 11, 20),
    dataCheckIn: null,
  },
  {
    nome: "Pedro Santos",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 3, 16, 9, 15),
    dataCheckIn: new Date(2024, 3, 14, 12, 0),
  },
  {
    nome: "Mariana Lima",
    email: "mariana@gmail.com",
    dataInscricao: new Date(2024, 0, 5, 20, 5),
    dataCheckIn: new Date(2024, 0, 8, 22, 30),
  },
  {
    nome: "Rodrigo Almeida",
    email: "rodrigo@gmail.com",
    dataInscricao: new Date(2024, 2, 12, 13, 45),
    dataCheckIn: null,
  },
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao);

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn);

  if (participante.dataCheckIn == null) {
    dataCheckIn = `
      <button data-email="${participante.email}" onclick="fazerCheckIn(event)">
         Confirmar check-in
      </button>
   `;
  }

  return `
  <tr>
      <td><strong>${participante.nome}</strong><br>
         <small>${participante.email}</small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
   </tr>
  `;
};

const atualizarLista = (participantes) => {
  let output = "";

  for (let participante of participantes) {
    output = output + criarNovoParticipante(participante);
  }

  document.querySelector("tbody").innerHTML = output;
};

atualizarLista(participantes);

const adicionarParticipante = (event) => {
  event.preventDefault();

  const dadosDoFormulario = new FormData(event.target);

  const participante = {
    nome: dadosDoFormulario.get("nome"),
    email: dadosDoFormulario.get("email"),
    dataInscricao: new Date(),
    dataCheckIn: null,
  };

  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  );

  if (participanteExiste) {
    alert("Email já cadastrado!");
    return;
  }

  participantes = [participante, ...participantes];
  atualizarLista(participantes);

  event.target.querySelector('[name="nome"').value = "";
  event.target.querySelector('[name="email"]').value = "";
};

const fazerCheckIn = (event) => {
  const mensagemConfirmacao = "Tem certeza que deseja fazer o check-in?";

  if (confirm(mensagemConfirmacao) == false) {
    return;
  }

  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  );

  participante.dataCheckIn = new Date();

  atualizarLista(participantes);
};
