import Link from "next/link";

import Newsletter from "../Newsletter";

const navigation = [
  { name: "MOOC O4S", href: "/#features" },
  { name: "Cursos", href: "/tutorials/cs50" },
  { name: "Preço", href: "/#pricing" },
];

const Footer = () => (
  <footer className="pt-32 sm:pt-44">
    <div className="custom-screen text-gray-600 dark:text-gray-300">
      <Newsletter />
      <div className="mt-10 flex-row-reverse items-center justify-between border-t py-10 dark:border-gray-800 sm:flex">
        <ul className="flex flex-wrap items-center gap-4 sm:text-sm">
          {navigation.map((item, idx) => (
            <li
              key={idx}
              className="text-gray-700 duration-150 hover:text-blue-600 dark:text-gray-200 dark:hover:text-sky-500 md:font-medium"
            >
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 sm:mt-0">
          © 2023 José Cordeiro. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
