import { FaLinkedinIn, FaGithub, FaReact, FaNodeJs, FaGitAlt, FaHtml5, FaCss3, FaJs, FaJava, FaPython, FaFigma } from "react-icons/fa";
import { SiNextdotjs, SiMongodb, SiTailwindcss, SiMysql, SiPostgresql, SiDjango, SiDocker } from "react-icons/si";
import { PiFileCpp } from "react-icons/pi";
import { Code, Server, Globe, Sparkles } from "lucide-react";

export const socialIconMap = {
  linkedin: FaLinkedinIn,
  github: FaGithub,
};

export const serviceIconMap = {
  code: Code,
  server: Server,
  globe: Globe,
  sparkles: Sparkles,
};

export const skillIconMap = {
  html: FaHtml5,
  css: FaCss3,
  js: FaJs,
  react: FaReact,
  nextjs: SiNextdotjs,
  tailwind: SiTailwindcss,
  node: FaNodeJs,
  django: SiDjango,
  mongodb: SiMongodb,
  mysql: SiMysql,
  postgres: SiPostgresql,
  cpp: PiFileCpp,
  java: FaJava,
  python: FaPython,
  git: FaGitAlt,
  docker: SiDocker,
  figma: FaFigma,
  server: Server,
};
