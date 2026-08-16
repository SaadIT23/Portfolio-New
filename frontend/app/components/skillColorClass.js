const colorClassMap = {
  "text-orange-500": "text-orange-500",
  "text-blue-500": "text-blue-500",
  "text-yellow-400": "text-yellow-400",
  "text-sky-400": "text-sky-400",
  "text-white": "text-white",
  "text-sky-300": "text-sky-300",
  "text-green-500": "text-green-500",
  "text-accent": "text-accent",
  "text-green-700": "text-green-700",
  "text-green-400": "text-green-400",
  "text-blue-600": "text-blue-600",
  "text-sky-700": "text-sky-700",
  "text-blue-400": "text-blue-400",
  "text-red-500": "text-red-500",
  "text-yellow-300": "text-yellow-300",
  "text-pink-500": "text-pink-500",
};

export const getSkillColorClass = (colorKey) => colorClassMap[colorKey] || "text-accent";
