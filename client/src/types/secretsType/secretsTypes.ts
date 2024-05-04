export type SecretsType = {
  title: string;
  description: string;
  userId: number;
};

export const secrets: SecretsType[] = [
  {
    title: "Test",
    description:
      "Lorem Ipsum is simply dummy description of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy description ever since the 1500s, when an unknown printer took a galley",
    userId: 1043,
  },
  {
    title: "Questions to ask",
    description:
      " 1. How should I effectively use CSS Modules & globals.css in my react application?\n 2. Reusability or Predictability? IS it better to share css styles across components or re-use styles for components to increase predictability.",
    userId: 301,
  },
  {
    title: "Answers",
    description:
      "1. CSS Modules: Scope styles by default & used to style individual components. globals.css is used for base styles like resets, typography (fonts, headings), color themes, or layout grids that are used universally. 2. Use a design system that mixes in both... How to build this: ",
    userId: 303,
  },
];
