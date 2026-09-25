migrate(
  (app) => {
    const collection = new Collection({
      name: 'contratos',
      type: 'base',
      listRule: "@request.auth.id != '' && sintetico = true",
      viewRule: "@request.auth.id != '' && sintetico = true",
      createRule: null,
      updateRule: null,
      deleteRule: null,
      fields: [
        { name: 'sintetico', type: 'bool', required: true },
        { name: 'schema_version', type: 'text', required: true },
        { name: 'identificacao', type: 'text', required: true },
        { name: 'cnpj', type: 'text' },
        { name: 'contato_nome', type: 'text' },
        { name: 'contato_telefone', type: 'text' },
        { name: 'contato_email', type: 'email' },
        { name: 'servicos_contratados', type: 'json', required: true },
        { name: 'valores_condicoes', type: 'json', required: true },
        { name: 'unidade', type: 'text' },
        { name: 'plano', type: 'text' },
        { name: 'documentos_vinculados', type: 'json' },
        { name: 'origem', type: 'text', required: true },
        { name: 'responsavel_atual', type: 'text', required: true },
        { name: 'etapa_atual', type: 'select', values: ['aguardando_pagamento'], maxSelect: 1, required: true },
        { name: 'pendencias', type: 'json' },
        { name: 'pagamento_implantacao', type: 'text', required: true },
        { name: 'assinatura_contrato', type: 'text', required: true },
        { name: 'lancamento_financeiro', type: 'text', required: true },
        { name: 'mensalidade_conta_azul', type: 'text', required: true },
        { name: 'produtos_adicionais_conta_azul', type: 'text', required: true },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE INDEX idx_contratos_sintetico_created ON contratos (sintetico, created DESC)'],
    })
    app.save(collection)

    const record = new Record(collection)
    record.set('sintetico', true)
    record.set('schema_version', 'v0-inventario')
    record.set('identificacao', 'Demonstração Solus — contrato sintético 001')
    record.set('cnpj', '')
    record.set('contato_nome', 'Contato Sintético')
    record.set('contato_telefone', '(21) 0000-0000')
    record.set('contato_email', 'contato.sintetico@example.invalid')
    record.set('servicos_contratados', ['PGR/GRO', 'PCMSO', 'eSocial SST'])
    record.set('valores_condicoes', { observacao: 'Valores comerciais de demonstração omitidos; não representam cliente nem proposta real.' })
    record.set('unidade', 'Unidade de demonstração')
    record.set('plano', 'A definir após inventário de campos')
    record.set('documentos_vinculados', [])
    record.set('origem', 'Fixture sintética para validação do dossiê')
    record.set('responsavel_atual', 'Atendimento/Assessoria — papel conceitual')
    record.set('etapa_atual', 'aguardando_pagamento')
    record.set('pendencias', [])
    record.set('pagamento_implantacao', 'Aguardando comprovação — demonstração')
    record.set('assinatura_contrato', 'Aguardando integração — demonstração')
    record.set('lancamento_financeiro', 'Aguardando integração — demonstração')
    record.set('mensalidade_conta_azul', 'Aguardando integração provada; nenhum valor informado')
    record.set('produtos_adicionais_conta_azul', 'Aguardando integração provada; nenhum valor informado')
    app.save(record)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('contratos')
    app.delete(collection)
  },
)
