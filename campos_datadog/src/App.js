import React, { useState } from "react";

const logPaths = {
  Autorização: "service:autorizacao-kafka-parser-mensageria AVRO env:prd",
  Liquidação: "service:liquidacao-kafka-parser-mensageria env:prd ",
  Standin: "service:standin-consumidor-autorizacao env:prd",
  Advice: "service:standin-consumidor-advice \"TRANSACAO PERSISTIDA COM SUCESSO \" env:prd ",
  HubQRCode: "service:qr-code-v2-kafka-parser-mensageria env:prd ",
  "3DS-Autenticação":"service:rpa env:prd",
  Lyra:"service:lyra-kafka-parser-mensageria env:prd",
  TE40:"service:liquidacao-fraude-kafka-parser-mensageria env:prd",
  SimSwap:"service:simswap-kafka-parser-mensageria env:prd ",
};

const campos = {
Autorização: [
  // -------------------------
  // BITS ORDENADOS
  // -------------------------

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
  { grupo: "BIT55", itens: ["@Bit55","@bit55Tag9F02","@bit55Tag9F03","@bit55Tag9F1A","@bit55Tag5F2A","@bit55Tag9F37","@bit55Tag9F33","@bit55Tag9F34","@bit55Tag9F35","@bit55Tag9F36","@bit55Tag9F10","@bit55Tag9F26","@bit55Tag9F27","@bit55Tag9F6E","@bit55Tag9F06","@bit55Tag9F1E","@bit55Tag9F09","@bit55Tag9F41","@bit55Tag9F07","@bit55Tag9F5B","@bit55Tag9A","@bit55Tag9C","@bit55Tag71","@bit55Tag72","@bit55Tag84","@bit55Tag82","@bit55Tag91","@bit55Tag95"] },

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

  // =========================
  // BIT03
  // =========================
  { grupo: "BIT03", itens: ["@Bit03CodigoProcessamento"] },

  // =========================
  // BIT05
  // =========================
  { grupo: "BIT05", itens: ["@Bit05"] },

  // =========================
  // BIT06
  // =========================
  { grupo: "BIT06", itens: ["@Bit06"] },

  // =========================
  // BIT07
  // =========================
  { grupo: "BIT07", itens: ["@Bit07"] },

  // =========================
  // BIT08
  // =========================
  { grupo: "BIT08", itens: ["@Bit08TaxaValorFaturaPortador"] },

  // =========================
  // BIT09
  // =========================
  { grupo: "BIT09", itens: ["@Bit09TaxaConversaoMoedaLocal"] },

  // =========================
  // BIT10
  // =========================
  { grupo: "BIT10", itens: ["@Bit10TaxaConversaoFaturaPortador"] },

  // =========================
  // BIT12
  // =========================
  { grupo: "BIT12", itens: ["@Bit12HoraLocalTransacao"] },

  // =========================
  // BIT13
  // =========================
  { grupo: "BIT13", itens: ["@Bit13DataLocalTransacao"] },

  // =========================
  // BIT14
  // =========================
  { grupo: "BIT14", itens: ["@Bit14DataValidadeCartao"] },

  // =========================
  // BIT15
  // =========================
  { grupo: "BIT15", itens: ["@Bit15DataLiquidacao"] },

  // =========================
  // BIT16
  // =========================
  { grupo: "BIT16", itens: ["@Bit16DataConversaoMoeda"] },

  // =========================
  // BIT19
  // =========================
  { grupo: "BIT19", itens: ["@Bit19CodigoPaisCredenciadora"] },

  // =========================
  // BIT23
  // =========================
  { grupo: "BIT23", itens: ["@Bit23NumeroSequenciaCartao"] },

  // =========================
  // BIT24
  // =========================
  { grupo: "BIT24", itens: ["@Bit24CodigoFuncao"] },

  // =========================
  // BIT25
  // =========================
  { grupo: "BIT25", itens: ["@Bit25CodigoMotivoMensagem"] },

  // =========================
  // BIT26
  // =========================
  { grupo: "BIT26", itens: ["@Bit26CodigoCapturaPinPOS"] },

  // =========================
  // BIT28
  // =========================
  { grupo: "BIT28", itens: ["@Bit28ValorTaxaTransacao"] },

  // =========================
  // BIT29
  // =========================
  { grupo: "BIT29", itens: ["@Bit29ValorTaxaMoedaLiquidacao"] },

  // =========================
  // BIT33
  // =========================
  { grupo: "BIT33", itens: ["@Bit33CodigoInstituicaoRepasse"] },

  // =========================
  // BIT35
  // =========================
  { grupo: "BIT35", itens: ["@Bit35Trilha02Cartao"] },

  // =========================
  // BIT36
  // =========================
  { grupo: "BIT36", itens: ["@Bit36Trilha03Cartao"] },

  // =========================
  // BIT37
  // =========================
  { grupo: "BIT37", itens: ["@Bit37NsuRedeCaptura"] },

  // =========================
  // BIT39
  // =========================
  { grupo: "BIT39", itens: ["@Bit39CodigoResposta"] },

  // =========================
  // BIT41
  // =========================
  { grupo: "BIT41", itens: ["@Bit41IdentificacaoTerminal"] },

  // =========================
  // BIT42
  // =========================
  { grupo: "BIT42", itens: ["@Bit42CodigoEstabelecimento"] },

  // =========================
  // BIT43
  // =========================
  { grupo: "BIT43", itens: ["@Bit43NomeEstabelecimento"] },

  // =========================
  // BIT45
  // =========================
  { grupo: "BIT45", itens: ["@Bit45Trilha01Cartao"] },

  // =========================
  // BIT46
  // =========================
  { grupo: "BIT46", itens: ["@Bit46InformacoesAdicionaisResposta"] },

  // =========================
  // BIT47
  // =========================
  { grupo: "BIT47", itens: ["@Bit47DadosAdicionaisNacionais"] },

  // =========================
  // BIT48
  // =========================
  { grupo: "BIT48", itens: ["@Bit48InformacoesAdicionais"] },

  // =========================
  // BIT49
  // =========================
  { grupo: "BIT49", itens: ["@Bit49CodigoMoeda"] },

  // =========================
  // BIT50
  // =========================
  { grupo: "BIT50", itens: ["@Bit50CodigoMoedaLiquidacao"] },

  // =========================
  // BIT51
  // =========================
  { grupo: "BIT51", itens: ["@Bit51CodigoMoedaFaturaPortador"] },

  // =========================
  // BIT52
  // =========================
  { grupo: "BIT52", itens: ["@Bit52DadosPin"] },

  // =========================
  // BIT53
  // =========================
  { grupo: "BIT53", itens: ["@Bit53InformacaoControleSeguranca"] },

  // =========================
  // BIT54
  // =========================
  { grupo: "BIT54", itens: ["@Bit54ValoresAdicionais"] },

  // =========================
  // BIT55
  // =========================
  { grupo: "BIT55", itens: ["@Bit55CodificacaoInformacoesEmv"] },

  // =========================
  // BIT56
  // =========================
  { grupo: "BIT56", itens: ["@Bit56DadosRelacionadosPortador"] },

  // =========================
  // BIT58
  // =========================
  { grupo: "BIT58", itens: ["@Bit58DadosGeograficos"] },

  // =========================
  // BIT59
  // =========================
  { grupo: "BIT59", itens: ["@Bit59DadosTransporte"] },

  // =========================
  // BIT60
  // =========================
  { grupo: "BIT60", itens: ["@Bit60DadosAdicionaisTerminal"] },

  // =========================
  // BIT62
  // =========================
  { grupo: "BIT62", itens: ["@Bit62DadosIdentificarTransacoesOnline"] },

  // =========================
  // BIT63
  // =========================
  { grupo: "BIT63", itens: ["@Bit63ServicoVerificacaoEnderecoAVS"] },

  // =========================
  // BIT90
  // =========================
  { grupo: "BIT90", itens: ["@Bit90DadosTransacaoOriginal"] },

  // =========================
  // BIT95
  // =========================
  { grupo: "BIT95", itens: ["@Bit95"] },

  // =========================
  // BIT104
  // =========================
  { grupo: "BIT104", itens: ["@Bit104DadosTransacoesEspecificas03"] },

  // =========================
  // BIT105
  // =========================
  { grupo: "BIT105", itens: ["@Bit105DadosTransacoesEspecificas02"] },

  // =========================
  // BIT106
  // =========================
  { grupo: "BIT106", itens: ["@Bit106DadosTransacionais"] },

  // =========================
  // BIT107
  // =========================
  { grupo: "BIT107", itens: ["@Bit107DadosTransacoesEspecificas"] },

  // =========================
  // BIT121
  // =========================
  { grupo: "BIT121", itens: ["@Bit121BlocoSecundarioPin"] },

  // =========================
  // BIT122
  // =========================
  { grupo: "BIT122", itens: ["@Bit122DadosAdicionaisAutenticacao"] },

  // =========================
  // BIT123
  // =========================
  { grupo: "BIT123", itens: ["@Bit123CampoPromocional"] },

  // =========================
  // BIT124
  // =========================
  { grupo: "BIT124", itens: ["@Bit124QualificadorTransacoes"] },

  // =========================
  // BIT125
  // =========================
  { grupo: "BIT125", itens: ["@Bit125CampoParaUsoPersonalizado"] },

  // =========================
  // BIT126
  // =========================
  { grupo: "BIT126", itens: ["@Bit126IdentificadorCartaoCVE2"] },

  // =========================
  // BIT127
  // =========================
  { grupo: "BIT127", itens: ["@Bit127IndicadorVersao"] }

],

  Advice: [

  // =========================
  // GERAL
  // =========================
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

  // =========================
  // BIT03
  // =========================
  { grupo: "BIT03", itens: ["@Bit03CodigoProcessamento"] },

  // =========================
  // BIT04
  // =========================
  { grupo: "BIT04", itens: ["@Bit04ValorTransacao"] },

  // =========================
  // BIT05
  // =========================
  { grupo: "BIT05", itens: ["@Bit05"] },

  // =========================
  // BIT06
  // =========================
  { grupo: "BIT06", itens: ["@Bit06"] },

  // =========================
  // BIT07
  // =========================
  { grupo: "BIT07", itens: ["@Bit07DataHoraTransmissao"] },

  // =========================
  // BIT08
  // =========================
  { grupo: "BIT08", itens: ["@Bit08TaxaValorFaturaPortador"] },

  // =========================
  // BIT09
  // =========================
  { grupo: "BIT09", itens: ["@Bit09TaxaConversaoMoedaLocalParaMoedaLiquidacao"] },

  // =========================
  // BIT10
  // =========================
  { grupo: "BIT10", itens: ["@Bit10TaxaConversaoFaturaPortador"] },

  // =========================
  // BIT12
  // =========================
  { grupo: "BIT12", itens: ["@Bit12HoraLocalTransacao"] },

  // =========================
  // BIT13
  // =========================
  { grupo: "BIT13", itens: ["@Bit13DataLocalTransacao"] },

  // =========================
  // BIT14
  // =========================
  { grupo: "BIT14", itens: ["@Bit14DataValidadeCartao"] },

  // =========================
  // BIT15
  // =========================
  { grupo: "BIT15", itens: ["@Bit15DataLiquidacao"] },

  // =========================
  // BIT16
  // =========================
  { grupo: "BIT16", itens: ["@Bit16DataConversaoMoeda"] },

  // =========================
  // BIT18
  // =========================
  { grupo: "BIT18", itens: ["@Bit18Mcc"] },

  // =========================
  // BIT19
  // =========================
  { grupo: "BIT19", itens: ["@Bit19CodigoPais"] },

  // =========================
  // BIT22
  // =========================
  { grupo: "BIT22", itens: ["@Bit22ModoEntrada"] },

  // =========================
  // BIT23
  // =========================
  { grupo: "BIT23", itens: ["@Bit23NumeroSequenciaCartao"] },

  // =========================
  // BIT24
  // =========================
  { grupo: "BIT24", itens: ["@Bit24CodigoFuncao"] },

  // =========================
  // BIT25
  // =========================
  { grupo: "BIT25", itens: ["@Bit25CodigoMotivoMensagem"] },

  // =========================
  // BIT26
  // =========================
  { grupo: "BIT26", itens: ["@Bit26CodigoCapturaPinPOS"] },

  // =========================
  // BIT28
  // =========================
  { grupo: "BIT28", itens: ["@Bit28ValorTaxaTransacao"] },

  // =========================
  // BIT29
  // =========================
  { grupo: "BIT29", itens: ["@Bit29ValorTaxaMoedaLiquidacao"] },

  // =========================
  // BIT32
  // =========================
  { grupo: "BIT32", itens: ["@Bit32Credenciador"] },

  // =========================
  // BIT33
  // =========================
  { grupo: "BIT33", itens: ["@Bit33CodigoInstituicaoRepasse"] },

  // =========================
  // BIT35
  // =========================
  { grupo: "BIT35", itens: ["@Bit35Trilha02Cartao"] },

  // =========================
  // BIT36
  // =========================
  { grupo: "BIT36", itens: ["@Bit36Trilha03Cartao"] },

  // =========================
  // BIT37
  // =========================
  { grupo: "BIT37", itens: ["@Bit37Nsu"] },

  // =========================
  // BIT38
  // =========================
  { grupo: "BIT38", itens: ["@Bit38CodigoAutorizacao"] },

  // =========================
  // BIT39
  // =========================
  { grupo: "BIT39", itens: ["@Bit39CodigoResposta"] },

  // =========================
  // BIT41
  // =========================
  { grupo: "BIT41", itens: ["@Bit41CodigoTerminal"] },

  // =========================
  // BIT42
  // =========================
  { grupo: "BIT42", itens: ["@Bit42CodigoEC"] },

  // =========================
  // BIT43
  // =========================
  { grupo: "BIT43", itens: ["@Bit43Estabelecimento"] },

  // =========================
  // BIT45
  // =========================
  { grupo: "BIT45", itens: ["@Bit45Trilha01Cartao"] },

  // =========================
  // BIT46
  // =========================
  { grupo: "BIT46", itens: ["@Bit46InformacoesAdicionaisResposta"] },

  // =========================
  // BIT47
  // =========================
  { grupo: "BIT47", itens: ["@Bit47DadosAdicionaisNacionais"] },

  // =========================
  // BIT48
  // =========================
  { grupo: "BIT48", itens: ["@Bit48InformacoesAdicionais", "@Bit48TransacaoAfe"] },

  // =========================
  // BIT49
  // =========================
  { grupo: "BIT49", itens: ["@Bit49CodigoMoeda"] },

  // =========================
  // BIT50
  // =========================
  { grupo: "BIT50", itens: ["@Bit50CodigoMoedaLiquidacao"] },

  // =========================
  // BIT51
  // =========================
  { grupo: "BIT51", itens: ["@Bit51CodigoMoedaFaturaPortador"] },

  // =========================
  // BIT52
  // =========================
  { grupo: "BIT52", itens: ["@Bit52DadosPin"] },

  // =========================
  // BIT53
  // =========================
  { grupo: "BIT53", itens: ["@Bit53InformacaoControleRelacionadaSeguranca"] },

  // =========================
  // BIT54
  // =========================
  { grupo: "BIT54", itens: ["@Bit54ValoresAdicionais"] },

  // =========================
  // BIT55
  // =========================
  { grupo: "BIT55", itens: ["@Bit55CodificacaoInformacoesEmv"] },

  // =========================
  // BIT56
  // =========================
  { grupo: "BIT56", itens: ["@Bit56DadosRelacionadosPortador"] },

  // =========================
  // BIT58
  // =========================
  { grupo: "BIT58", itens: ["@Bit58DadosGeograficos"] },

  // =========================
  // BIT59
  // =========================
  { grupo: "BIT59", itens: ["@Bit59DadosTransporte"] },

  // =========================
  // BIT60
  // =========================
  { grupo: "BIT60", itens: ["@Bit60DadosAdicionaisTerminal"] },

  // =========================
  // BIT62
  // =========================
  { grupo: "BIT62", itens: ["@Bit62DadosParaIdentificarTransacoesOnline"] },

  // =========================
  // BIT63
  // =========================
  { grupo: "BIT63", itens: ["@Bit63ServicoVerificacaoEnderecoAVS"] },

  // =========================
  // BIT90
  // =========================
  { grupo: "BIT90", itens: ["@Bit90DadosParaIdentificarTransacaoOriginal"] },

  // =========================
  // BIT95
  // =========================
  { grupo: "BIT95", itens: ["@Bit95"] },

  // =========================
  // BIT104
  // =========================
  { grupo: "BIT104", itens: ["@Bit104DadosTransacoesEspecificas03"] },

  // =========================
  // BIT105
  // =========================
  { grupo: "BIT105", itens: ["@Bit105DadosTransacoesEspecificas02"] },

  // =========================
  // BIT106
  // =========================
  { grupo: "BIT106", itens: ["@Bit106DadosTransacionais"] },

  // =========================
  // BIT107
  // =========================
  { grupo: "BIT107", itens: ["@Bit107DadosTransacoesEspecificas"] },

  // =========================
  // BIT121
  // =========================
  { grupo: "BIT121", itens: ["@Bit121BlocoSecundarioPin"] },

  // =========================
  // BIT122
  // =========================
  { grupo: "BIT122", itens: ["@Bit122DadosAdicionaisAutenticacao"] },

  // =========================
  // BIT123
  // =========================
  { grupo: "BIT123", itens: ["@Bit123CampoPromocional"] },

  // =========================
  // BIT124
  // =========================
  { grupo: "BIT124", itens: ["@Bit124Score"] },

  // =========================
  // BIT125
  // =========================
  { grupo: "BIT125", itens: ["@Bit125CampoParaUsoPersonalizado"] },

  // =========================
  // BIT126
  // =========================
  { grupo: "BIT126", itens: ["@Bit126IdentificadorCartaoCVE2"] },

  // =========================
  // BIT127
  // =========================
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

"SimSwap": [
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
      "@TagDescricao"
    ]
  }
],}


function CalculadoraLicencas({ onClose }) {
  const [logsGB, setLogsGB] = useState(0);
  const [logsEventos, setLogsEventos] = useState(0);
  const [cotacao, setCotacao] = useState(5.50);
  const [qtde1, setQtde1] = useState(0);
  const [qtde2, setQtde2] = useState(0);

  const valorUnitIngestao = 0.14;
  const valorUnitIndexacao = 1.06;

  const calcular = () => {
    const ingestaoMesLogs = logsGB * 30;
    const licencasIngestao = Math.ceil(ingestaoMesLogs);
    const licencasRetencao = Math.ceil(logsEventos * 5.5);

    setQtde1(licencasIngestao);
    setQtde2(licencasRetencao);
  };

  const mensalDolar1 = qtde1 * valorUnitIngestao;
  const mensalDolar2 = qtde2 * valorUnitIndexacao;
  const totalDolar1 = mensalDolar1;
  const totalDolar2 = mensalDolar2;
  const totalReal1 = mensalDolar1 * cotacao;
  const totalReal2 = mensalDolar2 * cotacao;
  const totalGeralDolar = totalDolar1 + totalDolar2;
  const totalGeral = totalReal1 + totalReal2;

  React.useEffect(() => {
    calcular();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logsGB, logsEventos]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "30px",
          maxWidth: "900px",
          maxHeight: "90vh",
          overflow: "auto",
          width: "90%",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ margin: 0, color: "#7c3aed" }}>Calculadora de Licenças</h2>
          <button
            onClick={onClose}
            style={{
              background: "#e5e7eb",
              border: "none",
              borderRadius: "6px",
              padding: "8px 16px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            ✕ Fechar
          </button>
        </div>

        <h3 style={{ color: "#333" }}>Estimativa de Licenças</h3>

        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px", background: "#fff", border: "2px solid #7c3aed" }}>
          <thead>
            <tr style={{ background: "#7c3aed", color: "white" }}>
              <th style={{ padding: "12px", border: "1px solid #d1c4e9" }}>Produto</th>
              <th style={{ padding: "12px", border: "1px solid #d1c4e9" }}>GB/Dia</th>
              <th style={{ padding: "12px", border: "1px solid #d1c4e9" }}>Eventos/Dia</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "12px", border: "1px solid #d1c4e9", textAlign: "center" }}>Logs</td>
              <td style={{ padding: "12px", border: "1px solid #d1c4e9", textAlign: "center" }}>
                <input
                  type="number"
                  value={logsGB}
                  onChange={(e) => setLogsGB(parseFloat(e.target.value) || 0)}
                  style={{ width: "80px", padding: "6px", border: "1px solid #ccc", borderRadius: "5px", textAlign: "center" }}
                />
              </td>
              <td style={{ padding: "12px", border: "1px solid #d1c4e9", textAlign: "center" }}>
                <input
                  type="number"
                  value={logsEventos}
                  onChange={(e) => setLogsEventos(parseFloat(e.target.value) || 0)}
                  style={{ width: "80px", padding: "6px", border: "1px solid #ccc", borderRadius: "5px", textAlign: "center" }}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div style={{ color: "#5b21b6", fontWeight: "bold", marginTop: "15px", fontSize: "16px" }}>
          {qtde1} Licenças de Ingestão / {qtde2} Licenças de Retenção
        </div>

        <div style={{ background: "#e5e7eb", padding: "15px", marginTop: "20px", fontSize: "15px", borderRadius: "8px" }}>
          <strong>Resumo:</strong><br />
          - Ingestão Logs: {logsGB} GB/dia × 30 = {logsGB * 30} GB/mês<br />
          - Eventos Logs: {logsEventos} eventos/dia × 30 = {(logsEventos * 30).toLocaleString('pt-BR')} eventos/mês<br /><br />
          - <strong>Licenças:</strong> {qtde1} Licenças de Ingestão, {qtde2} Licenças de Retenção
        </div>

        <h3 style={{ marginTop: "30px", color: "#333" }}>Cálculo Valor Mensal de Licenças</h3>

        <p>
          <strong>Cotação Dólar:</strong> R${" "}
          <input
            type="number"
            value={cotacao}
            onChange={(e) => setCotacao(parseFloat(e.target.value) || 5.50)}
            step="0.01"
            style={{ width: "80px", padding: "6px", border: "1px solid #ccc", borderRadius: "5px", textAlign: "center" }}
          />
        </p>

        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px", background: "#fff", border: "2px solid #7c3aed" }}>
          <thead>
            <tr style={{ background: "#7c3aed", color: "white" }}>
              <th style={{ padding: "12px", border: "1px solid #d1c4e9", textAlign: "left" }}>Licença</th>
              <th style={{ padding: "12px", border: "1px solid #d1c4e9" }}>Valor Unit ($)</th>
              <th style={{ padding: "12px", border: "1px solid #d1c4e9" }}>Qtde</th>
              <th style={{ padding: "12px", border: "1px solid #d1c4e9" }}>Total Mensal ($)</th>
              <th style={{ padding: "12px", border: "1px solid #d1c4e9" }}>Total Mensal em Real (R$)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "12px", border: "1px solid #d1c4e9", textAlign: "left" }}>Ingestão</td>
              <td style={{ padding: "12px", border: "1px solid #d1c4e9", textAlign: "center" }}>{valorUnitIngestao}</td>
              <td style={{ padding: "12px", border: "1px solid #d1c4e9", textAlign: "center" }}>
                <input
                  type="number"
                  value={qtde1}
                  onChange={(e) => setQtde1(parseFloat(e.target.value) || 0)}
                  style={{ width: "80px", padding: "6px", border: "1px solid #ccc", borderRadius: "5px", textAlign: "center" }}
                />
              </td>
              <td style={{ padding: "12px", border: "1px solid #d1c4e9", textAlign: "center", fontWeight: "bold", color: "#7c3aed" }}>
                $ {totalDolar1.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td style={{ padding: "12px", border: "1px solid #d1c4e9", textAlign: "center", fontWeight: "bold", color: "#7c3aed" }}>
                R$ {totalReal1.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "12px", border: "1px solid #d1c4e9", textAlign: "left" }}>Indexação (retenção) 15 dias</td>
              <td style={{ padding: "12px", border: "1px solid #d1c4e9", textAlign: "center" }}>{valorUnitIndexacao}</td>
              <td style={{ padding: "12px", border: "1px solid #d1c4e9", textAlign: "center" }}>
                <input
                  type="number"
                  value={qtde2}
                  onChange={(e) => setQtde2(parseFloat(e.target.value) || 0)}
                  style={{ width: "80px", padding: "6px", border: "1px solid #ccc", borderRadius: "5px", textAlign: "center" }}
                />
              </td>
              <td style={{ padding: "12px", border: "1px solid #d1c4e9", textAlign: "center", fontWeight: "bold", color: "#7c3aed" }}>
                $ {totalDolar2.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td style={{ padding: "12px", border: "1px solid #d1c4e9", textAlign: "center", fontWeight: "bold", color: "#7c3aed" }}>
                R$ {totalReal2.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th colSpan="3" style={{ padding: "12px", border: "1px solid #d1c4e9", textAlign: "left", background: "white", color: "black" }}>Total</th>
              <th style={{ padding: "12px", border: "1px solid #d1c4e9", textAlign: "center", fontWeight: "bold", color: "#7c3aed", background: "white" }}>
                $ {totalGeralDolar.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </th>
              <th style={{ padding: "12px", border: "1px solid #d1c4e9", textAlign: "center", fontWeight: "bold", color: "#7c3aed", background: "white" }}>
                R$ {totalGeral.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default function App() {
  const [selected, setSelected] = useState(null);
  const [searchTop, setSearchTop] = useState("");
  const [searchFields, setSearchFields] = useState("");
  const [showCalculadora, setShowCalculadora] = useState(false);

  const menuOptions = ["Autorização", "Liquidação", "Standin", "Advice","HubQRCode","3DS-Autenticação","Lyra","TE40","SimSwap"];

  const handleCopy = (text) => navigator.clipboard.writeText(text);

  const filteredMenu = menuOptions.filter((option) =>
    option.toLowerCase().includes(searchTop.toLowerCase())
  );

  const filteredGroups =
    selected &&
    campos[selected].map((group) => ({
      ...group,
      itens: group.itens.filter((item) =>
        item.toLowerCase().includes(searchFields.toLowerCase())
      ),
    }));

  const gradientBtn = {
    background: "linear-gradient(90deg, rgb(47, 71, 190), rgb(186, 106, 228))",
    padding: "16px 28px",
    borderRadius: "10px",
    border: "none",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    transition: "transform 0.15s ease",
  };

  const buttonClickAnimation = (e) => {
    e.target.style.transform = "scale(0.92)";
    setTimeout(() => {
      e.target.style.transform = "scale(1)";
    }, 150);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "white",
        color: "#5c2d91",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          width: "100%",
          padding: "25px 0",
          textAlign: "center",
          background: "linear-gradient(90deg, rgb(47, 71, 190), rgb(186, 106, 228))",
          color: "white",
          fontSize: "26px",
          fontWeight: "bold",
          marginBottom: "30px",
          position: "relative",
        }}
      >
        Pesquisa de Campos
      </div>

      {/* PRIMEIRA TELA */}
      {!selected && (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <div style={{ 
            display: "flex", 
            gap: "15px", 
            width: "90%",
            maxWidth: "1000px",
            margin: "0 auto",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "stretch"
          }}>
            <div style={{ position: "relative", flex: "1 1 300px", minWidth: "250px" }}>
              <input
                value={searchTop}
                onChange={(e) => setSearchTop(e.target.value)}
                placeholder="Pesquisar..."
                style={{
                  padding: "10px 40px 10px 15px",
                  width: "100%",
                  borderRadius: "8px",
                  border: "2px solid #5c2d91",
                  outline: "none",
                  color: "black",
                  fontSize: "16px",
                  boxSizing: "border-box",
                }}
              />

              {/* Ícone de lupa */}
              <span
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "20px",
                  color: "#5c2d91",
                }}
              >
              </span>
            </div>

            {/* Botão Calculadora ao lado do campo */}
            <button
              onClick={(e) => {
                buttonClickAnimation(e);
                setShowCalculadora(true);
              }}
              style={{
                background: "linear-gradient(90deg, rgb(47, 71, 190), rgb(186, 106, 228))",
                border: "none",
                color: "white",
                padding: "10px 20px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "14px",
                transition: "all 0.3s ease",
                whiteSpace: "nowrap",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                flex: "0 0 auto",
              }}
            >
              🔢 Calculadora de Licenças
            </button>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              flexWrap: "wrap",
              marginTop: "50px",
              maxWidth: "1200px",
              margin: "50px auto 0 auto",
            }}
          >
            {filteredMenu.map((t) => (
              <button
                key={t}
                onClick={(e) => {
                  buttonClickAnimation(e);
                  setSelected(t);
                  setSearchFields("");
                }}
                style={{
                  ...gradientBtn,
                  flex: "0 0 calc(20% - 16px)",
                  minWidth: "180px",
                  maxWidth: "220px",
                }}
              >
                {t}
              </button>
            ))}

            {filteredMenu.length === 0 && (
              <p style={{ color: "#5c2d91", fontWeight: "bold" }}>
                Nenhum resultado encontrado
              </p>
            )}
          </div>
        </div>
      )}

      {/* SEGUNDA TELA */}
      {selected && (
        <div style={{ padding: "20px" }}>
          <button
            onClick={(e) => {
              buttonClickAnimation(e);
              setSelected(null);
            }}
            style={{ ...gradientBtn, marginBottom: "20px" }}
          >
            ← Voltar
          </button>

          <h2 style={{ color: "#5c2d91" }}>{selected}</h2>

          {/* Barra de pesquisa */}
          <div style={{ position: "relative", width: "60%", marginTop: "10px" }}>
            <input
              value={searchFields}
              onChange={(e) => setSearchFields(e.target.value)}
              placeholder="Pesquisar campo..."
              style={{
                padding: "10px 40px 10px 15px",
                width: "100%",
                borderRadius: "8px",
                border: "2px solid #5c2d91",
                outline: "none",
                color: "black",
                fontSize: "16px",
              }}
            />

            {/* Ícone de lupa */}
            <span
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "20px",
                color: "#5c2d91",
              }}
            >
     
            </span>
          </div>

          {/* Caminho do log */}
          <div style={{ marginTop: "20px" }}>
            <strong style={{ color: "#5c2d91" }}>Caminho do log:</strong>
            <div
              style={{
                marginTop: "8px",
                padding: "10px",
                background: "#ddd",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "black",
              }}
            >
              <span>{logPaths[selected]}</span>
              <button
                onClick={(e) => {
                  buttonClickAnimation(e);
                  handleCopy(logPaths[selected]);
                }}
                style={{ ...gradientBtn, padding: "6px 12px" }}
              >
                Copiar
              </button>
            </div>
          </div>

          {/* Grupos */}
          <div style={{ marginTop: "20px" }}>
            {filteredGroups.map((group, gIndex) =>
              group.itens.length > 0 ? (
                <div key={gIndex} style={{ marginBottom: "25px" }}>
                  <h3 style={{ color: "#5c2d91", marginBottom: "10px" }}>
                    {group.grupo}:
                  </h3>

                  {group.itens.map((campo, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "10px",
                        background: "#e6e6e6",
                        borderRadius: "8px",
                        marginBottom: "8px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: "black",
                      }}
                    >
                      <span>{campo}</span>

                      <button
                        onClick={(e) => {
                          buttonClickAnimation(e);
                          handleCopy(campo);
                        }}
                        style={{ ...gradientBtn, padding: "6px 12px" }}
                      >
                        Copiar
                      </button>
                    </div>
                  ))}
                </div>
              ) : null
            )}
          </div>
        </div>
      )}

      {/* Modal da Calculadora */}
      {showCalculadora && <CalculadoraLicencas onClose={() => setShowCalculadora(false)} />}
    </div>
  );
}