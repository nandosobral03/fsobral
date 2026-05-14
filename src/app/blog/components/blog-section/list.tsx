type ListTypes = "number" | "letter" | "roman" | "disc";
const SectionList = ({ type, children }: { type: ListTypes; children: React.ReactNode[] | React.ReactNode }) => {
  const listStyles = {
    number: "decimal",
    letter: "lower-alpha",
    roman: "lower-roman",
    disc: "disc",
  };

  const Tag = type === "disc" ? "ul" : "ol";
  const listStyleType = listStyles[type];

  const items = (Array.isArray(children) ? children : [children]).filter((child) => child !== null && child !== undefined && child !== false);

  if (items.length === 0) return null;

  return (
    <Tag className="list-outside relative" style={{ listStyleType }}>
      {items.map((child, index) => (
        <li key={index} className="ml-4 list-outside" style={{ listStyleType }}>
          {child}
        </li>
      ))}
    </Tag>
  );
};

export default SectionList;
