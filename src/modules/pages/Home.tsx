import Typewriter from "typewriter-effect";
import { ApiFilled, ClockCircleOutlined, HeartFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Topbar from "../components/design/Topbar";
import bannerHome from "../../assets/banner-home.png";
import bannerParceiros from "../../assets/banner-parcerios.jpg";

import "../styles/pages/home.scss";

const Home = () => {
  const navigate = useNavigate();

  const destaqueFrases = [
    {
      icon: <ApiFilled />,
      title: "Só para quem quer ajudar",
      description:
        "Conectamos voluntários a projetos de educação, saúde, meio ambiente ou tecnologia.",
    },
    {
      icon: <ClockCircleOutlined />,
      title: "Tempo que transforma",
      description:
        "Doe suas horas para ações em comunidades, ONGs, eventos sociais ou iniciativas ambientais.",
    },
    {
      icon: <HeartFilled />,
      title: "Colabore com propósito",
      description:
        "Encontre oportunidades para atuar como mentor, organizador, apoio técnico ou comunicador social.",
    },
  ];

  return (
    <>
      <Topbar />
      <div
        className="container-banner"
        style={{
          backgroundImage: `linear-gradient(-225deg, rgba(0, 78, 146, 0.65) 0%, rgba(0, 7, 41, 0.65) 20%), url(${bannerHome})`,
        }}
      >
        <div className="content">
          <div className="baseline">
            <span className="high-line">
              Conectando{" "}
              <span className="change-word">
                <Typewriter
                  options={{
                    strings: [
                      "voluntários",
                      "colaboradores",
                      "membros",
                      "profissionais",
                      "amigos",
                      "parceiros",
                    ],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </span>{" "}
              a oportunidades com mais visibilidade e controle.
            </span>
            <button
              className="btn-opportunities"
              onClick={() => navigate("/opportunities")}
            >
              Ver nossas oportunidades
            </button>
            <span className="paragraph">
              Descubra oportunidades ideais para quem quer fazer a diferença.
              <br />
              Conecte-se a vagas para voluntário(a) em saúde, educação, meio
              ambiente, eventos ou tecnologia.
            </span>
          </div>
        </div>
      </div>

      <section className="container-informations">
        {destaqueFrases.map((item, index) => (
          <motion.aside
            className="item"
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="container-infos">
              {item.icon}
              <span className="title">{item.title}</span>
            </div>
            <p className="paragraph">{item.description}</p>
          </motion.aside>
        ))}
      </section>

      <motion.section
        className="container-last-opportunities"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <span className="title">Nossas últimas oportunidades!</span>
        <div className="container-cards">
          {[1, 2, 3].map((_, i) => (
            <motion.aside
              key={i}
              className="card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              viewport={{ once: true }}
            />
          ))}
        </div>
      </motion.section>

      <motion.section
        className="container-partners"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <span className="title">
          Algumas das centenas de ONGS que já aprovaram nossa ideia
        </span>
        <img src={bannerParceiros} alt="Banner Parceiros" />
      </motion.section>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <h2>ColabHora</h2>
            <p>Conectando voluntários a oportunidades com propósito.</p>
          </div>

          <div className="footer-links">
            <div className="column">
              <h4>Sobre</h4>
              <ul>
                <li>
                  <a href="#">Como funciona</a>
                </li>
                <li>
                  <a href="#">Quem somos</a>
                </li>
                <li>
                  <a href="#">Impacto social</a>
                </li>
              </ul>
            </div>
            <div className="column">
              <h4>Ajuda</h4>
              <ul>
                <li>
                  <a href="#">Suporte</a>
                </li>
                <li>
                  <a href="#">Perguntas frequentes</a>
                </li>
                <li>
                  <a href="#">Contato</a>
                </li>
              </ul>
            </div>
            <div className="column">
              <h4>Redes sociais</h4>
              <ul>
                <li>
                  <a href="#">LinkedIn</a>
                </li>
                <li>
                  <a href="#">Instagram</a>
                </li>
                <li>
                  <a href="#">GitHub</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} ColabHora. Todos os direitos
            reservados.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Home;
