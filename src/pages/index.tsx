const IndexPage: React.FC = () => {
  return (
    <div className="container">
      <img src="/logo.svg" />
      <h1>
        <span className="name">Martin Bavio</span>
        <span className="role">, web developer.</span>
      </h1>
    </div>
  );
};

export const config = { unstable_runtimeJS: false };

export default IndexPage;
