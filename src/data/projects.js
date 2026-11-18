import terraBoa from "../assets/terra-boa.png"
import potCakes from "../assets/pot-cakes.webp"
import barbearia from "../assets/barbearia.png"
import cinePot from "../assets/cine-pot.webp"
import psaPlanejados from "../assets/psa-planejados.webp"



export const projects = [
    {
        client: "Barbearia Sr. Ofrélio",
        type: "Sistema de agendamento",
        image: barbearia,
        stack: "React + Tailwind · Node.js/Express + MySQL · JWT + bcrypt",
        solved:
            "Agenda online pra tirar o dono do caderno físico e das mensagens perdidas no WhatsApp. Autenticação própria e deploy gratuito (Aiven, Render e Vercel).",
        highlights: [
            "Agenda online no lugar do caderno",
            "Login com autenticação própria (JWT)",
            "Publicado com Aiven, Render e Vercel",
        ],
        demo: "https://barbearia-green-iota.vercel.app/",
        repo: "https://github.com/agripe049/barbearia",
        post: "https://lnkd.in/p/gB57_ycb"

    },
    {
        client: "Tornearia e Serralheria Terra Boa",
        type: "Sistema de gestão interno",
        image: terraBoa,
        stack: "React + Firebase + Tailwind + Recharts",
        solved:
            "Clientes, produtos, vendas e relatórios num painel só, com lógica financeira pra vendas parceladas e recibo em PDF.",
        highlights: [
            "Cadastro de clientes e produtos",
            "Vendas parceladas com controle de parcelas e vencimentos",
            "Painel com gráficos e relatórios",
            "Recibo em PDF",
        ],
        demo: null,
        repo: null,
        post: "https://lnkd.in/p/gHPwKRXB",
    },
    {
        client: "Pot Cakes Confeitaria",
        type: "Landing page",
        image: potCakes,
        stack: "React + Tailwind + Framer Motion",
        solved:
            "Página pra uma confeitaria local mostrar o catálogo com cara profissional e receber pedidos direto pelo WhatsApp.",
        highlights: [
            "Catálogo de produtos da confeitaria",
            "Pedidos direto pelo WhatsApp",
            "Animações com Framer Motion",
        ],
        demo: "https://pot-cakes.vercel.app/",
        repo: "https://github.com/agripe049/potCakes",
        post: "https://lnkd.in/p/dh4iAp5m",
    },
    {
        client: "PSA Planejados",
        type: "Landing page",
        image: psaPlanejados,
        stack: "React + Tailwind + Framer Motion",
        solved:
            "Site pra uma marcenaria de móveis planejados de Terra Boa mostrar seus projetos de cozinhas, quartos, banheiros e salas. E transformar visita em pedido de orçamento pelo WhatsApp.",
        highlights: [
            "Galeria de projetos por ambiente",
            "Orçamento direto pelo WhatsApp com mensagem pronta",
            "Animações com Framer Motion",
        ],
        demo: "https://marcenaria-omega.vercel.app/",
        repo: "https://github.com/agripe049/marcenaria",
        post: "https://lnkd.in/p/dY-5zSFc",
    },
    {
        client: "Cine Pot",
        type: "Consumo de API REST",
        image: cinePot,
        stack: "React + API do TMDB",
        solved:
            "Catálogo de filmes consumindo a API do TMDB: lista os lançamentos, busca por nome e abre uma página de detalhes de cada filme. O foco foi a integração com a API e o fluxo de dados, não o visual.",
        highlights: [
            "Lista de filmes populares direto da API do TMDB",
            "Busca de filmes por nome",
            "Página de detalhes com rotas dinâmicas (React Router)",
            "Requisições assíncronas com useEffect e useState",
        ],
        demo: "https://api-filmes.vercel.app/",
        repo: "https://github.com/agripe049/api-filmes",
        post: "https://lnkd.in/p/dCYYz-jr",
    },
]