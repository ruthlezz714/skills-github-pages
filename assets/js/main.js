/*
  CONTEÚDO DO PORTFÓLIO
  Atualize os arrays abaixo para adicionar cursos, certificados e projetos.
  Não é necessário alterar o HTML para incluir novos cartões.
*/

const learningAreas = [
  {
    icon: "⌘",
    category: "Fundamentos",
    title: "Linux, terminal e Git",
    description: "Sistemas, linha de comando, versionamento e documentação técnica.",
    status: "Em desenvolvimento"
  },
  {
    icon: "⌁",
    category: "Segurança",
    title: "Application Security",
    description: "Fundamentos de segurança de aplicações, vulnerabilidades e boas práticas.",
    status: "Em desenvolvimento"
  },
  {
    icon: "◇",
    category: "Infraestrutura",
    title: "Redes e Cloud",
    description: "Protocolos, arquitetura de redes, serviços e fundamentos de nuvem.",
    status: "Em desenvolvimento"
  }
];

// Adicione um objeto para cada certificado recebido.
// Exemplo:
// { title: "Nome do curso", institution: "Instituição", date: "Novembro de 2026",
//   category: "Segurança", url: "https://link-do-certificado.com" }
const certificates = [];

// Adicione seus projetos, laboratórios ou estudos práticos.
// Exemplo:
// { title: "Nome do projeto", description: "O que foi desenvolvido ou aprendido.",
//   category: "Laboratório", status: "Concluído", url: "https://github.com/..." }
const projects = [
  {
    title: "Laboratórios práticos",
    description: "Registros de exercícios, desafios técnicos, metodologia e aprendizados.",
    category: "Prática",
    status: "Em andamento",
    url: "https://github.com/ruthlezz714"
  },
  {
    title: "Anotações técnicas",
    description: "Documentação de conceitos, comandos, ferramentas e procedimentos.",
    category: "Documentação",
    status: "Em andamento",
    url: "https://github.com/ruthlezz714"
  },
  {
    title: "Projetos pessoais",
    description: "Pequenos projetos para consolidar conhecimentos e desenvolver habilidades.",
    category: "Desenvolvimento",
    status: "Em andamento",
    url: "https://github.com/ruthlezz714"
  }
];

const learningGrid = document.querySelector("#learning-grid");
const certificateGrid = document.querySelector("#certificate-grid");
const projectGrid = document.querySelector("#project-grid");

function renderLearningAreas() {
  learningGrid.innerHTML = learningAreas.map(item => `
    <article class="learning-card">
      <div class="card-icon" aria-hidden="true">${item.icon}</div>
      <p class="card-kicker">${item.category}</p>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <div class="card-bottom"><span class="pill">${item.status}</span></div>
    </article>
  `).join("");
}

function renderCertificates(query = "") {
  const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
  const filtered = certificates.filter(item =>
    [item.title, item.institution, item.category, item.date]
      .join(" ").toLocaleLowerCase("pt-BR").includes(normalizedQuery)
  );

  document.querySelector("#certificate-count").textContent =
    `${filtered.length} ${filtered.length === 1 ? "registro" : "registros"}`;

  if (!filtered.length) {
    certificateGrid.innerHTML = `
      <div class="empty-state">
        <strong>Nenhum certificado cadastrado ainda.</strong><br>
        Quando concluir um curso, adicione os dados no arquivo
        <code>assets/js/main.js</code>.
      </div>`;
    return;
  }

  certificateGrid.innerHTML = filtered.map(item => `
    <article class="certificate-card">
      <div class="card-icon" aria-hidden="true">✳</div>
      <p class="card-kicker">${item.category || "Certificação"}</p>
      <h3>${item.title}</h3>
      <p>${item.institution || "Instituição não informada"}</p>
      <div class="certificate-meta">${item.date || ""}</div>
      ${item.url ? `<div class="card-bottom"><a class="project-link" href="${item.url}" target="_blank" rel="noreferrer">Ver certificado ↗</a></div>` : ""}
    </article>
  `).join("");
}

function renderProjects() {
  projectGrid.innerHTML = projects.map(item => `
    <article class="project-card">
      <div class="card-icon" aria-hidden="true">↗</div>
      <p class="card-kicker">${item.category}</p>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <div class="card-bottom">
        <span class="pill">${item.status}</span>
        <a class="project-link" href="${item.url}" target="_blank" rel="noreferrer">Acessar ↗</a>
      </div>
    </article>
  `).join("");
}

function updateStats() {
  document.querySelector("#stat-certificates").textContent = certificates.length;
  document.querySelector("#stat-projects").textContent = projects.length;
  document.querySelector("#stat-labs").textContent = projects.filter(item =>
    item.category.toLocaleLowerCase("pt-BR").includes("laboratório") ||
    item.category.toLocaleLowerCase("pt-BR").includes("prática")
  ).length;
  document.querySelector("#stat-topics").textContent = learningAreas.length;
}

document.querySelector("#certificate-search").addEventListener("input", event => {
  renderCertificates(event.target.value);
});

const menuToggle = document.querySelector("#menu-toggle");
const siteNav = document.querySelector("#site-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});

siteNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.querySelector("#current-year").textContent = new Date().getFullYear();

renderLearningAreas();
renderCertificates();
renderProjects();
updateStats();
