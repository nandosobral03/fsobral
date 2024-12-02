type ListTypes = "number" | "letter" | "roman" | "disc";
const SectionList = ({ type, children }: { type: ListTypes; children: React.ReactNode[] | React.ReactNode }) => {
  const listStyles = {
    number: "decimal",
    letter: "lower-alpha",
    roman: "lower-roman",
    disc: "disc",
  };

  const Tag = type === "disc" ? "ul" : "ol";
  const style = listStyles[type];

  if (!Array.isArray(children)) {
    return <li className={`ml-4 list-${style} list-outside`}>{children}</li>;
  }

  return (
    <Tag className={`list-${style} list-outside relative`}>
      {children.map((child, index) => (
        <li key={index} className={`ml-4 list-${style} list-outside`}>
          {child}
        </li>
      ))}
    </Tag>
  );
};

export default SectionList;
