const Logo = () => {
  return (
    <div className="logo">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 273.88 232.8"
        overflow="auto"
      >
        <path
          id="el-1"
          fill="red"
          d="M0,229.84C15.07,201,24.2,178,32.62,157.6h5.16c1.49,23,4.07,42.73,8.43,72.24Z"
          style={{ position: 'relative', zIndex: 3 }}
        />
        <polygon
          id="el-2"
          fill="blue"
          points="12.1 0 82.5 0 160.24 167.07 125.44 232.8 121.37 232.8 12.1 0"
          style={{ zIndex: 2 }}
        />
        <polygon
          id="el-3"
          fill="currentColor"
          points="199.12 0 264.76 0 273.88 229.84 208.24 229.84 199.12 0"
        />
        <use xlinkHref="#el-2" />
        <use xlinkHref="#el-1" />
      </svg>
    </div>
  );
};

export default Logo;
