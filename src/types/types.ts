export interface Services {
  id_servico: number;
  nom_servico: string;
  desc_servico: string;
  id_usuario_solicitante: number;
  id_projeto_pai: number | null;
  nom_projeto: string | null;
  dth_servico: string;
  dth_fim_servico: string;
  num_tempo_estimado: number;
  num_tempo_estimado_st: string;
  num_qtd_prestadores: number;
  id_status: number;
  nom_usuario: string;
  cod_email_usuario: string;
  id_cidade: number;
  desc_endereco: string;
  nom_status: string;
  num_qtd_prestadores_confirmados: number;
}