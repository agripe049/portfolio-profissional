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
        link: "https://github.com/agripe049/barbearia",
        linkLabel: "Ver repositório",
    },
    {
        client: "Tornearia e Serralheria Terra Boa",
        type: "Sistema de gestão interno",
        image: terraBoa,
        stack: "React + Vite + Firebase (Firestore/Auth) + Tailwind + Recharts",
        solved:
            "Clientes, produtos, vendas e relatórios num painel só, com lógica financeira pra vendas parceladas e recibo em PDF.",
        link: null,
        linkLabel: null,
    },
    {
        client: "Pot Cakes Confeitaria",
        type: "Landing page",
        image: potCakes,
        stack: "React + Vite + Tailwind + Framer Motion",
        solved:
            "Página pra uma confeitaria local mostrar o catálogo com cara profissional e receber pedidos direto pelo WhatsApp.",
        link: "https://github.com/agripe049/potCakes",
        linkLabel: "Ver repositório",
    },
]