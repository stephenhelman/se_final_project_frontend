import "../../blocks/Preloader.css";

const Preloader = () => {
  return (
    <div className="circle-preloader__wrapper">
      <div className="circle-preloader"></div>
      <p className="circle-preloader__text">Loading Pokemon Data...</p>
    </div>
  );
};

export default Preloader;
