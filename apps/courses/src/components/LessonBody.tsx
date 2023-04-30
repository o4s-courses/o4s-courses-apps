import markdownStyles from "~/styles/markdown-styles.module.css";

type Props = {
  content: string | null | undefined;
};

const LessonBody = ({ content }: Props) => {
  return (
    <div
      className={markdownStyles["markdown"]}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default LessonBody;
