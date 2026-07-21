import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const logPaths = {
  Autorização: "service:autorizacao-kafka-parser-mensageria AVRO env:prd",
  Liquidação: "service:liquidacao-kafka-parser-mensageria env:prd ",
  Standin: "service:standin-consumidor-autorizacao env:prd",
  Advice: "service:standin-consumidor-advice \"TRANSACAO PERSISTIDA COM SUCESSO \" env:prd ",
  HubQRCode: "service:qr-code-v2-kafka-parser-mensageria env:prd ",
  "3DS-Autenticação": "service:rpa env:prd",
  Lyra: "service:lyra-kafka-parser-mensageria env:prd",
  TE40: "service:liquidacao-fraude-kafka-parser-mensageria env:prd",
  SimSwap: "service:simswap-kafka-parser-mensageria env:prd ",
};

const campos = {
   Autorização: [

  { grupo: "BIT02", itens: ["@Bit02pan"] },

  { grupo: "BIT03", itens: [
    "@Bit03codigoProcesso","@Bit03codigoContaOrigem","@Bit03contaOrigem",
    "@Bit03tipoContaDestino","@Bit03processo"
  ]},

  { grupo: "BIT04", itens: ["@Bit04","@Bit04valorTransacao"] },

  { grupo: "BIT05", itens: ["@Bit05valorMoedaLiquidacao"] },

  { grupo: "BIT06", itens: ["@Bit06valorFaturaPortador"] },

  { grupo: "BIT07", itens: ["@Bit07dataHoraTransmissao"] },

  { grupo: "BIT08", itens: ["@Bit08taxaFaturaPortador"] },

  { grupo: "BIT09", itens: ["@Bit09conversaoMoedaLiquidacao"] },

  { grupo: "BIT10", itens: ["@Bit10conversaoFaturaPortador"] },

  { grupo: "BIT11", itens: ["@Bit11stan"] },

  { grupo: "BIT13_12", itens: ["@bit1213dataHoraTransacao"] },

  { grupo: "BIT14", itens: ["@Bit14ValidadeCartao"] },

  { grupo: "BIT15", itens: ["@Bit15dataLiquidacao"] },

  { grupo: "BIT16", itens: ["@Bit16dataConversaoMoeda"] },

  { grupo: "BIT18", itens: ["@Bit18codigoMCC","@Bit18MCC"] },

  { grupo: "BIT19", itens: ["@Bit19codigoPais"] },

  { grupo: "BIT22", itens: [
    "@Bit22capacidadePIN","@Bit22codigoModoEntrada","@Bit22modoEntrada"
  ]},

  { grupo: "BIT23", itens: ["@Bit23sequenciaCartao"] },

  { grupo: "BIT24", itens: ["@Bit24codigoFuncao","@Bit24funcao"] },

  { grupo: "BIT25", itens: ["@Bit25codigoMotivoMensagem"] },

  { grupo: "BIT26", itens: ["@Bit26capturaPIN"] },

  { grupo: "BIT28", itens: ["@Bit28taxaTransacao"] },

  { grupo: "BIT29", itens: ["@Bit29taxaMoedaLiquidacao"] },

  { grupo: "BIT30", itens: ["@Bit30"] },

  { grupo: "BIT32", itens: ["@Bit32codigoCredenciador","@Bit32Credenciador"] },

  { grupo: "BIT33", itens: ["@Bit33instituicaoRepasse"] },

  { grupo: "BIT35", itens: ["@Bit35trilha2Cartao"] },

  { grupo: "BIT36", itens: ["@Bit36trilha3Cartao"] },

  { grupo: "BIT37", itens: ["@Bit37nsu"] },

  { grupo: "BIT38", itens: ["@Bit38codigoAutorizacao"] },

  { grupo: "BIT39", itens: [
    "@Bit39classificacaoCodigoResposta","@Bit39codigoResposta","@Bit39resposta"
  ]},

  { grupo: "BIT40", itens: ["@Bit40"] },

  { grupo: "BIT41", itens: ["@Bit41codigoTerminal"] },

  { grupo: "BIT42", itens: ["@Bit42mid"] },

  { grupo: "BIT43", itens: [
    "@Bit43Estabelecimento","@Bit43codigoPais","@Bit43Cidade","@Bit43Pais","@bit43","@Bit43abrangencia"
  ]},

  { grupo: "BIT46", itens: [
    "@Bit46respostaAVS","@Bit46resultadoCVE2","@Bit46fonteAutorizacao","@Bit46floorLimit",
    "@Bit46campoErro","@Bit46mudancaEndereco","@Bit46resultadoCVE","@Bit46resultadoCriptograma",
    "@Bit46resultadoTVR","@Bit46resultadoCVR","@Bit46nomePortador","@Bit46numeroCobranca",
    "@Bit46nomeCobranca","@Bit46cidadeCobranca","@Bit46cobrancaUF","@Bit46emailCobranca",
    "@Bit46telefoneCobranca1","@Bit46telefoneCobranca2","@Bit46telefoneCobranca3",
    "@Bit46padraoEnderecoCobranca","@Bit46respostaCAVV"
  ]},

  { grupo: "BIT47", itens: [
    "@Bit47identificacaoPedido","@Bit47parcelasAmortizacao","@Bit47parcelasCarencia",
    "@Bit47periodicidadeAmortizacao","@Bit47periodicidadeCarencia","@Bit47taxaJurosAmortizacao",
    "@Bit47taxaJurosCarencia","@Bit47transacaoTokenizada"
  ]},

  { grupo: "BIT48", itens: [
    "@Bit48CNPJ","@Bit48codigoProduto","@Bit48Marca","@Bit48Produto","@Bit48quemResponde","@Bit48produtoDigital","@Bit48carteiraDigital","@Bit48codigoCarteiraDigital"
  ]},

  { grupo: "BIT49", itens: ["@Bit49codigoMoeda"] },

  { grupo: "BIT50", itens: ["@Bit50codigoMoedaLiquidacao"] },

  { grupo: "BIT51", itens: ["@Bit51moedaFaturaPortador"] },

  { grupo: "BIT53", itens: ["@Bit53controleSeguranca"] },

  { grupo: "BIT54", itens: [
    "@Bit54tipoConta","@Bit54tipoValor","@Bit54codigoMoeda","@Bit54indicativoPlataforma","@Bit54valor"
  ]},
  { grupo: "BIT55", itens: ["@bit55","@bit55Tag9F02","@bit55Tag9F03","@bit55Tag9F1A","@bit55Tag5F2A","@bit55Tag9F37","@bit55Tag9F33","@bit55Tag9F34","@bit55Tag9F35","@bit55Tag9F36","@bit55Tag9F10","@bit55Tag9F26","@bit55Tag9F27","@bit55Tag9F6E","@bit55Tag9F06","@bit55Tag9F1E","@bit55Tag9F09","@bit55Tag9F41","@bit55Tag9F07","@bit55Tag9F5B","@bit55Tag9A","@bit55Tag9C","@bit55Tag71","@bit55Tag72","@bit55Tag84","@bit55Tag82","@bit55Tag91","@bit55Tag95"] },

  { grupo: "BIT56", itens: ["@Bit56dadosPortador"] },

  { grupo: "BIT58", itens: [
    "@Bit58enderecoRua","@Bit58cep","@Bit58codigoPais","@Bit58numeroLoja","@Bit58nomeShopping"
  ]},

  { grupo: "BIT59", itens: ["@Bit59dadosTransporte"] },

  { grupo: "BIT60", itens: [
    "@Bit60tipoTerminal","@Bit60AprovacaoParcial","@Bit60localizacaoTerminal","@Bit60presencaPortador",
    "@Bit60codigoPresencaCartao","@Bit60capacidadeCapturaCartao","@Bit60codigoStatusTransacao",
    "@Bit60segurancaTransacao","@Bit60reservadoZerado","@Bit60codigoTipoPOS","@Bit60capacidadeEntrada",
    "@Bit60condicaoEspecial","@Bit60reservadoZerado2","@Bit60presencaCartao",
    "@Bit60statusTransacao","@Bit60tipoPOS"
  ]},

  { grupo: "BIT61", itens: ["@Bit61"] },

  { grupo: "BIT62", itens: [
    "@Bit62dadosTransacaoOnline","@Bit62codigoAutenticacao","@Bit62cnpjRaizComprador",
    "@Bit62cnpjFilialComprador","@Bit62cnpjDigitoComprador","@Bit62cpfComprador",
    "@Bit62cpfDigitoComprador","@Bit62idComercioEletronico","@Bit62eci"
  ]},

  { grupo: "BIT63", itens: ["@Bit63"] },

  { grupo: "BIT80", itens: [
    "@Bit80dataTransacao","@Bit80codigoTipoTransacao","@Bit80codigoPaisTerminal",
    "@Bit80valorAutorizadoTransacao","@Bit80contadorTransacaoIncremental"
  ]},

  { grupo: "BIT89", itens: ["@Bit89"] },

  { grupo: "BIT90", itens: ["@Bit90transacaoOriginal"] },

  { grupo: "BIT95", itens: ["@Bit95"] },

  { grupo: "BIT104", itens: [
    "@Bit104numeroIdentificadorSubcredenciador","@Bit104numeroEcSubcredenciador",
    "@Bit104numeroCpfCnpjPortadorCartao","@Bit104nomePortadorCartao"
  ]},

  { grupo: "BIT105", itens: ["@Bit105"] },

  { grupo: "BIT106", itens: [
    "@Bit106conjuntoDados61Tag01","@Bit106conjuntoDados61Tag02","@Bit106conjuntoDados61Tag04",
    "@Bit106conjuntoDados61Tag05","@Bit106conjuntoDados61Tag06","@Bit106conjuntoDados61Tag07",
    "@Bit106conjuntoDados61Tag08","@Bit106conjuntoDados61Tag09","@Bit106conjuntoDados61Tag10",
    "@Bit106conjuntoDados61Tag11","@Bit106conjuntoDados61Tag12","@Bit106conjuntoDados61Tag13",
    "@Bit106conjuntoDados61Tag14","@Bit106conjuntoDados61Tag15","@Bit106conjuntoDados61Tag16",
    "@Bit106conjuntoDados61Tag18","@Bit106conjuntoDados61Tag19","@Bit106conjuntoDados64Tag01",
    "@Bit106conjuntoDados64Tag02","@Bit106conjuntoDados68Tag01","@Bit106conjuntoDados68Tag02",
    "@Bit106conjuntoDados68Tag03","@Bit106conjuntoDados68Tag04","@Bit106conjuntoDados68Tag05",
    "@Bit106conjuntoDados68Tag06","@Bit106conjuntoDados68Tag07","@Bit106conjuntoDados68Tag08",
    "@Bit106conjuntoDados68Tag09"
  ]},

  { grupo: "BIT107", itens: [
    "@Bit107conjuntoDados57Tag01","@Bit107conjuntoDados57Tag02","@Bit107conjuntoDados57Tag03",
    "@Bit107conjuntoDados57Tag04","@Bit107conjuntoDados57Tag05","@Bit107conjuntoDados57Tag06",
    "@Bit107conjuntoDados57Tag07","@Bit107conjuntoDados57Tag08","@Bit107conjuntoDados57Tag09",
    "@Bit107conjuntoDados57Tag10","@Bit107conjuntoDados57Tag11","@Bit107conjuntoDados57TagE0",
    "@Bit107conjuntoDados57TagE1","@Bit107conjuntoDados57TagE2","@Bit107conjuntoDados57TagE3",
    "@Bit107conjuntoDados57TagE4","@Bit107conjuntoDados57TagE5","@Bit107conjuntoDados57TagE6",
    "@Bit107conjuntoDados57TagE7","@Bit107conjuntoDados57TagE8","@Bit107conjuntoDados57TagF1",
    "@Bit107conjuntoDados57TagF2","@Bit107conjuntoDados57TagF3"
  ]},

  { grupo: "BIT111", itens: ["@Bit111"] },

  { grupo: "BIT113", itens: ["@Bit113"] },

  { grupo: "BIT114", itens: ["@Bit114"] },

  { grupo: "BIT121", itens: ["@Bit121"] },

  { grupo: "BIT122", itens: [
    "@Bit122tipoAutenticacao1","@Bit122formatoTLV","@Bit122tipoAutenticacao2",
    "@Bit122codigoResultadoAutenticacao3DS","@Bit122segundoFatorAutenticacao","@Bit122chaveCAVV",
    "@Bit122valorCAVV","@Bit122numeroImprevisivel","@Bit122rastreamentoAutenticacao",
    "@Bit122versaoAcao","@Bit122acaoAutenticacao","@Bit122enderecoIP","@Bit122tipoAutenticacao3",
    "@Bit122atc","@Bit122indicadorChaveCAVV","@Bit122outputCVE2","@Bit122numeroImprevisivelInApp",
    "@Bit122rastreamentoAutenticacaoInapp","@Bit122versaoAcaoInapp","@Bit122acaoAutenticacaoInapp",
    "@Bit122RUF","@Bit122tipoAutenticacao4","@Bit122atcTokenizada","@Bit122indicadorChaveTAVV",
    "@Bit122TAVV","@Bit122numeroImprevisivelTokenizada","@Bit122rastreamentoAutenticacaoTokenizada",
    "@Bit122RUFtokenizada"
  ]},

  { grupo: "BIT123", itens: ["@Bit123"] },

  { grupo: "BIT124", itens: [
    "@Bit124condicaoDadosTransacao","@Bit124produtoCartao","@Bit124indicadorChipParcial",
    "@Bit124indicadorRemocao","@Bit124indicadorHostCapture","@Bit124scoreCredenciador",
    "@Bit124scoreELO","@Bit124reservadoZerado","@Bit124motivoPrimarioFraude","@Bit124motivoSecundarioFraude",
    "@Bit124motivoTerciarioFraude","@Bit124decisaoFraude","@Bit124origemScore",
    "@Bit124recomendacaoListaRestritiva","@Bit124recomendacaoindiceConfianca",
    "@Bit124recomendacaoRegraAtaque","@Bit124recomendacaoMonitoriaAtiva","@Bit124reservadoZerado2",
    "@Bit124indicadorAprovacaoJogos","@Bit124indicadorContaComprometida","@Bit124dataComprometimento",
    "@Bit124totalViolacoesConfirmadas","@Bit124tipoComprometimento","@Bit124identificadorComprometimento"
  ]},

  { grupo: "BIT125", itens: ["@Bit125"] },

  { grupo: "BIT126", itens: ["@Bit126","@Bit126CVE2"] },

  { grupo: "BIT127", itens: ["@Bit127versaoMensageria"] },

  // --------------------------------
  // GRUPOS NÃO-BIT (mantidos como estavam)
  // --------------------------------

  { grupo: "dadosAdicionaisMensagem", itens: [
    "@codigoBandeira","@codigoCredenciadora","@Credenciador","@codigoEmissor","@Emissor",
    "@codigoMensagemComplementar","@maquinaStratus","@tipoSituacaoTransacao","@tipoTransacao",
    "@origemInformacao","@indicadorCapturador","@indicadorToken","@bin","@finalCartao",
    "@cartaoCriptografado","@hashCartaoCriptografado","@indicadorCartaoDigitalCaixa",
    "@servicosEmv.codigoServicoARQC","@servicosEmv.indicadorValidacaoARQC","@nrid",
    "@indicadorTokenizacaoCpfBit48","@indicadorTokenizacaoCnpjBit48",
    "@indicadorTokenizacaoCpfBit104","@indicadorTokenizacaoCnpjBit104",
    "@indicadorTokenizacaoRazaoSocial","@indicadorTransacaoAfe","@transacaoInternacional",
    "@indicadorBinTamanhoSeis","@tipoFinanciamentoTransacao","@idAutorizacaoTransacao",
    "@idChaveHsm","@razaoSocialEstComercial","@site","@classificacaoTransacao","@tipoCartao","@tipoProduto","@metricaTransacao","@bin6"
  ]},

  { grupo: "dadosComplementaresPulse", itens: [
    "@Diners.mti","@Diners.Bit003","@Diners.Bit012","@Diners.Bit022","@Diners.Bit024",
    "@Diners.Bit032","@Diners.Bit033","@Diners.Bit043","@Diners.Bit055","@Diners.Bit092"
  ]},

  { grupo: "dadosComplementaresStratus", itens: [
    "@Stratus.dataHoraAutorizacao","@Stratus.versaoMensageriaEmissor","@Stratus.deParaOrigemBit60"
  ]}
],


  Liquidação: [
  { grupo: "Comuns", itens: [
      "@Bandeira",
      "@Bin6",
      "@Bin8",
      "@codigoBandeira",
      "@codigoCredenciador",
      "@codigoEmissor",
      "@codigoProcessadora",
      "@codigoRemessa",
      "@Credenciador",
      "@date",
      "@dd.date",
      "@Emissor",
      "@finalCartao",
      "@hostname",
      "@mascaraCartao",
      "@MCCLiquidacao",
      "@ModoEntrada",
      "@plataforma",
      "@processo",
      "@Produto",
      "@remessaCredenciador",
      "@sequencial",
      "@service",
      "@tipoRejeicao",
      "@tipoTransacao"
  ]},

  { grupo: "dadosAdicionais", itens: [
      "@dadosAdicionais.codigoRastreioCicloVidaTransacao",
      "@dadosAdicionais.dataRejeicaoEmissor",
      "@dadosAdicionais.flagCartaoPresente",
      "@dadosAdicionais.indicadorRota",
      "@dadosAdicionais.kafkaUID"
  ]},

  { grupo: "dadosLiquidacao.dadosRemessa.remessas", itens: [
      "@dadosLiquidacao.dadosRemessa.remessas.dataReferenciaMovimento",
      "@dadosLiquidacao.dadosRemessa.remessas.numeroRemessa",
      "@dadosLiquidacao.dadosRemessa.remessas.origem",
      "@dadosLiquidacao.dadosRemessa.remessas.plataforma",
      "@dadosLiquidacao.dadosRemessa.remessas.versaoArquivoMensageria"
  ]},

  { grupo: "dadosLiquidacao.participantes", itens: [
      "@dadosLiquidacao.participantes.codigo",
      "@dadosLiquidacao.participantes.razaoSocial",
      "@dadosLiquidacao.participantes.tipoParticipante"
  ]},

  { grupo: "Registro00", itens: [
      "@registro00.bancoEmissor",
      "@registro00.cidadePontoVenda",
      "@registro00.codigoAutorizacaoTransacao",
      "@registro00.codigoBandeira",
      "@registro00.codigoCredenciador",
      "@registro00.codigoMoedaTransacao",
      "@registro00.codigoMotivoDisputa",
      "@registro00.codigoPaisPontoVenda",
      "@registro00.codigoProcesso",
      "@registro00.codigoTransacao",
      "@registro00.dataMovimentoOuDisputa",
      "@registro00.dataVendaSaque",
      "@registro00.horaVendaSaque",
      "@registro00.identificadorTipoTransacao",
      "@registro00.indicadorOrigemAutorizacaoCancelamento",
      "@registro00.indicadorTecnologiaTerminal",
      "@registro00.indicadorTipoBeneficio",
      "@registro00.mccPontoVenda",
      "@registro00.meioIdentificacaoPortador",
      "@registro00.modoEntradaTransacaoPos",
      "@registro00.nomePontoVenda",
      "@registro00.numeroCartao",
      "@registro00.numeroReferenciaTransacao",
      "@registro00.subCodigoTransacao",
      "@registro00.tipoLiquidacao",
      "@registro00.valorVendaSaqueDisputa"
  ]},

  { grupo: "Registro01", itens: [
      "@registro01.carteiraDigitalId",
      "@registro01.codigoCondicionalTransacaoComChip",
      "@registro01.codigoProduto",
      "@registro01.codigoTransacao",
      "@registro01.cpfCnpj",
      "@registro01.indicadorEnvioDocumentacao",
      "@registro01.indicadorMovimentacao",
      "@registro01.indicadorTransacaoPorTelefoneOuEcommerce",
      "@registro01.numeroLogicoEquipamento",
      "@registro01.numeroParcela",
      "@registro01.numeroReferenciaDisputa",
      "@registro01.pontoVenda",
      "@registro01.quantidadeParcelasTransacao",
      "@registro01.subCodigoTransacao",
      "@registro01.tarifaPagamentoInsumo",
      "@registro01.textoLivreEmissorCredenciador",
      "@registro01.tipoPessoa",
      "@registro01.valorTaxaEmbarque",
      "@registro01.valorTransacao",
      "@registro01.valorTrocoOuAgroDebito"
  ]},

  { grupo: "Registro02", itens: [
      "@registro02.cepEstabelecimentoComercial",
      "@registro02.codigoIbge",
      "@registro02.codigoPaisLiquidacao",
      "@registro02.codigoPontoVendaOuMarketplace",
      "@registro02.codigoTransacao",
      "@registro02.dataLiquidacaoTransacao",
      "@registro02.dataMovimentoTransacaoOriginal",
      "@registro02.idReferenciaBandeira",
      "@registro02.quantidadeDiasLiquidacaoFinanceiraTransacao",
      "@registro02.subCodigoTransacao",
      "@registro02.tipoOperacao",
      "@registro02.tokenAssuranceLevel",
      "@registro02.tokenPan",
      "@registro02.tokenRequestorId",
      "@registro02.valorIntercambio"
  ]},

  { grupo: "Registro05", itens: [
      "@registro05.codigoMoedaValorAutorizado",
      "@registro05.codigoQualificadorTransacao",
      "@registro05.codigoRespostaAutorizacao",
      "@registro05.codigoResultadoVerificacaoCavv",
      "@registro05.codigoTransacao",
      "@registro05.identificadorTransacao",
      "@registro05.indicadorAutorizacaoEspecifica",
      "@registro05.indicadorComercioEletronico",
      "@registro05.indicadorDireitoDevolucao",
      "@registro05.numeroSequenciaComponenteTransacao",
      "@registro05.valorAutorizado",
      "@registro05.valorTotalAutorizado",
      "@registro05.valorVerificacaoAutenticacaoPortadorCavv"
  ]},

  { grupo: "Registro07", itens: [
      "@registro07.applicationInterchangeProfile",
      "@registro07.capacidadeTerminal",
      "@registro07.codigoMoeda",
      "@registro07.codigoPaisTerminal",
      "@registro07.codigoQualificadorTransacao",
      "@registro07.codigoTransacao",
      "@registro07.contadorTransacaoAplicacao",
      "@registro07.criptograma",
      "@registro07.dadosAplicacaoEmissor",
      "@registro07.dataTransacaoTerminal",
      "@registro07.formFactorIndicator",
      "@registro07.indiceDerivacaoChave",
      "@registro07.numeroRandomicoCriptograma",
      "@registro07.numeroSequenciaComponenteTransacao",
      "@registro07.numeroSequencialCartao",
      "@registro07.numeroSerieTerminal",
      "@registro07.numeroVersaoCriptograma",
      "@registro07.tipoTransacao",
      "@registro07.valorSecundarioTransacao",
      "@registro07.valorTransacaoCriptograma",
      "@registro07.verificacaoResultadoCartao",
      "@registro07.verificacaoResultadoTerminal"
  ]},

  { grupo: "Registro09", itens: [
      "@registro09.codigoErro",
      "@registro09.codigoTransacao",
      "@registro09.codigoTransacaoOriginal",
      "@registro09.dataMovimento",
      "@registro09.descricaoErro",
      "@registro09.PosicaoComErro",
      "@registro09.registroComErro",
      "@registro09.subCodigoTransacao"
  ]}
],

  Standin: [

  // =========================
  // GERAL
  // =========================
  {
    grupo: "GERAL",
    itens: [
      "@date", "@level", "@pid", "@application", "@executor", "@nomePod",
      "@traceId", "@spanId", "@mti", "@bin", "@numeroCartao",
      "@valorTransacao", "@nsu", "@mcc", "@modoEntrada", "@codigoCredenciadora",
      "@codigoAutorizacao", "@dataHoraEvento", "@transacaoId", "@hashCartao",
      "@situacaoEnvio", "@dataHoraTransacao", "@codigoBandeira", "@codigoEmissor",
      "@codigoProcessadora", "@situacaoCompra", "@statusEnvioReversao", "@cdPrdEmsr",
      "@afe", "@nrid", "@plataforma", "@region", "@motivo",
      "@regraUtilizada", "@nomeClasse", "@message"
    ]
  },
{ grupo: "BIT03", itens: ["@Bit03CodigoProcessamento"] },
{ grupo: "BIT05", itens: ["@Bit05"] },
{ grupo: "BIT06", itens: ["@Bit06"] },
{ grupo: "BIT07", itens: ["@Bit07"] },
{ grupo: "BIT08", itens: ["@Bit08TaxaValorFaturaPortador"] },
{ grupo: "BIT09", itens: ["@Bit09TaxaConversaoMoedaLocal"] },
{ grupo: "BIT10", itens: ["@Bit10TaxaConversaoFaturaPortador"] },
{ grupo: "BIT12", itens: ["@Bit12HoraLocalTransacao"] },
{ grupo: "BIT13", itens: ["@Bit13DataLocalTransacao"] },
{ grupo: "BIT14", itens: ["@Bit14DataValidadeCartao"] },
{ grupo: "BIT15", itens: ["@Bit15DataLiquidacao"] },
{ grupo: "BIT16", itens: ["@Bit16DataConversaoMoeda"] },
{ grupo: "BIT19", itens: ["@Bit19CodigoPaisCredenciadora"] },
{ grupo: "BIT23", itens: ["@Bit23NumeroSequenciaCartao"] },
{ grupo: "BIT24", itens: ["@Bit24CodigoFuncao"] },
{ grupo: "BIT25", itens: ["@Bit25CodigoMotivoMensagem"] },
{ grupo: "BIT26", itens: ["@Bit26CodigoCapturaPinPOS"] },
{ grupo: "BIT28", itens: ["@Bit28ValorTaxaTransacao"] },
{ grupo: "BIT29", itens: ["@Bit29ValorTaxaMoedaLiquidacao"] },
{ grupo: "BIT33", itens: ["@Bit33CodigoInstituicaoRepasse"] },
{ grupo: "BIT35", itens: ["@Bit35Trilha02Cartao"] },
{ grupo: "BIT36", itens: ["@Bit36Trilha03Cartao"] },
{ grupo: "BIT37", itens: ["@Bit37NsuRedeCaptura"] },
{ grupo: "BIT39", itens: ["@Bit39CodigoResposta"] },
{ grupo: "BIT41", itens: ["@Bit41IdentificacaoTerminal"] },
{ grupo: "BIT42", itens: ["@Bit42CodigoEstabelecimento"] },
{ grupo: "BIT43", itens: ["@Bit43NomeEstabelecimento"] },
{ grupo: "BIT45", itens: ["@Bit45Trilha01Cartao"] },
{ grupo: "BIT46", itens: ["@Bit46InformacoesAdicionaisResposta"] },
{ grupo: "BIT47", itens: ["@Bit47DadosAdicionaisNacionais"] },
{ grupo: "BIT48", itens: ["@Bit48InformacoesAdicionais"] },
{ grupo: "BIT49", itens: ["@Bit49CodigoMoeda"] },
{ grupo: "BIT50", itens: ["@Bit50CodigoMoedaLiquidacao"] },
{ grupo: "BIT51", itens: ["@Bit51CodigoMoedaFaturaPortador"] },
{ grupo: "BIT52", itens: ["@Bit52DadosPin"] },
{ grupo: "BIT53", itens: ["@Bit53InformacaoControleSeguranca"] },
{ grupo: "BIT54", itens: ["@Bit54ValoresAdicionais"] },
{ grupo: "BIT55", itens: ["@Bit55CodificacaoInformacoesEmv"] },
{ grupo: "BIT56", itens: ["@Bit56DadosRelacionadosPortador"] },
{ grupo: "BIT58", itens: ["@Bit58DadosGeograficos"] },
{ grupo: "BIT59", itens: ["@Bit59DadosTransporte"] },
{ grupo: "BIT60", itens: ["@Bit60DadosAdicionaisTerminal"] },
{ grupo: "BIT62", itens: ["@Bit62DadosIdentificarTransacoesOnline"] },
{ grupo: "BIT63", itens: ["@Bit63ServicoVerificacaoEnderecoAVS"] },
{ grupo: "BIT90", itens: ["@Bit90DadosTransacaoOriginal"] },
{ grupo: "BIT95", itens: ["@Bit95"] },
{ grupo: "BIT104", itens: ["@Bit104DadosTransacoesEspecificas03"] },
{ grupo: "BIT105", itens: ["@Bit105DadosTransacoesEspecificas02"] },
{ grupo: "BIT106", itens: ["@Bit106DadosTransacionais"] },
{ grupo: "BIT107", itens: ["@Bit107DadosTransacoesEspecificas"] },
{ grupo: "BIT121", itens: ["@Bit121BlocoSecundarioPin"] },
{ grupo: "BIT122", itens: ["@Bit122DadosAdicionaisAutenticacao"] },
{ grupo: "BIT123", itens: ["@Bit123CampoPromocional"] },
{ grupo: "BIT124", itens: ["@Bit124QualificadorTransacoes"] },
{ grupo: "BIT125", itens: ["@Bit125CampoParaUsoPersonalizado"] },
{ grupo: "BIT126", itens: ["@Bit126IdentificadorCartaoCVE2"] },
{ grupo: "BIT127", itens: ["@Bit127IndicadorVersao"] }

],

  Advice: [

{
    grupo: "GERAL",
    itens: [
      "@date", "@level", "@pid", "@application", "@executor", "@nomePod",
      "@traceId", "@spanId", "@tipoMensagemBit0", "@bin", "@numeroCartao",
      "@nsu", "@dataHoraEvento", "@id", "@hashCartao", "@situacaoEnvio",
      "@flagEspelho", "@codigoEmissor", "@cdPrEmsr", "@Bit48TransacaoAfe",
      "@nrid", "@plataforma", "@codigoBandeira", "@region", "@motivo",
      "@codigoRegraUtilizada", "@nomeClasse", "@message"
    ]
  },

{ grupo: "BIT03", itens: ["@Bit03CodigoProcessamento"] },
{ grupo: "BIT04", itens: ["@Bit04ValorTransacao"] },
{ grupo: "BIT05", itens: ["@Bit05"] },
{ grupo: "BIT06", itens: ["@Bit06"] },
{ grupo: "BIT07", itens: ["@Bit07DataHoraTransmissao"] },
{ grupo: "BIT08", itens: ["@Bit08TaxaValorFaturaPortador"] },
{ grupo: "BIT09", itens: ["@Bit09TaxaConversaoMoedaLocalParaMoedaLiquidacao"] },
{ grupo: "BIT10", itens: ["@Bit10TaxaConversaoFaturaPortador"] },
{ grupo: "BIT12", itens: ["@Bit12HoraLocalTransacao"] },
{ grupo: "BIT13", itens: ["@Bit13DataLocalTransacao"] },
{ grupo: "BIT14", itens: ["@Bit14DataValidadeCartao"] },
{ grupo: "BIT15", itens: ["@Bit15DataLiquidacao"] },
{ grupo: "BIT16", itens: ["@Bit16DataConversaoMoeda"] },
{ grupo: "BIT18", itens: ["@Bit18Mcc"] },
{ grupo: "BIT19", itens: ["@Bit19CodigoPais"] },
{ grupo: "BIT22", itens: ["@Bit22ModoEntrada"] },
{ grupo: "BIT23", itens: ["@Bit23NumeroSequenciaCartao"] },
{ grupo: "BIT24", itens: ["@Bit24CodigoFuncao"] },
{ grupo: "BIT25", itens: ["@Bit25CodigoMotivoMensagem"] },
{ grupo: "BIT26", itens: ["@Bit26CodigoCapturaPinPOS"] },
{ grupo: "BIT28", itens: ["@Bit28ValorTaxaTransacao"] },
{ grupo: "BIT29", itens: ["@Bit29ValorTaxaMoedaLiquidacao"] },
{ grupo: "BIT32", itens: ["@Bit32Credenciador"] },
{ grupo: "BIT33", itens: ["@Bit33CodigoInstituicaoRepasse"] },
{ grupo: "BIT35", itens: ["@Bit35Trilha02Cartao"] },
{ grupo: "BIT36", itens: ["@Bit36Trilha03Cartao"] },
{ grupo: "BIT37", itens: ["@Bit37Nsu"] },
{ grupo: "BIT38", itens: ["@Bit38CodigoAutorizacao"] },
{ grupo: "BIT39", itens: ["@Bit39CodigoResposta"] },
{ grupo: "BIT41", itens: ["@Bit41CodigoTerminal"] },
{ grupo: "BIT42", itens: ["@Bit42CodigoEC"] },
{ grupo: "BIT43", itens: ["@Bit43Estabelecimento"] },
{ grupo: "BIT45", itens: ["@Bit45Trilha01Cartao"] },
{ grupo: "BIT46", itens: ["@Bit46InformacoesAdicionaisResposta"] },
{ grupo: "BIT47", itens: ["@Bit47DadosAdicionaisNacionais"] },
{ grupo: "BIT48", itens: ["@Bit48InformacoesAdicionais", "@Bit48TransacaoAfe"] },
{ grupo: "BIT49", itens: ["@Bit49CodigoMoeda"] },
{ grupo: "BIT50", itens: ["@Bit50CodigoMoedaLiquidacao"] },
{ grupo: "BIT51", itens: ["@Bit51CodigoMoedaFaturaPortador"] },
{ grupo: "BIT52", itens: ["@Bit52DadosPin"] },
{ grupo: "BIT53", itens: ["@Bit53InformacaoControleRelacionadaSeguranca"] },
{ grupo: "BIT54", itens: ["@Bit54ValoresAdicionais"] },
{ grupo: "BIT55", itens: ["@Bit55CodificacaoInformacoesEmv"] },
{ grupo: "BIT56", itens: ["@Bit56DadosRelacionadosPortador"] },
{ grupo: "BIT58", itens: ["@Bit58DadosGeograficos"] },
{ grupo: "BIT59", itens: ["@Bit59DadosTransporte"] },
{ grupo: "BIT60", itens: ["@Bit60DadosAdicionaisTerminal"] },
{ grupo: "BIT62", itens: ["@Bit62DadosParaIdentificarTransacoesOnline"] },
{ grupo: "BIT63", itens: ["@Bit63ServicoVerificacaoEnderecoAVS"] },
{ grupo: "BIT90", itens: ["@Bit90DadosParaIdentificarTransacaoOriginal"] },
{ grupo: "BIT95", itens: ["@Bit95"] },
{ grupo: "BIT104", itens: ["@Bit104DadosTransacoesEspecificas03"] },
{ grupo: "BIT105", itens: ["@Bit105DadosTransacoesEspecificas02"] },
{ grupo: "BIT106", itens: ["@Bit106DadosTransacionais"] },
{ grupo: "BIT107", itens: ["@Bit107DadosTransacoesEspecificas"] },
{ grupo: "BIT121", itens: ["@Bit121BlocoSecundarioPin"] },
{ grupo: "BIT122", itens: ["@Bit122DadosAdicionaisAutenticacao"] },
{ grupo: "BIT123", itens: ["@Bit123CampoPromocional"] },
{ grupo: "BIT124", itens: ["@Bit124Score"] },
{ grupo: "BIT125", itens: ["@Bit125CampoParaUsoPersonalizado"] },
{ grupo: "BIT126", itens: ["@Bit126IdentificadorCartaoCVE2"] },
{ grupo: "BIT127", itens: ["@Bit127IndicadorVersao"] }
],
HubQRCode: [
  {
    grupo: "HubQRCode",
    itens: [
      "@CarteiraDigital",
      "@codigoCarteiraDigital",
      "@codigoCredenciador",
      "@codigoErro",
      "@codigoErroInteiro",
      "@codigoHash",
      "@codigoProduto",
      "@codigoTransacao",
      "@Credenciador",
      "@DataTransacao",
      "@dtCreated",
      "@finalCodigoErro",
      "@hostname",
      "@MensagemErro",
      "@MID",
      "@Moeda",
      "@PanHash",
      "@Parcelas",
      "@Produto",
      "@qrCodeTransactionId",
      "@service",
      "@Status",
      "@Terminal",
      "@TipoTokenizacao",
      "@TipoTransacao",
      "@Valor",
      "@Versao"
    ]
  }
],
"3DS-Autenticação": [
  {
    grupo: "3DS-Autenticação",
    itens: [
      "@3DSMethodCompletionInd",
      "@3DSServerOperId",
      "@3DSTransId",
      "@3DSUrl",
      "@3DSSRefNumber",
      "@AcquirerBin",
      "@AcsOperatorId",
      "@AcsRefNumber",
      "@Amount",
      "@CardholderIpAddress",
      "@Currency",
      "@DeviceChannel",
      "@DsTransId",
      "@Eci",
      "@FinalStatus",
      "@Issuer",
      "@MerchantCountryName",
      "@MerchantId",
      "@MerchantName",
      "@MerchantUrl",
      "@MessageCategory",
      "@MessageVersion",
      "@PanBin",
      "@PanLast4",
      "@PaymentSystemName",
      "@Protocol",
      "@RecordId",
      "@RequestorId",
      "@RequestorName",
      "@Service",
      "@TransactionDate",
      "@TransactionStatusCode",
      "@TransactionStatusReasonCode",
      "@TransactionTime"
    ]
  }

  ],
"Lyra": [
  {
    "grupo": "Lyra",
    "itens": [
      "@accountRiskData.accountId",
      "@accountRiskData.accountScore",
      "@accountRiskData.address",
      "@accountRiskData.zip",

      "@bin",
      "@cardReferenceId",
      "@createdAt",

      "@deviceRiskData.color",
      "@deviceRiskData.deviceID",
      "@deviceRiskData.deviceScore",
      "@deviceRiskData.deviceType",
      "@deviceRiskData.fullDeviceNumber",
      "@deviceRiskData.ipv4",
      "@deviceRiskData.name",
      "@deviceRiskData.osType",
      "@deviceRiskData.phoneNumberScore",
      "@deviceRiskData.SEID",

      "@Emissor",
      "@hostname",
      "@issuerId",
      "@nomeRegra",
      "@panHased",
      "@requestId",

      "@response.responseID",
      "@response.riskEvalID",

      "@riskEval.advice",
      "@riskEval.ruleDescription",
      "@riskEval.ruleId",

      "@schemeId",
      "@sender",
      "@service",
      "@tokenRequestorId",
      "@Wallet",

      "@walletRiskData.cardInputMethod",
      "@walletRiskData.flowAlgorithmVersion"
    

 ]
    }
  ],
  "TE40": [
    {
      grupo: "Registro00",
      itens: [
        "@codigoBandeira",
        "@codigoBandeiraAdicional",
        "@codigoCredenciador",
        "@codigoEmissor",
        "@codigoProcessadora",
        "@credenciador",
        "@dadosAdicionais.codigoRastreioCicloVidaTransacao",
        "@dadosAdicionais.flagCartaoPresente",
        "@dadosAdicionais.indicadorRota",
        "@dadosAdicionais.kafkaUID",
        "@dadosLiquidacao.dadosRemessa.remessas.dataReferenciaMovimento",
        "@dadosLiquidacao.dadosRemessa.remessas.numeroRemessa",
        "@dadosLiquidacao.dadosRemessa.remessas.origem",
        "@dadosLiquidacao.dadosRemessa.remessas.plataforma",
        "@dadosLiquidacao.dadosRemessa.remessas.versaoArquivoMensageria",
        "@dadosLiquidacao.participantes.codigo",
        "@dadosLiquidacao.participantes.razaoSocial",
        "@dadosLiquidacao.participantes.tipoParticipante",
        "@date",
        "@Emissor",
        "@hostname",
        "@mcc",
        "@modoEntrada",
        "@notificacao",
        "@plataforma",
        "@registroFraude00.bancoEmissor",
        "@registroFraude00.cidadePontoVenda",
        "@registroFraude00.codigoBandeira",
        "@registroFraude00.codigoCredenciador",
        "@registroFraude00.codigoErro",
        "@registroFraude00.codigoMoedaTransacaoFraudulenta",
        "@registroFraude00.codigoNotificacao",
        "@registroFraude00.codigoPaisPontoVenda",
        "@registroFraude00.codigoPontoVenda",
        "@registroFraude00.codigoTransacao",
        "@registroFraude00.complementoNumeroCartao",
        "@registroFraude00.dataNotificacaoFraude",
        "@registroFraude00.dataVencimentoCartao",
        "@registroFraude00.dataVenda",
        "@registroFraude00.idReferenciaBandeira",
        "@registroFraude00.indicadorOrigemAutorizacao",
        "@registroFraude00.mccPontoVenda",
        "@registroFraude00.numeroCartao",
        "@registroFraude00.numeroReferenciaTransacao",
        "@registroFraude00.subCodigoTransacao",
        "@registroFraude00.tipoFraude",
        "@registroFraude00.tipoPlataforma",
        "@registroFraude00.valorFraude",
        "@remessaCredenciador",
        "@remessaEmissor",
        "@sequencial",
        "@service"
      ]
    },
    {
      grupo: "Registro02",
      itens: [
        "@registroFraude02.cepPortador",
        "@registroFraude02.cidadePortador",
        "@registroFraude02.codigoAutorizacaoTransacao",
        "@registroFraude02.codigoTransacao",
        "@registroFraude02.dataConfirmacaoFraude",
        "@registroFraude02.identificacaoTecnologiaTerminal",
        "@registroFraude02.identificadorTransacao",
        "@registroFraude02.indicadorLiquidacao",
        "@registroFraude02.indicadorTransacaoRealizada",
        "@registroFraude02.indicadorTransacaoTroco",
        "@registroFraude02.meioIdentificacaoPortador",
        "@registroFraude02.modoEntradaTransacaoPos",
        "@registroFraude02.nomePortador",
        "@registroFraude02.numeroLogicoEquipamento",
        "@registroFraude02.pontoVenda",
        "@registroFraude02.subCodigoTransacao",
        "@registroFraude02.tecnologiaCartao",
        "@registroFraude02.tokenPan",
        "@registroFraude02.ufPortador",
      "@registroFraude02.valorTroco"
    ]
  }
],

  SimSwap: [
    {
      grupo: "SimSwap",
      itens: [
        "@Aplicacao",
        "@Error",
        "@Hostname",
        "@IdentificadorAplicacao",
        "@IdentificadorBancoDeDados",
        "@IdentificadorRequisicao",
        "@NivelRiscoFraude",
        "@NumeroTelefone",
        "@Operadora",
        "@PontuacaoDispositivoScore",
        "@service",
        "@Tag",
        "@TagDescricao",
      ],
    },
  ],
};

const emissores = [
  { autorizacao: "CAIXA-0104", liquidacao: "104-Caixa-Economica-Federal" },
  { autorizacao: "Bradesco-S/A-0237", liquidacao: "237-Banco-Bradesco-SA" },
  { autorizacao: "Banco-do-Brasil-0001", liquidacao: "1-Banco-do-Brasil-SA" },
  { autorizacao: "ZOOP-0595", liquidacao: "595-ZOOP-TECNOLOGIA-E-INSTITUICAO-DE-PAGAMENTO-SA" },
  { autorizacao: "Pernambucanas-0985", liquidacao: "985-Pernambucanas-Financiadora-SA-Cred-Fin-e-Investimento" },
  { autorizacao: "Banco-Pan-623", liquidacao: "623-Banco-Pan-SA" },
  { autorizacao: "Banco-Digio-Driver-0939", liquidacao: "939-Banco-Digio-Driver" },
  { autorizacao: "Alpha-1035", liquidacao: "1035-Alpha-Serviços-de-Rede-de-Autoatendimento-SA" },
  { autorizacao: "Seac-0976", liquidacao: "976-MULVI-Instituição-de-Pagamentos-SA" },
  { autorizacao: "Verdecard-0970", liquidacao: "970-Verde-Administradora-de-Cartoes-de-Credito-SA" },
  { autorizacao: "Sodexo-0883", liquidacao: "883-PLUXEE-INSTITUICAO-DE-PAGAMENTO-BRASIL-SA" },
  { autorizacao: "PicPay-876", liquidacao: "876-Picpay-Instituição-de-Pagamento-SA" },
  { autorizacao: "Bradescard-0063", liquidacao: "63-Banco-Bradescard" },
  { autorizacao: "Resomaq-816", liquidacao: "816-Resomaq-Resolução-Para-Meios-de-Pagamentos-LTDA-ME" },
  { autorizacao: "Volus-0964", liquidacao: "964-Volus-Tecnologia-e-Gestao-de-Beneficios-Ltda" },
  { autorizacao: "Vox-0951", liquidacao: "951-Voxcred-Administradora-de-Cartoes-Servicos-e-Processamento-SA" },
  { autorizacao: "Ticket-1023", liquidacao: "1023-Ticket-Serviços-SA" },
  { autorizacao: "Alelo-0989", liquidacao: "989-Alelo" },
  { autorizacao: "Edenred-0924", liquidacao: "924-Edenred-Soluções-de-Pagamento-Hyla-SA" },
  { autorizacao: "Banco-Mercantil-0389", liquidacao: "389-Banco-Mercantil-Do-Brasil-SA" },
  { autorizacao: "Crefisa-0069", liquidacao: "69-Banco-Crefisa-SA" },
  { autorizacao: "Issuer-0860", liquidacao: "860-ISSUER-INSTITUICAO-DE-PAGAMENTO-LTDA" },
  { autorizacao: "Becker-0963", liquidacao: "963-Becker-Financeira-SA" },
  { autorizacao: "BTR-0975", liquidacao: "975-BTR-Administradora-de-Cartao-de-Credito-refeicoes-e-Convenios-Ltda" },
  { autorizacao: "Banco-do-Sergipe-0047", liquidacao: "47-Banco-do-estado-de-Sergipe-SA" },
  { autorizacao: "Fitbank-956", liquidacao: "956-Fitbank-Pagamentos-Eletronicos-SA" },
  { autorizacao: "Valloo-0981", liquidacao: "981-Valloo-SA-Instituição-de-Pagamento" },
  { autorizacao: "BBC-JSL-0950", liquidacao: "950-BBC-Pagamentos-Ltda" },
  { autorizacao: "Dotz-0905", liquidacao: "905-Companhia-Global-de-Solucoes-e-Servicos-de-Pagamento-SA" },
  { autorizacao: "Bari-967", liquidacao: "967-Banco-Bari-de-Investimentos-e-Financiamentos-SA" },
  { autorizacao: "Onibank-862", liquidacao: "862-Onnibank-SA" },
  { autorizacao: "Dock-0906", liquidacao: "906-DOCK-INSTITUICAO-DE-PAGAMENTO-SA" },
  { autorizacao: "Banco-Getnet-0952", liquidacao: "952-Getnet-Adquirencia-e-Servicos-para-Meios-de-Pagamento-SA" },
  { autorizacao: "Valecard-1034", liquidacao: "1034-SERVNET-INSTITUIÇÃO-DE-PAGAMENTO-LTDA" },
  { autorizacao: "Swap-1010", liquidacao: "1010-SWAP-INSTITUIÇÃO-DE-PAGAMENTO-SA" },
  { autorizacao: "Biz-(Multissaldos)-1006", liquidacao: "1006-BIZ2U-INSTITUIÇÃO-DE-PAGAMENTO-LTDA" },
  { autorizacao: "Banrisul-1021", liquidacao: "1021-Banrisul-Soluções-de-Pagamento-SA-Instituição-de-Pagamento" },
  { autorizacao: "Diners-(compra)-9997", liquidacao: "" },
  { autorizacao: "Diners-(saque)-9999", liquidacao: "" },
  { autorizacao: "Resomaq-UPI-9994", liquidacao: "" },
  { autorizacao: "Valecard-81", liquidacao: "" },
  { autorizacao: "BMG-0318", liquidacao: "318-BMG" },
  { autorizacao: "", liquidacao: "971-Banco-BV-SA" },
  { autorizacao: "", liquidacao: "961-Cooperativa-de-Credito-Rural-de-Abelardo-Luz" },
  { autorizacao: "", liquidacao: "974-ASAAS-Gestao-Financeira-SA" },
];

const TICKET_URL = "https://cartaoelo.topdesk.net/tas/public/ssp/content/serviceflow?unid=b9925521-96c5-49a1-9b63-126a87677929";

const comoUsarTopicos = [
  {
    numero: "1",
    titulo: "Atenção com MID",
    corpo: "Ao realizar buscas pelo MID, é fundamental respeitar a quantidade exata de 15 caracteres. Inserir o valor com dígitos a mais ou a menos faz com que a busca retorne 0 resultados, mesmo que a transação exista no Datadog.",
    dica: "Copie o valor diretamente do Log Explorer para evitar erros de digitação.",
    exemplos: [
      { codigo: "@Bit42mid:501102000205138", desc: "15 dígitos — MID normal" },
      { codigo: "@Bit42mid:000000013096250", desc: "15 dígitos — com zeros à esquerda" },
      { codigo: '@Bit42mid:"74311468       "', desc: "15 dígitos — com espaços, usar aspas" },
    ],
  },
  {
    numero: "2",
    titulo: "Maiúsculas e minúsculas interferem na busca",
    corpo: "O Datadog é case-sensitive. Isso significa que 'Credito' e 'CREDITO' são tratados como valores diferentes e podem retornar resultados distintos.",
    dica: "Use exatamente a mesma capitalização que aparece no log da transação.",
    exemplos: [
      { codigo: "@Bit03contaOrigem:Credito", desc: "✓ correto" },
      { codigo: "@Bit03contaOrigem:CREDITO", desc: "✗ pode não retornar resultados" },
    ],
  },
  {
    numero: "3",
    titulo: "Busca com espaços — uso de aspas",
    corpo: "Quando o valor pesquisado contém espaços, é obrigatório colocá-lo entre aspas duplas. Sem as aspas, o Datadog interpreta cada palavra separadamente.",
    dica: "Inclua os espaços existentes dentro das aspas para que a busca seja exata.",
    exemplos: [
      { codigo: "@Bit43Estabelecimento:PG *LEROY MERLIN", desc: "✗ sem aspas — não funciona" },
      { codigo: '@Bit43Estabelecimento:"PG *LEROY MERLIN"', desc: "✓ com aspas — correto" },
    ],
  },
  {
    numero: "4",
    titulo: "Filtrar um único valor",
    corpo: "Para filtrar por um único valor em um campo, basta informar o campo e o valor diretamente, sem parênteses e sem operadores extras.",
    exemplos: [
      { codigo: "@nomeDoCampo:valor", desc: "sintaxe" },
      { codigo: "@codigoEmissor:104", desc: "exemplo" },
    ],
  },
  {
    numero: "5",
    titulo: "Filtrar dois ou mais valores no mesmo campo (OR)",
    corpo: "Para buscar mais de um valor dentro do mesmo campo, utilize o operador OR entre os valores e coloque-os entre parênteses.",
    dica: "Os parênteses são obrigatórios ao usar OR no mesmo campo.",
    exemplos: [
      { codigo: "@nomeDoCampo:(valor1 OR valor2)", desc: "sintaxe" },
      { codigo: "@codigoEmissor:(104 OR 1)", desc: "exemplo" },
    ],
  },
  {
    numero: "6",
    titulo: "Filtrar campos diferentes (AND)",
    corpo: "Para combinar filtros de campos diferentes, utilize o operador AND entre eles.",
    exemplos: [
      { codigo: "@campo1:valor1 AND @campo2:valor2", desc: "sintaxe" },
      { codigo: "@codigoEmissor:(104 OR 1) AND @tipoProduto:CREDITO", desc: "exemplo" },
    ],
  },
  {
    numero: "7",
    titulo: "Combinando múltiplos campos",
    corpo: "É possível encadear vários campos com AND para criar filtros muito específicos. Isso torna o campo Demais Filtros extremamente poderoso.",
    dica: "Você pode empilhar quantos campos quiser usando AND entre eles.",
    exemplos: [
      { codigo: "@codigoEmissor:(104 OR 1) AND @tipoProduto:CREDITO AND @Bit32Credenciador:(Rede-1606 OR Cielo-8364)", desc: "exemplo com três campos" },
    ],
  },
  {
    numero: "8",
    titulo: "AND dentro do mesmo campo NÃO funciona",
    corpo: "O operador AND só funciona para combinar campos diferentes. Para dois valores no mesmo campo, use sempre OR com parênteses.",
    exemplos: [
      { codigo: "@Bit32Credenciador:(Rede-1606 OR Cielo-8364)", desc: "✓ mesmo campo — usar OR" },
      { codigo: "@tipoProduto:CREDITO AND @codigoEmissor:104", desc: "✓ campos diferentes — usar AND" },
    ],
  },
  {
    numero: "9",
    titulo: "Negar um campo (- ou !)",
    corpo: "Para excluir um valor da busca, adicione um sinal de menos (-) ou ponto de exclamação (!) antes do campo. Ambos funcionam como operador de negação.",
    exemplos: [
      { codigo: "-@Bit32Credenciador:Rede-1606", desc: "usando sinal de menos" },
      { codigo: "!@Bit32Credenciador:Rede-1606", desc: "usando ponto de exclamação" },
    ],
  },
  {
    numero: "10",
    titulo: "Operadores de comparação numérica (>= e <=)",
    corpo: "Para campos numéricos, é possível utilizar operadores de comparação para definir intervalos de valores. Para um intervalo, combine >= e <= com AND e coloque entre parênteses.",
    exemplos: [
      { codigo: "@campo:>=valor", desc: "maior ou igual" },
      { codigo: "@campo:<=valor", desc: "menor ou igual" },
      { codigo: "(@Bit106conjuntoDados61Tag02:>=57800699999 AND @Bit106conjuntoDados61Tag02:<=57880000000)", desc: "exemplo de intervalo" },
    ],
  },
];

const gradientBtn = {
  background: "linear-gradient(90deg, rgb(47, 71, 190), rgb(186, 106, 228))",
  padding: "12px 20px",
  borderRadius: "10px",
  border: "none",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  transition: "transform 0.15s ease",
};

const buttonClickAnimation = (e) => {
  const btn = e.currentTarget;
  if (!btn) return;
  btn.style.transform = "scale(0.92)";
  setTimeout(() => { if (btn) btn.style.transform = "scale(1)"; }, 150);
};

export default function App() {
  const [selected, setSelected] = useState(null);
  const [searchTop, setSearchTop] = useState("");
  const [searchFields, setSearchFields] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [view, setView] = useState("campos");
  const [searchEmissores, setSearchEmissores] = useState("");
  const [expandedTopico, setExpandedTopico] = useState(null);

  const menuOptions = ["Autorização", "Liquidação", "Standin", "Advice", "HubQRCode", "3DS-Autenticação", "Lyra", "TE40", "SimSwap"];

  // ---- Login / modo de edição ----
  const VALID_USER = "Monitoria";
  const VALID_PASS = "12345";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState(false);

  // ---- Dados editáveis com persistência no Firebase ----
  const [servicesState, setServicesState] = useState(menuOptions);
  const [logPathsState, setLogPathsState] = useState(logPaths);
  const [camposState, setCamposState] = useState(campos);
  const [carregando, setCarregando] = useState(true);

  // Carrega dados do Firebase ao iniciar
  useEffect(() => {
    const carregar = async () => {
      try {
        const snap = await getDoc(doc(db, "config", "dados"));
        if (snap.exists()) {
          const data = snap.data();
          if (data.services) setServicesState(data.services);
          if (data.logPaths) setLogPathsState(data.logPaths);
          if (data.campos) setCamposState(data.campos);
        }
      } catch (e) {
        console.error("Erro ao carregar dados:", e);
      } finally {
        setCarregando(false);
      }
    };
    carregar();
  }, []);

  // Salva no Firebase
  const salvarNoFirebase = async (services, logPathsData, camposData) => {
    try {
      await setDoc(doc(db, "config", "dados"), {
        services,
        logPaths: logPathsData,
        campos: camposData,
      });
    } catch (e) {
      console.error("Erro ao salvar:", e);
    }
  };

  // ---- Modais de edição/adição de serviço ----
  const [editServiceModal, setEditServiceModal] = useState(null);
  const [editServiceValue, setEditServiceValue] = useState("");
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [newServiceValue, setNewServiceValue] = useState("");

  // ---- Modal de edição do caminho do log ----
  const [editLogPathModal, setEditLogPathModal] = useState(false);
  const [editLogPathValue, setEditLogPathValue] = useState("");

  // ---- Modais de edição/adição de campo ----
  const [editFieldModal, setEditFieldModal] = useState(null); // { groupIndex, itemIndex }
  const [editFieldValue, setEditFieldValue] = useState("");
  const [showAddFieldModal, setShowAddFieldModal] = useState(false);
  const [newFieldValue, setNewFieldValue] = useState("");

  const handleCopy = (text) => navigator.clipboard.writeText(text);

  const handleLogin = () => {
    if (loginUser === VALID_USER && loginPass === VALID_PASS) {
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setLoginUser("");
      setLoginPass("");
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleSalvar = async () => {
    await salvarNoFirebase(servicesState, logPathsState, camposState);
    setIsLoggedIn(false);
    setSelected(null);
  };

  const openEditService = (name, e) => {
    e && e.stopPropagation();
    setEditServiceModal(name);
    setEditServiceValue(name);
  };

  const saveEditService = () => {
    const oldName = editServiceModal;
    const newName = editServiceValue.trim();
    if (newName && oldName) {
      setServicesState((prev) => prev.map((n) => (n === oldName ? newName : n)));
      setLogPathsState((prev) => {
        const updated = { ...prev };
        updated[newName] = updated[oldName];
        if (newName !== oldName) delete updated[oldName];
        return updated;
      });
      setCamposState((prev) => {
        const updated = { ...prev };
        updated[newName] = updated[oldName];
        if (newName !== oldName) delete updated[oldName];
        return updated;
      });
      if (selected === oldName) setSelected(newName);
    }
    setEditServiceModal(null);
  };

  const saveAddService = () => {
    const name = newServiceValue.trim();
    if (name && !servicesState.includes(name)) {
      setServicesState((prev) => [...prev, name]);
      setLogPathsState((prev) => ({ ...prev, [name]: "service:" + name.toLowerCase().replace(/\s+/g, "-") + " env:prd" }));
      setCamposState((prev) => ({ ...prev, [name]: [{ grupo: "Geral", itens: [] }] }));
    }
    setShowAddServiceModal(false);
    setNewServiceValue("");
  };

  const openEditLogPath = () => {
    setEditLogPathValue(logPathsState[selected] || "");
    setEditLogPathModal(true);
  };

  const saveEditLogPath = () => {
    const val = editLogPathValue.trim();
    if (val) {
      setLogPathsState((prev) => ({ ...prev, [selected]: val }));
    }
    setEditLogPathModal(false);
  };

  const openEditField = (groupIndex, itemIndex) => {
    setEditFieldModal({ groupIndex, itemIndex });
    setEditFieldValue(camposState[selected][groupIndex].itens[itemIndex]);
  };

  const saveEditField = () => {
    const val = editFieldValue.trim();
    if (val && editFieldModal) {
      setCamposState((prev) => {
        const updated = { ...prev };
        const groups = updated[selected].map((g) => ({ ...g, itens: [...g.itens] }));
        groups[editFieldModal.groupIndex].itens[editFieldModal.itemIndex] = val;
        updated[selected] = groups;
        return updated;
      });
    }
    setEditFieldModal(null);
  };

  const saveAddField = () => {
    const val = newFieldValue.trim();
    if (val) {
      setCamposState((prev) => {
        const updated = { ...prev };
        const groups = [...(updated[selected] || [])];
        const otherIdx = groups.findIndex((g) => g.grupo === "Adicionados");
        if (otherIdx >= 0) {
          groups[otherIdx] = { ...groups[otherIdx], itens: [...groups[otherIdx].itens, val] };
        } else {
          groups.push({ grupo: "Adicionados", itens: [val] });
        }
        updated[selected] = groups;
        return updated;
      });
    }
    setShowAddFieldModal(false);
    setNewFieldValue("");
  };

  const filteredMenu = servicesState.filter((option) =>
    option.toLowerCase().includes(searchTop.toLowerCase())
  );

  const filteredGroups =
    selected &&
    camposState[selected]?.map((group) => ({
      ...group,
      itens: group.itens.filter((item) =>
        item.toLowerCase().includes(searchFields.toLowerCase())
      ),
    }));

  const filteredEmissores = emissores.filter(
    (e) =>
      e.autorizacao.toLowerCase().includes(searchEmissores.toLowerCase()) ||
      e.liquidacao.toLowerCase().includes(searchEmissores.toLowerCase())
  );

  const headerTitle = view === "campos" ? "Pesquisa de Campos" : view === "emissores" ? "Emissores" : "Como usar o Datadog";

  if (carregando) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(90deg, rgb(47, 71, 190), rgb(186, 106, 228))" }}>
        <p style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>Carregando...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "white", color: "#5c2d91", fontFamily: "Arial, sans-serif" }}>

      {/* HEADER */}
      <div style={{
        width: "100%",
        padding: "25px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "linear-gradient(90deg, rgb(47, 71, 190), rgb(186, 106, 228))",
        color: "white",
        fontSize: "26px",
        fontWeight: "bold",
        marginBottom: "30px",
        boxSizing: "border-box",
        position: "relative",
      }}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            padding: "8px 10px",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ display: "block", width: "22px", height: "2px", background: "white", borderRadius: "2px", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ display: "block", width: "22px", height: "2px", background: "white", borderRadius: "2px", opacity: menuOpen ? 0 : 1, transition: "all 0.3s" }} />
          <span style={{ display: "block", width: "22px", height: "2px", background: "white", borderRadius: "2px", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>

        <span style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          {headerTitle}
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {isLoggedIn && (
            <span style={{ fontSize: "12px", fontWeight: "bold", whiteSpace: "nowrap" }}>Monitoria</span>
          )}

          <button
            onClick={() => {
              if (isLoggedIn) {
                setIsLoggedIn(false);
              } else {
                setLoginError(false);
                setLoginUser("");
                setLoginPass("");
                setShowLoginModal(true);
              }
            }}
            title={isLoggedIn ? "Sair" : "Entrar"}
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              padding: "8px 10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
          </button>
        </div>
      </div>

      {/* SIDEBAR MENU */}
      {menuOpen && (
        <>
          <div onClick={() => setMenuOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 99 }} />
          <div style={{
            position: "fixed", top: 0, left: 0, height: "100%", width: "240px",
            background: "white", zIndex: 100, boxShadow: "4px 0 20px rgba(0,0,0,0.15)",
            display: "flex", flexDirection: "column",
          }}>
            <div style={{
              padding: "20px",
              background: "linear-gradient(90deg, rgb(47, 71, 190), rgb(186, 106, 228))",
              color: "white", fontWeight: "bold", fontSize: "18px",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span>Menu</span>
              <button onClick={() => setMenuOpen(false)} style={{ background: "none", border: "none", color: "white", fontSize: "20px", cursor: "pointer" }}>✕</button>
            </div>

            <div style={{ padding: "16px 0" }}>
              <MenuItem label="Pesquisa de Campos" active={view === "campos"} onClick={() => { setView("campos"); setMenuOpen(false); setSelected(null); }} />
              <MenuItem label="Emissores" active={view === "emissores"} onClick={() => { setView("emissores"); setMenuOpen(false); setSelected(null); }} />
              <MenuItem label="Como usar o Datadog" active={view === "como-usar"} onClick={() => { setView("como-usar"); setMenuOpen(false); setSelected(null); }} />
            </div>

            <div style={{ marginTop: "auto", padding: "16px" }}>
              <a
                href={TICKET_URL}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "12px",
                  borderRadius: "10px",
                  background: "linear-gradient(90deg, rgb(47, 71, 190), rgb(186, 106, 228))",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "14px",
                  textDecoration: "none",
                }}
              >
                Abrir Chamado Time Monitoria
              </a>
            </div>
          </div>
        </>
      )}

      {/* ── VIEW: PESQUISA DE CAMPOS ── */}
      {view === "campos" && (
        <>
          {!selected && (
            <div style={{ padding: "20px", textAlign: "center" }}>
              <div style={{ position: "relative", width: "60%", margin: "0 auto" }}>
                <input
                  value={searchTop}
                  onChange={(e) => setSearchTop(e.target.value)}
                  placeholder="Pesquisar..."
                  style={{ padding: "10px 40px 10px 15px", width: "100%", borderRadius: "8px", border: "2px solid #5c2d91", outline: "none", color: "black", fontSize: "16px" }}
                />
                <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "20px", color: "#5c2d91" }}> </span>
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", marginTop: "30px" }}>
                {filteredMenu.map((t) => (
                  <button
                    key={t}
                    onClick={(e) => { buttonClickAnimation(e); setSelected(t); setSearchFields(""); }}
                    style={{ ...gradientBtn, display: "inline-flex", alignItems: "center", gap: "8px" }}
                  >
                    {t}
                    {isLoggedIn && (
                      <span
                        onClick={(e) => openEditService(t, e)}
                        title="Editar nome do serviço"
                        style={{
                          background: "rgba(255,255,255,0.25)",
                          borderRadius: "50%",
                          width: "20px",
                          height: "20px",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                        </svg>
                      </span>
                    )}
                  </button>
                ))}
                {isLoggedIn && (
                  <button
                    onClick={() => { setNewServiceValue(""); setShowAddServiceModal(true); }}
                    title="Adicionar serviço"
                    style={{
                      background: "white",
                      border: "2px dashed #5c2d91",
                      color: "#5c2d91",
                      borderRadius: "24px",
                      width: "48px",
                      height: "48px",
                      fontSize: "22px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    +
                  </button>
                )}
                {filteredMenu.length === 0 && <p style={{ color: "#5c2d91", fontWeight: "bold" }}>Nenhum resultado encontrado</p>}
              </div>
            </div>
          )}

          {selected && (
            <div style={{ padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <button onClick={(e) => { buttonClickAnimation(e); setSelected(null); }} style={gradientBtn}>← Voltar</button>
                {isLoggedIn && (
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => setShowAddFieldModal(true)}
                      style={{ ...gradientBtn, background: "linear-gradient(90deg, #7c3aed, #a855f7)" }}
                    >
                      + Adicionar campo
                    </button>
                    <button
                      onClick={(e) => { buttonClickAnimation(e); handleSalvar(); }}
                      style={{ ...gradientBtn, background: "linear-gradient(90deg, #16a34a, #22c55e)" }}
                    >
                      Salvar
                    </button>
                  </div>
                )}
              </div>
              <h2 style={{ color: "#5c2d91" }}>{selected}</h2>
              <div style={{ position: "relative", width: "60%", marginTop: "10px" }}>
                <input
                  value={searchFields}
                  onChange={(e) => setSearchFields(e.target.value)}
                  placeholder="Pesquisar campo..."
                  style={{ padding: "10px 40px 10px 15px", width: "100%", borderRadius: "8px", border: "2px solid #5c2d91", outline: "none", color: "black", fontSize: "16px" }}
                />
                <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "20px", color: "#5c2d91" }}> </span>
              </div>
              <div style={{ marginTop: "20px" }}>
                <strong style={{ color: "#5c2d91" }}>Caminho do log:</strong>
                <div style={{ marginTop: "8px", padding: "10px", background: "#ddd", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", color: "black", gap: "10px" }}>
                  <span>{logPathsState[selected]}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                    {isLoggedIn && (
                      <span
                        onClick={openEditLogPath}
                        title="Editar caminho do log"
                        style={{
                          background: "white",
                          border: "1.5px solid #5c2d91",
                          color: "#5c2d91",
                          borderRadius: "50%",
                          width: "28px",
                          height: "28px",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                        </svg>
                      </span>
                    )}
                    <button onClick={(e) => { buttonClickAnimation(e); handleCopy(logPathsState[selected]); }} style={{ ...gradientBtn, padding: "6px 12px" }}>Copiar</button>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: "20px" }}>
                {filteredGroups?.map((group, gIndex) =>
                  group.itens.length > 0 ? (
                    <div key={gIndex} style={{ marginBottom: "25px" }}>
                      <h3 style={{ color: "#5c2d91", marginBottom: "10px" }}>{group.grupo}:</h3>
                      {group.itens.map((campo, i) => {
                        const originalItemIndex = camposState[selected][gIndex].itens.indexOf(campo);
                        return (
                          <div key={i} style={{ padding: "10px", background: "#e6e6e6", borderRadius: "8px", marginBottom: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", color: "black", gap: "10px" }}>
                            <span>{campo}</span>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                              {isLoggedIn && (
                                <span
                                  onClick={() => openEditField(gIndex, originalItemIndex)}
                                  title="Editar campo"
                                  style={{
                                    background: "white",
                                    border: "1.5px solid #5c2d91",
                                    color: "#5c2d91",
                                    borderRadius: "50%",
                                    width: "28px",
                                    height: "28px",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                  }}
                                >
                                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 20h9" />
                                    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                                  </svg>
                                </span>
                              )}
                              <button onClick={(e) => { buttonClickAnimation(e); handleCopy(campo); }} style={{ ...gradientBtn, padding: "6px 12px" }}>Copiar</button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : null
                )}
                {isLoggedIn && (
                  <button
                    onClick={() => { setNewFieldValue(""); setShowAddFieldModal(true); }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "white",
                      border: "2px dashed #5c2d91",
                      color: "#5c2d91",
                      borderRadius: "10px",
                      padding: "12px 18px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      marginTop: "4px",
                    }}
                  >
                    + Adicionar campo
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {/* ── VIEW: EMISSORES ── */}
      {view === "emissores" && (
        <div style={{ padding: "20px" }}>
          <h2 style={{ color: "#5c2d91", marginBottom: "16px" }}>Emissor</h2>
          <div style={{ position: "relative", width: "60%", marginBottom: "20px" }}>
            <input
              value={searchEmissores}
              onChange={(e) => setSearchEmissores(e.target.value)}
              placeholder="Pesquisar emissor"
              style={{ padding: "10px 40px 10px 15px", width: "100%", borderRadius: "8px", border: "2px solid #5c2d91", outline: "none", color: "black", fontSize: "16px" }}
            />
            <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "20px", color: "#5c2d91" }}> </span>
          </div>
          <div style={{ overflowX: "auto", borderRadius: "12px", boxShadow: "0 4px 16px rgba(92,45,145,0.10)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "500px" }}>
              <thead>
                <tr>
                  <th style={{ background: "linear-gradient(90deg, rgb(47, 71, 190), rgb(186, 106, 228))", color: "white", padding: "14px 20px", textAlign: "left", fontSize: "15px", fontWeight: "bold", borderRadius: "12px 0 0 0" }}>Autorização</th>
                  <th style={{ background: "linear-gradient(90deg, rgb(186, 106, 228), rgb(47, 71, 190))", color: "white", padding: "14px 20px", textAlign: "left", fontSize: "15px", fontWeight: "bold", borderRadius: "0 12px 0 0" }}>Liquidação</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmissores.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#f5f0fb" : "white" }}>
                    <td style={{ padding: "11px 20px", color: "#3a1a6e", fontSize: "14px", borderBottom: "1px solid #e8dcf5" }}>
                      {row.autorizacao
                        ? <CopyableCell value={row.autorizacao} onCopy={handleCopy} gradientBtn={gradientBtn} buttonClickAnimation={buttonClickAnimation} />
                        : <span style={{ color: "#bbb" }}>—</span>}
                    </td>
                    <td style={{ padding: "11px 20px", color: "#3a1a6e", fontSize: "14px", borderBottom: "1px solid #e8dcf5" }}>
                      {row.liquidacao
                        ? <CopyableCell value={row.liquidacao} onCopy={handleCopy} gradientBtn={gradientBtn} buttonClickAnimation={buttonClickAnimation} />
                        : <span style={{ color: "#bbb" }}>—</span>}
                    </td>
                  </tr>
                ))}
                {filteredEmissores.length === 0 && (
                  <tr>
                    <td colSpan={2} style={{ padding: "20px", textAlign: "center", color: "#5c2d91", fontWeight: "bold" }}>Nenhum resultado encontrado</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── VIEW: COMO USAR O DATADOG ── */}
      {view === "como-usar" && (
        <div style={{ padding: "20px", maxWidth: "860px", margin: "0 auto" }}>
         

          <p style={{ color: "#5c2d91", fontSize: "15px", marginBottom: "24px", lineHeight: "1.6" }}>
            O campo <strong>Demais Filtros</strong> pode parecer complexo no primeiro contato, mas é um dos recursos mais
            poderosos da dashboard, ele permite filtrar por <strong>qualquer campo da mensageria</strong>.
            Clique em cada tópico para ver exemplos práticos.
          </p>

          {comoUsarTopicos.map((topico) => {
            const aberto = expandedTopico === topico.numero;
            return (
              <div
                key={topico.numero}
                style={{
                  marginBottom: "10px",
                  borderRadius: "10px",
                  border: `1.5px solid ${aberto ? "#7c3aed" : "#d8cff0"}`,
                  overflow: "hidden",
                  transition: "border-color 0.2s",
                }}
              >
                <button
                  onClick={() => setExpandedTopico(aberto ? null : topico.numero)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 18px",
                    background: aberto ? "linear-gradient(90deg, rgba(47,71,190,0.08), rgba(186,106,228,0.08))" : "white",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    gap: "12px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{
                      minWidth: "28px", height: "28px",
                      borderRadius: "50%",
                      background: "linear-gradient(90deg, rgb(47, 71, 190), rgb(186, 106, 228))",
                      color: "white",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "12px", fontWeight: "bold",
                    }}>{topico.numero}</span>
                    <span style={{ fontSize: "14px", fontWeight: "bold", color: "#3a1a6e" }}>{topico.titulo}</span>
                  </div>
                  <span style={{ fontSize: "18px", color: "#7c3aed", transform: aberto ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</span>
                </button>

                {aberto && (
                  <div style={{ padding: "0 18px 18px", background: "white" }}>
                    <p style={{ fontSize: "14px", color: "#444", lineHeight: "1.7", marginBottom: "10px" }}>{topico.corpo}</p>

                    {topico.dica && (
                      <div style={{ background: "#e8f5e9", borderRadius: "8px", padding: "10px 14px", marginBottom: "12px", fontSize: "13px", color: "#1b5e20" }}>
                        <strong>Dica:</strong> {topico.dica}
                      </div>
                    )}

                    {topico.exemplos && topico.exemplos.length > 0 && (
                      <div>
                        <p style={{ fontSize: "12px", color: "#888", marginBottom: "6px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.5px" }}>Exemplos</p>
                        {topico.exemplos.map((ex, i) => (
                          <div
                            key={i}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              background: "#f4f0ff",
                              borderRadius: "8px",
                              padding: "8px 12px",
                              marginBottom: "6px",
                              gap: "10px",
                            }}
                          >
                            <div style={{ flex: 1 }}>
                              <code style={{ fontSize: "12px", color: "#3a1a6e", wordBreak: "break-all" }}>{ex.codigo}</code>
                              {ex.desc && (
                                <span style={{ fontSize: "11px", color: "#888", marginLeft: "8px" }}>— {ex.desc}</span>
                              )}
                            </div>
                            <CopyableCell
                              value={ex.codigo}
                              onCopy={handleCopy}
                              gradientBtn={gradientBtn}
                              buttonClickAnimation={buttonClickAnimation}
                              somenteBotao
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── MODAL: LOGIN ── */}
      {showLoginModal && (
        <ModalOverlay onClose={() => setShowLoginModal(false)}>
          <h2 style={modalTitleStyle}>Entrar</h2>
          <label style={modalLabelStyle}>Usuário</label>
          <input
            value={loginUser}
            onChange={(e) => setLoginUser(e.target.value)}
            style={modalInputStyle}
            placeholder="Usuário"
          />
          <label style={modalLabelStyle}>Senha</label>
          <input
            type="password"
            value={loginPass}
            onChange={(e) => setLoginPass(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleLogin(); }}
            style={modalInputStyle}
            placeholder="Senha"
          />
          {loginError && <p style={{ color: "#dc2626", fontSize: "13px", margin: "-8px 0 12px" }}>Usuário ou senha inválidos.</p>}
          <div style={modalActionsStyle}>
            <button onClick={() => setShowLoginModal(false)} style={modalSecondaryBtnStyle}>Cancelar</button>
            <button onClick={handleLogin} style={{ ...gradientBtn, flex: 1 }}>Entrar</button>
          </div>
        </ModalOverlay>
      )}

      {/* ── MODAL: EDITAR NOME DO SERVIÇO ── */}
      {editServiceModal && (
        <ModalOverlay onClose={() => setEditServiceModal(null)}>
          <h2 style={modalTitleStyle}>Editar serviço</h2>
          <label style={modalLabelStyle}>Nome do serviço</label>
          <input
            value={editServiceValue}
            onChange={(e) => setEditServiceValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") saveEditService(); }}
            style={modalInputStyle}
            placeholder="Nome do serviço"
            autoFocus
          />
          <div style={modalActionsStyle}>
            <button onClick={() => setEditServiceModal(null)} style={modalSecondaryBtnStyle}>Cancelar</button>
            <button onClick={saveEditService} style={{ ...gradientBtn, flex: 1 }}>Salvar</button>
          </div>
        </ModalOverlay>
      )}

      {/* ── MODAL: ADICIONAR SERVIÇO ── */}
      {showAddServiceModal && (
        <ModalOverlay onClose={() => setShowAddServiceModal(false)}>
          <h2 style={modalTitleStyle}>Novo serviço</h2>
          <label style={modalLabelStyle}>Nome do serviço</label>
          <input
            value={newServiceValue}
            onChange={(e) => setNewServiceValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") saveAddService(); }}
            style={modalInputStyle}
            placeholder="Nome do serviço"
            autoFocus
          />
          <div style={modalActionsStyle}>
            <button onClick={() => setShowAddServiceModal(false)} style={modalSecondaryBtnStyle}>Cancelar</button>
            <button onClick={saveAddService} style={{ ...gradientBtn, flex: 1 }}>Adicionar</button>
          </div>
        </ModalOverlay>
      )}

      {/* ── MODAL: EDITAR CAMINHO DO LOG ── */}
      {editLogPathModal && (
        <ModalOverlay onClose={() => setEditLogPathModal(false)}>
          <h2 style={modalTitleStyle}>Editar caminho do log</h2>
          <label style={modalLabelStyle}>Valor</label>
          <input
            value={editLogPathValue}
            onChange={(e) => setEditLogPathValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") saveEditLogPath(); }}
            style={modalInputStyle}
            placeholder="Caminho do log"
            autoFocus
          />
          <div style={modalActionsStyle}>
            <button onClick={() => setEditLogPathModal(false)} style={modalSecondaryBtnStyle}>Cancelar</button>
            <button onClick={saveEditLogPath} style={{ ...gradientBtn, flex: 1 }}>Salvar</button>
          </div>
        </ModalOverlay>
      )}

      {/* ── MODAL: EDITAR CAMPO ── */}
      {editFieldModal && (
        <ModalOverlay onClose={() => setEditFieldModal(null)}>
          <h2 style={modalTitleStyle}>Editar campo</h2>
          <label style={modalLabelStyle}>Valor</label>
          <input
            value={editFieldValue}
            onChange={(e) => setEditFieldValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") saveEditField(); }}
            style={modalInputStyle}
            placeholder="Valor do campo"
            autoFocus
          />
          <div style={modalActionsStyle}>
            <button onClick={() => setEditFieldModal(null)} style={modalSecondaryBtnStyle}>Cancelar</button>
            <button onClick={saveEditField} style={{ ...gradientBtn, flex: 1 }}>Salvar</button>
          </div>
        </ModalOverlay>
      )}

      {/* ── MODAL: ADICIONAR CAMPO ── */}
      {showAddFieldModal && (
        <ModalOverlay onClose={() => setShowAddFieldModal(false)}>
          <h2 style={modalTitleStyle}>Novo campo</h2>
          <label style={modalLabelStyle}>Valor do campo</label>
          <input
            value={newFieldValue}
            onChange={(e) => setNewFieldValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") saveAddField(); }}
            style={modalInputStyle}
            placeholder="Ex: @NomeDoCampo"
            autoFocus
          />
          <div style={modalActionsStyle}>
            <button onClick={() => setShowAddFieldModal(false)} style={modalSecondaryBtnStyle}>Cancelar</button>
            <button onClick={saveAddField} style={{ ...gradientBtn, flex: 1 }}>Adicionar</button>
          </div>
        </ModalOverlay>
      )}
    </div>
  );
}

function ModalOverlay({ children, onClose }) {
  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,15,25,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 200,
      }}
    >
      <div style={{ background: "white", borderRadius: "16px", width: "100%", maxWidth: "360px", padding: "32px 28px", boxShadow: "0 20px 50px rgba(0,0,0,0.25)" }}>
        {children}
      </div>
    </div>
  );
}

const modalTitleStyle = { margin: "0 0 20px", fontSize: "20px", color: "#1f2937", textAlign: "center" };
const modalLabelStyle = { display: "block", fontSize: "13px", fontWeight: "bold", marginBottom: "6px", color: "#1f2937" };
const modalInputStyle = { width: "100%", padding: "10px 12px", marginBottom: "16px", border: "1.5px solid #d1d5db", borderRadius: "8px", fontSize: "14px", outline: "none", color: "black", boxSizing: "border-box" };
const modalActionsStyle = { display: "flex", gap: "10px", marginTop: "8px" };
const modalSecondaryBtnStyle = { flex: 1, padding: "11px", border: "none", borderRadius: "8px", fontWeight: "bold", fontSize: "14px", cursor: "pointer", background: "#f3f4f6", color: "#1f2937" };

function MenuItem({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "block", width: "100%", textAlign: "left",
        padding: "13px 24px", border: "none", cursor: "pointer",
        background: active ? "linear-gradient(90deg, rgba(47,71,190,0.12), rgba(186,106,228,0.12))" : "transparent",
        color: active ? "#5c2d91" : "#444",
        fontWeight: active ? "bold" : "normal",
        fontSize: "15px",
        borderLeft: active ? "3px solid #7c3aed" : "3px solid transparent",
        transition: "all 0.2s",
      }}
    >
      {label}
    </button>
  );
}

function CopyableCell({ value, onCopy, gradientBtn, buttonClickAnimation, somenteBotao }) {
  const [copied, setCopied] = useState(false);
  const handleClick = (e) => {
    buttonClickAnimation(e);
    onCopy(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
      {!somenteBotao && <span>{value}</span>}
      <button onClick={handleClick} style={{ ...gradientBtn, padding: "4px 10px", fontSize: "12px", whiteSpace: "nowrap", flexShrink: 0 }}>
        {copied ? "✓" : "Copiar"}
      </button>
    </div>
  );
}