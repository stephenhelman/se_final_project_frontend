import "../../blocks/Grid.css";

const Grid = ({ elements, page, scrollRef }) => {
  const content = elements.map((element, index) => {
    return (
      <li
        key={index}
        className={`grid__list-item grid__list-item_type_${page}`}
      >
        {element}
      </li>
    );
  });
  return (
    <div className="grid__wrapper" ref={scrollRef}>
      <ul className={`grid`}>{content}</ul>
    </div>
  );
};

export default Grid;
