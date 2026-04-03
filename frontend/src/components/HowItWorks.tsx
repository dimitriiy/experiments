import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MedalIcon } from "./Icons";
import { Link } from "react-router-dom";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: "react-query",
    description: "Implment suspense react query",
  },

  {
    icon: <MedalIcon />,
    title: "my-di",
    description: "DI",
  },
  {
    icon: <MedalIcon />,
    title: "my-router",
    description:
      "Простая копия известной JS-библиотеки для роутинга в веб-приложениях.",
  },
  {
    icon: <MedalIcon />,
    title: "atom",
    description:
      "Простая копия известной JS-библиотеки атомарного state management (Reatom/Recoil).",
  },
  {
    icon: <MedalIcon />,
    title: "long-tasks",
    description:
      "Простая копия известной JS-библиотеки для обработки длительных задач без блокировки UI.",
  },
  {
    icon: <MedalIcon />,
    title: "Signals",
    description:
      "Простая копия известной JS-библиотеки реактивных сигналов (Preact Signals).",
  },
  {
    icon: <MedalIcon />,
    title: "SWRApp",
    description:
      "Простая копия известной JS-библиотеки SWR для data fetching и кэширования.",
  },
  {
    icon: <MedalIcon />,
    title: "own-effector",
    description:
      "Простая копия известной JS-библиотеки Effector для event-driven state management.",
  },
  {
    icon: <MedalIcon />,
    title: "own-zustand",
    description:
      "Простая копия известной JS-библиотеки Zustand для минималистичного state management.",
  },
  {
    icon: <MedalIcon />,
    title: "own-vue",
    description:
      "Простая копия известной JS-библиотеки Vue.js для реактивных интерфейсов.",
  },
  {
    icon: <MedalIcon />,
    title: "own-mobx",
    description:
      "Простая копия известной JS-библиотеки MobX для observable state management.",
  },
  {
    icon: <MedalIcon />,
    title: "typing-effect",
    description:
      "Простая копия известной JS-библиотеки для эффекта печатной машинки.",
  },
  {
    icon: <MedalIcon />,
    title: "transition",
    description:
      "Простая копия известной JS-библиотеки для плавных переходов и анимаций.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="howItWorks" className="container text-center py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold py-5">
        Список{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          велосипедов{" "}
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card key={title} className="bg-muted/50">
            <Link to={title}>
              <CardHeader>
                <CardTitle className="grid gap-4 place-items-center">
                  {icon}
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent>{description}</CardContent>{" "}
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
};
