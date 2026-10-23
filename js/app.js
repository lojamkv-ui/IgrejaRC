/**
 * IARCristo - Sistema de Gestão Eclesiástica
 * Versão funcional com localStorage
 * Módulos: Membros + Vínculos Familiares + Histórico Individual
 */

const STORAGE_MEMBROS = 'iarcristo_membros';
const STORAGE_VINCULOS = 'iarcristo_vinculos';
const STORAGE_HISTORICO = 'iarcristo_historico';

// ========== DADOS INICIAIS ==========
const MEMBROS_INICIAIS = [
  {
    id: 'MRC-0001', nome: 'Wellington Felicio Vieira', dataNascimento: '1978-05-12',
    estadoCivil: 'Casado(a)', cpf: '', telefone: '(62) 99154-2563', whatsapp: '(62) 99154-2563',
    email: 'sede.renascendoemcristo@gmail.com', endereco: 'R. Nicanor Albernaz, QD. 02 LT. 01',
    bairro: 'Setor Cristina', cidade: 'Trindade', estado: 'GO', cep: '75383-579',
    situacao: 'Membro Ativo', dataIngresso: '2015-01-10', formaIngresso: 'Fundação',
    batismo: 'Sim', dataBatismo: '2010-08-15', igrejaOrigem: '',
    cargoEclesiastico: 'Pastor Presidente', cargoAdministrativo: '', ocupacao: 'Pastor Presidente',
    departamento: 'Administração', observacoes: 'Pastor Presidente da Igreja Renascendo em Cristo',
    criadoEm: '2015-01-10T10:00:00.000Z', atualizadoEm: new Date().toISOString()
  },
  {
    id: 'MRC-0042', nome: 'Maria Aparecida Santos', dataNascimento: '1984-10-24',
    estadoCivil: 'Casado(a)', cpf: '', telefone: '(62) 99876-5432', whatsapp: '(62) 99876-5432',
    email: '', endereco: '', bairro: 'Setor Cristina', cidade: 'Trindade', estado: 'GO', cep: '',
    situacao: 'Membro Ativo', dataIngresso: '2018-03-20', formaIngresso: 'Conversão',
    batismo: 'Sim', dataBatismo: '2018-06-10', igrejaOrigem: '',
    cargoEclesiastico: '', cargoAdministrativo: '', ocupacao: 'Líder de Mulheres',
    departamento: 'Mulheres', observacoes: '',
    criadoEm: '2018-03-20T10:00:00.000Z', atualizadoEm: new Date().toISOString()
  },
  {
    id: 'MRC-0087', nome: 'João da Silva Oliveira', dataNascimento: '1991-03-15',
    estadoCivil: 'Casado(a)', cpf: '', telefone: '(62) 98765-4321', whatsapp: '(62) 98765-4321',
    email: '', endereco: '', bairro: '', cidade: 'Trindade', estado: 'GO', cep: '',
    situacao: 'Membro Ativo', dataIngresso: '2019-07-14', formaIngresso: 'Transferência',
    batismo: 'Sim', dataBatismo: '2015-11-20', igrejaOrigem: 'Igreja Assembleia de Deus',
    cargoEclesiastico: '', cargoAdministrativo: '', ocupacao: 'Líder de Louvor',
    departamento: 'Louvor', observacoes: '',
    criadoEm: '2019-07-14T10:00:00.000Z', atualizadoEm: new Date().toISOString()
  },
  {
    id: 'MRC-0115', nome: 'Ana Clara Ferreira', dataNascimento: '2007-10-31',
    estadoCivil: 'Solteiro(a)', cpf: '', telefone: '(62) 99654-3210', whatsapp: '(62) 99654-3210',
    email: '', endereco: '', bairro: '', cidade: 'Trindade', estado: 'GO', cep: '',
    situacao: 'Em Integração', dataIngresso: '2026-09-05', formaIngresso: 'Conversão',
    batismo: 'Não', dataBatismo: '', igrejaOrigem: '',
    cargoEclesiastico: '', cargoAdministrativo: '', ocupacao: '',
    departamento: '', observacoes: 'Participando da classe de novos membros',
    criadoEm: '2026-09-05T10:00:00.000Z', atualizadoEm: new Date().toISOString()
  },
  {
    id: 'MRC-0130', nome: 'Pedro Rocha Costa', dataNascimento: '1998-11-05',
    estadoCivil: 'Solteiro(a)', cpf: '', telefone: '(62) 98543-2109', whatsapp: '(62) 98543-2109',
    email: '', endereco: '', bairro: '', cidade: 'Trindade', estado: 'GO', cep: '',
    situacao: 'Afastado', dataIngresso: '2021-02-18', formaIngresso: 'Conversão',
    batismo: 'Sim', dataBatismo: '2021-05-30', igrejaOrigem: '',
    cargoEclesiastico: '', cargoAdministrativo: '', ocupacao: 'Vice-líder de Jovens',
    departamento: 'Jovens', observacoes: 'Afastado temporariamente por mudança de cidade',
    criadoEm: '2021-02-18T10:00:00.000Z', atualizadoEm: new Date().toISOString()
  },
  {
    id: 'MRC-0043', nome: 'Carlos Eduardo Santos', dataNascimento: '1982-07-08',
    estadoCivil: 'Casado(a)', cpf: '', telefone: '(62) 99123-4567', whatsapp: '(62) 99123-4567',
    email: '', endereco: '', bairro: 'Setor Cristina', cidade: 'Trindade', estado: 'GO', cep: '',
    situacao: 'Membro Ativo', dataIngresso: '2018-03-20', formaIngresso: 'Conversão',
    batismo: 'Sim', dataBatismo: '2018-06-10', igrejaOrigem: '',
    cargoEclesiastico: 'Diácono', cargoAdministrativo: '', ocupacao: '',
    departamento: '', observacoes: 'Cônjuge de Maria Aparecida',
    criadoEm: '2018-03-20T10:00:00.000Z', atualizadoEm: new Date().toISOString()
  }
];

// Vínculos iniciais (exemplos)
const VINCULOS_INICIAIS = [
  { id: 'V-001', membroId: 'MRC-0042', relacionadoId: 'MRC-0043', tipo: 'Cônjuge', criadoEm: '2018-03-20T10:00:00.000Z' },
  { id: 'V-002', membroId: 'MRC-0043', relacionadoId: 'MRC-0042', tipo: 'Cônjuge', criadoEm: '2018-03-20T10:00:00.000Z' }
];

// Histórico inicial
const HISTORICO_INICIAL = [
  { id: 'H-001', membroId: 'MRC-0001', data: '2015-01-10', categoria: 'Cadastro', descricao: 'Cadastro inicial do membro (fundação da igreja)', responsavel: 'Sistema', criadoEm: '2015-01-10T10:00:00.000Z' },
  { id: 'H-002', membroId: 'MRC-0001', data: '2015-01-10', categoria: 'Nomeação', descricao: 'Nomeado Pastor Presidente', responsavel: 'Conselho', criadoEm: '2015-01-10T10:00:00.000Z' },
  { id: 'H-003', membroId: 'MRC-0042', data: '2018-03-20', categoria: 'Cadastro', descricao: 'Ingresso por conversão', responsavel: 'Secretaria', criadoEm: '2018-03-20T10:00:00.000Z' },
  { id: 'H-004', membroId: 'MRC-0042', data: '2018-06-10', categoria: 'Batismo', descricao: 'Batismo nas águas', responsavel: 'Pr. Wellington', criadoEm: '2018-06-10T10:00:00.000Z' },
  { id: 'H-005', membroId: 'MRC-0042', data: '2020-02-15', categoria: 'Nomeação', descricao: 'Nomeada Líder de Mulheres', responsavel: 'Pr. Wellington', criadoEm: '2020-02-15T10:00:00.000Z' },
  { id: 'H-006', membroId: 'MRC-0087', data: '2019-07-14', categoria: 'Cadastro', descricao: 'Transferência da Igreja Assembleia de Deus', responsavel: 'Secretaria', criadoEm: '2019-07-14T10:00:00.000Z' },
  { id: 'H-007', membroId: 'MRC-0087', data: '2021-01-10', categoria: 'Nomeação', descricao: 'Nomeado Líder de Louvor', responsavel: 'Pr. Wellington', criadoEm: '2021-01-10T10:00:00.000Z' },
  { id: 'H-008', membroId: 'MRC-0115', data: '2026-09-05', categoria: 'Cadastro', descricao: 'Cadastro como visitante / em integração', responsavel: 'Secretaria', criadoEm: '2026-09-05T10:00:00.000Z' },
  { id: 'H-009', membroId: 'MRC-0130', data: '2021-02-18', categoria: 'Cadastro', descricao: 'Ingresso por conversão', responsavel: 'Secretaria', criadoEm: '2021-02-18T10:00:00.000Z' },
  { id: 'H-010', membroId: 'MRC-0130', data: '2024-08-01', categoria: 'Situação', descricao: 'Alterado para Afastado (mudança de cidade)', responsavel: 'Secretaria', criadoEm: '2024-08-01T10:00:00.000Z' }
];

const TIPOS_VINCULO = ['Cônjuge', 'Pai', 'Mãe', 'Filho', 'Filha', 'Irmão', 'Irmã', 'Avô', 'Avó', 'Neto', 'Neta', 'Responsável legal', 'Outro'];
const RECIPROCO = {
  'Cônjuge': 'Cônjuge', 'Pai': 'Filho', 'Mãe': 'Filho', 'Filho': 'Pai', 'Filha': 'Mãe',
  'Irmão': 'Irmão', 'Irmã': 'Irmã', 'Avô': 'Neto', 'Avó': 'Neto', 'Neto': 'Avô', 'Neta': 'Avó',
  'Responsável legal': 'Dependente', 'Outro': 'Outro'
};

const CATEGORIAS_HISTORICO = ['Cadastro', 'Alteração', 'Batismo', 'Nomeação', 'Encerramento de função', 'Situação', 'Departamento', 'Acompanhamento', 'Evento', 'Outro'];

// ========== STORAGE HELPERS ==========
function _get(key, inicial) {
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(inicial));
    return JSON.parse(JSON.stringify(inicial));
  }
  return JSON.parse(data);
}
function _save(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ========== MEMBROS ==========
// Nome social foi removido do sistema: descarta o campo dos registros antigos
function getMembros() {
  return _get(STORAGE_MEMBROS, MEMBROS_INICIAIS).map(({ nomeSocial, ...m }) => m);
}
function saveMembros(m) { _save(STORAGE_MEMBROS, m); }

function gerarCodigo() {
  const membros = getMembros();
  let max = 0;
  membros.forEach(m => {
    const num = parseInt(m.id.replace('MRC-', ''), 10);
    if (!isNaN(num) && num > max) max = num;
  });
  return 'MRC-' + String(max + 1).padStart(4, '0');
}

function adicionarMembro(dados) {
  const membros = getMembros();
  const novo = { ...dados, id: gerarCodigo(), criadoEm: new Date().toISOString(), atualizadoEm: new Date().toISOString() };
  membros.push(novo);
  saveMembros(membros);
  adicionarHistorico(novo.id, {
    data: new Date().toISOString().slice(0, 10),
    categoria: 'Cadastro',
    descricao: 'Cadastro realizado no sistema',
    responsavel: 'Usuário'
  });
  return novo;
}

function atualizarMembro(id, dados) {
  const membros = getMembros();
  const idx = membros.findIndex(m => m.id === id);
  if (idx === -1) return null;
  const antigo = { ...membros[idx] };
  membros[idx] = { ...membros[idx], ...dados, atualizadoEm: new Date().toISOString() };
  saveMembros(membros);

  // Registrar mudanças relevantes no histórico
  if (antigo.situacao !== membros[idx].situacao) {
    adicionarHistorico(id, {
      data: new Date().toISOString().slice(0, 10),
      categoria: 'Situação',
      descricao: `Situação alterada de "${antigo.situacao}" para "${membros[idx].situacao}"`,
      responsavel: 'Usuário'
    });
  }
  if (antigo.ocupacao !== membros[idx].ocupacao && membros[idx].ocupacao) {
    adicionarHistorico(id, {
      data: new Date().toISOString().slice(0, 10),
      categoria: 'Nomeação',
      descricao: `Ocupação: ${membros[idx].ocupacao}`,
      responsavel: 'Usuário'
    });
  }
  if (antigo.cargoEclesiastico !== membros[idx].cargoEclesiastico && membros[idx].cargoEclesiastico) {
    adicionarHistorico(id, {
      data: new Date().toISOString().slice(0, 10),
      categoria: 'Nomeação',
      descricao: `Cargo eclesiástico: ${membros[idx].cargoEclesiastico}`,
      responsavel: 'Usuário'
    });
  }
  return membros[idx];
}

function getMembro(id) {
  return getMembros().find(m => m.id === id) || null;
}

function buscarMembros(termo = '') {
  const membros = getMembros();
  if (!termo.trim()) return membros;
  const t = termo.toLowerCase();
  return membros.filter(m =>
    m.nome.toLowerCase().includes(t) ||
    m.id.toLowerCase().includes(t) ||
    (m.telefone && m.telefone.includes(t)) ||
    (m.ocupacao && m.ocupacao.toLowerCase().includes(t))
  );
}

// ========== VÍNCULOS FAMILIARES ==========
function getVinculos() { return _get(STORAGE_VINCULOS, VINCULOS_INICIAIS); }
function saveVinculos(v) { _save(STORAGE_VINCULOS, v); }

function getVinculosDoMembro(membroId) {
  return getVinculos().filter(v => v.membroId === membroId);
}

function adicionarVinculo(membroId, relacionadoId, tipo) {
  if (membroId === relacionadoId) return { erro: 'Não é possível vincular o membro a si mesmo.' };
  const vinculos = getVinculos();
  // Evitar duplicata
  if (vinculos.some(v => v.membroId === membroId && v.relacionadoId === relacionadoId && v.tipo === tipo)) {
    return { erro: 'Este vínculo já existe.' };
  }
  const id = 'V-' + String(Date.now()).slice(-6);
  const novo = { id, membroId, relacionadoId, tipo, criadoEm: new Date().toISOString() };
  vinculos.push(novo);

  // Criar vínculo recíproco automático quando fizer sentido
  const tipoReciproco = RECIPROCO[tipo] || 'Outro';
  if (!vinculos.some(v => v.membroId === relacionadoId && v.relacionadoId === membroId)) {
    vinculos.push({
      id: 'V-' + String(Date.now() + 1).slice(-6),
      membroId: relacionadoId,
      relacionadoId: membroId,
      tipo: tipoReciproco,
      criadoEm: new Date().toISOString()
    });
  }
  saveVinculos(vinculos);

  const rel = getMembro(relacionadoId);
  adicionarHistorico(membroId, {
    data: new Date().toISOString().slice(0, 10),
    categoria: 'Outro',
    descricao: `Vínculo familiar adicionado: ${tipo} de ${rel ? rel.nome : relacionadoId}`,
    responsavel: 'Usuário'
  });
  return { ok: true, vinculo: novo };
}

function removerVinculo(vinculoId) {
  let vinculos = getVinculos();
  const v = vinculos.find(x => x.id === vinculoId);
  if (!v) return;
  // Remove o vínculo e o recíproco correspondente
  vinculos = vinculos.filter(x => {
    if (x.id === vinculoId) return false;
    if (x.membroId === v.relacionadoId && x.relacionadoId === v.membroId) return false;
    return true;
  });
  saveVinculos(vinculos);
}

// ========== HISTÓRICO ==========
function getHistorico() { return _get(STORAGE_HISTORICO, HISTORICO_INICIAL); }
function saveHistorico(h) { _save(STORAGE_HISTORICO, h); }

function getHistoricoDoMembro(membroId) {
  return getHistorico()
    .filter(h => h.membroId === membroId)
    .sort((a, b) => (b.data || '').localeCompare(a.data || '') || (b.criadoEm || '').localeCompare(a.criadoEm || ''));
}

function adicionarHistorico(membroId, dados) {
  const hist = getHistorico();
  const item = {
    id: 'H-' + String(Date.now()).slice(-6),
    membroId,
    data: dados.data || new Date().toISOString().slice(0, 10),
    categoria: dados.categoria || 'Outro',
    descricao: dados.descricao || '',
    responsavel: dados.responsavel || 'Usuário',
    criadoEm: new Date().toISOString()
  };
  hist.push(item);
  saveHistorico(hist);
  return item;
}

// ========== ESTATÍSTICAS ==========
function getEstatisticas() {
  const membros = getMembros();
  const agora = new Date();
  const mesAtual = agora.getMonth();
  const anoAtual = agora.getFullYear();

  const ativos = membros.filter(m => m.situacao === 'Membro Ativo').length;
  const integracao = membros.filter(m => m.situacao === 'Em Integração').length;
  const visitantes = membros.filter(m => m.situacao === 'Visitante').length;
  const afastados = membros.filter(m => m.situacao === 'Afastado').length;
  const novosMes = membros.filter(m => {
    if (!m.dataIngresso) return false;
    const d = new Date(m.dataIngresso);
    return d.getMonth() === mesAtual && d.getFullYear() === anoAtual;
  }).length;

  const aniversariantes = membros
    .filter(m => m.dataNascimento)
    .map(m => {
      const d = new Date(m.dataNascimento);
      return { ...m, dia: d.getDate(), mes: d.getMonth(), idade: agora.getFullYear() - d.getFullYear() };
    })
    .filter(m => m.mes === mesAtual || (m.mes === (mesAtual + 1) % 12 && m.dia <= 10))
    .sort((a, b) => a.mes - b.mes || a.dia - b.dia);

  return { ativos, integracao, visitantes, afastados, novosMes, total: membros.length, aniversariantes };
}

// ========== UI HELPERS ==========
function badgeSituacao(situacao) {
  const map = {
    'Membro Ativo': 'badge-success', 'Em Integração': 'badge-info', 'Visitante': 'badge-info',
    'Afastado': 'badge-warning', 'Transferido': 'badge-gray', 'Desligado': 'badge-danger'
  };
  return map[situacao] || 'badge-gray';
}

function formatarData(iso) {
  if (!iso) return '—';
  const d = new Date(iso + (iso.length === 10 ? 'T12:00:00' : ''));
  if (isNaN(d)) return iso;
  return d.toLocaleDateString('pt-BR');
}

function formatarTelefone(tel) { return tel || '—'; }

function badgeCategoria(cat) {
  const map = {
    'Cadastro': 'badge-info', 'Batismo': 'badge-success', 'Nomeação': 'badge-success',
    'Situação': 'badge-warning', 'Alteração': 'badge-gray', 'Encerramento de função': 'badge-danger',
    'Departamento': 'badge-info', 'Acompanhamento': 'badge-info', 'Evento': 'badge-info', 'Outro': 'badge-gray'
  };
  return map[cat] || 'badge-gray';
}


// ========== AGENDA / CULTOS / ESCALAS ==========
const STORAGE_EVENTOS = 'iarcristo_eventos';
const STORAGE_ESCALAS = 'iarcristo_escalas';

const TIPOS_EVENTO = [
  'Culto de Celebração', 'Culto de Doutrina', 'Escola Bíblica', 'Oração', 'Vigília',
  'Santa Ceia', 'Batismo', 'Casamento', 'Apresentação de Crianças', 'Reunião de Liderança',
  'Ensaio de Louvor', 'Encontro de Jovens', 'Congresso', 'Ação Social', 'Evento Personalizado'
];

const PAPEIS_ESCALA = [
  'Dirigente', 'Pregador', 'Louvor', 'Músicos', 'Recepção', 'Projeção e Mídia',
  'Intercessão', 'Portaria', 'Apoio e Organização'
];

const EVENTOS_INICIAIS = [
  {
    id: 'E-001', titulo: 'Culto de Celebração', tipo: 'Culto de Celebração',
    data: '2026-10-26', horaInicio: '19:00', horaFim: '21:00', local: 'Templo Principal',
    dirigenteId: 'MRC-0001', pregadorId: 'MRC-0001', responsavelId: 'MRC-0001',
    ministerio: 'Administração', tema: 'Renascendo em Cristo', referenciaBiblica: '2 Coríntios 5:17',
    descricao: 'Culto dominical de celebração', situacao: 'Confirmado',
    observacoes: '', criadoEm: '2026-10-01T10:00:00.000Z'
  },
  {
    id: 'E-002', titulo: 'Escola Bíblica', tipo: 'Escola Bíblica',
    data: '2026-10-28', horaInicio: '19:30', horaFim: '21:00', local: 'Templo Principal',
    dirigenteId: '', pregadorId: '', responsavelId: 'MRC-0042',
    ministerio: 'Ensino', tema: 'Fundamentos da Fé', referenciaBiblica: '',
    descricao: '', situacao: 'Planejado',
    observacoes: '', criadoEm: '2026-10-01T10:00:00.000Z'
  },
  {
    id: 'E-003', titulo: 'Culto de Oração', tipo: 'Oração',
    data: '2026-10-29', horaInicio: '19:00', horaFim: '20:30', local: 'Templo Principal',
    dirigenteId: 'MRC-0043', pregadorId: '', responsavelId: 'MRC-0001',
    ministerio: 'Intercessão', tema: 'Clamor pela igreja', referenciaBiblica: '',
    descricao: '', situacao: 'Confirmado',
    observacoes: '', criadoEm: '2026-10-01T10:00:00.000Z'
  },
  {
    id: 'E-004', titulo: 'Santa Ceia', tipo: 'Santa Ceia',
    data: '2026-11-02', horaInicio: '19:00', horaFim: '21:00', local: 'Templo Principal',
    dirigenteId: 'MRC-0001', pregadorId: 'MRC-0001', responsavelId: 'MRC-0001',
    ministerio: 'Administração', tema: 'Memorial do Senhor', referenciaBiblica: '1 Coríntios 11:23-26',
    descricao: 'Celebração da Santa Ceia', situacao: 'Planejado',
    observacoes: '', criadoEm: '2026-10-01T10:00:00.000Z'
  },
  {
    id: 'E-005', titulo: 'Encontro de Jovens', tipo: 'Encontro de Jovens',
    data: '2026-11-07', horaInicio: '19:30', horaFim: '22:00', local: 'Salão de Jovens',
    dirigenteId: 'MRC-0130', pregadorId: '', responsavelId: 'MRC-0130',
    ministerio: 'Jovens', tema: 'Identidade em Cristo', referenciaBiblica: '',
    descricao: '', situacao: 'Planejado',
    observacoes: '', criadoEm: '2026-10-10T10:00:00.000Z'
  }
];

const ESCALAS_INICIAIS = [
  { id: 'ES-001', eventoId: 'E-001', papel: 'Dirigente', membroId: 'MRC-0001', confirmado: true, criadoEm: '2026-10-01T10:00:00.000Z' },
  { id: 'ES-002', eventoId: 'E-001', papel: 'Pregador', membroId: 'MRC-0001', confirmado: true, criadoEm: '2026-10-01T10:00:00.000Z' },
  { id: 'ES-003', eventoId: 'E-001', papel: 'Louvor', membroId: 'MRC-0087', confirmado: true, criadoEm: '2026-10-01T10:00:00.000Z' },
  { id: 'ES-004', eventoId: 'E-001', papel: 'Recepção', membroId: 'MRC-0042', confirmado: false, criadoEm: '2026-10-01T10:00:00.000Z' },
  { id: 'ES-005', eventoId: 'E-003', papel: 'Dirigente', membroId: 'MRC-0043', confirmado: true, criadoEm: '2026-10-01T10:00:00.000Z' },
  { id: 'ES-006', eventoId: 'E-004', papel: 'Dirigente', membroId: 'MRC-0001', confirmado: true, criadoEm: '2026-10-05T10:00:00.000Z' },
  { id: 'ES-007', eventoId: 'E-004', papel: 'Louvor', membroId: 'MRC-0087', confirmado: false, criadoEm: '2026-10-05T10:00:00.000Z' }
];

function getEventos() { return _get(STORAGE_EVENTOS, EVENTOS_INICIAIS); }
function saveEventos(e) { _save(STORAGE_EVENTOS, e); }
function getEscalas() { return _get(STORAGE_ESCALAS, ESCALAS_INICIAIS); }
function saveEscalas(e) { _save(STORAGE_ESCALAS, e); }

function getEvento(id) {
  return getEventos().find(e => e.id === id) || null;
}

function getProximosEventos(limite = 10) {
  const hoje = new Date().toISOString().slice(0, 10);
  return getEventos()
    .filter(e => e.data >= hoje && e.situacao !== 'Cancelado')
    .sort((a, b) => a.data.localeCompare(b.data) || a.horaInicio.localeCompare(b.horaInicio))
    .slice(0, limite);
}

function getEventosPorPeriodo(inicio, fim) {
  return getEventos()
    .filter(e => e.data >= inicio && e.data <= fim)
    .sort((a, b) => a.data.localeCompare(b.data) || a.horaInicio.localeCompare(b.horaInicio));
}

function adicionarEvento(dados) {
  const eventos = getEventos();
  const id = 'E-' + String(Date.now()).slice(-6);
  const novo = {
    id,
    titulo: dados.titulo || dados.tipo,
    tipo: dados.tipo || 'Evento Personalizado',
    data: dados.data,
    horaInicio: dados.horaInicio || '19:00',
    horaFim: dados.horaFim || '',
    local: dados.local || 'Templo Principal',
    dirigenteId: dados.dirigenteId || '',
    pregadorId: dados.pregadorId || '',
    responsavelId: dados.responsavelId || '',
    ministerio: dados.ministerio || '',
    tema: dados.tema || '',
    referenciaBiblica: dados.referenciaBiblica || '',
    descricao: dados.descricao || '',
    situacao: dados.situacao || 'Planejado',
    observacoes: dados.observacoes || '',
    fotoPregador: dados.fotoPregador || '',
    fotoLouvor: dados.fotoLouvor || '',
    fotosExtra: dados.fotosExtra || [],
    criadoEm: new Date().toISOString()
  };
  eventos.push(novo);
  saveEventos(eventos);
  return novo;
}

function atualizarEvento(id, dados) {
  const eventos = getEventos();
  const idx = eventos.findIndex(e => e.id === id);
  if (idx === -1) return null;
  eventos[idx] = { ...eventos[idx], ...dados };
  saveEventos(eventos);
  return eventos[idx];
}

function cancelarEvento(id) {
  return atualizarEvento(id, { situacao: 'Cancelado' });
}

function getEscalasDoEvento(eventoId) {
  return getEscalas().filter(e => e.eventoId === eventoId);
}

function adicionarEscala(eventoId, papel, membroId) {
  const escalas = getEscalas();
  // evitar duplicata mesmo papel + membro no mesmo evento
  if (escalas.some(e => e.eventoId === eventoId && e.papel === papel && e.membroId === membroId)) {
    return { erro: 'Este membro já está escalado neste papel.' };
  }
  const item = {
    id: 'ES-' + String(Date.now()).slice(-6),
    eventoId,
    papel,
    membroId,
    confirmado: false,
    criadoEm: new Date().toISOString()
  };
  escalas.push(item);
  saveEscalas(escalas);
  return { ok: true, escala: item };
}

function removerEscala(escalaId) {
  const escalas = getEscalas().filter(e => e.id !== escalaId);
  saveEscalas(escalas);
}

function confirmarEscala(escalaId, confirmado = true) {
  const escalas = getEscalas();
  const idx = escalas.findIndex(e => e.id === escalaId);
  if (idx === -1) return null;
  escalas[idx].confirmado = confirmado;
  saveEscalas(escalas);
  return escalas[idx];
}

function badgeSituacaoEvento(sit) {
  const map = {
    'Planejado': 'badge-info', 'Confirmado': 'badge-success',
    'Realizado': 'badge-gray', 'Cancelado': 'badge-danger'
  };
  return map[sit] || 'badge-gray';
}


// ========== DEPARTAMENTOS ==========
const STORAGE_DEPTOS = 'iarcristo_deptos';
const STORAGE_PARTICIPACOES = 'iarcristo_participacoes';

const DEPTOS_INICIAIS = [
  { id: 'D-01', nome: 'Jovens', descricao: 'Ministério de Jovens', responsavelId: 'MRC-0130', situacao: 'Ativo', criadoEm: '2020-01-01T10:00:00.000Z' },
  { id: 'D-02', nome: 'Louvor', descricao: 'Ministério de Louvor e Adoração', responsavelId: 'MRC-0087', situacao: 'Ativo', criadoEm: '2019-01-01T10:00:00.000Z' },
  { id: 'D-03', nome: 'Mulheres', descricao: 'Ministério de Mulheres', responsavelId: 'MRC-0042', situacao: 'Ativo', criadoEm: '2018-06-01T10:00:00.000Z' },
  { id: 'D-04', nome: 'Crianças', descricao: 'Ministério Infantil', responsavelId: '', situacao: 'Ativo', criadoEm: '2019-03-01T10:00:00.000Z' },
  { id: 'D-05', nome: 'Evangelismo', descricao: 'Evangelismo e Missões', responsavelId: '', situacao: 'Ativo', criadoEm: '2020-05-01T10:00:00.000Z' },
  { id: 'D-06', nome: 'Intercessão', descricao: 'Ministério de Intercessão', responsavelId: 'MRC-0043', situacao: 'Ativo', criadoEm: '2021-01-01T10:00:00.000Z' },
  { id: 'D-07', nome: 'Administração', descricao: 'Administração e Secretaria', responsavelId: 'MRC-0001', situacao: 'Ativo', criadoEm: '2015-01-01T10:00:00.000Z' },
  { id: 'D-08', nome: 'Escola Bíblica', descricao: 'Ensino e discipulado', responsavelId: '', situacao: 'Ativo', criadoEm: '2016-01-01T10:00:00.000Z' }
];

const PARTICIPACOES_INICIAIS = [
  { id: 'P-01', deptoId: 'D-02', membroId: 'MRC-0087', funcao: 'Líder', dataInicio: '2021-01-10', dataFim: '', situacao: 'Ativo' },
  { id: 'P-02', deptoId: 'D-03', membroId: 'MRC-0042', funcao: 'Líder', dataInicio: '2020-02-15', dataFim: '', situacao: 'Ativo' },
  { id: 'P-03', deptoId: 'D-01', membroId: 'MRC-0130', funcao: 'Vice-líder', dataInicio: '2022-03-01', dataFim: '', situacao: 'Ativo' },
  { id: 'P-04', deptoId: 'D-07', membroId: 'MRC-0001', funcao: 'Responsável', dataInicio: '2015-01-10', dataFim: '', situacao: 'Ativo' },
  { id: 'P-05', deptoId: 'D-06', membroId: 'MRC-0043', funcao: 'Líder', dataInicio: '2021-06-01', dataFim: '', situacao: 'Ativo' }
];

function getDeptos() { return _get(STORAGE_DEPTOS, DEPTOS_INICIAIS); }
function saveDeptos(d) { _save(STORAGE_DEPTOS, d); }
function getParticipacoes() { return _get(STORAGE_PARTICIPACOES, PARTICIPACOES_INICIAIS); }
function saveParticipacoes(p) { _save(STORAGE_PARTICIPACOES, p); }

function getDepto(id) { return getDeptos().find(d => d.id === id) || null; }

function adicionarDepto(dados) {
  const list = getDeptos();
  const id = 'D-' + String(Date.now()).slice(-4);
  const novo = { id, nome: dados.nome, descricao: dados.descricao || '', responsavelId: dados.responsavelId || '', situacao: dados.situacao || 'Ativo', criadoEm: new Date().toISOString() };
  list.push(novo);
  saveDeptos(list);
  return novo;
}

function atualizarDepto(id, dados) {
  const list = getDeptos();
  const idx = list.findIndex(d => d.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...dados };
  saveDeptos(list);
  return list[idx];
}

function getParticipacoesDoDepto(deptoId) {
  return getParticipacoes().filter(p => p.deptoId === deptoId && p.situacao === 'Ativo');
}

function adicionarParticipacao(deptoId, membroId, funcao) {
  const list = getParticipacoes();
  if (list.some(p => p.deptoId === deptoId && p.membroId === membroId && p.situacao === 'Ativo')) {
    return { erro: 'Membro já participa deste departamento.' };
  }
  const item = { id: 'P-' + String(Date.now()).slice(-6), deptoId, membroId, funcao: funcao || 'Membro', dataInicio: new Date().toISOString().slice(0,10), dataFim: '', situacao: 'Ativo' };
  list.push(item);
  saveParticipacoes(list);
  return { ok: true, participacao: item };
}

function encerrarParticipacao(id) {
  const list = getParticipacoes();
  const idx = list.findIndex(p => p.id === id);
  if (idx === -1) return;
  list[idx].situacao = 'Encerrado';
  list[idx].dataFim = new Date().toISOString().slice(0,10);
  saveParticipacoes(list);
}

// ========== CARGOS (configuráveis) ==========
const STORAGE_CARGOS_EC = 'iarcristo_cargos_ec';
const STORAGE_CARGOS_ADM = 'iarcristo_cargos_adm';
const STORAGE_OCUPACOES = 'iarcristo_ocupacoes';

const CARGOS_EC_INICIAIS = [
  { id: 'CE-01', nome: 'Pastor Presidente', descricao: '', situacao: 'Ativo' },
  { id: 'CE-02', nome: 'Pastor', descricao: '', situacao: 'Ativo' },
  { id: 'CE-03', nome: 'Pastor Auxiliar', descricao: '', situacao: 'Ativo' },
  { id: 'CE-04', nome: 'Presbítero', descricao: '', situacao: 'Ativo' },
  { id: 'CE-05', nome: 'Diácono', descricao: '', situacao: 'Ativo' },
  { id: 'CE-06', nome: 'Diaconisa', descricao: '', situacao: 'Ativo' },
  { id: 'CE-07', nome: 'Cooperador', descricao: '', situacao: 'Ativo' },
  { id: 'CE-08', nome: 'Missionário', descricao: '', situacao: 'Ativo' }
];

const CARGOS_ADM_INICIAIS = [
  { id: 'CA-01', nome: 'Secretário(a)', descricao: '', situacao: 'Ativo' },
  { id: 'CA-02', nome: 'Tesoureiro(a)', descricao: '', situacao: 'Ativo' },
  { id: 'CA-03', nome: 'Administrador', descricao: '', situacao: 'Ativo' },
  { id: 'CA-04', nome: 'Comunicação', descricao: '', situacao: 'Ativo' },
  { id: 'CA-05', nome: 'Patrimônio', descricao: '', situacao: 'Ativo' }
];

const OCUPACOES_INICIAIS = [
  { id: 'OC-01', nome: 'Líder de Jovens', situacao: 'Ativo' },
  { id: 'OC-02', nome: 'Vice-líder de Jovens', situacao: 'Ativo' },
  { id: 'OC-03', nome: 'Líder de Louvor', situacao: 'Ativo' },
  { id: 'OC-04', nome: 'Vice-líder de Louvor', situacao: 'Ativo' },
  { id: 'OC-05', nome: 'Líder de Crianças', situacao: 'Ativo' },
  { id: 'OC-06', nome: 'Líder de Adolescentes', situacao: 'Ativo' },
  { id: 'OC-07', nome: 'Líder de Casais', situacao: 'Ativo' },
  { id: 'OC-08', nome: 'Líder de Mulheres', situacao: 'Ativo' },
  { id: 'OC-09', nome: 'Líder de Homens', situacao: 'Ativo' },
  { id: 'OC-10', nome: 'Líder de Evangelismo', situacao: 'Ativo' },
  { id: 'OC-11', nome: 'Professor(a) EBD', situacao: 'Ativo' },
  { id: 'OC-12', nome: 'Recepção', situacao: 'Ativo' },
  { id: 'OC-13', nome: 'Mídia', situacao: 'Ativo' },
  { id: 'OC-14', nome: 'Intercessão', situacao: 'Ativo' },
  { id: 'OC-15', nome: 'Pastor Presidente', situacao: 'Ativo' }
];

function getCargosEc() { return _get(STORAGE_CARGOS_EC, CARGOS_EC_INICIAIS); }
function saveCargosEc(c) { _save(STORAGE_CARGOS_EC, c); }
function getCargosAdm() { return _get(STORAGE_CARGOS_ADM, CARGOS_ADM_INICIAIS); }
function saveCargosAdm(c) { _save(STORAGE_CARGOS_ADM, c); }
function getOcupacoes() { return _get(STORAGE_OCUPACOES, OCUPACOES_INICIAIS); }
function saveOcupacoes(o) { _save(STORAGE_OCUPACOES, o); }

function adicionarCargo(tipo, nome, descricao) {
  const maps = {
    ec: { get: getCargosEc, save: saveCargosEc, prefix: 'CE-' },
    adm: { get: getCargosAdm, save: saveCargosAdm, prefix: 'CA-' },
    oc: { get: getOcupacoes, save: saveOcupacoes, prefix: 'OC-' }
  };
  const m = maps[tipo];
  if (!m) return null;
  const list = m.get();
  if (list.some(c => c.nome.toLowerCase() === nome.toLowerCase() && c.situacao === 'Ativo')) {
    return { erro: 'Já existe um item com este nome.' };
  }
  const item = { id: m.prefix + String(Date.now()).slice(-4), nome, descricao: descricao || '', situacao: 'Ativo' };
  list.push(item);
  m.save(list);
  return { ok: true, item };
}

function inativarCargo(tipo, id) {
  const maps = { ec: [getCargosEc, saveCargosEc], adm: [getCargosAdm, saveCargosAdm], oc: [getOcupacoes, saveOcupacoes] };
  const [get, save] = maps[tipo] || [];
  if (!get) return;
  const list = get();
  const idx = list.findIndex(c => c.id === id);
  if (idx === -1) return;
  list[idx].situacao = 'Inativo';
  save(list);
}

// ========== VISITANTES ==========
const STORAGE_VISITANTES = 'iarcristo_visitantes';

const VISITANTES_INICIAIS = [
  {
    id: 'VIS-001', nome: 'Roberto Almeida', telefone: '(62) 98888-1111', email: '',
    dataVisita: '2026-10-12', cultoEvento: 'Culto de Celebração', origem: 'Convite de amigo',
    consentimentoContato: true, responsavelId: 'MRC-0042', interesse: 'Conhecer a igreja',
    situacao: 'Em acompanhamento', observacoes: 'Veio com a família',
    contatos: [{ data: '2026-10-14', tipo: 'WhatsApp', resumo: 'Agradecimento pela visita' }],
    criadoEm: '2026-10-12T20:00:00.000Z'
  },
  {
    id: 'VIS-002', nome: 'Juliana Mendes', telefone: '(62) 97777-2222', email: 'juliana@email.com',
    dataVisita: '2026-10-19', cultoEvento: 'Culto de Celebração', origem: 'Redes sociais',
    consentimentoContato: true, responsavelId: 'MRC-0001', interesse: 'Classe de integração',
    situacao: 'Novo', observacoes: '',
    contatos: [],
    criadoEm: '2026-10-19T20:00:00.000Z'
  }
];

function getVisitantes() { return _get(STORAGE_VISITANTES, VISITANTES_INICIAIS); }
function saveVisitantes(v) { _save(STORAGE_VISITANTES, v); }

function adicionarVisitante(dados) {
  const list = getVisitantes();
  const id = 'VIS-' + String(Date.now()).slice(-4);
  const novo = {
    id,
    nome: dados.nome,
    telefone: dados.telefone || '',
    email: dados.email || '',
    dataVisita: dados.dataVisita || new Date().toISOString().slice(0,10),
    cultoEvento: dados.cultoEvento || '',
    origem: dados.origem || '',
    consentimentoContato: !!dados.consentimentoContato,
    responsavelId: dados.responsavelId || '',
    interesse: dados.interesse || '',
    situacao: dados.situacao || 'Novo',
    observacoes: dados.observacoes || '',
    contatos: [],
    criadoEm: new Date().toISOString()
  };
  list.push(novo);
  saveVisitantes(list);
  return novo;
}

function atualizarVisitante(id, dados) {
  const list = getVisitantes();
  const idx = list.findIndex(v => v.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...dados };
  saveVisitantes(list);
  return list[idx];
}

function registrarContatoVisitante(id, tipo, resumo) {
  const list = getVisitantes();
  const idx = list.findIndex(v => v.id === id);
  if (idx === -1) return null;
  if (!list[idx].contatos) list[idx].contatos = [];
  list[idx].contatos.push({ data: new Date().toISOString().slice(0,10), tipo, resumo });
  if (list[idx].situacao === 'Novo') list[idx].situacao = 'Em acompanhamento';
  saveVisitantes(list);
  return list[idx];
}

function converterVisitanteEmMembro(visitanteId) {
  const v = getVisitantes().find(x => x.id === visitanteId);
  if (!v) return { erro: 'Visitante não encontrado' };
  const membro = adicionarMembro({
    nome: v.nome,
    telefone: v.telefone,
    whatsapp: v.telefone,
    email: v.email,
    situacao: 'Em Integração',
    dataIngresso: new Date().toISOString().slice(0,10),
    formaIngresso: 'Conversão',
    observacoes: 'Convertido de visitante ' + v.id + (v.observacoes ? '. ' + v.observacoes : ''),
    foto: v.foto || ''
  });
  atualizarVisitante(visitanteId, { situacao: 'Convertido em membro', membroId: membro.id });
  return { ok: true, membro };
}

// ========== RELATÓRIOS ==========
function relatorioMembrosPorSituacao() {
  const membros = getMembros();
  const map = {};
  membros.forEach(m => { map[m.situacao] = (map[m.situacao] || 0) + 1; });
  return Object.entries(map).map(([situacao, total]) => ({ situacao, total })).sort((a,b) => b.total - a.total);
}

function relatorioMembrosPorOcupacao() {
  const membros = getMembros();
  const map = {};
  membros.forEach(m => {
    const o = m.ocupacao || m.cargoEclesiastico || '(sem ocupação)';
    map[o] = (map[o] || 0) + 1;
  });
  return Object.entries(map).map(([ocupacao, total]) => ({ ocupacao, total })).sort((a,b) => b.total - a.total);
}

function relatorioMembrosPorDepto() {
  const parts = getParticipacoes().filter(p => p.situacao === 'Ativo');
  const deptos = getDeptos();
  const map = {};
  parts.forEach(p => {
    const d = deptos.find(x => x.id === p.deptoId);
    const nome = d ? d.nome : p.deptoId;
    map[nome] = (map[nome] || 0) + 1;
  });
  return Object.entries(map).map(([depto, total]) => ({ depto, total })).sort((a,b) => b.total - a.total);
}

function relatorioAniversariantesMes(mes) {
  const m = typeof mes === 'number' ? mes : new Date().getMonth();
  return getMembros()
    .filter(x => x.dataNascimento)
    .map(x => {
      const d = new Date(x.dataNascimento);
      return { ...x, dia: d.getDate(), mes: d.getMonth() };
    })
    .filter(x => x.mes === m)
    .sort((a,b) => a.dia - b.dia);
}

function relatorioVisitantesPeriodo(inicio, fim) {
  return getVisitantes().filter(v => {
    if (!v.dataVisita) return false;
    if (inicio && v.dataVisita < inicio) return false;
    if (fim && v.dataVisita > fim) return false;
    return true;
  });
}

function exportarCSV(linhas, nomeArquivo) {
  if (!linhas || !linhas.length) return;
  const keys = Object.keys(linhas[0]);
  const csv = [keys.join(';')].concat(linhas.map(r => keys.map(k => '"' + String(r[k] ?? '').replace(/"/g, '""') + '"').join(';'))).join('\n');
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = (nomeArquivo || 'relatorio') + '.csv';
  a.click();
  URL.revokeObjectURL(url);
}


// ========== AUTENTICAÇÃO ==========
const STORAGE_USERS = 'iarcristo_usuarios_v2';
const STORAGE_SESSION = 'iarcristo_sessao';

const PERFIS = {
  'superadmin': { nome: 'Superadministrador', nivel: 100 },
  'pastor': { nome: 'Pastor Presidente', nivel: 90 },
  'secretaria': { nome: 'Secretaria', nivel: 70 },
  'administracao': { nome: 'Administração', nivel: 60 },
  'lideranca': { nome: 'Liderança ministerial', nivel: 50 },
  'tesouraria': { nome: 'Tesouraria', nivel: 40 },
  'portaria': { nome: 'Portaria e recepção', nivel: 20 },
  'consulta': { nome: 'Consulta autorizada', nivel: 10 }
};

// Permissões por perfil (true = permitido)
const PERMISSOES = {
  superadmin: {
    membros_ver: true, membros_criar: true, membros_editar: true, membros_excluir: true,
    visitantes: true, familias: true, departamentos: true, cargos: true,
    agenda: true, escalas: true, relatorios: true, usuarios: true, config: true
  },
  pastor: {
    membros_ver: true, membros_criar: true, membros_editar: true, membros_excluir: true,
    visitantes: true, familias: true, departamentos: true, cargos: true,
    agenda: true, escalas: true, relatorios: true, usuarios: true, config: false
  },
  secretaria: {
    membros_ver: true, membros_criar: true, membros_editar: true, membros_excluir: false,
    visitantes: true, familias: true, departamentos: true, cargos: false,
    agenda: true, escalas: true, relatorios: true, usuarios: false, config: false
  },
  administracao: {
    membros_ver: true, membros_criar: true, membros_editar: true, membros_excluir: false,
    visitantes: true, familias: true, departamentos: true, cargos: true,
    agenda: true, escalas: true, relatorios: true, usuarios: false, config: false
  },
  lideranca: {
    membros_ver: true, membros_criar: false, membros_editar: false, membros_excluir: false,
    visitantes: true, familias: true, departamentos: true, cargos: false,
    agenda: true, escalas: true, relatorios: false, usuarios: false, config: false
  },
  tesouraria: {
    membros_ver: true, membros_criar: false, membros_editar: false, membros_excluir: false,
    visitantes: false, familias: false, departamentos: false, cargos: false,
    agenda: false, escalas: false, relatorios: true, usuarios: false, config: false
  },
  portaria: {
    membros_ver: true, membros_criar: false, membros_editar: false, membros_excluir: false,
    visitantes: true, familias: false, departamentos: false, cargos: false,
    agenda: true, escalas: false, relatorios: false, usuarios: false, config: false
  },
  consulta: {
    membros_ver: true, membros_criar: false, membros_editar: false, membros_excluir: false,
    visitantes: false, familias: true, departamentos: true, cargos: false,
    agenda: true, escalas: false, relatorios: true, usuarios: false, config: false
  }
};

// Senhas em texto apenas para demo local — em produção usar hash no servidor
const USUARIOS_INICIAIS = [
  { id: 'U-01', nome: 'Wellington Felicio Vieira', email: 'pastor@adcristo.com', senha: 'pastor123', perfil: 'pastor', ativo: true, membroId: 'MRC-0001' },
  { id: 'U-02', nome: 'Secretaria da Igreja', email: 'secretaria@adcristo.com', senha: 'secretaria123', perfil: 'secretaria', ativo: true, membroId: '' },
  { id: 'U-03', nome: 'Administrador do Sistema', email: 'admin@adcristo.com', senha: 'admin123', perfil: 'superadmin', ativo: true, membroId: '' },
  { id: 'U-04', nome: 'Consulta', email: 'consulta@adcristo.com', senha: 'consulta123', perfil: 'consulta', ativo: true, membroId: '' }
];

function getUsuarios() { return _get(STORAGE_USERS, USUARIOS_INICIAIS); }
function saveUsuarios(u) { _save(STORAGE_USERS, u); }

function login(email, senha) {
  const emailNorm = (email || '').trim().toLowerCase();
  const user = getUsuarios().find(u => u.email.toLowerCase() === emailNorm && u.ativo);
  if (!user) return { erro: 'E-mail ou senha incorretos.' };
  if (user.senha !== senha) return { erro: 'E-mail ou senha incorretos.' };
  const sessao = {
    userId: user.id,
    nome: user.nome,
    email: user.email,
    perfil: user.perfil,
    perfilNome: (PERFIS[user.perfil] || {}).nome || user.perfil,
    membroId: user.membroId || '',
    loginEm: new Date().toISOString()
  };
  localStorage.setItem(STORAGE_SESSION, JSON.stringify(sessao));
  return { ok: true, sessao };
}

function logout() {
  localStorage.removeItem(STORAGE_SESSION);
}

function getSessao() {
  try {
    const raw = localStorage.getItem(STORAGE_SESSION);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function estaAutenticado() {
  return !!getSessao();
}

function exigirAuth() {
  if (!estaAutenticado()) {
    const base = location.pathname.includes('/pages/') ? 'login.html' : 'pages/login.html';
    location.href = base + '?redirect=' + encodeURIComponent(location.pathname.split('/').pop() || 'dashboard.html');
    return false;
  }
  return true;
}

function temPerfil(...perfis) {
  const s = getSessao();
  if (!s) return false;
  if (s.perfil === 'superadmin') return true;
  return perfis.includes(s.perfil);
}

function nivelMinimo(nivel) {
  const s = getSessao();
  if (!s) return false;
  const n = (PERFIS[s.perfil] || {}).nivel || 0;
  return n >= nivel;
}

function atualizarSenha(userId, senhaAtual, senhaNova) {
  const users = getUsuarios();
  const idx = users.findIndex(u => u.id === userId);
  if (idx === -1) return { erro: 'Usuário não encontrado' };
  if (users[idx].senha !== senhaAtual) return { erro: 'Senha atual incorreta' };
  if (!senhaNova || senhaNova.length < 6) return { erro: 'Nova senha deve ter ao menos 6 caracteres' };
  users[idx].senha = senhaNova;
  saveUsuarios(users);
  return { ok: true };
}

function iniciaisNome(nome) {
  return (nome || '?').split(' ').filter(Boolean).map(p => p[0]).slice(0, 2).join('').toUpperCase();
}


function pode(permissao) {
  const s = getSessao();
  if (!s) return false;
  const p = PERMISSOES[s.perfil];
  if (!p) return false;
  return !!p[permissao];
}

function exigirPermissao(permissao, redirecionar) {
  if (!pode(permissao)) {
    alert('Você não tem permissão para esta ação.');
    if (redirecionar) location.href = redirecionar;
    return false;
  }
  return true;
}

function registrarUsuario(dados) {
  const users = getUsuarios();
  const email = (dados.email || '').trim().toLowerCase();
  if (!email || !dados.senha) return { erro: 'E-mail e senha são obrigatórios.' };
  if (dados.senha.length < 6) return { erro: 'Senha deve ter ao menos 6 caracteres.' };
  if (users.some(u => u.email.toLowerCase() === email)) return { erro: 'Já existe um usuário com este e-mail.' };
  if (!PERFIS[dados.perfil]) return { erro: 'Perfil inválido.' };

  const id = 'U-' + String(Date.now()).slice(-6);
  const novo = {
    id,
    nome: (dados.nome || '').trim() || email,
    email,
    senha: dados.senha,
    perfil: dados.perfil,
    ativo: true,
    membroId: dados.membroId || '',
    criadoEm: new Date().toISOString()
  };
  users.push(novo);
  saveUsuarios(users);
  return { ok: true, usuario: { ...novo, senha: undefined } };
}

function criarLoginParaMembro(membroId, email, senha, perfil) {
  const membro = getMembro(membroId);
  if (!membro) return { erro: 'Membro não encontrado.' };
  const users = getUsuarios();
  if (users.some(u => u.membroId === membroId && u.ativo)) {
    return { erro: 'Este membro já possui login ativo.' };
  }
  return registrarUsuario({
    nome: membro.nome,
    email: email || (membro.email && membro.email.includes('@') ? membro.email : ''),
    senha,
    perfil: perfil || 'consulta',
    membroId
  });
}

function atualizarUsuario(id, dados) {
  const users = getUsuarios();
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return { erro: 'Usuário não encontrado.' };
  if (dados.email) {
    const email = dados.email.trim().toLowerCase();
    if (users.some(u => u.id !== id && u.email.toLowerCase() === email)) {
      return { erro: 'E-mail já em uso.' };
    }
    users[idx].email = email;
  }
  if (dados.nome) users[idx].nome = dados.nome.trim();
  if (dados.perfil && PERFIS[dados.perfil]) users[idx].perfil = dados.perfil;
  if (typeof dados.ativo === 'boolean') users[idx].ativo = dados.ativo;
  if (dados.membroId !== undefined) users[idx].membroId = dados.membroId;
  if (dados.senha) {
    if (dados.senha.length < 6) return { erro: 'Senha deve ter ao menos 6 caracteres.' };
    users[idx].senha = dados.senha;
  }
  saveUsuarios(users);
  return { ok: true };
}

function desativarUsuario(id) {
  const s = getSessao();
  if (s && s.userId === id) return { erro: 'Não é possível desativar o próprio usuário logado.' };
  return atualizarUsuario(id, { ativo: false });
}

function getUsuarioPorMembro(membroId) {
  return getUsuarios().find(u => u.membroId === membroId && u.ativo) || null;
}



// ========== FOTOS (base64 comprimido — opcional) ==========
const FOTO_MAX_PX = 480;
const FOTO_QUALITY = 0.72;

function comprimirImagemArquivo(file) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Arquivo deve ser uma imagem.'));
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      reject(new Error('Imagem muito grande (máx. 8 MB).'));
      return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        let w = img.width, h = img.height;
        if (w > FOTO_MAX_PX || h > FOTO_MAX_PX) {
          if (w > h) { h = Math.round(h * FOTO_MAX_PX / w); w = FOTO_MAX_PX; }
          else { w = Math.round(w * FOTO_MAX_PX / h); h = FOTO_MAX_PX; }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', FOTO_QUALITY));
      };
      img.onerror = () => reject(new Error('Não foi possível ler a imagem.'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('Falha ao ler o arquivo.'));
    reader.readAsDataURL(file);
  });
}

function comprimirImagemDataUrl(dataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      let w = img.width, h = img.height;
      if (w > FOTO_MAX_PX || h > FOTO_MAX_PX) {
        if (w > h) { h = Math.round(h * FOTO_MAX_PX / w); w = FOTO_MAX_PX; }
        else { w = Math.round(w * FOTO_MAX_PX / h); h = FOTO_MAX_PX; }
      }
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL('image/jpeg', FOTO_QUALITY));
    };
    img.onerror = () => reject(new Error('Imagem inválida.'));
    img.src = dataUrl;
  });
}

function avatarHtml(pessoa, size) {
  size = size || 36;
  const nome = (pessoa && pessoa.nome) || '?';
  const iniciais = nome.split(' ').filter(Boolean).map(p => p[0]).slice(0, 2).join('').toUpperCase();
  if (pessoa && pessoa.foto) {
    return `<img src="${pessoa.foto}" alt="${nome}" class="avatar-img" style="width:${size}px;height:${size}px;border-radius:50%;object-fit:cover;flex-shrink:0;" />`;
  }
  return `<div class="user-avatar" style="width:${size}px;height:${size}px;font-size:${Math.round(size*0.35)}px;">${iniciais}</div>`;
}


// Exportar
window.IARCristo = {
  getMembros, saveMembros, adicionarMembro, atualizarMembro, getMembro, buscarMembros, gerarCodigo,
  getVinculos, getVinculosDoMembro, adicionarVinculo, removerVinculo, TIPOS_VINCULO,
  getHistorico, getHistoricoDoMembro, adicionarHistorico, CATEGORIAS_HISTORICO,
  getEstatisticas, badgeSituacao, formatarData, formatarTelefone, badgeCategoria,
  // Agenda
  getEventos, getEvento, getProximosEventos, getEventosPorPeriodo,
  adicionarEvento, atualizarEvento, cancelarEvento,
  getEscalas, getEscalasDoEvento, adicionarEscala, removerEscala, confirmarEscala,
  TIPOS_EVENTO, PAPEIS_ESCALA, badgeSituacaoEvento,
  // Departamentos
  getDeptos, getDepto, adicionarDepto, atualizarDepto,
  getParticipacoes, getParticipacoesDoDepto, adicionarParticipacao, encerrarParticipacao,
  // Cargos configuráveis
  getCargosEc, getCargosAdm, getOcupacoes, adicionarCargo, inativarCargo,
  // Visitantes
  getVisitantes, adicionarVisitante, atualizarVisitante, registrarContatoVisitante, converterVisitanteEmMembro,
  // Relatórios
  relatorioMembrosPorSituacao, relatorioMembrosPorOcupacao, relatorioMembrosPorDepto,
  relatorioAniversariantesMes, relatorioVisitantesPeriodo, exportarCSV,
  // Auth
  login, logout, getSessao, estaAutenticado, exigirAuth, temPerfil, nivelMinimo,
  getUsuarios, atualizarSenha, PERFIS, PERMISSOES, pode, exigirPermissao, iniciaisNome,
  registrarUsuario, criarLoginParaMembro, atualizarUsuario, desativarUsuario, getUsuarioPorMembro,
  // Fotos
  comprimirImagemArquivo, comprimirImagemDataUrl, avatarHtml, FOTO_MAX_PX
};

console.log('IARCristo JS v7 carregado ✓ (+ Fotos membros/visitantes/agenda)');
