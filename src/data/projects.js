import terraBoa from "../assets/terra-boa.png"
import potCakes from "../assets/pot-cakes.png"
import barbearia from "../assets/barbearia.png"



export const projects = [
    {
        client: "Barbearia Sr. Ofrélio",
        type: "Sistema de agendamento",
        image: barbearia,
        stack: "React + Vite + Tailwind · Node.js/Express + MySQL · JWT + bcrypt",
        solved:
            "Agenda online pra tirar o dono do caderno físico e das mensagens perdidas no WhatsApp. Autenticação própria e deploy gratuito (Aiven, Render e Vercel).",
        highlights: [
            "Agenda online no lugar do caderno",
            "Login com autenticação própria (JWT)",
            "Publicado com Aiven, Render e Vercel",
        ],
        link: "https://github.com/agripe049/barbearia",
    },
    {
        client: "Tornearia e Serralheria Terra Boa",
        type: "Sistema de gestão interno",
        image: terraBoa,
        stack: "React + Vite + Firebase (Firestore/Auth) + Tailwind + Recharts",
        solved:
            "Clientes, produtos, vendas e relatórios num painel só, com lógica financeira pra vendas parceladas e recibo em PDF.",
        highlights: [
            "Cadastro de clientes e produtos",
            "Vendas parceladas com controle de parcelas e vencimentos",
            "Painel com gráficos e relatórios",
            "Recibo em PDF",
        ],
        link: null,
    },
    {
        client: "Pot Cakes Confeitaria",
        type: "Landing page",
        image: potCakes,
        stack: "React + Vite + Tailwind + Framer Motion",
        solved:
            "Página pra uma confeitaria local mostrar o catálogo com cara profissional e receber pedidos direto pelo WhatsApp.",
        highlights: [
            "Catálogo de produtos da confeitaria",
            "Pedidos direto pelo WhatsApp",
            "Animações com Framer Motion",
        ],
        link: "https://github.com/agripe049/potCakes",
    },
]