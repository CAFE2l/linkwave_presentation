# Slide 07 - Analytics com dados reais do LinkWave

## Objetivo

Fazer o slide de analytics da apresentação deixar de usar placeholders e passar a renderizar gráficos com dados reais vindos do LinkWave em produção:

`https://linkwave-topaz.vercel.app`

## Ponto importante

A apresentação não deve acessar o Supabase diretamente.

Motivo: para buscar métricas reais como total de usuários, links, cliques, ranking e evolução temporal, provavelmente será necessário usar permissões administrativas ou consultas agregadas. Essas credenciais não podem ficar dentro de um HTML público.

O caminho seguro é:

1. O app LinkWave consulta Supabase/PostgreSQL no servidor.
2. O app expõe um endpoint público e controlado só com os dados agregados.
3. A apresentação busca esse JSON e renderiza os cards/gráficos.

## Arquitetura recomendada

```text
Slide 07 da apresentação
↓ fetch()
Endpoint público do LinkWave
↓ Server Route / Server Action
Supabase com Service Role no servidor
↓ SQL agregado
JSON seguro, sem dados sensíveis
↓
Gráficos na apresentação
```

## Endpoint recomendado

Criar no projeto principal do LinkWave:

```text
GET /api/presentation/analytics
```

Exemplo de resposta:

```json
{
  "updatedAt": "2026-06-26T18:00:00.000Z",
  "totals": {
    "users": 340,
    "links": 1200,
    "clicks": 24800
  },
  "timeline": [
    { "label": "Jan", "clicks": 120 },
    { "label": "Fev", "clicks": 180 },
    { "label": "Mar", "clicks": 160 },
    { "label": "Abr", "clicks": 260 },
    { "label": "Mai", "clicks": 310 },
    { "label": "Jun", "clicks": 420 }
  ],
  "ranking": [
    { "label": "YouTube", "clicks": 920 },
    { "label": "Loja online", "clicks": 740 },
    { "label": "WhatsApp", "clicks": 610 }
  ],
  "geo": [
    { "label": "Curitiba", "clicks": 420 },
    { "label": "São Paulo", "clicks": 360 },
    { "label": "Rio de Janeiro", "clicks": 210 }
  ]
}
```

## O que o endpoint deve retornar

- Total de usuários cadastrados.
- Total de links criados.
- Total de cliques registrados.
- Evolução temporal dos cliques.
- Ranking dos links mais acessados.
- Distribuição geográfica simplificada.
- Data de atualização.

## Segurança

O endpoint deve retornar apenas dados agregados.

Não retornar:

- Email de usuários.
- IDs internos sensíveis.
- IPs.
- User agents completos.
- Tokens.
- Dados pessoais de visitantes.

Se quiser restringir um pouco mais, usar uma chave pública simples por query string:

```text
/api/presentation/analytics?key=linkwave-presentation-2026
```

Essa chave não é segurança forte, mas evita scraping acidental. Segurança real deve vir do fato de o endpoint só retornar dados agregados.

## Exemplo de rota no Next.js

Arquivo sugerido:

```text
app/api/presentation/analytics/route.ts
```

Exemplo conceitual:

```ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const [{ count: users }, { count: links }, { count: clicks }] = await Promise.all([
    supabase.from("users").select("*", { count: "exact", head: true }),
    supabase.from("links").select("*", { count: "exact", head: true }),
    supabase.from("clicks").select("*", { count: "exact", head: true })
  ]);

  return NextResponse.json({
    updatedAt: new Date().toISOString(),
    totals: {
      users: users ?? 0,
      links: links ?? 0,
      clicks: clicks ?? 0
    },
    timeline: [],
    ranking: [],
    geo: []
  });
}
```

## Consultas mais avançadas

Para timeline, ranking e geografia, o ideal é criar uma função SQL no Supabase ou uma view somente de leitura.

Exemplos de agregações:

```sql
-- Total de cliques por dia
select
  date_trunc('day', created_at) as day,
  count(*) as clicks
from public.clicks
group by day
order by day;
```

```sql
-- Links mais acessados
select
  links.title,
  count(clicks.id) as clicks
from public.clicks
join public.links on links.id = clicks.link_id
group by links.title
order by clicks desc
limit 5;
```

## Como a apresentação deve consumir

No `index.html` da apresentação, trocar os placeholders por um fetch:

```js
async function loadAnalytics() {
  try {
    const res = await fetch("https://linkwave-topaz.vercel.app/api/presentation/analytics");
    if (!res.ok) throw new Error("Falha ao buscar analytics");
    return await res.json();
  } catch {
    return analyticsPlaceholders;
  }
}
```

Assim, se o endpoint falhar no dia da apresentação, o slide ainda abre com dados fallback.

## Plano de implementação

1. Criar o endpoint no projeto principal do LinkWave.
2. Testar o JSON no navegador.
3. Garantir que ele não retorna dados sensíveis.
4. Adicionar cache curto, por exemplo 60 segundos.
5. Atualizar a apresentação para buscar esse endpoint.
6. Manter fallback local para não quebrar no projetor.
7. Conferir o slide 07 em tela cheia antes da entrega.

## Decisão recomendada

Usar dados reais agregados via endpoint público do próprio LinkWave.

Não usar conexão direta da apresentação com Supabase.

Esse caminho é o mais seguro, simples de explicar na apresentação e tecnicamente correto.
