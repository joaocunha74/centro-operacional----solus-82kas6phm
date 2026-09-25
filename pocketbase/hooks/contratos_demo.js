routerAdd(
  'POST',
  '/backend/v1/contratos/demo',
  (e) => {
    const body = e.requestInfo().body || {}
    const requestedFields = Object.keys(body)
    const allowedFields = ['confirmar']
    for (const key of requestedFields) {
      if (!allowedFields.includes(key)) {
        throw e.badRequestError('Este formulário aceita somente a confirmação de criação da demonstração sintética. Dados de clientes não são aceitos.')
      }
    }
    if (body.confirmar !== true) {
      throw e.badRequestError('Confirme a criação do contrato sintético.')
    }

    const collection = $app.findCollectionByNameOrId('contratos')
    const record = new Record(collection)
    record.set('sintetico', true)
    record.set('schema_version', 'v0-inventario')
    record.set('identificacao', 'Demonstração Solus — contrato sintético ' + new Date().toISOString())
    record.set('cnpj', '')
    record.set('contato_nome', 'Contato Sintético')
    record.set('contato_telefone', '(21) 0000-0000')
    record.set('contato_email', 'contato.sintetico@example.invalid')
    record.set('servicos_contratados', ['PGR/GRO', 'PCMSO', 'eSocial SST'])
    record.set('valores_condicoes', { observacao: 'Valores comerciais de demonstração omitidos; não representam cliente nem proposta real.' })
    record.set('unidade', 'Unidade de demonstração')
    record.set('plano', 'A definir após inventário de campos')
    record.set('documentos_vinculados', [])
    record.set('origem', 'Fixture sintética criada pelo champion para validar o dossiê')
    record.set('responsavel_atual', 'Atendimento/Assessoria — papel conceitual')
    record.set('etapa_atual', 'aguardando_pagamento')
    record.set('pendencias', [])
    record.set('pagamento_implantacao', 'Aguardando comprovação — demonstração')
    record.set('assinatura_contrato', 'Aguardando integração — demonstração')
    record.set('lancamento_financeiro', 'Aguardando integração — demonstração')
    record.set('mensalidade_conta_azul', 'Aguardando integração provada; nenhum valor informado')
    record.set('produtos_adicionais_conta_azul', 'Aguardando integração provada; nenhum valor informado')
    $app.save(record)
    return e.json(201, { id: record.id, schema_version: record.get('schema_version'), etapa_atual: record.get('etapa_atual'), sintetico: record.get('sintetico') })
  },
  $apis.requireAuth(),
)
